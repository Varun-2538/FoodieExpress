import type { Meta, StoryObj } from '@storybook/react'
import { MenuItem } from '@/components/restaurant/menu-item'
import type { MenuItem as MenuItemType } from '@/lib/types'

const meta: Meta<typeof MenuItem> = {
  title: 'Features/MenuItem',
  component: MenuItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const sampleMenuItem: MenuItemType = {
  id: '1',
  restaurantId: 'rest-1',
  name: 'Margherita Pizza',
  description: 'Fresh mozzarella, tomato sauce, basil leaves, and olive oil on our signature thin crust',
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
    onAddToCart: (item) => console.log('Added to cart:', item.name),
  },
}

export const NonVegetarian: Story = {
  args: {
    menuItem: {
      ...sampleMenuItem,
      id: '2',
      name: 'Pepperoni Pizza',
      description: 'Classic pepperoni with mozzarella cheese and our signature tomato sauce',
      isVegetarian: false,
      price: 21.99,
      preparationTime: 18,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    },
    onAddToCart: (item) => console.log('Added to cart:', item.name),
  },
}

export const Unavailable: Story = {
  args: {
    menuItem: {
      ...sampleMenuItem,
      id: '3',
      name: 'Special Truffle Pasta',
      description: 'Premium pasta with truffle oil, parmesan, and wild mushrooms',
      isAvailable: false,
      isVegetarian: true,
      price: 32.99,
      preparationTime: 25,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
    },
    onAddToCart: (item) => console.log('Added to cart:', item.name),
  },
}

export const ExpensiveItem: Story = {
  args: {
    menuItem: {
      ...sampleMenuItem,
      id: '4',
      name: 'Lobster Thermidor',
      description: 'Fresh Atlantic lobster with a rich, creamy sauce, topped with cheese and broiled to perfection',
      isVegetarian: false,
      price: 65.00,
      preparationTime: 35,
      image: 'https://images.unsplash.com/photo-1582731080995-b0f3d45d0546?w=400&h=300&fit=crop',
    },
    onAddToCart: (item) => console.log('Added to cart:', item.name),
  },
}

export const QuickItem: Story = {
  args: {
    menuItem: {
      ...sampleMenuItem,
      id: '5',
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce, parmesan cheese, croutons, and classic Caesar dressing',
      isVegetarian: true,
      price: 12.99,
      preparationTime: 5,
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
    },
    onAddToCart: (item) => console.log('Added to cart:', item.name),
  },
}

export const LongDescription: Story = {
  args: {
    menuItem: {
      ...sampleMenuItem,
      id: '6',
      name: 'Chef\'s Special Burger',
      description: 'Our signature 8oz beef patty with aged cheddar, caramelized onions, bacon, lettuce, tomato, pickles, and our house-made special sauce on a toasted brioche bun, served with truffle fries',
      isVegetarian: false,
      price: 24.99,
      preparationTime: 20,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    },
    onAddToCart: (item) => console.log('Added to cart:', item.name),
  },
}

export const Disabled: Story = {
  args: {
    menuItem: sampleMenuItem,
    disabled: true,
    onAddToCart: (item) => console.log('Added to cart:', item.name),
  },
}

export const MenuSection: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Pizza Selection</h2>
      <MenuItem
        menuItem={sampleMenuItem}
        onAddToCart={(item) => console.log('Added to cart:', item.name)}
      />
      <MenuItem
        menuItem={{
          ...sampleMenuItem,
          id: '2',
          name: 'Pepperoni Pizza',
          description: 'Classic pepperoni with mozzarella cheese',
          isVegetarian: false,
          price: 21.99,
        }}
        onAddToCart={(item) => console.log('Added to cart:', item.name)}
      />
      <MenuItem
        menuItem={{
          ...sampleMenuItem,
          id: '3',
          name: 'Quattro Formaggi',
          description: 'Four cheese pizza with mozzarella, gorgonzola, parmesan, and ricotta',
          price: 24.99,
          isAvailable: false,
        }}
        onAddToCart={(item) => console.log('Added to cart:', item.name)}
      />
    </div>
  ),
}