import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import useAuthStore from './store/auth-store';
import CustomerLayout from './layouts/customer-layout';
import RestaurantLayout from './layouts/restaurant-layout';
import SplashPage from './pages/splash-page';
import OnboardingPage from './pages/onboarding-page';
import LoginPage from './pages/login-page';
import SignUpPage from './pages/signup-page';
import ForgotPasswordPage from './pages/forgot-password-page';
import VerificationPage from './pages/verification-page';

// Customer pages
import CustomerHome from './pages/customer/home-page';
import CustomerSearch from './pages/customer/search-page';
import CustomerCart from './pages/customer/cart-page';
import CustomerOrders from './pages/customer/orders-page';
import CategoryPage from './pages/customer/category-page';
import RestaurantDetail from './pages/customer/restaurant-detail-page';
import FoodDetail from './pages/customer/food-detail-page';
import OrderTracking from './pages/customer/order-tracking-page';
import PaymentPage from './pages/customer/payment-page';
import PaymentMethodPage from './pages/customer/payment-method-page';
import AddCardPage from './pages/customer/add-card-page';
import OrderSuccessPage from './pages/customer/order-success-page';
import MenuPage from './pages/customer/menu-page';
import PersonalInfoPage from './pages/customer/personal-info-page';
import EditProfilePage from './pages/customer/edit-profile-page';
import MyAddressPage from './pages/customer/my-address-page';
import AddAddressPage from './pages/customer/add-address-page';

// Restaurant pages
import RestaurantDashboard from './pages/restaurant/dashboard-page';
import RestaurantMenu from './pages/restaurant/menu-page';
import RestaurantOrders from './pages/restaurant/orders-page';
import RestaurantProfile from './pages/restaurant/profile-page';
import AddNewItemPage from './pages/restaurant/add-new-item-page';
import RestaurantFoodDetail from './pages/restaurant/food-detail-page';
import WithdrawSuccessfulPage from './pages/restaurant/withdraw-successful-page';
import RestaurantPersonalInfoPage from './pages/restaurant/personal-info-page';
import RestaurantNotificationPage from './pages/restaurant/notification-page';
import UserReviewsPage from './pages/restaurant/user-reviews-page';

/**
 * Lần đầu mở app (chưa có splashShown) → navigate sang /splash.
 * Set splashShown TRƯỚC khi navigate để chặn Strict Mode gọi effect 2 lần.
 * sessionStorage persist qua mọi React render cycle — đáng tin hơn useRef.
 */
function RequireSplash() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('splashShown')) {
      sessionStorage.setItem('splashShown', '1'); // lock trước khi navigate
      navigate('/splash', { replace: true });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!sessionStorage.getItem('splashShown')) return null;
  return <Outlet />;
}

/**
 * Bảo vệ các route private.
 * - Chưa đăng nhập → /login
 * - Sai role       → /login
 * - Hợp lệ         → render children qua <Outlet />
 */
function PrivateRoute({ role }) {
  const user = useAuthStore(s => s.user);
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/login" replace />;
  return <Outlet />;
}

/** Index route "/" — splash + auth đã được guard xử lý */
function HomeGuard() {
  return <CustomerHome />;
}

/** Catch-all: về home đúng role nếu đã login, ngược lại về /login */
function SplashGuard() {
  const user = useAuthStore(s => s.user);
  if (!user) return <Navigate to="/login" replace />;
  return (
    <Navigate
      to={user.role === 'restaurant' ? '/restaurant-portal' : '/'}
      replace
    />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Entry point — không cần check splash */}
        <Route path="/splash" element={<SplashPage />} />

        {/* Mọi route còn lại đều yêu cầu đã xem splash */}
        <Route element={<RequireSplash />}>
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verification" element={<VerificationPage />} />

          {/* Customer interface — yêu cầu role customer */}
          <Route element={<PrivateRoute role="customer" />}>
            <Route path="/" element={<CustomerLayout />}>
              <Route index element={<HomeGuard />} />
              <Route path="search" element={<CustomerSearch />} />
              <Route path="cart" element={<CustomerCart />} />
              <Route path="orders" element={<CustomerOrders />} />
              <Route path="category/:id" element={<CategoryPage />} />
              <Route path="restaurant/:id" element={<RestaurantDetail />} />
              <Route path="food/:id" element={<FoodDetail />} />
              <Route path="tracking/:id" element={<OrderTracking />} />
              <Route path="payment" element={<PaymentPage />} />
              <Route path="add-card" element={<AddCardPage />} />
              <Route path="order-success" element={<OrderSuccessPage />} />
              <Route path="menu" element={<MenuPage />} />
              <Route path="personal-info" element={<PersonalInfoPage />} />
              <Route path="edit-profile" element={<EditProfilePage />} />
              <Route path="payment-method" element={<PaymentMethodPage />} />
              <Route path="my-address" element={<MyAddressPage />} />
              <Route path="add-address" element={<AddAddressPage />} />
            </Route>
          </Route>

          {/* Restaurant/Chef interface — yêu cầu role restaurant */}
          <Route element={<PrivateRoute role="restaurant" />}>
            <Route path="/restaurant-portal" element={<RestaurantLayout />}>
              <Route index element={<RestaurantDashboard />} />
              <Route path="menu" element={<RestaurantMenu />} />
              <Route path="orders" element={<RestaurantOrders />} />
              <Route path="profile" element={<RestaurantProfile />} />
              <Route path="add-item" element={<AddNewItemPage />} />
              <Route path="food/:id" element={<RestaurantFoodDetail />} />
              <Route path="withdraw-success" element={<WithdrawSuccessfulPage />} />
              <Route path="personal-info" element={<RestaurantPersonalInfoPage />} />
              <Route path="notifications" element={<RestaurantNotificationPage />} />
              <Route path="user-reviews" element={<UserReviewsPage />} />
            </Route>
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<SplashGuard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
