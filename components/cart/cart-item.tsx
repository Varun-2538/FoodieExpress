"use client"

import Image from "next/image"
import { Plus, Minus, Trash2, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { CartItem as CartItemType } from "@/lib/types"
import { formatPrice } from "@/lib/utils/format"

interface CartItemProps {
  cartItem: CartItemType
  onUpdateQuantity?: (itemId: string, quantity: number) => void
  onRemove?: (itemId: string) => void
  disabled?: boolean
}

export function CartItem({ cartItem, onUpdateQuantity, onRemove, disabled = false }: CartItemProps) {
  const { menuItem, quantity, specialInstructions } = cartItem
  const itemTotal = menuItem.price * quantity

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemove?.(menuItem.id)
    } else {
      onUpdateQuantity?.(menuItem.id, newQuantity)
    }
  }

  const handleRemove = () => {
    onRemove?.(menuItem.id)
  }

  return (
    <article
      className="flex gap-4 p-4 bg-card rounded-lg border"
      aria-label={`${menuItem.name} - ${quantity} items - ${formatPrice(itemTotal)}`}
    >
      {/* Item Image */}
      <div className="relative w-16 h-16 shrink-0">
        <Image
          src={menuItem.image || "/placeholder.svg"}
          alt={`${menuItem.name} dish`}
          fill
          className="object-cover rounded-lg"
          sizes="64px"
        />
      </div>

      {/* Item Details */}
      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-balance">{menuItem.name}</h3>
              {menuItem.isVegetarian && (
                <Badge variant="success" className="text-xs">
                  <Leaf className="w-3 h-3 mr-1" aria-hidden="true" />
                  <span className="sr-only">Vegetarian</span>
                  Veg
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{formatPrice(menuItem.price)} each</p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            disabled={disabled}
            className="text-destructive"
            aria-label={`Remove ${menuItem.name} from cart`}
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
          </Button>
        </div>

        {specialInstructions && (
          <p className="text-sm text-muted-foreground italic">
            <span className="sr-only">Special instructions:</span>
            Note: {specialInstructions}
          </p>
        )}

        {/* Quantity Controls and Total */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2" role="group" aria-label="Quantity controls">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={disabled}
              className="h-8 w-8 p-0"
              aria-label={`Decrease quantity of ${menuItem.name}`}
            >
              <Minus className="w-3 h-3" aria-hidden="true" />
            </Button>

            <span className="font-medium min-w-[2rem] text-center" aria-label={`Quantity: ${quantity}`} role="status">
              {quantity}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={disabled}
              className="h-8 w-8 p-0"
              aria-label={`Increase quantity of ${menuItem.name}`}
            >
              <Plus className="w-3 h-3" aria-hidden="true" />
            </Button>
          </div>

          <div className="font-semibold" aria-label={`Item total: ${formatPrice(itemTotal)}`}>
            {formatPrice(itemTotal)}
          </div>
        </div>
      </div>
    </article>
  )
}
