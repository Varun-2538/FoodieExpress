# Food Delivery MVP

A modern food delivery application built with Next.js 14, TypeScript, and Tailwind CSS. This MVP focuses on the core customer journey: browse restaurants → select restaurant → add items to cart.

## 🚀 Features

- **Restaurant Discovery**: Browse restaurants with search and filtering
- **Menu Browsing**: View detailed restaurant menus with categories
- **Cart Management**: Add items to cart with quantity controls
- **Responsive Design**: Mobile-first design that works on all devices
- **Accessibility**: WCAG compliant with screen reader support
- **Type Safety**: Full TypeScript implementation
- **Component Library**: Storybook for component development
- **Testing**: Jest and Testing Library setup

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Backend**: Supabase (configured for future use)
- **Testing**: Jest + Testing Library
- **Component Development**: Storybook 8.x
- **Code Quality**: ESLint + Prettier

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🧪 Testing

Run tests:
\`\`\`bash
npm run test
\`\`\`

Run tests in watch mode:
\`\`\`bash
npm run test:watch
\`\`\`

Generate coverage report:
\`\`\`bash
npm run test:coverage
\`\`\`

## 📚 Storybook

Launch Storybook for component development:
\`\`\`bash
npm run storybook
\`\`\`

## 🏗 Project Structure

\`\`\`
├── app/                    # Next.js 14 app directory
│   ├── page.tsx           # Home page (restaurant list)
│   ├── restaurant/[id]/   # Restaurant detail pages
│   ├── cart/              # Cart page
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── restaurant/       # Restaurant-specific components
│   ├── cart/            # Cart-specific components
│   └── layout/          # Layout components
├── lib/                  # Utilities and configurations
│   ├── types/           # TypeScript type definitions
│   ├── store/           # Zustand store setup
│   ├── utils/           # Helper functions
│   └── supabase/        # Supabase client setup
├── data/                # Mock data
├── stories/             # Storybook stories
└── __tests__/           # Test files
\`\`\`

## 🎯 Core Features

### Restaurant Discovery
- Grid layout of restaurant cards
- Search by restaurant name or cuisine
- Rating and delivery time display
- Open/closed status indicators

### Restaurant Detail & Menu
- Restaurant header with key information
- Categorized menu display
- Menu items with descriptions and pricing
- Add to cart functionality

### Cart Management
- Persistent cart state with localStorage
- Quantity controls for each item
- Order total calculation
- Restaurant switching validation

## 🔧 Development Guidelines

### Component Rules
- Max 300 lines per component
- Composition over inheritance
- Pure functions where possible
- TypeScript strict mode enabled
- Prop validation with TypeScript interfaces

### SOLID Principles
- **Single Responsibility**: Each component has one clear purpose
- **Open/Closed**: Components extensible through props
- **Liskov Substitution**: Consistent interfaces across similar components
- **Interface Segregation**: Minimal, focused prop interfaces
- **Dependency Inversion**: Abstract dependencies through interfaces

### Accessibility
- WCAG Level A compliance
- Screen reader support
- Keyboard navigation
- Focus management
- Semantic HTML elements

## 🚀 Deployment

The application is ready for deployment on Vercel:

1. Connect your repository to Vercel
2. Configure environment variables (if using Supabase)
3. Deploy with automatic builds on push

## 🔮 Future Enhancements

- User authentication and profiles
- Real-time order tracking
- Payment integration
- Restaurant admin dashboard
- Push notifications
- Multi-language support

## 📄 License

This project is licensed under the MIT License.
\`\`\`

```typescript file="" isHidden
