import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Star, MapPin } from "lucide-react"
import type { Salon } from "@/types/salon"

interface SalonCardProps {
  salon: Salon
}

export function SalonCard({ salon }: SalonCardProps) {
  // Находим минимальную цену услуги со скидкой
  const minPrice = Math.min(...salon.services.map((service) => service.discountPrice))

  // Находим максимальную скидку среди услуг
  const maxDiscount = Math.max(
    ...salon.services.map((service) => {
      const discountPercent = ((service.price - service.discountPrice) / service.price) * 100
      return Math.round(discountPercent)
    }),
  )

  return (
    <div className="group rounded-xl border overflow-hidden transition-all hover:shadow-md bg-card">
      <div className="aspect-video relative">
        <Image
          src={salon.image || `/placeholder.svg?height=200&width=400&text=Салон ${salon.id}`}
          alt={salon.name}
          fill
          className="object-cover"
        />
        {salon.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
            до -{maxDiscount}%
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1">{salon.name}</h3>
        <div className="flex items-center gap-1 mt-1 text-muted-foreground text-sm">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="line-clamp-1">{salon.address}</span>
        </div>

        {/* Мобильная версия: рейтинг и цена в одной строке */}
        <div className="flex items-center justify-between mt-3 sm:hidden">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm">{salon.rating.toFixed(1)}</span>
            <span className="mx-1 text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{salon.reviewCount} отзывов</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">от </span>
            <span className="font-semibold text-base">{minPrice} ₽</span>
          </div>
        </div>

        {/* Десктопная версия: рейтинг и цена в разных строках */}
        <div className="hidden sm:flex items-center mt-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm">{salon.rating.toFixed(1)}</span>
          </div>
          <span className="mx-2 text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">{salon.reviewCount} отзывов</span>
        </div>

        <div className="hidden sm:flex items-center justify-between mt-3">
          <div className="text-sm">
            <span className="text-muted-foreground">от </span>
            <span className="font-semibold text-base">{minPrice} ₽</span>
          </div>
          <Link href={`/salon/${salon.id}`}>
            <Button
              size="sm"
              className="text-teal-600 border-teal-600 hover:bg-teal-50 dark:text-teal-400 dark:border-teal-400 dark:hover:bg-teal-950"
              variant="outline"
            >
              Подробнее
            </Button>
          </Link>
        </div>

        {/* Кнопка "Подробнее" для мобильных устройств */}
        <div className="mt-3 sm:hidden">
          <Link href={`/salon/${salon.id}`} className="w-full block">
            <Button
              size="sm"
              className="w-full text-teal-600 border-teal-600 hover:bg-teal-50 dark:text-teal-400 dark:border-teal-400 dark:hover:bg-teal-950"
              variant="outline"
            >
              Подробнее
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
