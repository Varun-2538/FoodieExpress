import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@/components/ui/badge'
import { Star, Clock, Leaf, Flame } from 'lucide-react'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'success', 'warning'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Popular',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'New',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Sold Out',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Limited Time',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Available',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Few Left',
  },
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge>
        <Star className="w-3 h-3 mr-1" />
        4.8 Rating
      </Badge>
      <Badge variant="secondary">
        <Clock className="w-3 h-3 mr-1" />
        Fast Delivery
      </Badge>
      <Badge variant="success">
        <Leaf className="w-3 h-3 mr-1" />
        Vegetarian
      </Badge>
      <Badge variant="warning">
        <Flame className="w-3 h-3 mr-1" />
        Spicy
      </Badge>
    </div>
  ),
}

export const RestaurantStatus: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="success">Open</Badge>
      <Badge variant="destructive">Closed</Badge>
      <Badge variant="warning">Closing Soon</Badge>
      <Badge variant="outline">Pre-order</Badge>
    </div>
  ),
}

export const MenuItemTags: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="success">Vegetarian</Badge>
      <Badge variant="outline">Gluten Free</Badge>
      <Badge variant="warning">Spicy</Badge>
      <Badge>Chef's Special</Badge>
      <Badge variant="secondary">New</Badge>
    </div>
  ),
}

export const DeliveryInfo: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge>
        <Clock className="w-3 h-3 mr-1" />
        25-35 min
      </Badge>
      <Badge variant="outline">Free Delivery</Badge>
      <Badge variant="secondary">$2.99 Delivery</Badge>
    </div>
  ),
}