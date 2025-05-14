import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Phone, Calendar, Star, ChevronLeft, Instagram, MessageCircle, Share2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookingButton } from "@/components/booking-button"

export default function SalonPage({ params }: { params: { id: string } }) {
  // В реальном приложении здесь был бы запрос к API для получения данных о салоне
  const salon = {
    id: params.id,
    name: `Салон красоты "Релакс"`,
    rating: 4.8,
    reviewCount: 124,
    address: "ул. Примерная, д. 15",
    phone: "+7 (999) 123-45-67",
    workingHours: "10:00 - 22:00",
    description:
      "Салон красоты «Релакс» — это место, где вы можете отдохнуть душой и телом. Наши мастера помогут вам расслабиться и восстановить силы после тяжелого дня. Мы предлагаем широкий спектр услуг по массажу и уходу за телом. Используем только натуральные масла и косметику премиум-класса.",
    discount: 30,
    services: [
      { id: 1, name: "Классический массаж", duration: 60, price: 2500, discountPrice: 1750 },
      { id: 2, name: "Спортивный массаж", duration: 90, price: 3500, discountPrice: 2450 },
      { id: 3, name: "Антицеллюлитный массаж", duration: 60, price: 3000, discountPrice: 2100 },
      { id: 4, name: "Релаксирующий массаж", duration: 90, price: 4000, discountPrice: 2800 },
      { id: 5, name: "Массаж шейно-воротниковой зоны", duration: 30, price: 1500, discountPrice: 1050 },
      { id: 6, name: "Массаж стоп", duration: 30, price: 1200, discountPrice: 840 },
    ],
    specialists: [
      {
        id: 1,
        name: "Анна Иванова",
        position: "Массажист",
        experience: 5,
        photo: "/placeholder.svg?height=300&width=300&text=Анна",
      },
      {
        id: 2,
        name: "Сергей Петров",
        position: "Массажист",
        experience: 7,
        photo: "/placeholder.svg?height=300&width=300&text=Сергей",
      },
      {
        id: 3,
        name: "Мария Сидорова",
        position: "Массажист",
        experience: 3,
        photo: "/placeholder.svg?height=300&width=300&text=Мария",
      },
    ],
    reviews: [
      {
        id: 1,
        author: "Елена",
        rating: 5,
        date: "15.04.2025",
        text: "Отличный массаж! Мастер Анна очень внимательна к деталям и знает своё дело. После сеанса чувствую себя обновлённой.",
      },
      {
        id: 2,
        author: "Дмитрий",
        rating: 4,
        date: "10.04.2025",
        text: "Хороший салон, приятная атмосфера. Сергей - отличный специалист, помог мне с болями в спине.",
      },
      {
        id: 3,
        author: "Ольга",
        rating: 5,
        date: "05.04.2025",
        text: "Регулярно хожу на массаж в этот салон. Всегда отличный сервис и результат. Рекомендую!",
      },
    ],
    gallery: [
      "/placeholder.svg?height=400&width=600&text=Фото 1",
      "/placeholder.svg?height=400&width=600&text=Фото 2",
      "/placeholder.svg?height=400&width=600&text=Фото 3",
      "/placeholder.svg?height=400&width=600&text=Фото 4",
    ],
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Back button */}
        <div className="container mt-4">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Назад к списку салонов
          </Link>
        </div>

        {/* Salon Header */}
        <section className="relative py-8">
          <div className="container">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Gallery */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
                  {salon.gallery.map((photo, index) => (
                    <div key={index} className={`relative ${index === 0 ? "col-span-2 row-span-1" : ""}`}>
                      <Image
                        src={photo || "/placeholder.svg"}
                        alt={`${salon.name} - фото ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-4 right-4">
                  <Button variant="secondary" size="sm" className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
                    Все фото
                  </Button>
                </div>
              </div>

              {/* Salon Info */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">{salon.name}</h1>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-5 w-5" />
                      <span className="sr-only">Поделиться</span>
                    </Button>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 font-medium">{salon.rating}</span>
                    </div>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{salon.reviewCount} отзывов</span>
                    <Badge
                      variant="outline"
                      className="ml-4 bg-red-50 text-red-600 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800"
                    >
                      Скидка {salon.discount}%
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <span>{salon.address}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <span>{salon.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <span>Ежедневно {salon.workingHours}</span>
                  </div>
                </div>

                <p className="text-muted-foreground">{salon.description}</p>

                <div className="flex gap-4 pt-4">
                  <BookingButton
                    salonId={salon.id}
                    className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 flex-1"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Забронировать
                  </BookingButton>
                  <Button variant="outline" className="flex-1">
                    <Phone className="mr-2 h-5 w-5" />
                    Позвонить
                  </Button>
                </div>

                <div className="flex gap-4 pt-2">
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1"
                  >
                    <Instagram className="h-5 w-5" />
                    <span>Instagram</span>
                  </Link>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Telegram</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="py-8 border-t">
          <div className="container">
            <Tabs defaultValue="services" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="services">Услуги</TabsTrigger>
                <TabsTrigger value="specialists">Специалисты</TabsTrigger>
                <TabsTrigger value="reviews">Отзывы</TabsTrigger>
                <TabsTrigger value="map">Карта</TabsTrigger>
              </TabsList>

              {/* Services Tab */}
              <TabsContent value="services" className="pt-6">
                <h2 className="text-2xl font-bold mb-6">Услуги и цены</h2>
                <div className="space-y-4">
                  {salon.services.map((service) => (
                    <Card key={service.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6">
                          <div className="space-y-1">
                            <h3 className="font-semibold">{service.name}</h3>
                            <p className="text-sm text-muted-foreground">{service.duration} минут</p>
                          </div>
                          <div className="flex items-center gap-4 mt-4 sm:mt-0">
                            <div className="text-right">
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-semibold">{service.discountPrice} ₽</span>
                                <span className="text-sm text-muted-foreground line-through">{service.price} ₽</span>
                              </div>
                              <span className="text-xs text-red-500 dark:text-red-400">Скидка {salon.discount}%</span>
                            </div>
                            <BookingButton
                              salonId={salon.id}
                              defaultServiceId={service.id.toString()}
                              size="sm"
                              className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
                            >
                              Выбрать
                            </BookingButton>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Specialists Tab */}
              <TabsContent value="specialists" className="pt-6">
                <h2 className="text-2xl font-bold mb-6">Наши специалисты</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {salon.specialists.map((specialist) => (
                    <Card key={specialist.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="aspect-square relative">
                          <Image
                            src={specialist.photo || "/placeholder.svg"}
                            alt={specialist.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold">{specialist.name}</h3>
                          <p className="text-sm text-muted-foreground">{specialist.position}</p>
                          <p className="text-sm mt-1">Опыт работы: {specialist.experience} лет</p>
                          <BookingButton
                            salonId={salon.id}
                            defaultSpecialistId={specialist.id.toString()}
                            variant="outline"
                            size="sm"
                            className="mt-4 w-full"
                          >
                            Записаться
                          </BookingButton>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Отзывы клиентов</h2>
                  <Button variant="outline">Оставить отзыв</Button>
                </div>
                <div className="space-y-6">
                  {salon.reviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{review.author}</h3>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-muted-foreground">{review.text}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Map Tab */}
              <TabsContent value="map" className="pt-6">
                <h2 className="text-2xl font-bold mb-6">Как нас найти</h2>
                <div className="relative h-[400px] w-full rounded-xl overflow-hidden border shadow-sm">
                  <Image
                    src="/placeholder.svg?height=400&width=1200"
                    alt="Карта с местоположением салона"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-medium">Карта Яндекс</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold">Адрес</h3>
                  <p className="text-muted-foreground">{salon.address}</p>
                  <h3 className="font-semibold mt-4">Как добраться</h3>
                  <p className="text-muted-foreground">
                    От метро "Примерная" выход №3, далее пешком 5 минут по улице Примерной до дома 15.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Hot Deals Section */}
        <section className="py-8 bg-gray-50 dark:bg-gray-900">
          <div className="container">
            <h2 className="text-2xl font-bold mb-6">Другие горящие предложения рядом</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="group rounded-xl border overflow-hidden transition-all hover:shadow-md bg-card"
                >
                  <div className="aspect-video relative">
                    <Image
                      src={`/placeholder.svg?height=200&width=400&text=Салон ${item}`}
                      alt={`Салон ${item}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                      -25%
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">Салон красоты "Гармония {item}"</h3>
                    <p className="text-muted-foreground mt-1">ул. Соседняя, д. {item}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm">4.{item}</span>
                        </div>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{15 + item} отзывов</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-teal-600 border-teal-600 hover:bg-teal-50 dark:text-teal-400 dark:border-teal-400 dark:hover:bg-teal-950"
                      >
                        Подробнее
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="py-12 bg-teal-50 dark:bg-teal-950/50">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Готовы записаться на массаж?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Забронируйте сеанс массажа прямо сейчас и получите скидку {salon.discount}% на первое посещение.
            </p>
            <BookingButton
              salonId={salon.id}
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Забронировать сеанс
            </BookingButton>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
