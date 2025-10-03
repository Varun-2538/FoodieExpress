import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartState, MenuItem } from "@/lib/types"

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      restaurantId: null,

      addItem: (menuItem: MenuItem) => {
        const { items, restaurantId } = get()

        // If cart has items from different restaurant, clear cart first
        if (restaurantId && restaurantId !== menuItem.restaurantId) {
          set({
            items: [{ menuItem, quantity: 1 }],
            restaurantId: menuItem.restaurantId,
          })
          return
        }

        // Check if item already exists in cart
        const existingItemIndex = items.findIndex((item) => item.menuItem.id === menuItem.id)

        if (existingItemIndex >= 0) {
          // Update quantity of existing item
          const updatedItems = [...items]
          updatedItems[existingItemIndex].quantity += 1
          set({ items: updatedItems })
        } else {
          // Add new item to cart
          set({
            items: [...items, { menuItem, quantity: 1 }],
            restaurantId: menuItem.restaurantId,
          })
        }
      },

      removeItem: (itemId: string) => {
        const { items } = get()
        const updatedItems = items.filter((item) => item.menuItem.id !== itemId)

        set({
          items: updatedItems,
          restaurantId: updatedItems.length === 0 ? null : get().restaurantId,
        })
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }

        const { items } = get()
        const updatedItems = items.map((item) => (item.menuItem.id === itemId ? { ...item, quantity } : item))
        set({ items: updatedItems })
      },

      clearCart: () => {
        set({ items: [], restaurantId: null })
      },

      getTotal: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.menuItem.price * item.quantity, 0)
      },

      getItemCount: () => {
        const { items } = get()
        return items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)
