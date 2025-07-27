// Importa o React para criação de componentes
import * as React from "react";
// Importa ícones de seta do Lucide para navegação no calendário
import { ChevronLeft, ChevronRight } from "lucide-react";
// Importa o componente DayPicker para exibir o calendário
import { DayPicker } from "react-day-picker";

// Importa função utilitária para juntar classes CSS dinamicamente
import { cn } from "../../lib/utils";
// Importa variantes de botão para estilizar botões de navegação do calendário
import { buttonVariants } from "../../components/ui/button";

// Define o tipo das propriedades aceitas pelo componente Calendar, baseado no DayPicker
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

// Componente Calendar: exibe um calendário customizado usando DayPicker
function Calendar({
  className,
  classNames,
  showOutsideDays = true, // Mostra dias do mês anterior/próximo por padrão
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)} // Aplica padding e classes extras
      classNames={{
        // Define classes customizadas para cada parte do calendário
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames, // Permite sobrescrever ou adicionar classes via props
      }}
      components={{
        // Substitui os ícones padrão de navegação por ícones customizados
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props} // Repassa todas as outras props para o DayPicker
    />
  );
}
Calendar.displayName = "Calendar"; // Define o nome do componente para debug

// Exporta o componente Calendar para uso externo
export { Calendar };