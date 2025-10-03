import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Search, Mail, Lock, User } from 'lucide-react'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="Enter your email" />
    </div>
  ),
}

export const SearchInput: Story = {
  render: () => {
    const SearchIcon = Search
    return (
      <div className="relative max-w-sm">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input className="pl-10" placeholder="Search restaurants..." />
      </div>
    )
  },
}

export const Password: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input id="password" type="password" className="pl-10" placeholder="Enter password" />
      </div>
    </div>
  ),
}

export const Email: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="email-icon">Email Address</Label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input id="email-icon" type="email" className="pl-10" placeholder="you@example.com" />
      </div>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
    value: 'Cannot edit this',
  },
}

export const Error: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="error-input">Username</Label>
      <Input
        id="error-input"
        aria-invalid={true}
        placeholder="Enter username"
        className="border-destructive"
      />
      <p className="text-sm text-destructive">Username is required</p>
    </div>
  ),
}

export const FoodDeliveryForm: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input id="name" className="pl-10" placeholder="John Doe" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="delivery-address">Delivery Address</Label>
        <Input id="delivery-address" placeholder="123 Main St, City, State" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" placeholder="(555) 123-4567" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="special-instructions">Special Instructions</Label>
        <Input id="special-instructions" placeholder="Ring doorbell, leave at door..." />
      </div>
    </div>
  ),
}