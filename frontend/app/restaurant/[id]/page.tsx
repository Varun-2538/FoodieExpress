"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { RestaurantClientWrapper } from "@/components/restaurant/restaurant-client-wrapper"
import { fetchRestaurant, fetchMenuItems } from "@/lib/api"
import type { Restaurant, MenuItem } from "@/lib/types"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function RestaurantPage() {
  const params = useParams()
  const restaurantId = params.id as string
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [menuItemsByCategory, setMenuItemsByCategory] = useState<Record<string, MenuItem[]>>({})
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const loadRestaurantData = async () => {
      setLoading(true)
      try {
        // Fetch restaurant and menu items from backend API
        const [restaurantData, menuItems] = await Promise.all([
          fetchRestaurant(restaurantId),
          fetchMenuItems(restaurantId),
        ])

        setRestaurant(restaurantData)

        // Group menu items by category
        const grouped = menuItems.reduce((acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = []
          }
          acc[item.category].push(item)
          return acc
        }, {} as Record<string, MenuItem[]>)

        setMenuItemsByCategory(grouped)
        setCategories(Object.keys(grouped))
        setError(false)
      } catch (err) {
        console.error("Error loading restaurant data:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    loadRestaurantData()
  }, [restaurantId])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (error || !restaurant) {
    return <RestaurantNotFound />
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <RestaurantClientWrapper
        restaurant={restaurant}
        menuItemsByCategory={menuItemsByCategory}
        categories={categories}
      />
    </div>
  )
}

function RestaurantNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Restaurant not found</h1>
        <p className="text-muted-foreground mb-6">The restaurant you're looking for doesn't exist.</p>
        <RestaurantClientWrapper 
          restaurant={null} 
          menuItemsByCategory={{}} 
          categories={[]} 
          isNotFound={true}
        />
      </div>
    </div>
  )
}
