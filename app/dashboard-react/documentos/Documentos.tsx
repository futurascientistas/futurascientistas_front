import React, { useState } from 'react';
// Importa componentes UI reutilizáveis e ícones para interface
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { 
  Search, 
  Upload, 
  Download, 
  FileText, 
  File, 
  Image, 
  Video,
  MoreVertical,
  FolderOpen,
  Plus,
  Filter
} from 'lucide-react';

const Documentos = () => {
  // Estado para controlar o modo de visualização dos documentos: grade ou lista
  const [viewMode, setViewMode] = useState('grid');

  // Lista simulada de documentos com metadados, categoria e ícone
  const documents = [
    {
      id: 1,
      name: 'Relatório Anual 2023.pdf',
      type: 'pdf',
      size: '2.4 MB',
      date: '15/01/2024',
      category: 'Relatórios',
      icon: FileText
    },
    // Outros documentos seguem...
  ];

  // Categorias disponíveis para filtro
  const categories = ['Todos', 'Relatórios', 'Apresentações', 'Planilhas', 'Imagens', 'Vídeos', 'Manuais'];
  // Estado para controlar categoria selecionada no filtro
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Filtra documentos com base na categoria selecionada, ou mostra todos se for "Todos"
  const filteredDocs = selectedCategory === 'Todos' 
    ? documents 
    : documents.filter(doc => doc.category === selectedCategory);

  // Função que retorna classes CSS para cores de badge conforme tipo do documento
  const getTypeColor = (type: string) => {
    const colors = {
      pdf: 'bg-red-100 text-red-800',
      presentation: 'bg-orange-100 text-orange-800',
      spreadsheet: 'bg-green-100 text-green-800',
      image: 'bg-blue-100 text-blue-800',
      video: 'bg-purple-100 text-purple-800',
      default: 'bg-gray-100 text-gray-800'
    };
    return colors[type as keyof typeof colors] || colors.default;
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho da página com título e botão de upload */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brand-purple">Documentos</h1>
          <p className="text-muted-foreground">Gerencie arquivos e documentos do sistema</p>
        </div>
        <Button className="bg-brand-purple hover:bg-brand-purple-vibrant">
          <Upload className="h-4 w-4 mr-2" />
          Fazer Upload
        </Button>
      </div>

      {/* Filtros e campo de busca */}
      <Card className="border-brand-purple/20">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Campo de busca com ícone */}
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar documentos..." className="pl-10" />
              </div>
              {/* Botão para abrir filtro avançado (funcionalidade futura) */}
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            {/* Botões para alternar modo de visualização */}
            <div className="flex items-center gap-2">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-brand-purple hover:bg-brand-purple-vibrant' : ''}
              >
                Grade
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-brand-purple hover:bg-brand-purple-vibrant' : ''}
              >
                Lista
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botões para filtrar por categoria */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? 'bg-brand-purple hover:bg-brand-purple-vibrant' : ''}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Exibição dos documentos: modo grade ou lista */}
      {viewMode === 'grid' ? (
        // Modo grade: cartões com informações resumidas
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDocs.map((doc) => {
            const IconComponent = doc.icon;
            return (
              <Card key={doc.id} className="border-brand-purple/20 hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  {/* Ícone do documento e menu de opções */}
                  <div className="flex items-center justify-between mb-3">
                    <IconComponent className="h-8 w-8 text-brand-purple" />
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </div>
                  {/* Nome do documento */}
                  <h3 className="font-medium text-sm mb-2 line-clamp-2">{doc.name}</h3>
                  <div className="space-y-2">
                    {/* Badge com categoria colorida */}
                    <Badge variant="secondary" className={getTypeColor(doc.type)}>
                      {doc.category}
                    </Badge>
                    {/* Informações de tamanho e data */}
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{doc.size}</span>
                      <span>{doc.date}</span>
                    </div>
                  </div>
                  {/* Botão para baixar o documento */}
                  <div className="flex gap-1 mt-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="h-3 w-3 mr-1" />
                      Baixar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        // Modo lista: visualização em linha com detalhes
        <Card className="border-brand-purple/20">
          <CardHeader>
            <CardTitle className="text-brand-purple">Documentos ({filteredDocs.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {filteredDocs.map((doc, index) => {
                const IconComponent = doc.icon;
                return (
                  <div key={doc.id}>
                    <div className="flex items-center justify-between p-4 hover:bg-brand-purple/5 transition-colors">
                      <div className="flex items-center gap-3 flex-1">
                        <IconComponent className="h-6 w-6 text-brand-purple" />
                        <div className="flex-1">
                          <h3 className="font-medium">{doc.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {doc.category} • {doc.size} • {doc.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Badge com tipo do arquivo */}
                        <Badge variant="secondary" className={getTypeColor(doc.type)}>
                          {doc.type.toUpperCase()}
                        </Badge>
                        {/* Botões para baixar e abrir menu */}
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {/* Separador entre itens, exceto após o último */}
                    {index < filteredDocs.length - 1 && <Separator />}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Documentos;
