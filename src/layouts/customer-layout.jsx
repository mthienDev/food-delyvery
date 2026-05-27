import { Outlet } from 'react-router-dom'
import MobileFrame from '../components/ui/mobile-frame'

/**
 * Layout wrapper for customer-facing interface.
 * Renders mobile frame with page content.
 */
export default function CustomerLayout() {
  return (
    <MobileFrame>
      <Outlet />
    </MobileFrame>
  )
}
