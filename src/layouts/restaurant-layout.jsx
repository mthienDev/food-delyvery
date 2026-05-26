import { Outlet } from 'react-router-dom'
import MobileFrame from '../components/ui/mobile-frame'
import RestaurantBottomNav from '../components/restaurant/restaurant-bottom-nav'

/**
 * Layout wrapper for restaurant/chef-facing interface.
 * Renders mobile frame + persistent bottom navigation.
 */
export default function RestaurantLayout() {
  return (
    <MobileFrame>
      <div className="flex flex-col h-full">
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
        <RestaurantBottomNav />
      </div>
    </MobileFrame>
  )
}
