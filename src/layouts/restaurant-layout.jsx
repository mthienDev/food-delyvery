import { Outlet } from 'react-router-dom'
import MobileFrame from '../components/ui/mobile-frame'

/**
 * Layout wrapper for restaurant/chef-facing interface.
 * Each page manages its own bottom nav — not shared here.
 */
export default function RestaurantLayout() {
  return (
    <MobileFrame>
      <Outlet />
    </MobileFrame>
  )
}
