import { Header } from "@/components/layout/header"
import { RestaurantClientWrapper } from "@/components/restaurant/restaurant-client-wrapper"
import { getRestaurantById, getMenuItemsByCategory } from "@/lib/supabase/queries"
import type { MenuItem } from "@/lib/types"

interface RestaurantPageProps {
  params: Promise<{ id: string }>
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const resolvedParams = await params
  const restaurant = await getRestaurantById(resolvedParams.id)

  if (!restaurant) {
    return <RestaurantNotFound />
  }

  const menuItemsByCategory = await getMenuItemsByCategory(restaurant.id)
  const categories = Object.keys(menuItemsByCategory)

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
