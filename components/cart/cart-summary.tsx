"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Restaurant } from "@/lib/types"
import { formatPrice } from "@/lib/utils/format"

interface CartSummaryProps {
  restaurant?: Restaurant
  subtotal: number
  itemCount: number
  onCheckout?: () => void
  disabled?: boolean
}

export function CartSummary({ restaurant, subtotal, itemCount, onCheckout, disabled = false }: CartSummaryProps) {
  const deliveryFee = restaurant?.deliveryFee || 0
  const taxes = Math.round(subtotal * 0.05) // 5% tax
  const total = subtotal + deliveryFee + taxes

  const isMinimumOrderMet = !restaurant || subtotal >= restaurant.minimumOrder

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Items ({itemCount})</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Delivery fee</span>
            <span>{deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Taxes & fees</span>
            <span>{formatPrice(taxes)}</span>
          </div>

          <Separator />

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        {restaurant && !isMinimumOrderMet && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              Add {formatPrice(restaurant.minimumOrder - subtotal)} more to meet the minimum order of{" "}
              {formatPrice(restaurant.minimumOrder)}
            </p>
          </div>
        )}

        <Button
          onClick={onCheckout}
          disabled={disabled || !isMinimumOrderMet || itemCount === 0}
          className="w-full"
          size="lg"
        >
          {itemCount === 0 ? "Cart is empty" : `Proceed to Checkout • ${formatPrice(total)}`}
        </Button>

        {restaurant && (
          <div className="text-xs text-muted-foreground text-center">Estimated delivery: {restaurant.deliveryTime}</div>
        )}
      </CardContent>
    </Card>
  )
}
