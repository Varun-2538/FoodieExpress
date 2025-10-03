import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Heart, Plus } from 'lucide-react'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    asChild: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Add to Cart',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'View Menu',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Remove Item',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Cancel Order',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Back',
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'View Restaurant',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Quick Add',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Checkout Now',
  },
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <ShoppingCart />
        Add to Cart
      </>
    ),
  },
}

export const IconOnly: Story = {
  args: {
    variant: 'outline',
    size: 'icon',
    children: <Heart />,
  },
}

export const Loading: Story = {
  args: {
    disabled: true,
    children: 'Processing...',
  },
}

export const FoodDeliveryActions: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Button>
        <Plus />
        Add to Cart
      </Button>
      <Button variant="outline">
        <Heart />
        Save
      </Button>
      <Button variant="secondary">View Details</Button>
      <Button variant="destructive" size="sm">Remove</Button>
    </div>
  ),
}