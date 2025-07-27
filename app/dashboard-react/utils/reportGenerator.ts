import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

export interface ReportData {
  title: string;
  data: any[];
  metadata: {
    generatedAt: string;
    region?: string;
    period?: string;
  };
}

export const generatePDF = (reportData: ReportData): void => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text(reportData.title, 20, 30);
  
  // Metadata
  doc.setFontSize(12);
  doc.text(`Gerado em: ${reportData.metadata.generatedAt}`, 20, 50);
  
  if (reportData.metadata.region) {
    doc.text(`Região: ${reportData.metadata.region}`, 20, 60);
  }
  
  if (reportData.metadata.period) {
    doc.text(`Período: ${reportData.metadata.period}`, 20, 70);
  }
  
  // Data table
  let yPosition = 90;
  
  if (reportData.data.length > 0) {
    const headers = Object.keys(reportData.data[0]);
    
    // Headers
    doc.setFontSize(10);
    headers.forEach((header, index) => {
      doc.text(header, 20 + (index * 40), yPosition);
    });
    
    yPosition += 10;
    
    // Data rows
    reportData.data.forEach((row, rowIndex) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 30;
      }
      
      headers.forEach((header, colIndex) => {
        doc.text(String(row[header] || ''), 20 + (colIndex * 40), yPosition);
      });
      
      yPosition += 10;
    });
  }
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(`Página ${i} de ${pageCount} - Futuras Cientistas`, 20, 280);
  }
  
  doc.save(`${reportData.title.replace(/\s+/g, '_')}.pdf`);
};

export const generateExcel = (reportData: ReportData): void => {
  const workbook = XLSX.utils.book_new();
  
  // Create worksheet with data
  const worksheet = XLSX.utils.json_to_sheet(reportData.data);
  
  // Add metadata sheet
  const metadataSheet = XLSX.utils.json_to_sheet([
    { Campo: 'Título', Valor: reportData.title },
    { Campo: 'Gerado em', Valor: reportData.metadata.generatedAt },
    { Campo: 'Região', Valor: reportData.metadata.region || 'Todas' },
    { Campo: 'Período', Valor: reportData.metadata.period || 'Todos' },
  ]);
  
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados');
  XLSX.utils.book_append_sheet(workbook, metadataSheet, 'Metadados');
  
  XLSX.writeFile(workbook, `${reportData.title.replace(/\s+/g, '_')}.xlsx`);
};

export const getMockReportData = (reportType: string, region?: string): ReportData => {
  const mockData = {
    performance: [
      { Etapa: 'Inscritas', Quantidade: 8245, Percentual: '100%' },
      { Etapa: 'Selecionadas', Quantidade: 6850, Percentual: '83.1%' },
      { Etapa: 'Iniciaram', Quantidade: 6420, Percentual: '77.9%' },
      { Etapa: 'Concluíram', Quantidade: 5010, Percentual: '60.8%' },
    ],
    regional: [
      { Região: 'Sudeste', Projetos: 45, Alunas: 3245, Professoras: 289 },
      { Região: 'Nordeste', Projetos: 32, Alunas: 2156, Professoras: 198 },
      { Região: 'Sul', Projetos: 28, Alunas: 1687, Professoras: 156 },
      { Região: 'Centro-Oeste', Projetos: 18, Alunas: 789, Professoras: 89 },
      { Região: 'Norte', Projetos: 12, Alunas: 368, Professoras: 45 },
    ],
    demographics: [
      { Categoria: 'Ampla Concorrência', Quantidade: 4567, Percentual: '55.4%' },
      { Categoria: 'PPI e Quilombolas', Quantidade: 2890, Percentual: '35.0%' },
      { Categoria: 'PCD', Quantidade: 523, Percentual: '6.3%' },
      { Categoria: 'Trans e Travestis', Quantidade: 265, Percentual: '3.2%' },
    ],
    teachers: [
      { Experiência: '0-2 anos', Quantidade: 180, Percentual: '11.2%' },
      { Experiência: '3-5 anos', Quantidade: 320, Percentual: '19.9%' },
      { Experiência: '6-10 anos', Quantidade: 450, Percentual: '28.0%' },
      { Experiência: '11-15 anos', Quantidade: 380, Percentual: '23.6%' },
      { Experiência: '16+ anos', Quantidade: 290, Percentual: '18.0%' },
    ],
    schools: [
      { Tipo: 'Municipal', Quantidade: 245, Percentual: '71.6%' },
      { Tipo: 'Estadual', Quantidade: 67, Percentual: '19.6%' },
      { Tipo: 'Federal', Quantidade: 23, Percentual: '6.7%' },
      { Tipo: 'Particular', Quantidade: 7, Percentual: '2.0%' },
    ],
  };

  const typeMap: { [key: string]: string } = {
    performance: 'Relatório de Performance',
    regional: 'Relatório Regional',
    demographics: 'Relatório Demográfico',
    teachers: 'Relatório de Professoras',
    schools: 'Relatório de Escolas',
  };

  return {
    title: typeMap[reportType] || 'Relatório Geral',
    data: mockData[reportType as keyof typeof mockData] || [],
    metadata: {
      generatedAt: new Date().toLocaleString('pt-BR'),
      region: region || undefined,
      period: 'Janeiro - Dezembro 2024',
    },
  };
};
