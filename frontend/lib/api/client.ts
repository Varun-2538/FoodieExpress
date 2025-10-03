/**
 * API Client for FoodieExpress Backend
 * Handles all HTTP communication with the backend server
 */

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  }

  /**
   * Get access token from localStorage
   */
  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
  }

  /**
   * Set access token in localStorage
   */
  private setToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('access_token', token);
  }

  /**
   * Remove access token from localStorage
   */
  private removeToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('access_token');
  }

  /**
   * Generic request method
   */
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    const token = this.getToken();
    const url = `${this.baseUrl}${endpoint}`;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    };

    console.log('API Request:', {
      url,
      method: options?.method || 'GET',
      baseUrl: this.baseUrl,
      endpoint,
    });

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      console.log('API Response:', {
        status: response.status,
        ok: response.ok,
        url,
      });

      const data = await response.json();

      if (!response.ok) {
        // If 401, clear token and throw without logging (expected auth error)
        if (response.status === 401) {
          this.removeToken();
          const error = new Error(data.error || 'Invalid or expired token');
          (error as any).status = 401;
          (error as any).silent = true;
          throw error;
        }
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      // Don't log 401 errors as they're expected when token expires
      if (!(error as any).silent) {
        console.error('API Error Details:', {
          url,
          error,
          message: error instanceof Error ? error.message : 'Unknown error',
          baseUrl: this.baseUrl,
        });
      }
      throw error;
    }
  }

  // ==================== Health Check ====================

  async checkHealth(): Promise<ApiResponse> {
    return this.request('/health');
  }

  // ==================== Authentication ====================

  /**
   * Initiate Google OAuth sign-in
   */
  async signInWithGoogle(redirectUrl?: string): Promise<ApiResponse<{ url: string }>> {
    return this.request('/auth/google', {
      method: 'POST',
      body: JSON.stringify({
        redirectUrl: redirectUrl || `${window.location.origin}/auth/callback`,
      }),
    });
  }

  /**
   * Exchange OAuth code for session
   */
  async exchangeCodeForSession(code: string): Promise<ApiResponse<{
    session: { access_token: string; refresh_token: string };
    user: any;
  }>> {
    const response = await this.request<{
      session: { access_token: string; refresh_token: string };
      user: any;
    }>('/auth/exchange-code', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });

    // Save token
    if (response.success && response.data?.session.access_token) {
      this.setToken(response.data.session.access_token);
    }

    return response;
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<ApiResponse> {
    return this.request('/auth/me');
  }

  /**
   * Sign out current user
   */
  async signOut(): Promise<ApiResponse> {
    try {
      const response = await this.request('/auth/signout', {
        method: 'POST',
      });
      this.removeToken();
      return response;
    } catch (error) {
      this.removeToken();
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // ==================== Restaurants ====================

  /**
   * Get all restaurants
   */
  async getRestaurants(params?: {
    search?: string;
    open?: boolean;
  }): Promise<ApiResponse> {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('search', params.search);
    if (params?.open !== undefined) queryParams.append('open', String(params.open));

    const query = queryParams.toString();
    return this.request(`/restaurants${query ? `?${query}` : ''}`);
  }

  /**
   * Get restaurant by ID
   */
  async getRestaurant(id: string): Promise<ApiResponse> {
    return this.request(`/restaurants/${id}`);
  }

  // ==================== Menu Items ====================

  /**
   * Get menu items for a restaurant
   */
  async getMenuItems(params: {
    restaurantId: string;
    available?: boolean;
    category?: string;
  }): Promise<ApiResponse> {
    const queryParams = new URLSearchParams({
      restaurantId: params.restaurantId,
    });
    if (params.available !== undefined) {
      queryParams.append('available', String(params.available));
    }
    if (params.category) {
      queryParams.append('category', params.category);
    }

    return this.request(`/menu-items?${queryParams.toString()}`);
  }

  /**
   * Get menu item by ID
   */
  async getMenuItem(id: string): Promise<ApiResponse> {
    return this.request(`/menu-items/${id}`);
  }

  // ==================== Orders ====================

  /**
   * Create a new order
   */
  async createOrder(orderData: {
    restaurantId: string;
    items: Array<{
      menuItemId: string;
      quantity: number;
      specialInstructions?: string;
    }>;
    deliveryAddress: string;
    specialInstructions?: string;
  }): Promise<ApiResponse> {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  /**
   * Get user's orders
   */
  async getOrders(): Promise<ApiResponse> {
    return this.request('/orders');
  }

  /**
   * Get order by ID
   */
  async getOrder(id: string): Promise<ApiResponse> {
    return this.request(`/orders/${id}`);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export class for testing
export { ApiClient };