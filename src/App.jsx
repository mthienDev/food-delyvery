import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CustomerLayout from './layouts/customer-layout'
import RestaurantLayout from './layouts/restaurant-layout'

// Customer pages
import CustomerHome from './pages/customer/home-page'
import CustomerSearch from './pages/customer/search-page'
import CustomerCart from './pages/customer/cart-page'
import CustomerOrders from './pages/customer/orders-page'
import CustomerProfile from './pages/customer/profile-page'
import RestaurantDetail from './pages/customer/restaurant-detail-page'
import FoodDetail from './pages/customer/food-detail-page'
import OrderTracking from './pages/customer/order-tracking-page'

// Restaurant pages
import RestaurantDashboard from './pages/restaurant/dashboard-page'
import RestaurantMenu from './pages/restaurant/menu-page'
import RestaurantOrders from './pages/restaurant/orders-page'
import RestaurantProfile from './pages/restaurant/profile-page'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer interface */}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<CustomerHome />} />
          <Route path="search" element={<CustomerSearch />} />
          <Route path="cart" element={<CustomerCart />} />
          <Route path="orders" element={<CustomerOrders />} />
          <Route path="profile" element={<CustomerProfile />} />
          <Route path="restaurant/:id" element={<RestaurantDetail />} />
          <Route path="food/:id" element={<FoodDetail />} />
          <Route path="tracking/:id" element={<OrderTracking />} />
        </Route>

        {/* Restaurant/Chef interface */}
        <Route path="/restaurant-portal" element={<RestaurantLayout />}>
          <Route index element={<RestaurantDashboard />} />
          <Route path="menu" element={<RestaurantMenu />} />
          <Route path="orders" element={<RestaurantOrders />} />
          <Route path="profile" element={<RestaurantProfile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
