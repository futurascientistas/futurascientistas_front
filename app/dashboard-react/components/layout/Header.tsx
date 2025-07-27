'use client'
import React from 'react'
import { Bell, Search, User, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

const Header = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="h-16 border-b border-border bg-background px-6 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <img 
            src="/futuras-cientistas-simbolo.png"
            alt="Logo Futura Cientistas" 
            className="h-8 w-8 object-contain"
          />
          <h1 className="text-xl font-bold text-brand-purple">Futuras Cientistas</h1>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar..."
            className="pl-10 pr-4 py-2 w-80 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-purple"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="h-9 w-9 border-brand-purple hover:bg-brand-purple/10"
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4 text-brand-purple" />
          ) : (
            <Moon className="h-4 w-4 text-brand-purple" />
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 border-brand-purple hover:bg-brand-purple/10"
        >
          <Bell className="h-4 w-4 text-brand-purple" />
        </Button>

        <div className="flex items-center space-x-2 text-brand-purple font-medium">
          <User className="h-4 w-4" />
          <span>GEOVANNA MACHADO</span>
        </div>
      </div>
    </header>
  )
}

export default Header