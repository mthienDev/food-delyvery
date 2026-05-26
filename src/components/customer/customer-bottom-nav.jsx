import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/',        icon: '🏠', label: 'Home' },
  { to: '/search',  icon: '🔍', label: 'Search' },
  { to: '/cart',    icon: '🛒', label: 'Cart' },
  { to: '/orders',  icon: '📦', label: 'Orders' },
  { to: '/profile', icon: '👤', label: 'Profile' },
]

/**
 * Persistent bottom navigation bar for customer interface.
 */
export default function CustomerBottomNav() {
  return (
    <nav className="flex items-center justify-around bg-white border-t border-gray-100 px-2 py-2 pb-safe">
      {NAV_ITEMS.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${
              isActive ? 'text-orange-500' : 'text-gray-400'
            }`
          }
        >
          <span className="text-xl leading-none">{icon}</span>
          <span className="text-[10px] font-medium">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
