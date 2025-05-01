export interface Salon {
  id: string
  name: string
  description: string
  address: string
  phone: string
  workingHours: string
  rating: number
  reviewCount: number
  discount: number
  image: string
  services: {
    id: number
    name: string
    type: string
    duration: number
    price: number
    discountPrice: number
  }[]
  specialists: {
    id: number
    name: string
    position: string
    experience: number
    photo: string
  }[]
}
