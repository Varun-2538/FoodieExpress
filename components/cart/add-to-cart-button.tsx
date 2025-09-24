"use client"

import { useState } from "react"
import { Plus, Minus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store/cart-store"
import type { MenuItem } from "@/lib/types"

interface AddToCartButtonProps {
  menuItem: MenuItem
  disabled?: boolean
}

export function AddToCartButton({ menuItem, disabled = false }: AddToCartButtonProps) {
  const { items, addItem, updateQuantity } = useCartStore()
  const [isAdding, setIsAdding] = useState(false)

  // Find if item is already in cart
  const cartItem = items.find((item) => item.menuItem.id === menuItem.id)
  const quantity = cartItem?.quantity || 0

  const handleAdd = async () => {
    if (disabled || !menuItem.isAvailable) return

    setIsAdding(true)
    try {
      addItem(menuItem)
    } finally {
      setIsAdding(false)
    }
  }

  const handleUpdateQuantity = (newQuantity: number) => {
    if (disabled) return
    updateQuantity(menuItem.id, newQuantity)
  }

  if (quantity === 0) {
    return (
      <Button onClick={handleAdd} disabled={disabled || !menuItem.isAvailable || isAdding} className="w-full">
        <ShoppingCart className="w-4 h-4 mr-2" />
        {isAdding ? "Adding..." : "Add to Cart"}
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleUpdateQuantity(quantity - 1)}
        disabled={disabled}
        className="h-8 w-8 p-0"
      >
        <Minus className="w-3 h-3" />
      </Button>

      <span className="font-medium min-w-[2rem] text-center">{quantity}</span>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleUpdateQuantity(quantity + 1)}
        disabled={disabled}
        className="h-8 w-8 p-0"
      >
        <Plus className="w-3 h-3" />
      </Button>
    </div>
  )
}
