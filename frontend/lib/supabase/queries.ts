import { createClient } from "@/lib/supabase/client"
import type { Restaurant, MenuItem } from "@/lib/types"

export async function getRestaurants(): Promise<Restaurant[]> {
  console.log("[v0] Fetching restaurants from Supabase...")

  const supabase = createClient()

  const { data, error } = await supabase.from("restaurants").select("*").order("rating", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching restaurants:", error)
    throw new Error(`Error fetching restaurants: ${error.message}`)
  }

  console.log("[v0] Successfully fetched", data?.length || 0, "restaurants")

  return data.map((restaurant) => ({
    id: restaurant.id.toString(),
    name: restaurant.name,
    image: restaurant.image,
    rating: restaurant.rating,
    deliveryTime: restaurant.delivery_time,
    cuisineTypes: restaurant.cuisine_types || [],
    minimumOrder: restaurant.minimum_order,
    deliveryFee: restaurant.delivery_fee,
    isOpen: restaurant.is_open,
    address: restaurant.address || "",
  }))
}

export async function getRestaurantById(id: string): Promise<Restaurant | null> {
  console.log("[v0] Fetching restaurant with id:", id)

  const supabase = createClient()

  const { data, error } = await supabase.from("restaurants").select("*").eq("id", id).single()

  if (error) {
    console.error("[v0] Error fetching restaurant:", error)
    return null
  }

  if (!data) {
    console.log("[v0] No restaurant found with id:", id)
    return null
  }

  console.log("[v0] Successfully fetched restaurant:", data.name)

  return {
    id: data.id.toString(),
    name: data.name,
    image: data.image,
    rating: data.rating,
    deliveryTime: data.delivery_time,
    cuisineTypes: data.cuisine_types || [],
    minimumOrder: data.minimum_order,
    deliveryFee: data.delivery_fee,
    isOpen: data.is_open,
    address: data.address || "",
  }
}

export async function getMenuItemsByRestaurant(restaurantId: string): Promise<MenuItem[]> {
  console.log("[v0] Fetching menu items for restaurant:", restaurantId)

  const supabase = createClient()

  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("restaurant_id", restaurantId)
    .order("category")

  if (error) {
    console.error("[v0] Error fetching menu items:", error)
    return []
  }

  console.log("[v0] Successfully fetched", data?.length || 0, "menu items")

  return data.map((item) => ({
    id: item.id.toString(),
    restaurantId: item.restaurant_id.toString(),
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.image,
    category: item.category,
    isVegetarian: item.is_vegetarian,
    isAvailable: item.is_available,
    preparationTime: item.preparation_time,
  }))
}

export async function getMenuItemsByCategory(restaurantId: string): Promise<Record<string, MenuItem[]>> {
  const menuItems = await getMenuItemsByRestaurant(restaurantId)

  return menuItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, MenuItem[]>,
  )
}

export async function searchRestaurants(query: string): Promise<Restaurant[]> {
  console.log("[v0] Searching restaurants with query:", query)

  const supabase = createClient()

  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .or(`name.ilike.%${query}%,cuisine_types.cs.{${query}}`)
    .order("rating", { ascending: false })

  if (error) {
    console.error("[v0] Error searching restaurants:", error)
    return []
  }

  console.log("[v0] Found", data?.length || 0, "restaurants matching query")

  return data.map((restaurant) => ({
    id: restaurant.id.toString(),
    name: restaurant.name,
    image: restaurant.image,
    rating: restaurant.rating,
    deliveryTime: restaurant.delivery_time,
    cuisineTypes: restaurant.cuisine_types || [],
    minimumOrder: restaurant.minimum_order,
    deliveryFee: restaurant.delivery_fee,
    isOpen: restaurant.is_open,
    address: restaurant.address || "",
  }))
}
