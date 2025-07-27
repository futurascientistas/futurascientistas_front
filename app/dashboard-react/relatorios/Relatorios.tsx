import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Badge } from '../components/ui/badge';
import { Label } from '../components/ui/label';
import { FileText, Download, Calendar as CalendarIcon, TrendingUp, FileSpreadsheet } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'sonner';
import { generatePDF, generateExcel, getMockReportData } from '../utils/reportGenerator';

const Relatorios = () => {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [reportType, setReportType] = useState('');
  const [region, setRegion] = useState('');

  const reportTypes = [
    { value: 'performance', label: 'Relatório de Performance' },
    { value: 'regional', label: 'Relatório Regional' },
    { value: 'demographics', label: 'Relatório Demográfico' },
    { value: 'teachers', label: 'Relatório de Professoras' },
    { value: 'schools', label: 'Relatório de Escolas' },
  ];

  const regions = [
    { value: 'nordeste', label: 'Nordeste' },
    { value: 'sudeste', label: 'Sudeste' },
    { value: 'sul', label: 'Sul' },
    { value: 'norte', label: 'Norte' },
    { value: 'centro-oeste', label: 'Centro-Oeste' },
  ];

  const recentReports = [
    {
      id: 1,
      name: 'Relatório Mensal - Dezembro 2024',
      type: 'performance',
      date: '2024-12-15',
      status: 'Concluído',
      downloads: 45
    },
    {
      id: 2,
      name: 'Análise Regional - Q4 2024',
      type: 'regional',
      date: '2024-12-10',
      status: 'Concluído',
      downloads: 32
    },
    {
      id: 3,
      name: 'Perfil Demográfico - 2024',
      type: 'demographics',
      date: '2024-12-01',
      status: 'Processando',
      downloads: 0
    }
  ];

  const handleGenerateReport = (format: 'pdf' | 'excel') => {
    if (!reportType) {
      toast.error('Selecione o tipo de relatório');
      return;
    }
    
    const reportData = getMockReportData(reportType, region);
    
    try {
      if (format === 'pdf') {
        generatePDF(reportData);
        toast.success('Relatório PDF gerado com sucesso!');
      } else {
        generateExcel(reportData);
        toast.success('Relatório Excel gerado com sucesso!');
      }
    } catch (error) {
      toast.error('Erro ao gerar relatório. Tente novamente.');
    }
  };

  const handleDownloadReport = (reportId: number, format: 'pdf' | 'excel') => {
    const report = recentReports.find(r => r.id === reportId);
    if (report) {
      const reportData = getMockReportData(report.type, region);
      try {
        if (format === 'pdf') {
          generatePDF(reportData);
        } else {
          generateExcel(reportData);
        }
        toast.success(`Download do relatório ${format.toUpperCase()} iniciado`);
      } catch (error) {
        toast.error('Erro no download. Tente novamente.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-purple">Relatórios</h1>
        <p className="mt-2 text-muted-foreground">
          Gere e gerencie relatórios detalhados do programa Futuras Cientistas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gerador de Relatórios */}
        <div className="lg:col-span-2">
          <Card className="border-brand-purple/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-brand-purple">
                <FileText className="h-5 w-5" />
                Gerar Novo Relatório
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reportType" className="text-brand-purple">Tipo de Relatório</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger className="border-brand-purple/30">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="region" className="text-brand-purple">Região (Opcional)</Label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger className="border-brand-purple/30">
                      <SelectValue placeholder="Todas as regiões" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((reg) => (
                        <SelectItem key={reg.value} value={reg.value}>
                          {reg.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-brand-purple">Data Inicial</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal border-brand-purple/30"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateFrom ? format(dateFrom, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateFrom}
                        onSelect={setDateFrom}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label className="text-brand-purple">Data Final</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal border-brand-purple/30"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateTo ? format(dateTo, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateTo}
                        onSelect={setDateTo}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => handleGenerateReport('pdf')}
                  className="flex-1 bg-brand-purple hover:bg-brand-purple/90"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Gerar PDF
                </Button>
                <Button 
                  onClick={() => handleGenerateReport('excel')}
                  variant="outline"
                  className="flex-1 border-brand-purple text-brand-purple hover:bg-brand-purple/10"
                >
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Gerar Excel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Estatísticas Rápidas */}
        <div>
          <Card className="border-brand-purple/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-brand-purple">
                <TrendingUp className="h-5 w-5" />
                Estatísticas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-purple">247</div>
                <div className="text-sm text-muted-foreground">Relatórios Gerados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-pink">1,245</div>
                <div className="text-sm text-muted-foreground">Downloads Este Mês</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-green">8.5GB</div>
                <div className="text-sm text-muted-foreground">Dados Processados</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Relatórios Recentes */}
      <Card className="border-brand-purple/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-brand-purple">
            <FileText className="h-5 w-5" />
            Relatórios Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 border border-brand-purple/20 rounded-lg hover:bg-brand-purple/5 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <FileText className="h-8 w-8 text-brand-purple" />
                  <div>
                    <h3 className="font-medium text-brand-purple">{report.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(report.date), "dd/MM/yyyy", { locale: ptBR })} • {report.downloads} downloads
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={report.status === 'Concluído' ? 'default' : 'secondary'}
                    className={report.status === 'Concluído' ? 'bg-brand-green text-white' : 'bg-brand-pink text-white'}
                  >
                    {report.status}
                  </Badge>
                  {report.status === 'Concluído' && (
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownloadReport(report.id, 'pdf')}
                        className="border-brand-purple text-brand-purple hover:bg-brand-purple/10"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownloadReport(report.id, 'excel')}
                        className="border-brand-purple text-brand-purple hover:bg-brand-purple/10"
                      >
                        <FileSpreadsheet className="h-4 w-4 mr-1" />
                        Excel
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Relatorios;

