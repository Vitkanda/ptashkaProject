import Link from "next/link"
import { Instagram, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 dark:bg-gray-950">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="text-xl font-bold text-white mb-4 inline-block">
              MassageNow
            </Link>
            <p className="text-gray-400 mt-2">
              Агрегатор массажных салонов с горящими окнами и специальными предложениями
            </p>
            <div className="flex gap-4 mt-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                >
                  <path
                    d="M12 0C5.37097 0 0 5.37097 0 12C0 18.629 5.37097 24 12 24C18.629 24 24 18.629 24 12C24 5.37097 18.629 0 12 0ZM17.9032 13.4032C17.9032 13.4032 19.4032 14.9032 19.8387 15.6774C19.8387 15.6774 20.0645 16.0645 19.9032 16.3387C19.7419 16.6129 19.2581 16.7742 19.0323 16.7742H16.6452C16.6452 16.7742 16.2581 16.8387 15.7742 16.5161C15.4032 16.2419 15.0323 15.7097 14.6613 15.2258C14.1774 14.6452 13.8065 14.3226 13.4839 14.3226C13.4839 14.3226 13.3226 14.3226 13.1613 14.4355C12.8387 14.6452 12.5161 15.2258 12.5161 15.9516C12.5161 16.2742 12.2903 16.5484 11.9677 16.5484H10.9355C10.5645 16.5484 8.70968 16.4355 7.06452 14.7419C5.03226 12.6129 3.22581 8.32258 3.22581 8.32258C3.22581 8.32258 3.09677 8.06452 3.22581 7.93548C3.35484 7.80645 3.74194 7.80645 3.74194 7.80645H6.25806C6.25806 7.80645 6.51613 7.83871 6.70968 8.03226C6.83871 8.16129 6.96774 8.45161 6.96774 8.45161C6.96774 8.45161 7.32258 9.35484 7.80645 10.1935C8.77419 11.871 9.22581 12.3548 9.54839 12.3548C9.54839 12.3548 9.67742 12.3548 9.83871 12.2258C10.129 11.9516 10 10.7419 10 10.7419C10 10.7419 10 9.48387 9.58065 9.16129C9.25806 8.90323 8.74194 8.83871 8.58065 8.80645C8.45161 8.77419 8.70968 8.48387 9.03226 8.35484C9.48387 8.16129 10.2581 8.12903 11.1613 8.12903C11.8387 8.12903 12.0645 8.16129 12.3871 8.22581C13.0645 8.35484 13.0645 8.70968 13.0645 9.48387C13.0645 9.83871 13.0645 10.2581 13.0645 10.7419C13.0645 10.7419 13.0645 11.1613 13.0645 11.3226C13.0645 11.7097 13.0645 12.129 13.3871 12.2581C13.5484 12.3226 13.6774 12.3226 13.871 12.3226C14.0645 12.3226 14.4839 12.129 15.5806 10.2258C16.0645 9.35484 16.4355 8.35484 16.4355 8.35484C16.4355 8.35484 16.5645 8.12903 16.7258 8.03226C16.8871 7.93548 17.0968 7.93548 17.0968 7.93548L19.7419 7.96774C19.7419 7.96774 20.3226 7.90323 20.4839 8.22581C20.6452 8.54839 20.3226 9.38709 19.2903 10.7419C18.3226 12 17.9032 13.4032 17.9032 13.4032Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="sr-only">VK</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">Telegram</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Главная
                </Link>
              </li>
              <li>
                <Link href="#salons" className="text-gray-400 hover:text-white">
                  Салоны
                </Link>
              </li>
              <li>
                <Link href="#hot-deals" className="text-gray-400 hover:text-white">
                  Горящие окна
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-white">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Информация</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  О нас
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Помощь
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Условия использования
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Политика конфиденциальности
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-1"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="text-gray-400">+7 (999) 123-45-67</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-1"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="text-gray-400">info@massagenow.ru</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-1"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-gray-400">г. Москва, ул. Примерная, д. 1</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} MassageNow. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
