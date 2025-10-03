import type { Meta, StoryObj } from '@storybook/react'
import { RestaurantCard } from '@/components/restaurant/restaurant-card'
import type { Restaurant } from '@/lib/types'

const meta: Meta<typeof RestaurantCard> = {
  title: 'Features/RestaurantCard',
  component: RestaurantCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const sampleRestaurant: Restaurant = {
  id: '1',
  name: "Mario's Italian Bistro",
  image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
  rating: 4.8,
  deliveryTime: '25-35 min',
  cuisineTypes: ['Italian', 'Pizza', 'Pasta'],
  minimumOrder: 15,
  deliveryFee: 2.99,
  isOpen: true,
  address: '123 Main St, Downtown',
}

export const Default: Story = {
  args: {
    restaurant: sampleRestaurant,
    onClick: (restaurant) => console.log('Clicked restaurant:', restaurant.name),
  },
}

export const Closed: Story = {
  args: {
    restaurant: {
      ...sampleRestaurant,
      isOpen: false,
    },
    onClick: (restaurant) => console.log('Clicked restaurant:', restaurant.name),
  },
}

export const FreeDelivery: Story = {
  args: {
    restaurant: {
      ...sampleRestaurant,
      name: 'Sushi Palace',
      cuisineTypes: ['Japanese', 'Sushi', 'Asian'],
      deliveryFee: 0,
      rating: 4.9,
      deliveryTime: '20-30 min',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    },
    onClick: (restaurant) => console.log('Clicked restaurant:', restaurant.name),
  },
}

export const HighMinimumOrder: Story = {
  args: {
    restaurant: {
      ...sampleRestaurant,
      name: 'Fine Dining Steakhouse',
      cuisineTypes: ['American', 'Steakhouse', 'Fine Dining'],
      minimumOrder: 50,
      deliveryFee: 5.99,
      rating: 4.6,
      deliveryTime: '45-60 min',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    },
    onClick: (restaurant) => console.log('Clicked restaurant:', restaurant.name),
  },
}

export const LongAddress: Story = {
  args: {
    restaurant: {
      ...sampleRestaurant,
      name: 'Local Burger Joint',
      cuisineTypes: ['American', 'Burgers', 'Fast Food'],
      address: '456 Very Long Street Name, Neighborhood District, City',
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
    },
    onClick: (restaurant) => console.log('Clicked restaurant:', restaurant.name),
  },
}

export const VariousStates: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      <RestaurantCard
        restaurant={sampleRestaurant}
        onClick={(restaurant) => console.log('Clicked:', restaurant.name)}
      />
      <RestaurantCard
        restaurant={{
          ...sampleRestaurant,
          id: '2',
          name: 'Closed Restaurant',
          isOpen: false,
        }}
        onClick={(restaurant) => console.log('Clicked:', restaurant.name)}
      />
      <RestaurantCard
        restaurant={{
          ...sampleRestaurant,
          id: '3',
          name: 'Free Delivery Pizza',
          cuisineTypes: ['Pizza', 'Italian'],
          deliveryFee: 0,
          rating: 4.5,
        }}
        onClick={(restaurant) => console.log('Clicked:', restaurant.name)}
      />
    </div>
  ),
}