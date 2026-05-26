import { Outlet } from 'react-router-dom'
import MobileFrame from '../components/ui/mobile-frame'
import CustomerBottomNav from '../components/customer/customer-bottom-nav'

/**
 * Layout wrapper for customer-facing interface.
 * Renders mobile frame + persistent bottom navigation.
 */
export default function CustomerLayout() {
  return (
    <MobileFrame>
      <div className="flex flex-col h-full">
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
        <CustomerBottomNav />
      </div>
    </MobileFrame>
  )
}
