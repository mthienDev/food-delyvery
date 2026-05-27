/**
 * Customer Home Page — entry point, composes home sub-components.
 */
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, RESTAURANTS } from '../../data/mock-home';
import HomeHeader from './home/home-header';
import useCartStore, { selectTotalCount } from '../../store/cart-store';
import useAuthStore from '../../store/auth-store';
import CategoryList from './home/category-list';
import RestaurantList from './home/restaurant-list';
import { IconSearch } from '../../components/ui/icons';
import OfferPopup from '../../components/ui/offer-popup';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning!';
  if (h < 17) return 'Good Afternoon!';
  return 'Good Evening!';
}

export default function HomePage() {
  const navigate = useNavigate();
  const cartCount = useCartStore(selectTotalCount);
  const user = useAuthStore(s => s.user);
  const firstName = user?.name?.split(' ')[0] ?? 'Halal';

  return (
    <div className="flex flex-col h-svh">
      <OfferPopup />
      <div className="shrink-0 bg-white px-6 pt-6 pb-2 z-10">
        <HomeHeader cartCount={cartCount} />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-12">
        <p className="text-[16px] text-[#1E1D1D] mt-7.5">
          Hey {firstName}, <span className="font-bold">{getGreeting()}</span>
        </p>

        {/* Search bar — click navigates to /search */}
        <button
          onClick={() => navigate('/search')}
          className="w-full h-15.5 rounded-2xl mt-4 bg-[#F8F8F8] flex items-center px-5 gap-3"
        >
          <IconSearch size={15} />
          <span className="text-[14px] text-[#676767] tracking-[-0.33px]">
            Search dishes, restaurants
          </span>
        </button>

        <div className="mt-8">
          <CategoryList categories={CATEGORIES} />
        </div>
        <div className="mt-8">
          <RestaurantList
            restaurants={RESTAURANTS.slice(0, 5)}
            onRestaurantPress={id => navigate(`/restaurant/${id}`)}
          />
        </div>
      </div>
    </div>
  );
}
