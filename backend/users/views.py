import re
import mimetypes
import magic

from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from django.contrib.auth.models import Group
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import viewsets, status, permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import HttpResponse
from django.http import JsonResponse



from .services import *

from .serializers import UserSerializer
from .models import User
from .permissions import (
    IsAdminOrAvaliadora as IsAdminOrEvaluator,
    IsSelfOrAdminOrAvaliadora as IsOwnerOrAdminOrEvaluator,
    IsAdminRole
)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrEvaluator]



class RecuperacaoSenhaAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        cpf = request.data.get('cpf')

        if not email and not cpf:
            return Response({'mensagem': 'Informe o CPF ou o email.'}, status=status.HTTP_400_BAD_REQUEST)

        if email and not validar_email(email):
            return Response({'mensagem': 'Email inválido.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = encontrar_usuario_por_email_ou_cpf(email=email, cpf=cpf)
        except User.DoesNotExist:
            return Response({'mensagem': 'Usuário não encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        except ValueError as e:
            return Response({'mensagem': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        if user.password_needs_reset:
            return Response({'mensagem': 'A senha já foi resetada recentemente. Verifique seu email.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            resetar_senha_usuario(user)
        except Exception as e:
            return Response({'mensagem': f'Erro ao enviar email: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'mensagem': 'Senha recuperada com sucesso. Verifique seu email.'}, status=status.HTTP_200_OK)
    


class CadastroAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser, FormParser] 

    def post(self, request):
        data = request.data.copy()

        email = data.get('email')
        cpf = re.sub(r'\D', '', data.get('cpf', ''))
        senha = data.get('password')

        if not data.get('nome') or not email or not senha or not cpf:
            return Response({'mensagem': 'Campos obrigatórios.'}, status=status.HTTP_400_BAD_REQUEST)

        if not validar_email(email):
            return Response({'mensagem': 'Email inválido.'}, status=status.HTTP_400_BAD_REQUEST)

        if not validar_cpf(cpf):
            return Response({'mensagem': 'CPF inválido.'}, status=status.HTTP_400_BAD_REQUEST)

        senha_valida = validar_senha(senha)
        if senha_valida is not True:
            return Response({'mensagem': senha_valida}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'mensagem': 'Email já cadastrado.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(cpf=cpf).exists():
            return Response({'mensagem': 'CPF já cadastrado.'}, status=status.HTTP_400_BAD_REQUEST)

        data['cpf'] = cpf

        serializer = UserSerializer(data=data, context={"request": request})

        if serializer.is_valid():
            user = serializer.save()
            user.set_password(senha)
            user.save()

            refresh = RefreshToken.for_user(user)
            return Response({
                'mensagem': 'Usuário cadastrado com sucesso.',
                'usuario': UserSerializer(user).data,
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh),
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class LoginThrottle(UserRateThrottle):
    rate = '4/min'


class LoginAPIView(APIView):
    throttle_classes = [LoginThrottle]
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        cpf = re.sub(r'\D', '', request.data.get('cpf', ''))
        senha = request.data.get('senha')

        if not cpf or not senha:
            return Response({'mensagem': 'Campos obrigatórios.'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=cpf, password=senha)

        if user is None:
            return Response({'mensagem': 'Credenciais inválidas.'}, status=status.HTTP_400_BAD_REQUEST)

        refresh = RefreshToken.for_user(user)

        response = JsonResponse({
            'refresh_token': str(refresh),
            'access_token': str(refresh.access_token),
        }, status=200)

        response.set_cookie(
            'access_token',
            str(refresh.access_token),
            httponly=True,
            samesite='Lax',
            secure=True,  # use True em produção com HTTPS
        )
        response.set_cookie(
            'refresh_token',
            str(refresh),
            httponly=True,
            samesite='Lax',
            secure=True,
        )
        return response


class UserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrEvaluator]

    def get_queryset(self):
        return User.objects.all()


class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdminOrEvaluator]

    def get_object(self):
        if self.kwargs.get('pk'):
            return super().get_object()
        return self.request.user


class UserUpdateView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdminOrEvaluator]
    parser_classes = [MultiPartParser, FormParser] 

    def get_object(self):
        return get_object_or_404(User, pk=self.kwargs.get('pk'))

    def perform_update(self, serializer):
        # Não permite alterar CPF via update
        serializer.validated_data.pop('cpf', None)
        # Apenas admins podem alterar grupos
        if not self.request.user.groups.filter(name='admin').exists():
            serializer.validated_data.pop('groups', None)
        serializer.save()


class UserDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdminOrEvaluator]

    def get_object(self):
        return self.request.user

    def destroy(self, request, *args, **kwargs):
        senha = request.data.get('senha')
        if not senha or not request.user.check_password(senha):
            return Response({'mensagem': 'Senha incorreta.'}, status=status.HTTP_400_BAD_REQUEST)

        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({'mensagem': 'Conta excluída com sucesso.'}, status=status.HTTP_200_OK)


class UpdateMyUserView(generics.UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def perform_update(self, serializer):
        serializer.validated_data.pop('cpf', None)
        serializer.save()


class GetMyUserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class GroupMembersAPIView(APIView):
    permission_classes = [IsAdminUser] 

    def get(self, request, group_name):
        try:
            group = Group.objects.get(name=group_name)
        except Group.DoesNotExist:
            return Response({"detail": "Grupo não encontrado."}, status=status.HTTP_404_NOT_FOUND)

        users = User.objects.filter(groups=group)
        users_data = [{"id": u.id, "name": u.nome, "email": u.email, "cpf": u.cpf} for u in users]
        return Response(users_data)


class UserListAPIView(APIView):
    permission_classes = [IsAdminUser]  

    def get(self, request):
        users = User.objects.all()
        data = [{"id": u.id, "email": u.email, "cpf": u.cpf, "roles": u.roles} for u in users]
        return Response(data)


class UserDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"detail": "Usuário não encontrado."}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(user)
        return Response(serializer.data)
    

class GerenciarGrupoAPIView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):

        user_id = request.data.get("user_id")
        nome_grupo = request.data.get("grupo")

        if not user_id or not nome_grupo:
            return Response({"detail": "Parâmetros 'user_id' e 'grupo' são obrigatórios."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            usuario = User.objects.get(id=user_id)
            operador = request.user
            adicionar_usuario_ao_grupo(usuario, nome_grupo, operador)
        except User.DoesNotExist:
            return Response({"detail": "Usuário não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        except PermissionDenied as e:
            return Response({"detail": str(e)}, status=status.HTTP_403_FORBIDDEN)

        return Response({"detail": f"Usuário adicionado ao grupo '{nome_grupo}' com sucesso."}, status=status.HTTP_200_OK)

    def delete(self, request):
    
        user_id = request.data.get("user_id")
        nome_grupo = request.data.get("grupo")

        if not user_id or not nome_grupo:
            return Response({"detail": "Parâmetros 'user_id' e 'grupo' são obrigatórios."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            usuario = User.objects.get(id=user_id)
            operador = request.user
            remover_usuario_do_grupo(usuario, nome_grupo, operador)
        except User.DoesNotExist:
            return Response({"detail": "Usuário não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        except PermissionDenied as e:
            return Response({"detail": str(e)}, status=status.HTTP_403_FORBIDDEN)

        return Response({"detail": f"Usuário removido do grupo '{nome_grupo}' com sucesso."}, status=status.HTTP_200_OK)
    

class AnexoDownloadView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id, field_name):
        user = get_object_or_404(User, pk=user_id)

        if not request.user.is_superuser and request.user != user:
            return HttpResponse("Acesso negado", status=403)

        if not hasattr(user, field_name):
            return HttpResponse("Campo não encontrado", status=400)

        arquivo = getattr(user, field_name)
        if not arquivo:
            return HttpResponse("Arquivo não encontrado", status=404)

        if isinstance(arquivo, memoryview):
            arquivo = bytes(arquivo)

        try:
            mime = magic.Magic(mime=True)
            mime_type = mime.from_buffer(arquivo)
        except Exception:
            mime_type = "application/octet-stream"

        ext = mimetypes.guess_extension(mime_type) or ".bin"

        filename = f"{field_name}{ext}"

        response = HttpResponse(arquivo, content_type=mime_type)
        response["Content-Disposition"] = f'attachment; filename="{filename}"'
        return response
    
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id, field_name):
        user = get_object_or_404(User, pk=user_id)

        if not request.user.is_superuser and request.user != user:
            return JsonResponse({'erro': 'Acesso negado.'}, status=403)

        if not hasattr(user, field_name):
            return JsonResponse({'erro': f"Campo '{field_name}' não encontrado."}, status=400)

        arquivo = getattr(user, field_name)
        if not arquivo:
            return JsonResponse({'status': 'Vazio'}, status=204)

        if isinstance(arquivo, memoryview):
            arquivo = bytes(arquivo)

        try:
            mime = magic.Magic(mime=True)
            mime_type = mime.from_buffer(arquivo)
        except Exception as e:
            return JsonResponse({'erro': f'Erro ao detectar MIME: {str(e)}'}, status=500)

        return JsonResponse({
            'campo': field_name,
            'tamanho_bytes': len(arquivo),
            'mime_type': mime_type,
            'tipo_arquivo': 'Possível PDF' if mime_type == 'application/pdf' else 'Outro',
        })
    

class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user, context={"request": request})
        return Response(serializer.data)

    # def get(self, request):
    #     user = request.user
    #     grupos = user.groups.all()
    #     grupos_data = [{"id": g.id, "name": g.name} for g in grupos]

    #     return Response({
    #         "id": user.id,
    #         "nome": user.nome,
    #         "email": user.email,
    #         "cpf": user.cpf,
    #         "password_needs_reset": user.password_needs_reset,
    #         "grupos": grupos_data
    #     })

class PasswordResetView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        user = request.user
        if not user.password_needs_reset:
            return Response({'mensagem': 'Senha já foi redefinida!'}, status=400)
        nova_senha = request.data.get("new_password")

        senha_valida = validar_senha(nova_senha)
        if senha_valida != True:
            return Response({'mensagem': senha_valida}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(nova_senha)
        user.password_needs_reset = False
        user.save()
        return Response({'mensagem': 'Senha redefinida com sucesso!'})
    

class LogoutAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
                response = Response({'mensagem': 'Logout realizado com sucesso!'}, status=status.HTTP_205_RESET_CONTENT)
                response.delete_cookie('access_token')
                response.delete_cookie('refresh_token')
                return response
            else:
                return Response({'mensagem': 'Token de refresh não encontrado.'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'mensagem': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class UserGroupsAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id=None):
        if user_id:
            # Apenas admins podem consultar grupos de outro usuário
            if not request.user.is_superuser and request.user.id != int(user_id):
                return Response({'detail': 'Acesso negado.'}, status=status.HTTP_403_FORBIDDEN)
            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                return Response({'detail': 'Usuário não encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Se nenhum ID for passado, retorna os grupos do usuário autenticado
            user = request.user

        groups = user.groups.all()
        data = [{'id': group.id, 'name': group.name} for group in groups]
        return Response(data)
    

class DefaultGroupsAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        grupos_padrao = ['admin', 'estudante', 'avaliadora', 'professora']
        grupos = Group.objects.filter(name__in=grupos_padrao)
        data = [{'id': group.id, 'name': group.name} for group in grupos]
        return Response(data)