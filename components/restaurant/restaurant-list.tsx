"use client"

import type { Restaurant } from "@/lib/types"
import { RestaurantCard } from "./restaurant-card"
import { RestaurantCardSkeleton } from "./restaurant-card-skeleton"

interface RestaurantListProps {
  restaurants: Restaurant[]
  onRestaurantClick?: (restaurant: Restaurant) => void
  loading?: boolean
}

export function RestaurantList({ restaurants, onRestaurantClick, loading = false }: RestaurantListProps) {
  if (loading) {
    return (
      <section aria-label="Loading restaurants" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <RestaurantCardSkeleton key={index} />
        ))}
      </section>
    )
  }

  if (restaurants.length === 0) {
    return (
      <section aria-label="No restaurants found" className="text-center py-12" role="status" aria-live="polite">
        <div className="text-muted-foreground text-lg mb-2">No restaurants found</div>
        <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
      </section>
    )
  }

  return (
    <section
      aria-label={`${restaurants.length} restaurants available`}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} onClick={onRestaurantClick} />
      ))}
    </section>
  )
}
