"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { CalendarIcon, Clock } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { Service } from "@/types/service"

interface SearchFiltersProps {
  serviceType: string
  location: string
  date: string
  time: string
  minPrice: string
  maxPrice: string
  rating: string
  discount: boolean
  onFilterChange: (params: Record<string, string | null>) => void
  services: Service[]
  isMobile?: boolean
}

export function SearchFilters({
  serviceType,
  location,
  date,
  time,
  minPrice,
  maxPrice,
  rating,
  discount,
  onFilterChange,
  services,
  isMobile = false,
}: SearchFiltersProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date ? new Date(date) : undefined)
  const [priceRange, setPriceRange] = useState<number[]>([
    minPrice ? Number.parseInt(minPrice) : 500,
    maxPrice ? Number.parseInt(maxPrice) : 5000,
  ])

  // Доступные временные слоты
  const timeSlots = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"]

  // Обработчик изменения диапазона цен
  const handlePriceChange = (values: number[]) => {
    setPriceRange(values)
  }

  // Обработчик применения диапазона цен
  const handlePriceApply = () => {
    onFilterChange({
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
    })
  }

  // Обработчик сброса всех фильтров
  const handleResetFilters = () => {
    onFilterChange({
      service: null,
      location: null,
      date: null,
      time: null,
      minPrice: null,
      maxPrice: null,
      rating: null,
      discount: null,
    })
    setSelectedDate(undefined)
    setPriceRange([500, 5000])
  }

  return (
    <div className="space-y-6">
      {/* Тип услуги */}
      <div className="space-y-2">
        <Label htmlFor="service-type">Тип услуги</Label>
        <Select
          value={serviceType || "all"}
          onValueChange={(value) => onFilterChange({ service: value === "all" ? null : value })}
        >
          <SelectTrigger id="service-type" className={isMobile ? "h-12" : ""}>
            <SelectValue placeholder="Все услуги" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все услуги</SelectItem>
            {services.map((service) => (
              <SelectItem key={service.type} value={service.type}>
                {service.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Местоположение */}
      <div className="space-y-2">
        <Label htmlFor="location">Местоположение</Label>
        <Input
          id="location"
          placeholder="Район, метро или адрес"
          value={location}
          onChange={(e) => onFilterChange({ location: e.target.value || null })}
          className={isMobile ? "h-12" : ""}
        />
      </div>

      {/* Дата */}
      <div className="space-y-2">
        <Label>Дата</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground",
                isMobile && "h-12",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "d MMMM yyyy", { locale: ru }) : <span>Выберите дату</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date)
                onFilterChange({
                  date: date ? format(date, "yyyy-MM-dd") : null,
                })
              }}
              disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 1))}
              locale={ru}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Время */}
      <div className="space-y-2">
        <Label htmlFor="time">Время</Label>
        <Select
          value={time || "any"}
          onValueChange={(value) => onFilterChange({ time: value === "any" ? null : value })}
        >
          <SelectTrigger id="time" className={isMobile ? "h-12" : ""}>
            <SelectValue placeholder="Любое время" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Любое время</SelectItem>
            {timeSlots.map((slot) => (
              <SelectItem key={slot} value={slot}>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{slot}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Диапазон цен */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <Label>Цена (₽)</Label>
          <span className="text-sm text-muted-foreground">
            {priceRange[0]} ₽ - {priceRange[1]} ₽
          </span>
        </div>
        <Slider
          defaultValue={priceRange}
          min={500}
          max={5000}
          step={100}
          value={priceRange}
          onValueChange={handlePriceChange}
          onValueCommit={handlePriceApply}
          className="py-4"
        />
      </div>

      {/* Рейтинг */}
      <div className="space-y-2">
        <Label htmlFor="rating">Минимальный рейтинг</Label>
        <Select
          value={rating || "any"}
          onValueChange={(value) => onFilterChange({ rating: value === "any" ? null : value })}
        >
          <SelectTrigger id="rating" className={isMobile ? "h-12" : ""}>
            <SelectValue placeholder="Любой рейтинг" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Любой рейтинг</SelectItem>
            <SelectItem value="3">От 3 и выше</SelectItem>
            <SelectItem value="4">От 4 и выше</SelectItem>
            <SelectItem value="4.5">От 4.5 и выше</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Только со скидкой */}
      <div className="flex items-center justify-between">
        <Label htmlFor="discount" className="cursor-pointer">
          Только со скидкой
        </Label>
        <Switch
          id="discount"
          checked={discount}
          onCheckedChange={(checked) => onFilterChange({ discount: checked ? "true" : null })}
        />
      </div>

      {/* Кнопка сброса фильтров - только для десктопа */}
      {!isMobile && (
        <Button variant="outline" className="w-full mt-4" onClick={handleResetFilters}>
          Сбросить фильтры
        </Button>
      )}
    </div>
  )
}
