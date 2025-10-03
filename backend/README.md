# FoodieExpress Backend

A production-ready Express.js + TypeScript backend with Supabase authentication and database.

## 🏗️ Architecture

This backend follows **clean architecture principles** with proper separation of concerns:

```
src/
├── config/          # Configuration files (env, supabase)
├── controllers/     # Request handlers (HTTP layer)
├── services/        # Business logic layer
├── repositories/    # Database access layer
├── middleware/      # Express middleware (auth, error handling)
├── routes/          # API route definitions
├── types/           # TypeScript type definitions
└── server.ts        # Application entry point
```

### Layer Responsibilities

- **Controllers**: Handle HTTP requests/responses, validation, and status codes
- **Services**: Contain business logic, orchestrate repositories
- **Repositories**: Direct database access via Supabase
- **Middleware**: Authentication, error handling, logging

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Then edit `.env` with your actual values:

```env
# Server
PORT=5000
NODE_ENV=development

# Supabase (from your Supabase dashboard)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Google OAuth (from Google Console)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Frontend
FRONTEND_URL=http://localhost:3000

# JWT
JWT_SECRET=your_random_secret_key_here
```

### 3. Configure Supabase Authentication

1. Go to your Supabase Dashboard → Authentication → Providers
2. Enable Google OAuth provider
3. Add your Google Client ID and Secret
4. Add authorized redirect URLs:
   - `http://localhost:3000/auth/callback` (development)
   - Your production URL (when deployed)

### 4. Run the Server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production build**:
```bash
npm run build
npm start
```

The server will start at: `http://localhost:5000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/google` - Initiate Google OAuth
- `POST /api/auth/exchange-code` - Exchange OAuth code for session
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/signout` - Sign out (protected)

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants?search=pizza` - Search restaurants
- `GET /api/restaurants?open=true` - Get open restaurants
- `GET /api/restaurants/:id` - Get restaurant by ID

### Menu Items
- `GET /api/menu-items?restaurantId=xxx` - Get menu items
- `GET /api/menu-items?restaurantId=xxx&available=true` - Available items
- `GET /api/menu-items?restaurantId=xxx&category=Appetizers` - By category
- `GET /api/menu-items/:id` - Get menu item by ID

### Orders (All Protected)
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details

### Health Check
- `GET /api/health` - Server health status

## 🔐 Authentication Flow

1. **Frontend** calls `POST /api/auth/google` with redirect URL
2. **Backend** returns Google OAuth URL
3. **User** authenticates with Google
4. **Google** redirects to frontend with authorization code
5. **Frontend** calls `POST /api/auth/exchange-code` with code
6. **Backend** returns session token
7. **Frontend** stores token and uses in `Authorization: Bearer <token>` header

## 🛠️ Development

### Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── env.ts              # Environment configuration
│   │   └── supabase.ts         # Supabase client setup
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── restaurant.controller.ts
│   │   ├── menu-item.controller.ts
│   │   └── order.controller.ts
│   ├── services/
│   │   ├── restaurant.service.ts
│   │   ├── menu-item.service.ts
│   │   └── order.service.ts
│   ├── repositories/
│   │   ├── restaurant.repository.ts
│   │   ├── menu-item.repository.ts
│   │   └── order.repository.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts   # JWT verification
│   │   └── error.middleware.ts  # Error handling
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── restaurant.routes.ts
│   │   ├── menu-item.routes.ts
│   │   ├── order.routes.ts
│   │   └── index.ts
│   ├── types/
│   │   ├── database.types.ts    # Supabase types
│   │   └── index.ts             # Application types
│   ├── app.ts                   # Express app setup
│   └── server.ts                # Entry point
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

### Adding New Features

1. **Add types** in `src/types/`
2. **Create repository** methods for DB access
3. **Create service** with business logic
4. **Create controller** to handle requests
5. **Add routes** in `src/routes/`

## 🔧 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production build

## 📦 Dependencies

### Production
- `express` - Web framework
- `@supabase/supabase-js` - Supabase client
- `cors` - CORS middleware
- `dotenv` - Environment variables

### Development
- `typescript` - TypeScript compiler
- `ts-node` - TypeScript execution
- `nodemon` - Auto-reload during development
- `@types/*` - TypeScript definitions

## 🌐 CORS Configuration

The backend is configured to accept requests from your frontend:
- Development: `http://localhost:3000`
- Production: Update `FRONTEND_URL` in `.env`

## 🔒 Security Best Practices

✅ Environment variables for sensitive data
✅ JWT token verification on protected routes
✅ Supabase Row Level Security (RLS)
✅ Input validation in controllers
✅ Error handling middleware
✅ CORS configuration

## 🚀 Deployment

1. Build the project: `npm run build`
2. Set environment variables on your hosting platform
3. Run: `npm start`
4. Update `FRONTEND_URL` to your production domain

## 📝 Notes

- **Authentication**: Users must sign in with Google before browsing restaurants
- **Order Creation**: Validates restaurant status, menu item availability, and minimum order
- **Database**: All queries use Supabase with proper type safety
- **Error Handling**: Centralized error handling with meaningful messages