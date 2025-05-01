"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Clock, Calendar } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockServices } from "@/data/mock-services";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Функция для выполнения поиска
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchQuery) params.append("query", searchQuery);
    if (location) params.append("location", location);
    if (date) params.append("date", date);
    if (time) params.append("time", time);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=800&width=1600"
              alt="Массаж"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/30 to-blue-500/30 dark:from-teal-800/50 dark:to-blue-800/50" />
          </div>
          <div className="container relative z-10 py-24 md:py-32">
            <div className="max-w-3xl space-y-5">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Запишись на массаж с максимальной скидкой прямо сейчас
              </h1>
              <p className="text-xl text-muted-foreground">
                Найдите ближайшие свободные окна со скидками до 50%
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
                  onClick={() => router.push("/search")}
                >
                  Найти массаж рядом
                </Button>
              </div>
            </div>

            <div className="mt-10 rounded-xl bg-background/80 p-4 backdrop-blur-sm md:p-6 border">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="flex items-center gap-2 rounded-lg border bg-background p-3">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <Select onValueChange={(value) => setSearchQuery(value)}>
                    <SelectTrigger className="border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                      <SelectValue placeholder="Тип массажа" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockServices.map((service) => (
                        <SelectItem key={service.id} value={service.type}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2 rounded-lg border bg-background p-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Местоположение"
                    className="border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 rounded-lg border bg-background p-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <Input
                    type="date"
                    placeholder="Дата"
                    className="border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 rounded-lg border bg-background p-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <Select onValueChange={(value) => setTime(value)}>
                    <SelectTrigger className="border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                      <SelectValue placeholder="Время" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "10:00",
                        "11:00",
                        "12:00",
                        "13:00",
                        "14:00",
                        "15:00",
                        "16:00",
                        "17:00",
                        "18:00",
                        "19:00",
                        "20:00",
                      ].map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
                  onClick={handleSearch}
                >
                  Поиск
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section id="hot-deals" className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-10">
              Ближайшие горящие окна на карте
            </h2>
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden border shadow-sm">
              <YMaps
                query={{
                  apikey: "4db7472d-2936-422d-9f44-ff9da9481d65",
                  lang: "ru_RU",
                }}
              >
                <Map
                  defaultState={{
                    center: [55.751574, 37.573856],
                    zoom: 10,
                  }}
                  width="100%"
                  height="100%"
                >
                  <Placemark
                    geometry={[55.751574, 37.573856]}
                    properties={{
                      balloonContent: 'Массажный салон "Релакс"',
                    }}
                    options={{
                      preset: "islands#blueMassageIcon",
                    }}
                  />
                </Map>
              </YMaps>
            </div>
            <div className="mt-8 text-center">
              <Button
                className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
                onClick={() => router.push("/search?discount=true")}
              >
                Смотреть все скидки
              </Button>
            </div>
          </div>
        </section>

        {/* Popular Salons */}
        <section id="salons" className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-10">
              Популярные салоны рядом с вами
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((salon) => (
                <div
                  key={salon}
                  className="group rounded-xl border overflow-hidden transition-all hover:shadow-md bg-card"
                >
                  <div className="aspect-video relative">
                    <Image
                      src={`/placeholder.svg?height=200&width=400&text=Салон ${salon}`}
                      alt={`Салон ${salon}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                      -30%
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">
                      Салон красоты "Релакс {salon}"
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      ул. Примерная, д. {salon}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-yellow-400"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          <span className="ml-1 text-sm">4.{salon}</span>
                        </div>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">
                          {20 + salon} отзывов
                        </span>
                      </div>
                      <Link href={`/salon/${salon}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-teal-600 border-teal-600 hover:bg-teal-50 dark:text-teal-400 dark:border-teal-400 dark:hover:bg-teal-950"
                        >
                          Подробнее
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Как это работает
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-600 mb-4 dark:bg-teal-900 dark:text-teal-300">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Выберите удобное предложение со скидкой
                </h3>
                <p className="text-muted-foreground">
                  Найдите ближайшие салоны с горящими окнами и выберите
                  подходящее время
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-600 mb-4 dark:bg-teal-900 dark:text-teal-300">
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Забронируйте горящее окно
                </h3>
                <p className="text-muted-foreground">
                  Быстро забронируйте выбранное время в пару кликов без звонков
                  и ожиданий
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-600 mb-4 dark:bg-teal-900 dark:text-teal-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8"
                  >
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Наслаждайтесь массажем по выгодной цене
                </h3>
                <p className="text-muted-foreground">
                  Получите качественный сервис со скидкой до 50% в удобное для
                  вас время
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
