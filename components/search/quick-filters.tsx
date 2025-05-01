"use client"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Service } from "@/types/service"

interface QuickFiltersProps {
  services: Service[]
  activeServiceType: string | null
  onServiceTypeChange: (type: string | null) => void
  discount: boolean
  onDiscountChange: (value: boolean) => void
  rating: string | null
  onRatingChange: (rating: string | null) => void
  hasActiveFilters: boolean
  onResetFilters: () => void
}

export function QuickFilters({
  services,
  activeServiceType,
  onServiceTypeChange,
  discount,
  onDiscountChange,
  rating,
  onRatingChange,
  hasActiveFilters,
  onResetFilters,
}: QuickFiltersProps) {
  return (
    <div className="relative">
      <ScrollArea className="w-full whitespace-nowrap pb-2">
        <div className="flex gap-2 py-1">
          {/* Кнопка сброса фильтров */}
          {hasActiveFilters && (
            <Badge
              variant="outline"
              className="cursor-pointer flex items-center gap-1 border-red-200 hover:border-red-300 dark:border-red-800 dark:hover:border-red-700"
              onClick={onResetFilters}
            >
              Сбросить все
              <X className="h-3 w-3" />
            </Badge>
          )}

          {/* Фильтр по скидке */}
          <Badge
            variant={discount ? "default" : "outline"}
            className={cn("cursor-pointer", discount ? "bg-red-500 hover:bg-red-600" : "hover:bg-muted")}
            onClick={() => onDiscountChange(!discount)}
          >
            Со скидкой
          </Badge>

          {/* Фильтры по рейтингу */}
          <Badge
            variant={rating === "4" ? "default" : "outline"}
            className={cn("cursor-pointer", rating === "4" ? "bg-yellow-500 hover:bg-yellow-600" : "hover:bg-muted")}
            onClick={() => onRatingChange(rating === "4" ? null : "4")}
          >
            Рейтинг 4+
          </Badge>

          <Badge
            variant={rating === "4.5" ? "default" : "outline"}
            className={cn("cursor-pointer", rating === "4.5" ? "bg-yellow-500 hover:bg-yellow-600" : "hover:bg-muted")}
            onClick={() => onRatingChange(rating === "4.5" ? null : "4.5")}
          >
            Рейтинг 4.5+
          </Badge>

          {/* Разделитель */}
          <div className="h-6 border-l mx-1"></div>

          {/* Фильтры по типам услуг */}
          <Badge
            variant={activeServiceType === null ? "default" : "outline"}
            className={cn(
              "cursor-pointer",
              activeServiceType === null ? "bg-teal-600 hover:bg-teal-700" : "hover:bg-muted",
            )}
            onClick={() => onServiceTypeChange(null)}
          >
            Все услуги
          </Badge>

          {services.map((service) => (
            <Badge
              key={service.type}
              variant={activeServiceType === service.type ? "default" : "outline"}
              className={cn(
                "cursor-pointer",
                activeServiceType === service.type ? "bg-teal-600 hover:bg-teal-700" : "hover:bg-muted",
              )}
              onClick={() => onServiceTypeChange(service.type)}
            >
              {service.name}
            </Badge>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="h-1.5" />
      </ScrollArea>
    </div>
  )
}
