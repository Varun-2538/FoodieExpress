import type { Meta, StoryObj } from '@storybook/react'
import { AddToCartButton } from '@/components/cart/add-to-cart-button'
import type { MenuItem } from '@/lib/types'

const meta: Meta<typeof AddToCartButton> = {
  title: 'Features/AddToCartButton',
  component: AddToCartButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

const sampleMenuItem: MenuItem = {
  id: '1',
  restaurantId: 'rest-1',
  name: 'Margherita Pizza',
  description: 'Fresh mozzarella, tomato sauce, basil leaves, and olive oil',
  price: 18.99,
  image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop',
  category: 'Pizza',
  isVegetarian: true,
  isAvailable: true,
  preparationTime: 15,
}

export const Default: Story = {
  args: {
    menuItem: sampleMenuItem,
  },
}

export const UnavailableItem: Story = {
  args: {
    menuItem: {
      ...sampleMenuItem,
      id: '2',
      name: 'Special Truffle Pasta',
      isAvailable: false,
    },
  },
}

export const Disabled: Story = {
  args: {
    menuItem: sampleMenuItem,
    disabled: true,
  },
}

export const ExpensiveItem: Story = {
  args: {
    menuItem: {
      ...sampleMenuItem,
      id: '3',
      name: 'Lobster Thermidor',
      price: 65.00,
    },
  },
}

// Note: The quantity control state would show once an item is added to cart
// This demonstrates the initial "Add to Cart" state
export const ButtonStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Available Item</h3>
        <AddToCartButton menuItem={sampleMenuItem} />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Unavailable Item</h3>
        <AddToCartButton
          menuItem={{
            ...sampleMenuItem,
            id: '2',
            name: 'Out of Stock Pizza',
            isAvailable: false,
          }}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Disabled</h3>
        <AddToCartButton menuItem={sampleMenuItem} disabled />
      </div>
    </div>
  ),
}