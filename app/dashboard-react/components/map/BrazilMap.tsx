import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// GeoJSON simplificado do Brasil
const geoUrl = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

// Dados mockados de participantes por região
const participantsByState = {
  'São Paulo': { participants: 1250, lat: -23.5505, lng: -46.6333 },
  'Rio de Janeiro': { participants: 890, lat: -22.9068, lng: -43.1729 },
  'Minas Gerais': { participants: 720, lat: -19.9191, lng: -43.9386 },
  'Bahia': { participants: 650, lat: -12.9714, lng: -38.5014 },
  'Paraná': { participants: 580, lat: -25.4284, lng: -49.2733 },
  'Rio Grande do Sul': { participants: 540, lat: -30.0346, lng: -51.2177 },
  'Pernambuco': { participants: 420, lat: -8.0476, lng: -34.8770 },
  'Ceará': { participants: 380, lat: -3.7172, lng: -38.5433 },
  'Pará': { participants: 340, lat: -1.4558, lng: -48.4902 },
  'Santa Catarina': { participants: 320, lat: -27.2423, lng: -50.2189 },
};

const regionColors = {
  Norte: '#9333ea',
  Nordeste: '#c084fc', 
  CentroOeste: '#e879f9',
  Sudeste: '#f0abfc',
  Sul: '#fae8ff'
};

const BrazilMap = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mapa */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Participantes por Estado</CardTitle>
            </CardHeader>
            <CardContent>
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  center: [-55, -15],
                  scale: 800,
                }}
                width={800}
                height={600}
                className="w-full h-auto"
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies
                      .filter((geo) => geo.properties.NAME === "Brazil")
                      .map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="#f8fafc"
                          stroke="#e2e8f0"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: "none" },
                            hover: { outline: "none", fill: "#f1f5f9" },
                            pressed: { outline: "none" },
                          }}
                        />
                      ))
                  }
                </Geographies>

                {/* Marcadores das cidades */}
                {Object.entries(participantsByState).map(([state, data]) => (
                  <Marker
                    key={state}
                    coordinates={[data.lng, data.lat]}
                    onClick={() => setSelectedState(state)}
                  >
                    <circle
                      r={Math.sqrt(data.participants) / 10}
                      fill="#9333ea"
                      fillOpacity={0.7}
                      stroke="#7c3aed"
                      strokeWidth={2}
                      className="cursor-pointer hover:fill-opacity-90 transition-all"
                    />
                    <text
                      textAnchor="middle"
                      dy={-15}
                      fontSize={10}
                      fill="#374151"
                      className="font-medium"
                    >
                      {data.participants}
                    </text>
                  </Marker>
                ))}
              </ComposableMap>
            </CardContent>
          </Card>
        </div>

        {/* Painel lateral com informações */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ranking por Estado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(participantsByState)
                  .sort(([,a], [,b]) => b.participants - a.participants)
                  .slice(0, 5)
                  .map(([state, data], index) => (
                    <div
                      key={state}
                      className={`flex justify-between items-center p-2 rounded-lg cursor-pointer transition-colors ${
                        selectedState === state ? 'bg-purple-100' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedState(state)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-purple-600">
                          #{index + 1}
                        </span>
                        <span className="text-sm font-medium">{state}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {data.participants}
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {selectedState && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedState}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Participantes:</span>
                    <span className="font-medium">
                      {participantsByState[selectedState]?.participants}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">% do Total:</span>
                    <span className="font-medium">
                      {(
                        (participantsByState[selectedState]?.participants / 
                         Object.values(participantsByState).reduce((sum, s) => sum + s.participants, 0)) * 100
                      ).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Legenda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
                  <span className="text-sm">Participantes por estado</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  O tamanho dos círculos representa o número de participantes
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BrazilMap;
