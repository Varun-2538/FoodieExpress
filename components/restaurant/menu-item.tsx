"use client"

import type React from "react"

import Image from "next/image"
import { Plus, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { MenuItem as MenuItemType } from "@/lib/types"
import { formatPrice } from "@/lib/utils/format"

interface MenuItemProps {
  menuItem: MenuItemType
  onAddToCart?: (menuItem: MenuItemType) => void
  disabled?: boolean
}

export function MenuItem({ menuItem, onAddToCart, disabled = false }: MenuItemProps) {
  const handleAddToCart = () => {
    if (!disabled && menuItem.isAvailable) {
      onAddToCart?.(menuItem)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.key === "Enter" || event.key === " ") && menuItem.isAvailable && !disabled) {
      event.preventDefault()
      handleAddToCart()
    }
  }

  return (
    <article
      className={`flex gap-4 p-4 rounded-lg border bg-card transition-colors ${
        !menuItem.isAvailable ? "opacity-60" : "hover:bg-accent/50"
      }`}
      aria-label={`${menuItem.name} - ${formatPrice(menuItem.price)} - ${menuItem.isAvailable ? "Available" : "Unavailable"}`}
    >
      {/* Menu Item Info */}
      <div className="flex-1 space-y-2">
        <div className="flex items-start gap-2">
          <h3 className="font-semibold text-base text-balance leading-tight">{menuItem.name}</h3>
          {menuItem.isVegetarian && (
            <Badge variant="success" className="shrink-0">
              <Leaf className="w-3 h-3 mr-1" aria-hidden="true" />
              <span className="sr-only">Vegetarian</span>
              Veg
            </Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground text-pretty">{menuItem.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-lg">{formatPrice(menuItem.price)}</span>
            <span className="text-xs text-muted-foreground">
              <span className="sr-only">Preparation time:</span>
              {menuItem.preparationTime} mins
            </span>
          </div>

          {!menuItem.isAvailable && (
            <Badge variant="destructive" className="text-xs">
              Unavailable
            </Badge>
          )}
        </div>
      </div>

      {/* Menu Item Image */}
      <div className="relative w-24 h-24 shrink-0">
        <Image
          src={menuItem.image || "/placeholder.svg"}
          alt={`${menuItem.name} dish`}
          fill
          className="object-cover rounded-lg"
          sizes="96px"
        />

        {/* Add to Cart Button */}
        <Button
          size="sm"
          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 shadow-lg focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onClick={handleAddToCart}
          onKeyDown={handleKeyDown}
          disabled={disabled || !menuItem.isAvailable}
          aria-label={`Add ${menuItem.name} to cart`}
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
        </Button>
      </div>
    </article>
  )
}
