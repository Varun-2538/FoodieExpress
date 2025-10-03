import type { Meta, StoryObj } from '@storybook/react'
import { CartItem } from '@/components/cart/cart-item'
import type { CartItem as CartItemType, MenuItem } from '@/lib/types'

const meta: Meta<typeof CartItem> = {
  title: 'Features/CartItem',
  component: CartItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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

const sampleCartItem: CartItemType = {
  menuItem: sampleMenuItem,
  quantity: 2,
}

export const Default: Story = {
  args: {
    cartItem: sampleCartItem,
    onUpdateQuantity: (itemId, quantity) => console.log('Update quantity:', itemId, quantity),
    onRemove: (itemId) => console.log('Remove item:', itemId),
  },
}

export const SingleQuantity: Story = {
  args: {
    cartItem: {
      ...sampleCartItem,
      quantity: 1,
    },
    onUpdateQuantity: (itemId, quantity) => console.log('Update quantity:', itemId, quantity),
    onRemove: (itemId) => console.log('Remove item:', itemId),
  },
}

export const LargeQuantity: Story = {
  args: {
    cartItem: {
      ...sampleCartItem,
      quantity: 5,
    },
    onUpdateQuantity: (itemId, quantity) => console.log('Update quantity:', itemId, quantity),
    onRemove: (itemId) => console.log('Remove item:', itemId),
  },
}

export const NonVegetarian: Story = {
  args: {
    cartItem: {
      menuItem: {
        ...sampleMenuItem,
        id: '2',
        name: 'Pepperoni Pizza',
        description: 'Classic pepperoni with mozzarella cheese',
        isVegetarian: false,
        price: 21.99,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      },
      quantity: 1,
    },
    onUpdateQuantity: (itemId, quantity) => console.log('Update quantity:', itemId, quantity),
    onRemove: (itemId) => console.log('Remove item:', itemId),
  },
}

export const WithSpecialInstructions: Story = {
  args: {
    cartItem: {
      ...sampleCartItem,
      specialInstructions: 'Extra cheese, no onions, cook well done',
    },
    onUpdateQuantity: (itemId, quantity) => console.log('Update quantity:', itemId, quantity),
    onRemove: (itemId) => console.log('Remove item:', itemId),
  },
}

export const ExpensiveItem: Story = {
  args: {
    cartItem: {
      menuItem: {
        ...sampleMenuItem,
        id: '3',
        name: 'Lobster Thermidor',
        description: 'Fresh Atlantic lobster with rich, creamy sauce',
        isVegetarian: false,
        price: 65.00,
        image: 'https://images.unsplash.com/photo-1582731080995-b0f3d45d0546?w=400&h=300&fit=crop',
      },
      quantity: 1,
      specialInstructions: 'Medium rare, extra butter sauce on the side',
    },
    onUpdateQuantity: (itemId, quantity) => console.log('Update quantity:', itemId, quantity),
    onRemove: (itemId) => console.log('Remove item:', itemId),
  },
}

export const Disabled: Story = {
  args: {
    cartItem: sampleCartItem,
    disabled: true,
    onUpdateQuantity: (itemId, quantity) => console.log('Update quantity:', itemId, quantity),
    onRemove: (itemId) => console.log('Remove item:', itemId),
  },
}

export const CartList: Story = {
  render: () => (
    <div className="space-y-4 max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
      <CartItem
        cartItem={sampleCartItem}
        onUpdateQuantity={(itemId, quantity) => console.log('Update quantity:', itemId, quantity)}
        onRemove={(itemId) => console.log('Remove item:', itemId)}
      />
      <CartItem
        cartItem={{
          menuItem: {
            ...sampleMenuItem,
            id: '2',
            name: 'Caesar Salad',
            description: 'Crisp romaine lettuce with parmesan and croutons',
            isVegetarian: true,
            price: 12.99,
            image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
          },
          quantity: 1,
          specialInstructions: 'Dressing on the side',
        }}
        onUpdateQuantity={(itemId, quantity) => console.log('Update quantity:', itemId, quantity)}
        onRemove={(itemId) => console.log('Remove item:', itemId)}
      />
      <CartItem
        cartItem={{
          menuItem: {
            ...sampleMenuItem,
            id: '3',
            name: 'Garlic Bread',
            description: 'Freshly baked bread with garlic and herbs',
            isVegetarian: true,
            price: 6.99,
            image: 'https://images.unsplash.com/photo-1619985045512-628e5c2af8c8?w=400&h=300&fit=crop',
          },
          quantity: 3,
        }}
        onUpdateQuantity={(itemId, quantity) => console.log('Update quantity:', itemId, quantity)}
        onRemove={(itemId) => console.log('Remove item:', itemId)}
      />
    </div>
  ),
}