import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/restaurant-portal',         icon: '📊', label: 'Dashboard', end: true },
  { to: '/restaurant-portal/orders',  icon: '🧾', label: 'Orders' },
  { to: '/restaurant-portal/menu',    icon: '🍽️', label: 'Menu' },
  { to: '/restaurant-portal/profile', icon: '🏪', label: 'Profile' },
]

/**
 * Persistent bottom navigation bar for restaurant/chef interface.
 */
export default function RestaurantBottomNav() {
  return (
    <nav className="flex items-center justify-around bg-white border-t border-gray-100 px-2 py-2 pb-safe">
      {NAV_ITEMS.map(({ to, icon, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${
              isActive ? 'text-green-600' : 'text-gray-400'
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
