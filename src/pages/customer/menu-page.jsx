/**
 * Customer Menu/Profile page — hamburger menu drawer.
 */
import { useNavigate } from 'react-router-dom';
import { IconChevronRight } from '../../components/ui/icons';
import {
  IconPersonalInfo,
  IconAddress,
  IconCartMenu,
  IconFavourite,
  IconNotifications,
  IconPaymentMethod,
  IconFAQ,
  IconUserReviews,
  IconSettings,
  IconLogout,
} from '../../components/ui/profile-menu-icons';
import useAuthStore from '../../store/auth-store';

/** Single row in a menu section */
function MenuItem({ icon, label, onPress, danger = false }) {
  return (
    <button onClick={onPress} className="flex items-center gap-4 w-full">
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
        {icon}
      </div>
      <span
        className={`flex-1 text-left  ${danger ? 'text-[#ef4444]' : 'text-[#32343E]'}`}
      >
        {label}
      </span>
      <IconChevronRight color={danger ? '#ef4444' : '#747783'} />
    </button>
  );
}

/** Card group with dividers between items */
function MenuSection({ items }) {
  return (
    <div className="bg-[#f6f6f6] rounded-2xl overflow-hidden p-5 flex flex-col gap-4">
      {items.map(item => (
        <div key={item.label}>
          <MenuItem {...item} />
        </div>
      ))}
    </div>
  );
}

export default function MenuPage() {
  const navigate = useNavigate();
  const user = useAuthStore(s => s.user);
  const logout = useAuthStore(s => s.logout);
  const initials = (user?.name ?? 'U').slice(0, 2).toUpperCase();

  const section1 = [
    { icon: <IconPersonalInfo />, label: 'Personal Info', onPress: () => navigate('/personal-info') },
    { icon: <IconAddress />, label: 'Addresses', onPress: () => navigate('/my-address') },
  ];

  const section2 = [
    { icon: <IconCartMenu />, label: 'Cart', onPress: () => navigate('/cart') },
    { icon: <IconFavourite />, label: 'Favourite', onPress: () => {} },
    { icon: <IconNotifications />, label: 'Notifications', onPress: () => {} },
    {
      icon: <IconPaymentMethod />,
      label: 'Payment Method',
      onPress: () => navigate('/payment-method'),
    },
  ];

  const section3 = [
    { icon: <IconFAQ />, label: 'FAQs', onPress: () => {} },
    { icon: <IconUserReviews />, label: 'User Reviews', onPress: () => {} },
    { icon: <IconSettings />, label: 'Settings', onPress: () => {} },
  ];

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className="flex flex-col h-svh bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-11.25 h-11.25 rounded-full bg-[#ECF0F4] flex items-center justify-center"
          >
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
              <path
                d="M8 1L1 8l7 7"
                stroke="#181c2e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <p className="text-[17px] font-bold text-[#181c2e]">Menu</p>
        </div>
        <button className="w-11.25 h-11.25 rounded-full bg-[#ECF0F4] flex items-center justify-center">
          <svg width="18" height="5" viewBox="0 0 18 5" fill="none">
            <circle cx="2.5" cy="2.5" r="2" fill="#181c2e" />
            <circle cx="9" cy="2.5" r="2" fill="#181c2e" />
            <circle cx="15.5" cy="2.5" r="2" fill="#181c2e" />
          </svg>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-8 flex flex-col">
        {/* Profile info */}
        <div className="flex items-center gap-8 mb-8">
          <div className="w-[100px] h-[100px] rounded-full bg-[#FFC6AE] flex items-center justify-center shrink-0 text-[22px] font-bold text-white">
            {initials}
          </div>
          <div>
            <p className="text-[18px] font-bold text-[#32343E] leading-snug">
              {user.name ?? 'Guest'}
            </p>
            <p className="text-[14px] text-[#A0A5BA] mt-0.5">
              I love fast food
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <MenuSection items={section1} />
          <MenuSection items={section2} />
          <MenuSection items={section3} />

          {/* Log Out */}
          <div className="bg-[#f6f6f6] rounded-2xl p-5 overflow-hidden">
            <MenuItem
              icon={<IconLogout />}
              label="Log Out"
              onPress={handleLogout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
