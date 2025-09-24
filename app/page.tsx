"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Header } from "@/components/layout/header"
import { RestaurantList } from "@/components/restaurant/restaurant-list"
import { Input } from "@/components/ui/input"
import { getRestaurants, searchRestaurants } from "@/lib/supabase/queries"
import type { Restaurant } from "@/lib/types"

export default function HomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([])

  useEffect(() => {
    const loadRestaurants = async () => {
      setLoading(true)
      try {
        const data = await getRestaurants()
        setRestaurants(data)
        setFilteredRestaurants(data)
      } catch (error) {
        console.error("Error loading restaurants:", error)
      } finally {
        setLoading(false)
      }
    }

    loadRestaurants()
  }, [])

  useEffect(() => {
    const handleSearch = async () => {
      if (!searchQuery.trim()) {
        setFilteredRestaurants(restaurants)
        return
      }

      setLoading(true)
      try {
        // Use Supabase search for better performance
        const searchResults = await searchRestaurants(searchQuery)
        setFilteredRestaurants(searchResults)
      } catch (error) {
        console.error("Error searching restaurants:", error)
        // Fallback to client-side filtering
        const filtered = restaurants.filter(
          (restaurant) =>
            restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            restaurant.cuisineTypes.some((cuisine) => cuisine.toLowerCase().includes(searchQuery.toLowerCase())),
        )
        setFilteredRestaurants(filtered)
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(handleSearch, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery, restaurants])

  const handleRestaurantClick = (restaurant: Restaurant) => {
    router.push(`/restaurant/${restaurant.id}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-4">
            Delicious food, delivered fast
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
            Discover amazing restaurants in your area and get your favorite meals delivered right to your door
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"
              aria-hidden="true"
            />
            <Input
              type="text"
              placeholder="Search restaurants or cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
              aria-label="Search restaurants or cuisines"
              role="searchbox"
            />
          </div>
        </section>

        {/* Restaurant List */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
            <h2 className="text-2xl font-semibold">
              {searchQuery ? `Search results for "${searchQuery}"` : "Popular restaurants"}
            </h2>
            <p className="text-muted-foreground" aria-live="polite">
              {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <RestaurantList
            restaurants={filteredRestaurants}
            onRestaurantClick={handleRestaurantClick}
            loading={loading}
          />
        </section>
      </main>
    </div>
  )
}
