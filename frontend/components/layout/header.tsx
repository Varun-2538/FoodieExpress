"use client"

import Link from "next/link"
import { ShoppingCart, MapPin, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/store/cart-store"
import { useAuth } from "@/lib/contexts/auth-context"
import { initiateGoogleSignIn } from "@/lib/api/auth"
import { useState } from "react"

export function Header() {
  const itemCount = useCartStore((state) => state.getItemCount())
  const { user, isAuthenticated, signOut: handleSignOut, loading } = useAuth()
  const [signingIn, setSigningIn] = useState(false)

  const handleSignIn = async () => {
    try {
      setSigningIn(true)
      const url = await initiateGoogleSignIn()
      window.location.href = url
    } catch (error) {
      console.error('Sign in error:', error)
      setSigningIn(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">F</span>
          </div>
          <span className="font-bold text-xl">FoodieExpress</span>
        </Link>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <MapPin className="w-4 h-4 mr-2" />
            Bangalore
          </Button>

          <Link href="/cart">
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="w-4 h-4" />
              {itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {!loading && (
            <>
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="hidden md:flex">
                    <User className="w-4 h-4 mr-2" />
                    {user?.name || user?.email}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 md:mr-2" />
                    <span className="hidden md:inline">Sign Out</span>
                  </Button>
                </div>
              ) : (
                <Button size="sm" onClick={handleSignIn} disabled={signingIn}>
                  <User className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">
                    {signingIn ? 'Signing in...' : 'Sign In'}
                  </span>
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  )
}
