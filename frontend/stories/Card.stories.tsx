import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardAction } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, MapPin, Star } from 'lucide-react'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Basic Card</CardTitle>
        <CardDescription>
          A simple card example with header and content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content area of the card.</p>
      </CardContent>
    </Card>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card with Action</CardTitle>
        <CardDescription>
          A card with an action button in the header.
        </CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">Edit</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>This card has an action button positioned in the header area.</p>
      </CardContent>
    </Card>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card with Footer</CardTitle>
        <CardDescription>
          A complete card with header, content, and footer.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card includes a footer section with actions.</p>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  ),
}

export const RestaurantCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Mario's Italian Bistro
          <Badge variant="secondary">
            <Star className="w-3 h-3" />
            4.8
          </Badge>
        </CardTitle>
        <CardDescription>Authentic Italian cuisine</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>25-35 min</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>Downtown District</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Menu</Button>
      </CardFooter>
    </Card>
  ),
}

export const MenuItemCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Margherita Pizza</CardTitle>
        <CardDescription>
          Fresh mozzarella, tomato sauce, basil, and olive oil
        </CardDescription>
        <CardAction>
          <span className="text-lg font-semibold">$18.99</span>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Badge variant="outline">Vegetarian</Badge>
          <Badge variant="secondary">Popular</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  ),
}