"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SearchFilters } from "@/components/search/search-filters"
import { X } from "lucide-react"
import type { Service } from "@/types/service"

interface MobileFiltersDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  serviceType: string
  location: string
  date: string
  time: string
  minPrice: string
  maxPrice: string
  rating: string
  discount: boolean
  onFilterChange: (params: Record<string, string | null>) => void
  onFilterReset: () => void
  services: Service[]
  activeFiltersCount: number
}

export function MobileFiltersDrawer({
  open,
  onOpenChange,
  serviceType,
  location,
  date,
  time,
  minPrice,
  maxPrice,
  rating,
  discount,
  onFilterChange,
  onFilterReset,
  services,
  activeFiltersCount,
}: MobileFiltersDrawerProps) {
  const [localFilters, setLocalFilters] = useState<Record<string, string | null>>({})

  // Обработчик локального изменения фильтров
  const handleLocalFilterChange = (params: Record<string, string | null>) => {
    setLocalFilters((prev) => ({ ...prev, ...params }))
  }

  // Обработчик применения всех фильтров
  const handleApplyFilters = () => {
    onFilterChange(localFilters)
    onOpenChange(false)
  }

  // Сброс локальных фильтров при открытии drawer
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setLocalFilters({})
    }
    onOpenChange(open)
  }

  // Сброс всех фильтров
  const handleResetFilters = () => {
    onFilterReset()
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="left" className="w-[90%] sm:w-[400px] p-0 flex flex-col">
        <SheetHeader className="px-4 py-3 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg">Фильтры</SheetTitle>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
              <span className="sr-only">Закрыть</span>
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <SearchFilters
            serviceType={serviceType}
            location={location}
            date={date}
            time={time}
            minPrice={minPrice}
            maxPrice={maxPrice}
            rating={rating}
            discount={discount}
            onFilterChange={handleLocalFilterChange}
            services={services}
            isMobile={true}
          />
        </div>

        <SheetFooter className="px-4 py-3 border-t flex flex-row gap-2 mt-auto">
          <Button variant="outline" className="flex-1" onClick={handleResetFilters}>
            Сбросить
          </Button>
          <Button
            className="flex-1 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
            onClick={handleApplyFilters}
          >
            Применить
            {activeFiltersCount > 0 && (
              <Badge variant="outline" className="ml-2 bg-white text-teal-600 border-white">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
