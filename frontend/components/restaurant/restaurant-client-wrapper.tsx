"use client"

import { useRouter } from "next/navigation"
import { useCartStore } from "@/lib/store/cart-store"
import { useAuth } from "@/lib/contexts/auth-context"
import { RestaurantHeader } from "@/components/restaurant/restaurant-header"
import { MenuSection } from "@/components/restaurant/menu-section"
import type { MenuItem, Restaurant } from "@/lib/types"
import { initiateGoogleSignIn } from "@/lib/api/auth"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

interface RestaurantClientWrapperProps {
  restaurant: Restaurant | null
  menuItemsByCategory: Record<string, MenuItem[]>
  categories: string[]
  isNotFound?: boolean
}

export function RestaurantClientWrapper({
  restaurant,
  menuItemsByCategory,
  categories,
  isNotFound = false,
}: RestaurantClientWrapperProps) {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const addItem = useCartStore((state) => state.addItem)
  const [signingIn, setSigningIn] = useState(false)
  const { toast } = useToast()

  const handleSignIn = async () => {
    try {
      setSigningIn(true)
      const url = await initiateGoogleSignIn()
      window.location.href = url
    } catch (error) {
      console.error('Sign in error:', error)
      toast({
        title: "Sign in failed",
        description: "Failed to initiate sign in. Please try again.",
        variant: "destructive",
      })
      setSigningIn(false)
    }
  }

  const handleAddToCart = async (menuItem: MenuItem) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your cart.",
        action: (
          <Button
            size="sm"
            onClick={handleSignIn}
            disabled={signingIn}
          >
            {signingIn ? "Signing in..." : "Sign in"}
          </Button>
        ),
      })
      return
    }

    addItem(menuItem)
  }

  const handleBack = () => {
    router.back()
  }

  const handleGoHome = () => {
    router.push("/")
  }

  if (isNotFound) {
    return (
      <button onClick={handleGoHome} className="text-primary hover:underline">
        Back to restaurants
      </button>
    )
  }

  if (!restaurant) {
    return null
  }

  return (
    <>
      <RestaurantHeader restaurant={restaurant} onBack={handleBack} />

      <main className="container mx-auto px-4 py-8">
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No menu available</h2>
            <p className="text-muted-foreground">This restaurant hasn't uploaded their menu yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {categories.map((category) => (
              <MenuSection
                key={category}
                title={category}
                items={menuItemsByCategory[category]}
                onAddToCart={handleAddToCart}
                disabled={!restaurant.isOpen}
              />
            ))}
          </div>
        )}
      </main>
    </>
  )
}
