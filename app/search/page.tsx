"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchFilters } from "@/components/search/search-filters"
import { SearchResults } from "@/components/search/search-results"
import { SortOptions } from "@/components/search/sort-options"
import { MobileFiltersDrawer } from "@/components/search/mobile-filters-drawer"
import { QuickFilters } from "@/components/search/quick-filters"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SlidersHorizontal, MapPin, SearchIcon, FilterX } from "lucide-react"
import { mockSalons } from "@/data/mock-salons"
import { mockServices } from "@/data/mock-services"
import type { Salon } from "@/types/salon"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [results, setResults] = useState<Salon[]>([])
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const resultsPerPage = 9

  // Получаем параметры поиска из URL
  const query = searchParams.get("query") || ""
  const serviceType = searchParams.get("service") || ""
  const location = searchParams.get("location") || ""
  const date = searchParams.get("date") || ""
  const time = searchParams.get("time") || ""
  const sortBy = searchParams.get("sort") || "relevance"
  const minPriceParam = searchParams.get("minPrice") || ""
  const maxPriceParam = searchParams.get("maxPrice") || ""
  const rating = searchParams.get("rating") || ""
  const discount = searchParams.get("discount") === "true"

  // Подсчет количества активных фильтров
  const getActiveFiltersCount = () => {
    let count = 0
    if (serviceType) count++
    if (location) count++
    if (date) count++
    if (time) count++
    if (minPriceParam || maxPriceParam) count++
    if (rating) count++
    if (discount) count++
    return count
  }

  const activeFiltersCount = getActiveFiltersCount()

  // Функция для фильтрации салонов
  const filterSalons = () => {
    setIsLoading(true)

    // Имитация задержки загрузки данных
    setTimeout(() => {
      let filteredSalons = [...mockSalons]

      // Фильтрация по поисковому запросу
      if (query) {
        filteredSalons = filteredSalons.filter(
          (salon) =>
            salon.name.toLowerCase().includes(query.toLowerCase()) ||
            salon.description.toLowerCase().includes(query.toLowerCase()),
        )
      }

      // Фильтрация по типу услуги
      if (serviceType) {
        filteredSalons = filteredSalons.filter((salon) =>
          salon.services.some((service) => service.type.toLowerCase() === serviceType.toLowerCase()),
        )
      }

      // Фильтрация по местоположению
      if (location) {
        filteredSalons = filteredSalons.filter((salon) => salon.address.toLowerCase().includes(location.toLowerCase()))
      }

      // Фильтрация по цене
      if (minPriceParam) {
        filteredSalons = filteredSalons.filter((salon) => {
          const minServicePrice = Math.min(...salon.services.map((service) => service.discountPrice))
          return minServicePrice >= Number(minPriceParam)
        })
      }

      if (maxPriceParam) {
        filteredSalons = filteredSalons.filter((salon) => {
          const maxServicePrice = Math.max(...salon.services.map((service) => service.discountPrice))
          return maxServicePrice <= Number(maxPriceParam)
        })
      }

      // Фильтрация по рейтингу
      if (rating) {
        filteredSalons = filteredSalons.filter((salon) => salon.rating >= Number(rating))
      }

      // Фильтрация по наличию скидки
      if (discount) {
        filteredSalons = filteredSalons.filter((salon) => salon.discount > 0)
      }

      // Сортировка результатов
      switch (sortBy) {
        case "price_asc":
          filteredSalons.sort((a, b) => {
            const aMinPrice = Math.min(...a.services.map((service) => service.discountPrice))
            const bMinPrice = Math.min(...b.services.map((service) => service.discountPrice))
            return aMinPrice - bMinPrice
          })
          break
        case "price_desc":
          filteredSalons.sort((a, b) => {
            const aMaxPrice = Math.max(...a.services.map((service) => service.discountPrice))
            const bMaxPrice = Math.max(...b.services.map((service) => service.discountPrice))
            return bMaxPrice - aMaxPrice
          })
          break
        case "rating":
          filteredSalons.sort((a, b) => b.rating - a.rating)
          break
        case "discount":
          filteredSalons.sort((a, b) => b.discount - a.discount)
          break
        default:
          // По умолчанию сортировка по релевантности (в данном случае просто по ID)
          filteredSalons.sort((a, b) => Number(a.id) - Number(b.id))
      }

      setTotalResults(filteredSalons.length)

      // Пагинация
      const startIndex = (currentPage - 1) * resultsPerPage
      const paginatedResults = filteredSalons.slice(startIndex, startIndex + resultsPerPage)

      setResults(paginatedResults)
      setIsLoading(false)
    }, 500)
  }

  // Обновляем результаты при изменении параметров поиска или страницы
  useEffect(() => {
    filterSalons()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, serviceType, location, date, time, sortBy, minPriceParam, maxPriceParam, rating, discount, currentPage])

  // Функция для обновления URL с параметрами поиска
  const updateSearchParams = (params: Record<string, string | null>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === "") {
        newSearchParams.delete(key)
      } else {
        newSearchParams.set(key, value)
      }
    })

    // Сбрасываем страницу на первую при изменении фильтров
    if (Object.keys(params).some((key) => key !== "page")) {
      newSearchParams.delete("page")
      setCurrentPage(1)
    }

    router.push(`/search?${newSearchParams.toString()}`)
  }

  // Функция для изменения страницы
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    updateSearchParams({ page: page.toString() })
  }

  // Функция для сброса всех фильтров
  const handleResetFilters = () => {
    router.push("/search")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Заголовок страницы */}
        <section className="bg-gray-50 dark:bg-gray-900 py-4 sm:py-8">
          <div className="container">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Поиск массажных салонов</h1>
            <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
              <SearchIcon className="h-4 w-4" />
              <span className="truncate max-w-[250px] sm:max-w-full">
                {query ? `Результаты поиска для "${query}"` : "Все салоны"}
                {serviceType && ` • Услуга: ${serviceType}`}
              </span>
              {location && (
                <span className="flex items-center gap-1 inline-flex">
                  <span className="hidden sm:inline"> • </span>
                  <MapPin className="h-4 w-4" />
                  <span className="truncate max-w-[150px] sm:max-w-full">{location}</span>
                </span>
              )}

              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto h-8 text-xs gap-1 text-muted-foreground hover:text-foreground"
                  onClick={handleResetFilters}
                >
                  <FilterX className="h-3.5 w-3.5" />
                  Сбросить фильтры ({activeFiltersCount})
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Быстрые фильтры для мобильных устройств */}
        <div className="container py-3 lg:hidden">
          <QuickFilters
            services={mockServices.slice(0, 5)} // Показываем только первые 5 услуг для экономии места
            activeServiceType={serviceType}
            onServiceTypeChange={(type) => updateSearchParams({ service: type })}
            discount={discount}
            onDiscountChange={(value) => updateSearchParams({ discount: value ? "true" : null })}
            rating={rating}
            onRatingChange={(value) => updateSearchParams({ rating: value })}
            hasActiveFilters={activeFiltersCount > 0}
            onResetFilters={handleResetFilters}
          />
        </div>

        <div className="container py-4 sm:py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Фильтры для десктопа */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Фильтры</h2>
                <SearchFilters
                  serviceType={serviceType}
                  location={location}
                  date={date}
                  time={time}
                  minPrice={minPriceParam}
                  maxPrice={maxPriceParam}
                  rating={rating}
                  discount={discount}
                  onFilterChange={updateSearchParams}
                  services={mockServices}
                />
              </div>
            </div>

            {/* Кнопка открытия фильтров для мобильных */}
            <div className="lg:hidden mb-4 flex items-center justify-between">
              <Button variant="outline" className="flex-1 h-12 text-base" onClick={() => setFiltersOpen(true)}>
                <SlidersHorizontal className="mr-2 h-5 w-5" />
                Фильтры
                {activeFiltersCount > 0 && (
                  <span className="ml-2 bg-teal-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>

              <div className="ml-3">
                <SortOptions
                  sortBy={sortBy}
                  onSortChange={(value) => updateSearchParams({ sort: value })}
                  isMobile={true}
                />
              </div>
            </div>

            {/* Результаты поиска */}
            <div className="flex-1">
              <div className="hidden sm:flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <p className="text-muted-foreground mb-4 sm:mb-0">Найдено {totalResults} салонов</p>
                <SortOptions sortBy={sortBy} onSortChange={(value) => updateSearchParams({ sort: value })} />
              </div>

              <Separator className="mb-6 hidden sm:block" />

              <SearchResults
                results={results}
                isLoading={isLoading}
                currentPage={currentPage}
                totalPages={Math.ceil(totalResults / resultsPerPage)}
                onPageChange={handlePageChange}
              />

              {/* Мобильная информация о количестве результатов */}
              <div className="lg:hidden text-center text-sm text-muted-foreground mt-4">
                Найдено {totalResults} салонов
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Мобильный drawer с фильтрами */}
      <MobileFiltersDrawer
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        serviceType={serviceType}
        location={location}
        date={date}
        time={time}
        minPrice={minPriceParam}
        maxPrice={maxPriceParam}
        rating={rating}
        discount={discount}
        onFilterChange={updateSearchParams}
        onFilterReset={handleResetFilters}
        services={mockServices}
        activeFiltersCount={activeFiltersCount}
      />

      <Footer />
    </div>
  )
}
