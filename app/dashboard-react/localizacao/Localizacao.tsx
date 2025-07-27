import React from 'react';
import BrazilInteractiveMap from '../components/map/BrazilInteractiveMap';

const Localizacao = () => {
  return (
    <div className="space-y-6">
      {/* Cabeçalho da página */}
      <div>
        <h1 className="text-3xl font-bold">Localização</h1>
        <p className="mt-2 text-muted-foreground">
          Mapa interativo com a distribuição de participantes do programa Futuras Cientistas por estado e região do Brasil.
        </p>
      </div>

      {/* Componente do mapa interativo do Brasil */}
      <BrazilInteractiveMap />
    </div>
  );
};

export default Localizacao;
