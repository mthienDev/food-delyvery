// Figma ref: node 602:1518
import { NavLink, useNavigate } from 'react-router-dom';
import {
  IconGrid,
  IconHamburger,
  IconBell,
  IconUser,
  IconPlus,
} from '../ui/icons';

const ORANGE = '#FF7622';
const GRAY = '#9D9DAF';

/** Left-side nav items (Dashboard, Menu) */
const LEFT_ITEMS = [
  {
    to: '/restaurant-portal',
    label: 'Dashboard',
    end: true,
    Icon: IconGrid,
  },
  {
    to: '/restaurant-portal/menu',
    label: 'Menu',
    Icon: IconHamburger,
  },
];

/** Right-side nav items (Orders/bell, Profile) */
const RIGHT_ITEMS = [
  {
    to: '/restaurant-portal/notifications',
    label: 'Notifications',
    Icon: ({ color }) => <IconBell color={color} />,
  },
  {
    to: '/restaurant-portal/profile',
    label: 'Profile',
    Icon: IconUser,
  },
];

function NavItem({ to, end, label, Icon }) {
  return (
    <NavLink
      to={to}
      end={end}
      title={label}
      aria-label={label}
      className="flex items-center justify-center flex-1 py-1"
    >
      {({ isActive }) => (
        <Icon className="w-6 h-6" color={isActive ? ORANGE : GRAY} />
      )}
    </NavLink>
  );
}

/**
 * Bottom navigation bar for restaurant portal.
 * Import into each restaurant page individually — not used via layout.
 */
export default function RestaurantBottomNav() {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-around bg-white rounded-t-4xl shadow-[0_-4px_16px_rgba(0,0,0,0.07)] px-4 py-4 relative">
      {/* Left items */}
      {LEFT_ITEMS.map(({ to, end, label, Icon }) => (
        <NavItem key={to} to={to} end={end} label={label} Icon={Icon} />
      ))}

      {/* Center FAB button */}
      <div className="flex flex-col items-center gap-1 flex-1 relative">
        <button
          onClick={() => navigate('/restaurant-portal/add-item')}
          className="flex items-center justify-center w-14.25 h-14.25 rounded-full border-2 border-primary bg-[#FFF1F2]"
          aria-label="Add new item"
        >
          <IconPlus />
        </button>
      </div>

      {/* Right items */}
      {RIGHT_ITEMS.map(({ to, label, Icon }) => (
        <NavItem key={to} to={to} label={label} Icon={Icon} />
      ))}
    </nav>
  );
}
