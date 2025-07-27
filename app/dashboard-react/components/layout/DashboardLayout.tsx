'use client'
import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { usePathname } from 'next/navigation'

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const pathname = usePathname()

  // Verifica se está em uma rota do dashboard
  const isDashboardRoute = pathname?.startsWith('/dashboard-react')

  return (
    <div className="flex h-screen bg-background">
      {isDashboardRoute && (
        <div className="hidden lg:block">
          <Sidebar />
        </div>
      )}
      <div className={`flex-1 flex flex-col ${isDashboardRoute ? 'lg:ml-64' : ''}`}>
        {isDashboardRoute && <Header />}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout