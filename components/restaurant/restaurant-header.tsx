"use client"

import Image from "next/image"
import { ArrowLeft, Clock, MapPin, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Restaurant } from "@/lib/types"
import { formatPrice, getCuisineDisplay, getDeliveryFeeDisplay } from "@/lib/utils/format"

interface RestaurantHeaderProps {
  restaurant: Restaurant
  onBack?: () => void
}

export function RestaurantHeader({ restaurant, onBack }: RestaurantHeaderProps) {
  return (
    <div className="relative">
      {/* Hero Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Back Button */}
        {onBack && (
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-4 left-4 bg-white/90 hover:bg-white"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <Badge variant={restaurant.isOpen ? "success" : "destructive"}>{restaurant.isOpen ? "Open" : "Closed"}</Badge>
        </div>

        {/* Restaurant Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold text-balance mb-2">{restaurant.name}</h1>
          <p className="text-lg text-white/90 mb-3">{getCuisineDisplay(restaurant.cuisineTypes)}</p>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{restaurant.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="bg-card border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">Minimum order: </span>
              <span className="font-medium">{formatPrice(restaurant.minimumOrder)}</span>
            </div>
            <div className="text-muted-foreground">{getDeliveryFeeDisplay(restaurant.deliveryFee)}</div>
          </div>

          <Button variant="ghost" size="sm">
            <Info className="w-4 h-4 mr-2" />
            More info
          </Button>
        </div>
      </div>
    </div>
  )
}
