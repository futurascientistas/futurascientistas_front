'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  BarChart3,
  Users,
  GraduationCap,
  School,
  UserCheck,
  MapPin,
  Calendar,
  FileText,
  Settings,
  LogOut
} from 'lucide-react'

const Sidebar = () => {
  const pathname = usePathname()

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard-react' },
    { icon: BarChart3, label: 'Gráficos', path: '/dashboard-react/graficos' },
    { icon: Users, label: 'Alunas', path: '/dashboard-react/alunas' },
    { icon: GraduationCap, label: 'Professoras', path: '/dashboard-react/professoras' },
    { icon: School, label: 'Escolas', path: '/dashboard-react/escolas' },
    { icon: UserCheck, label: 'Inscritas', path: '/dashboard-react/inscritas' },
    { icon: MapPin, label: 'Localização', path: '/dashboard-react/localizacao' },
    { icon: Calendar, label: 'Calendário', path: '/dashboard-react/calendario' },
    { icon: FileText, label: 'Relatórios', path: '/dashboard-react/relatorios' },
    { icon: Settings, label: 'Configurações', path: '/dashboard-react/configuracao' },
  ]

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#d946ef] border-r-4 border-[#8b5cf6] z-40">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-white/20">
          <div className="flex justify-center">
            <h1 className="text-lg font-bold text-white">Futuras Cientistas</h1>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors relative ${
                    pathname === item.path
                      ? 'bg-white/20 text-white border-l-4 border-[#8b5cf6]'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/20">
          <button className="flex items-center px-4 py-3 rounded-lg text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors w-full">
            <LogOut className="mr-3 h-5 w-5" />
            Sair
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar