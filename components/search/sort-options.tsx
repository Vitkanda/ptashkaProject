"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SortOptionsProps {
  sortBy: string
  onSortChange: (value: string) => void
  isMobile?: boolean
}

export function SortOptions({ sortBy, onSortChange, isMobile = false }: SortOptionsProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground whitespace-nowrap">Сортировать по:</span>
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className={`w-[180px] ${isMobile ? "h-10" : ""}`}>
          <SelectValue placeholder="Релевантности" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relevance">Релевантности</SelectItem>
          <SelectItem value="rating">Рейтингу</SelectItem>
          <SelectItem value="price_asc">Цене (по возрастанию)</SelectItem>
          <SelectItem value="price_desc">Цене (по убыванию)</SelectItem>
          <SelectItem value="discount">Размеру скидки</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
