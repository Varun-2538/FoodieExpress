import type { MenuItem as MenuItemType } from "@/lib/types"
import { MenuItem } from "./menu-item"

interface MenuSectionProps {
  title: string
  items: MenuItemType[]
  onAddToCart?: (menuItem: MenuItemType) => void
  disabled?: boolean
}

export function MenuSection({ title, items, onAddToCart, disabled = false }: MenuSectionProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <section className="space-y-4">
      <div className="sticky top-0 bg-background/95 backdrop-blur py-3 border-b">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{items.length} items</p>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <MenuItem key={item.id} menuItem={item} onAddToCart={onAddToCart} disabled={disabled} />
        ))}
      </div>
    </section>
  )
}
