"use client"

import type React from "react"

import Image from "next/image"
import { Clock, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Restaurant } from "@/lib/types"
import { formatPrice, getCuisineDisplay, getDeliveryFeeDisplay } from "@/lib/utils/format"

interface RestaurantCardProps {
  restaurant: Restaurant
  onClick?: (restaurant: Restaurant) => void
}

export function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  const handleClick = () => {
    onClick?.(restaurant)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleClick()
    }
  }

  return (
    <Card
      className={`group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${
        !restaurant.isOpen ? "opacity-60" : ""
      }`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View menu for ${restaurant.name}. ${restaurant.isOpen ? "Open" : "Closed"}. Delivery time ${restaurant.deliveryTime}.`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
        <Image
          src={restaurant.image || "/placeholder.svg"}
          alt={`${restaurant.name} restaurant`}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {!restaurant.isOpen && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm font-medium">
              Closed
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg text-balance leading-tight">{restaurant.name}</h3>
          </div>

          <p className="text-sm text-muted-foreground">{getCuisineDisplay(restaurant.cuisineTypes)}</p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span>
                <span className="sr-only">Delivery time:</span>
                {restaurant.deliveryTime}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span className="truncate">
                <span className="sr-only">Address:</span>
                {restaurant.address}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="text-sm">
              <span className="text-muted-foreground">Min order: </span>
              <span className="font-medium">{formatPrice(restaurant.minimumOrder)}</span>
            </div>
            <div className="text-sm text-muted-foreground">{getDeliveryFeeDisplay(restaurant.deliveryFee)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
