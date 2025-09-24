"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { CartItem } from "@/components/cart/cart-item"
import { CartSummary } from "@/components/cart/cart-summary"
import { EmptyCart } from "@/components/cart/empty-cart"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useCartStore } from "@/lib/store/cart-store"
import { getRestaurantById } from "@/lib/supabase/queries"
import type { Restaurant } from "@/lib/types"

export default function CartPage() {
  const router = useRouter()
  const { items, restaurantId, updateQuantity, removeItem, clearCart, getTotal, getItemCount } = useCartStore()

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [isLoadingRestaurant, setIsLoadingRestaurant] = useState(false)

  const subtotal = getTotal()
  const itemCount = getItemCount()

  useEffect(() => {
    if (restaurantId) {
      setIsLoadingRestaurant(true)
      getRestaurantById(restaurantId)
        .then(setRestaurant)
        .catch(console.error)
        .finally(() => setIsLoadingRestaurant(false))
    }
  }, [restaurantId])

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    updateQuantity(itemId, quantity)
  }

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId)
  }

  const handleContinueShopping = () => {
    router.push("/")
  }

  const handleCheckout = () => {
    // In a real app, this would navigate to checkout/payment
    alert("Checkout functionality would be implemented here!")
  }

  const handleClearCart = () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      clearCart()
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <EmptyCart onContinueShopping={handleContinueShopping} />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Your Cart</h1>
              {isLoadingRestaurant ? (
                <p className="text-muted-foreground">Loading restaurant...</p>
              ) : restaurant ? (
                <p className="text-muted-foreground">From {restaurant.name}</p>
              ) : null}
            </div>
          </div>

          <Button variant="outline" onClick={handleClearCart} className="text-destructive bg-transparent">
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((cartItem) => (
              <CartItem
                key={cartItem.menuItem.id}
                cartItem={cartItem}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary
              restaurant={restaurant}
              subtotal={subtotal}
              itemCount={itemCount}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
