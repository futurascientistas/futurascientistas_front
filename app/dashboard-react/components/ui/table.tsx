import * as React from "react" // Importa o React para uso de componentes e hooks
import { cn } from "../../lib/utils" // Importa função utilitária para combinar classes CSS condicionalmente

// Componente Table: envolve a tabela em um contêiner com rolagem horizontal
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)} // Tabela com legenda abaixo e texto pequeno
      {...props}
    />
  </div>
))
Table.displayName = "Table"

// Componente TableHeader: representa o <thead>
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

// Componente TableBody: representa o <tbody>
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)} // Remove a borda da última linha
    {...props}
  />
))
TableBody.displayName = "TableBody"

// Componente TableFooter: representa o <tfoot>
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", // Rodapé com fundo levemente diferente
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

// Componente TableRow: representa uma linha (<tr>)
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", // Hover e seleção visual
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

// Componente TableHead: representa um cabeçalho de coluna (<th>)
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", // Alinhamento e estilo do cabeçalho
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

// Componente TableCell: representa uma célula comum (<td>)
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} // Padding e alinhamento
    {...props}
  />
))
TableCell.displayName = "TableCell"

// Componente TableCaption: representa a legenda da tabela (<caption>)
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)} // Estilo discreto para a legenda
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

// Exporta todos os componentes para uso externo
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
