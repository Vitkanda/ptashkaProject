"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { CalendarIcon, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

// Определяем схему валидации формы с помощью Zod
const bookingFormSchema = z.object({
  service: z.string({
    required_error: "Пожалуйста, выберите услугу",
  }),
  specialist: z.string({
    required_error: "Пожалуйста, выберите специалиста",
  }),
  date: z.date({
    required_error: "Пожалуйста, выберите дату",
  }),
  time: z.string({
    required_error: "Пожалуйста, выберите время",
  }),
  name: z.string().min(2, {
    message: "Имя должно содержать не менее 2 символов",
  }),
  phone: z.string().min(10, {
    message: "Пожалуйста, введите корректный номер телефона",
  }),
  email: z.string().email({
    message: "Пожалуйста, введите корректный email",
  }),
  paymentMethod: z.enum(["online", "cash"], {
    required_error: "Пожалуйста, выберите способ оплаты",
  }),
  comment: z.string().optional(),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: "Необходимо согласиться с условиями" }),
  }),
})

type BookingFormValues = z.infer<typeof bookingFormSchema>

// Имитация данных о доступных услугах
const services = [
  { id: "1", name: "Классический массаж", duration: 60, price: 2500, discountPrice: 1750 },
  { id: "2", name: "Спортивный массаж", duration: 90, price: 3500, discountPrice: 2450 },
  { id: "3", name: "Антицеллюлитный массаж", duration: 60, price: 3000, discountPrice: 2100 },
  { id: "4", name: "Релаксирующий массаж", duration: 90, price: 4000, discountPrice: 2800 },
  { id: "5", name: "Массаж шейно-воротниковой зоны", duration: 30, price: 1500, discountPrice: 1050 },
  { id: "6", name: "Массаж стоп", duration: 30, price: 1200, discountPrice: 840 },
]

// Имитация данных о специалистах
const specialists = [
  { id: "1", name: "Анна Иванова", position: "Массажист", experience: 5 },
  { id: "2", name: "Сергей Петров", position: "Массажист", experience: 7 },
  { id: "3", name: "Мария Сидорова", position: "Массажист", experience: 3 },
]

// Имитация данных о доступном времени
const availableTimes = [
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
]

interface BookingFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  salonId: string
  defaultServiceId?: string
  defaultSpecialistId?: string
}

export function BookingForm({ open, onOpenChange, salonId, defaultServiceId, defaultSpecialistId }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)

  // Инициализация формы с react-hook-form и zod для валидации
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      service: defaultServiceId || "",
      specialist: defaultSpecialistId || "",
      name: "",
      phone: "",
      email: "",
      comment: "",
      paymentMethod: "online",
      agreeToTerms: false,
    },
  })

  // Обработчик отправки формы
  function onSubmit(data: BookingFormValues) {
    setIsSubmitting(true)

    // Имитация отправки данных на сервер
    setTimeout(() => {
      console.log("Booking data:", data)
      setIsSubmitting(false)
      setBookingComplete(true)

      // Показываем уведомление об успешном бронировании
      toast({
        title: "Бронирование успешно!",
        description: `Вы забронировали ${getServiceName(data.service)} на ${format(data.date, "d MMMM", { locale: ru })} в ${data.time}`,
      })
    }, 1500)
  }

  // Функция для получения названия услуги по ID
  function getServiceName(serviceId: string): string {
    const service = services.find((s) => s.id === serviceId)
    return service ? service.name : "Услуга"
  }

  // Функция для получения цены услуги по ID
  function getServicePrice(serviceId: string): { regular: number; discount: number } | null {
    const service = services.find((s) => s.id === serviceId)
    return service ? { regular: service.price, discount: service.discountPrice } : null
  }

  // Функция для сброса формы и закрытия модального окна
  function handleClose() {
    if (!isSubmitting) {
      form.reset()
      setBookingComplete(false)
      onOpenChange(false)
    }
  }

  // Получаем выбранную услугу для отображения цены
  const selectedServiceId = form.watch("service")
  const selectedServicePrice = getServicePrice(selectedServiceId)

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] md:max-w-[600px]">
        {!bookingComplete ? (
          <>
            <DialogHeader>
              <DialogTitle>Забронировать массаж</DialogTitle>
              <DialogDescription>Заполните форму для бронирования сеанса массажа в салоне.</DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  {/* Выбор услуги */}
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Услуга</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите услугу" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service.id} value={service.id}>
                                <div className="flex justify-between items-center w-full">
                                  <span>
                                    {service.name} ({service.duration} мин)
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Отображение цены выбранной услуги */}
                  {selectedServicePrice && (
                    <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                      <span className="text-sm font-medium">Стоимость:</span>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-teal-600 dark:text-teal-400">
                            {selectedServicePrice.discount} ₽
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            {selectedServicePrice.regular} ₽
                          </span>
                        </div>
                        <span className="text-xs text-red-500 dark:text-red-400">
                          Скидка {Math.round((1 - selectedServicePrice.discount / selectedServicePrice.regular) * 100)}%
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Выбор специалиста */}
                  <FormField
                    control={form.control}
                    name="specialist"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Специалист</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите специалиста" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {specialists.map((specialist) => (
                              <SelectItem key={specialist.id} value={specialist.id}>
                                {specialist.name} (опыт: {specialist.experience} лет)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Выбор даты */}
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Дата</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "d MMMM yyyy", { locale: ru })
                                ) : (
                                  <span>Выберите дату</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 1))
                              }
                              locale={ru}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Выбор времени */}
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Время</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите время" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableTimes.map((time) => (
                              <SelectItem key={time} value={time}>
                                <div className="flex items-center">
                                  <Clock className="mr-2 h-4 w-4" />
                                  <span>{time}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Контактные данные */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Имя</FormLabel>
                          <FormControl>
                            <Input placeholder="Введите ваше имя" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Телефон</FormLabel>
                          <FormControl>
                            <Input placeholder="+7 (___) ___-__-__" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="example@mail.ru" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Способ оплаты */}
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Способ оплаты</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="online" />
                              </FormControl>
                              <FormLabel className="font-normal">Онлайн оплата</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="cash" />
                              </FormControl>
                              <FormLabel className="font-normal">Оплата в салоне</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Комментарий */}
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Комментарий (необязательно)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Дополнительная информация или пожелания"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Согласие с условиями */}
                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Я согласен с{" "}
                            <a href="#" className="text-teal-600 dark:text-teal-400 hover:underline">
                              условиями предоставления услуг
                            </a>{" "}
                            и{" "}
                            <a href="#" className="text-teal-600 dark:text-teal-400 hover:underline">
                              политикой конфиденциальности
                            </a>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
                    Отмена
                  </Button>
                  <Button
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Отправка..." : "Забронировать"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        ) : (
          <div className="py-6 text-center space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-teal-600 dark:text-teal-400"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium">Бронирование успешно!</h3>
              <p className="text-muted-foreground mt-2">
                Мы отправили подтверждение на ваш email. Ждем вас в нашем салоне!
              </p>
            </div>
            <Button
              onClick={handleClose}
              className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
            >
              Закрыть
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
