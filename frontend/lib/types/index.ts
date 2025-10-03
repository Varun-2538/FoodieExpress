// Core TypeScript interfaces for the food delivery MVP

export interface Restaurant {
  id: string
  name: string
  image: string
  rating: number
  deliveryTime: string
  cuisineTypes: string[]
  minimumOrder: number
  deliveryFee: number
  isOpen: boolean
  address: string
}

export interface MenuItem {
  id: string
  restaurantId: string
  name: string
  description: string
  price: number
  image: string
  category: string
  isVegetarian: boolean
  isAvailable: boolean
  preparationTime: number
}

export interface CartItem {
  menuItem: MenuItem
  quantity: number
  specialInstructions?: string
}

export interface CartState {
  items: CartItem[]
  restaurantId: string | null
  addItem: (item: MenuItem) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}
