import { Users, GraduationCap, BookOpen, TrendingUp, Home, BarChart3, FileText, Settings, HelpCircle, User } from 'lucide-react';

export interface KpiData {
  title: string;
  value: string;
  change: string;
  icon: any;
  color: string;
  trend: 'up' | 'down';
  key: string;
}

export interface SchoolCategoriesData {
  name: string;
  value: number;
  color: string;
  fill?: string;
}

export interface ScientificAreaChartData {
  area: string;
  students: number;
  color: string;
}

export interface TeachersByFormationData {
  formation: string;
  count: number;
  color: string;
  fill?: string;
}

export interface TeachersByRegionData {
  state: string;
  teachers: number;
  color: string;
}

export interface TeachersBySchoolTypeData {
  type: string;
  teachers: number;
  color: string;
  fill?: string;
}

export interface TopCitiesData {
  city: string;
  state: string;
  value: number;
  students: number;
  projects: number;
}

export interface ProjectsByRegionData {
  region: string;
  projects: number;
  color: string;
}

export interface QuotaDistributionData {
  category: string;
  value: number;
  color: string;
}

export interface StudentFunnelData {
  stage: string;
  value: number;
  color: string;
}

export interface StudentsByAgeData {
  age: string;
  students: number;
  color: string;
}

// Navigation Links
export const navLinks = [
  { label: 'Dashboard', href: '/', icon: Home },
  { label: 'Alunas', href: '/alunas', icon: Users },
  { label: 'Professoras', href: '/professoras', icon: GraduationCap },
  { label: 'Projetos', href: '/projetos', icon: BookOpen },
  { label: 'Gráficos', href: '/graficos', icon: BarChart3 },
  { label: 'Relatórios', href: '/relatorios', icon: FileText },
];

export const bottomNavLinks = [
  { label: 'Configurações', href: '/configuracao', icon: Settings },
  { label: 'Ajuda', href: '/ajuda', icon: HelpCircle },
  { label: 'Perfil', href: '/perfil', icon: User },
];

export const schoolCategoriesData: SchoolCategoriesData[] = [
  { name: 'Pública', value: 65, color: '#795DC0', fill: '#795DC0' },
  { name: 'Privada', value: 25, color: '#E36BAC', fill: '#E36BAC' },
  { name: 'Técnica', value: 10, color: '#4DC1B1', fill: '#4DC1B1' }
];

export const scientificAreaChartData: ScientificAreaChartData[] = [
  { area: 'Matemática', students: 150, color: '#795DC0' },
  { area: 'Física', students: 120, color: '#E36BAC' },
  { area: 'Química', students: 100, color: '#4DC1B1' },
  { area: 'Biologia', students: 130, color: '#62A9D2' },
  { area: 'Tecnologia', students: 80, color: '#F4F4FC' }
];

export const teachersByFormationData: TeachersByFormationData[] = [
  { formation: 'Mestrado', count: 45, color: '#795DC0', fill: '#795DC0' },
  { formation: 'Doutorado', count: 30, color: '#E36BAC', fill: '#E36BAC' },
  { formation: 'Especialização', count: 25, color: '#4DC1B1', fill: '#4DC1B1' }
];

export const teachersByRegionData: TeachersByRegionData[] = [
  { state: 'SP', teachers: 45, color: '#795DC0' },
  { state: 'RJ', teachers: 30, color: '#E36BAC' },
  { state: 'MG', teachers: 25, color: '#4DC1B1' },
  { state: 'RS', teachers: 20, color: '#62A9D2' },
  { state: 'PR', teachers: 15, color: '#F4F4FC' }
];

export const teachersBySchoolTypeData: TeachersBySchoolTypeData[] = [
  { type: 'Pública', teachers: 80, color: '#795DC0', fill: '#795DC0' },
  { type: 'Privada', teachers: 35, color: '#E36BAC', fill: '#E36BAC' }
];

export const projectsByRegionData: ProjectsByRegionData[] = [
  { region: 'Sudeste', projects: 45, color: '#795DC0' },
  { region: 'Sul', projects: 30, color: '#E36BAC' },
  { region: 'Nordeste', projects: 25, color: '#4DC1B1' },
  { region: 'Norte', projects: 15, color: '#62A9D2' },
  { region: 'Centro-Oeste', projects: 10, color: '#F4F4FC' }
];

export const quotaDistributionData: QuotaDistributionData[] = [
  { category: 'Escola Pública', value: 60, color: '#795DC0' },
  { category: 'Baixa Renda', value: 25, color: '#E36BAC' },
  { category: 'PcD', value: 10, color: '#4DC1B1' },
  { category: 'Outros', value: 5, color: '#62A9D2' }
];

export const studentFunnelData: StudentFunnelData[] = [
  { stage: 'Inscritas', value: 1000, color: '#795DC0' },
  { stage: 'Pré-selecionadas', value: 500, color: '#E36BAC' },
  { stage: 'Entrevistas', value: 200, color: '#4DC1B1' },
  { stage: 'Aprovadas', value: 100, color: '#62A9D2' }
];

export const studentsByAgeData: StudentsByAgeData[] = [
  { age: '14-15', students: 120, color: '#795DC0' },
  { age: '16-17', students: 350, color: '#E36BAC' },
  { age: '18-19', students: 280, color: '#4DC1B1' },
  { age: '20+', students: 150, color: '#62A9D2' }
];

// Update KPI data to include missing 'change' property
export const kpiData: KpiData[] = [
  {
    title: 'Total de Alunas', 
    value: '1,234', 
    change: '+12%',
    icon: Users, 
    color: 'text-brand-purple', 
    trend: 'up',
    key: 'students'
  },
  {
    title: 'Professoras Ativas', 
    value: '156', 
    change: '+8%',
    icon: GraduationCap, 
    color: 'text-brand-pink', 
    trend: 'up',
    key: 'teachers'
  },
  {
    title: 'Projetos em Andamento', 
    value: '89', 
    change: '+15%',
    icon: BookOpen, 
    color: 'text-brand-green', 
    trend: 'up',
    key: 'projects'
  },
  {
    title: 'Taxa de Conclusão', 
    value: '94%', 
    change: '+3%',
    icon: TrendingUp, 
    color: 'text-brand-blue', 
    trend: 'up',
    key: 'completion'
  }
];

// Fix topCitiesData to match the expected interface
export const topCitiesData: TopCitiesData[] = [
  { city: 'São Paulo', state: 'SP', value: 234, students: 234, projects: 45 },
  { city: 'Rio de Janeiro', state: 'RJ', value: 189, students: 189, projects: 38 },
  { city: 'Belo Horizonte', state: 'MG', value: 156, students: 156, projects: 32 },
  { city: 'Porto Alegre', state: 'RS', value: 134, students: 134, projects: 28 },
  { city: 'Curitiba', state: 'PR', value: 112, students: 112, projects: 24 }
];
