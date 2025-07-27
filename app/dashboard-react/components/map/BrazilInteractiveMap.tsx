import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/tooltip';

// GeoJSON do Brasil
const geoUrl = "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson";

// Dados por região com cores padronizadas do projeto (tons femininos)
const regionData = {
  'Norte': {
    color: '#d946ef', // brand-lilac
    projetos: 850,
    alunas: 1840,
    professoras: 245,
    escolas: 180,
    states: ['Acre', 'Amapá', 'Amazonas', 'Pará', 'Rondônia', 'Roraima', 'Tocantins'],
    center: [-60, -5],
    textColor: '#ffffff'
  },
  'Nordeste': {
    color: '#ec4899', // brand-pink
    projetos: 1250,
    alunas: 2980,
    professoras: 410,
    escolas: 380,
    states: ['Alagoas', 'Bahia', 'Ceará', 'Maranhão', 'Paraíba', 'Pernambuco', 'Piauí', 'Rio Grande do Norte', 'Sergipe'],
    center: [-40, -10],
    textColor: '#ffffff'
  },
  'Centro-Oeste': {
    color: '#a855f7', // purple-500
    projetos: 420,
    alunas: 980,
    professoras: 135,
    escolas: 95,
    states: ['Distrito Federal', 'Goiás', 'Mato Grosso', 'Mato Grosso do Sul'],
    center: [-55, -15],
    textColor: '#ffffff'
  },
  'Sudeste': {
    color: '#8b5cf6', // brand-purple
    projetos: 1850,
    alunas: 4250,
    professoras: 580,
    escolas: 520,
    states: ['Espírito Santo', 'Minas Gerais', 'Rio de Janeiro', 'São Paulo'],
    center: [-45, -20],
    textColor: '#ffffff'
  },
  'Sul': {
    color: '#c084fc', // purple-400
    projetos: 980,
    alunas: 2180,
    professoras: 320,
    escolas: 285,
    states: ['Paraná', 'Rio Grande do Sul', 'Santa Catarina'],
    center: [-50, -27],
    textColor: '#ffffff'
  }
};

// Mapeamento correto de estados para regiões
const stateToRegion: { [key: string]: string } = {
  'Acre': 'Norte',
  'Alagoas': 'Nordeste', 
  'Amapá': 'Norte',
  'Amazonas': 'Norte',
  'Bahia': 'Nordeste',
  'Ceará': 'Nordeste',
  'Distrito Federal': 'Centro-Oeste',
  'Espírito Santo': 'Sudeste',
  'Goiás': 'Centro-Oeste',
  'Maranhão': 'Nordeste',
  'Mato Grosso': 'Centro-Oeste',
  'Mato Grosso do Sul': 'Centro-Oeste',
  'Minas Gerais': 'Sudeste',
  'Pará': 'Norte',
  'Paraíba': 'Nordeste',
  'Paraná': 'Sul',
  'Pernambuco': 'Nordeste',
  'Piauí': 'Nordeste',
  'Rio de Janeiro': 'Sudeste',
  'Rio Grande do Norte': 'Nordeste',
  'Rio Grande do Sul': 'Sul',
  'Rondônia': 'Norte',
  'Roraima': 'Norte',
  'Santa Catarina': 'Sul',
  'São Paulo': 'Sudeste',
  'Sergipe': 'Nordeste',
  'Tocantins': 'Norte'
};

const BrazilInteractiveMap = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const getRegionByState = (stateName: string) => {
    return stateToRegion[stateName] || null;
  };

  const getStateColor = (stateName: string) => {
    const region = getRegionByState(stateName);
    if (!region) return '#f1f5f9';
    
    const regionInfo = regionData[region as keyof typeof regionData];
    return regionInfo?.color || '#f1f5f9';
  };

  return (
    <TooltipProvider>
      <div className="w-full space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Mapa */}
          <div className="lg:col-span-3">
            <Card className="border-brand-purple/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-brand-purple text-xl font-bold">Mapa Interativo - Programa Futuras Cientistas</CardTitle>
                <p className="text-muted-foreground">Clique em uma região para ver detalhes. Passe o mouse sobre os estados para informações específicas.</p>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 rounded-lg p-6 border-2 border-brand-purple/10">
                  <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{
                      center: [-55, -15],
                      scale: 700,
                    }}
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  >
                    <Geographies geography={geoUrl}>
                      {({ geographies }) =>
                        geographies.map((geo) => {
                          const stateName = geo.properties.name;
                          const region = getRegionByState(stateName);
                          const regionInfo = region ? regionData[region as keyof typeof regionData] : null;
                          
                          return (
                            <Tooltip key={geo.rsmKey}>
                              <TooltipTrigger asChild>
                                <Geography
                                  geography={geo}
                                  fill={getStateColor(stateName)}
                                  stroke="#ffffff"
                                  strokeWidth={2}
                                  style={{
                                    default: { 
                                      outline: "none",
                                      filter: "drop-shadow(0 2px 6px rgba(139, 92, 246, 0.2))"
                                    },
                                    hover: { 
                                      outline: "none", 
                                      fill: hoveredState === stateName ? '#581c87' : getStateColor(stateName),
                                      cursor: "pointer",
                                      filter: "brightness(0.85) drop-shadow(0 4px 12px rgba(139, 92, 246, 0.4))",
                                      strokeWidth: 3,
                                      stroke: "#581c87"
                                    },
                                    pressed: { outline: "none" },
                                  }}
                                  onMouseEnter={() => setHoveredState(stateName)}
                                  onMouseLeave={() => setHoveredState(null)}
                                  onClick={() => region && setSelectedRegion(region)}
                                />
                              </TooltipTrigger>
                              <TooltipContent className="bg-white border border-brand-purple/30 p-4 rounded-lg shadow-xl max-w-xs">
                                {regionInfo && (
                                  <div className="space-y-3">
                                    <div className="text-center">
                                      <h4 className="font-bold text-brand-purple text-lg">{region}</h4>
                                      <p className="text-sm text-gray-600 font-medium bg-gray-100 px-2 py-1 rounded">{stateName}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                      <div className="bg-purple-50 p-2 rounded border border-purple-200">
                                        <span className="text-gray-600 text-xs">Projetos:</span>
                                        <strong className="block text-brand-purple text-lg">{regionInfo.projetos}</strong>
                                      </div>
                                      <div className="bg-pink-50 p-2 rounded border border-pink-200">
                                        <span className="text-gray-600 text-xs">Alunas:</span>
                                        <strong className="block text-brand-pink text-lg">{regionInfo.alunas}</strong>
                                      </div>
                                      <div className="bg-blue-50 p-2 rounded border border-blue-200">
                                        <span className="text-gray-600 text-xs">Professoras:</span>
                                        <strong className="block text-blue-600 text-lg">{regionInfo.professoras}</strong>
                                      </div>
                                      <div className="bg-green-50 p-2 rounded border border-green-200">
                                        <span className="text-gray-600 text-xs">Escolas:</span>
                                        <strong className="block text-green-600 text-lg">{regionInfo.escolas}</strong>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </TooltipContent>
                            </Tooltip>
                          );
                        })
                      }
                    </Geographies>

                    {/* Labels das regiões com círculos mais visíveis */}
                    {Object.entries(regionData).map(([regionName, data]) => (
                      <g key={regionName}>
                        <circle
                          cx={data.center[0]}
                          cy={data.center[1]}
                          r="35"
                          fill="rgba(255,255,255,0.95)"
                          stroke={data.color}
                          strokeWidth="4"
                          className="drop-shadow-lg cursor-pointer"
                          onClick={() => setSelectedRegion(regionName)}
                        />
                        <text
                          x={data.center[0]}
                          y={data.center[1] - 8}
                          textAnchor="middle"
                          fontSize={11}
                          fontWeight="bold"
                          fill={data.color}
                          className="pointer-events-none font-sans"
                        >
                          {regionName}
                        </text>
                        <text
                          x={data.center[0]}
                          y={data.center[1] + 6}
                          textAnchor="middle"
                          fontSize={9}
                          fontWeight="600"
                          fill="#374151"
                          className="pointer-events-none font-sans"
                        >
                          {data.projetos} proj.
                        </text>
                        <text
                          x={data.center[0]}
                          y={data.center[1] + 16}
                          textAnchor="middle"
                          fontSize={8}
                          fontWeight="500"
                          fill="#6b7280"
                          className="pointer-events-none font-sans"
                        >
                          {data.alunas} alunas
                        </text>
                      </g>
                    ))}
                  </ComposableMap>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Painel lateral */}
          <div className="space-y-4">
            <Card className="border-brand-purple/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-brand-purple flex items-center gap-2">
                  <div className="w-3 h-3 bg-brand-purple rounded-full"></div>
                  Regiões do Brasil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(regionData).map(([region, data]) => (
                    <div 
                      key={region} 
                      className={`p-3 rounded-lg cursor-pointer transition-all border-2 ${
                        selectedRegion === region 
                          ? 'ring-2 ring-brand-purple bg-purple-50 border-brand-purple shadow-md' 
                          : 'hover:bg-gray-50 border-gray-200 hover:border-brand-purple/40'
                      }`}
                      onClick={() => setSelectedRegion(region)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-5 h-5 rounded-full shadow-sm border-2 border-white" 
                          style={{ backgroundColor: data.color }}
                        ></div>
                        <span className="font-semibold text-brand-purple">{region}</span>
                        {selectedRegion === region && <Badge variant="secondary" className="text-xs">Selecionada</Badge>}
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Projetos:</span>
                          <span className="font-medium text-brand-purple">{data.projetos}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Alunas:</span>
                          <span className="font-medium text-brand-pink">{data.alunas}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Professoras:</span>
                          <span className="font-medium text-blue-600">{data.professoras}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Escolas:</span>
                          <span className="font-medium text-green-600">{data.escolas}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedRegion && regionData[selectedRegion as keyof typeof regionData] && (
              <Card className="border-brand-purple/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: regionData[selectedRegion as keyof typeof regionData].color }}
                    ></div>
                    <span className="text-brand-purple">{selectedRegion}</span>
                    <Badge 
                      variant="secondary" 
                      style={{ 
                        backgroundColor: regionData[selectedRegion as keyof typeof regionData].color,
                        color: 'white'
                      }}
                    >
                      Região
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-purple-50 rounded-lg border-2 border-purple-200">
                        <p className="text-2xl font-bold text-brand-purple">
                          {regionData[selectedRegion as keyof typeof regionData].projetos}
                        </p>
                        <p className="text-xs text-muted-foreground font-medium">Projetos Ativos</p>
                      </div>
                      <div className="text-center p-3 bg-pink-50 rounded-lg border-2 border-pink-200">
                        <p className="text-2xl font-bold text-brand-pink">
                          {regionData[selectedRegion as keyof typeof regionData].alunas}
                        </p>
                        <p className="text-xs text-muted-foreground font-medium">Alunas</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                        <p className="text-2xl font-bold text-blue-600">
                          {regionData[selectedRegion as keyof typeof regionData].professoras}
                        </p>
                        <p className="text-xs text-muted-foreground font-medium">Professoras</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg border-2 border-green-200">
                        <p className="text-2xl font-bold text-green-600">
                          {regionData[selectedRegion as keyof typeof regionData].escolas}
                        </p>
                        <p className="text-xs text-muted-foreground font-medium">Escolas</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2 text-brand-purple">Estados da Região ({regionData[selectedRegion as keyof typeof regionData].states.length})</h4>
                      <div className="flex flex-wrap gap-1">
                        {regionData[selectedRegion as keyof typeof regionData].states.map((state) => (
                          <Badge key={state} variant="outline" className="text-xs border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white transition-colors">
                            {state}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default BrazilInteractiveMap;
