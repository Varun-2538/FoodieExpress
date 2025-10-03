"use client"

import { ShoppingCart, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyCartProps {
  onContinueShopping?: () => void
}

export function EmptyCart({ onContinueShopping }: EmptyCartProps) {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
        <ShoppingCart className="w-12 h-12 text-muted-foreground" />
      </div>

      <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Looks like you haven't added any items to your cart yet. Start browsing restaurants to find delicious meals!
      </p>

      <Button onClick={onContinueShopping} size="lg">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Continue Shopping
      </Button>
    </div>
  )
}
