/** Restaurant Profile — earnings overview + account menu */
// Figma ref: node 602:751

import { useNavigate } from 'react-router-dom';
import RestaurantBottomNav from '../../components/restaurant/restaurant-bottom-nav';
import { IconBack, IconChevronRight } from '../../components/ui/icons';
import {
  IconPersonalInfoR,
  IconSettingsR,
  IconWithdrawalR,
  IconOrderCountR,
  IconUserReviewsR,
  IconLogoutR,
} from '../../components/ui/restaurant-profile-icons';
import useAuthStore from '../../store/auth-store';

function MenuItem({ icon, label, value, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-4 w-full"
    >
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
        {icon}
      </div>
      <span className="flex-1 text-left text-[15px] text-[#32343E]">
        {label}
      </span>
      {value != null ? (
        <span className="text-[17px] font-bold text-[#9C9BA6]">{value}</span>
      ) : (
        <IconChevronRight color="#747783" />
      )}
    </button>
  );
}

function MenuCard({ items }) {
  return (
    <div className="bg-[#f6f6f6] rounded-2xl overflow-hidden p-5 flex flex-col gap-4">
      {items.map(item => (
        <MenuItem key={item.label} {...item} />
      ))}
    </div>
  );
}

export default function RestaurantProfilePage() {
  const navigate = useNavigate();
  const logout = useAuthStore(s => s.logout);

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className="bg-white">
      {/* ── Orange header ── */}
      <div className="bg-primary rounded-b-[25px] px-6 pt-12.5 pb-7.5">
        {/* Top row: back + title */}
        <div className="flex items-center gap-4 mb-11.25">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-11.25 h-11.25 rounded-full bg-white flex items-center justify-center shrink-0"
          >
            <IconBack className="w-2.5 h-4" />
          </button>
          <span className="text-[17px] text-white leading-5.5">My Profile</span>
        </div>

        {/* Balance */}
        <div className="text-center">
          <p className="text-[16px] text-white mb-4">Available Balance</p>
          <p className="text-[40px] font-bold text-white leading-none">
            $500.00
          </p>
          <button
            type="button"
            onClick={() => navigate('/restaurant-portal/withdraw-success')}
            className="mt-5 border border-white rounded-[10px] w-25 h-9.25 text-[14px] text-white"
          >
            Withdraw
          </button>
        </div>
      </div>

      {/* ── Menu sections ── */}
      <div className="px-6 py-5 flex flex-col gap-3.5">
        <MenuCard
          items={[
            {
              icon: <IconPersonalInfoR />,
              label: 'Personal Info',
              onClick: () => navigate('/restaurant-portal/personal-info'),
            },
            { icon: <IconSettingsR />, label: 'Settings', onClick: () => {} },
          ]}
        />

        <MenuCard
          items={[
            {
              icon: <IconWithdrawalR />,
              label: 'Withdrawal History',
              onClick: () => {},
            },
            {
              icon: <IconOrderCountR />,
              label: 'Number of Orders',
              value: '29K',
            },
          ]}
        />

        <MenuCard
          items={[
            {
              icon: <IconUserReviewsR />,
              label: 'User Reviews',
              onClick: () => {},
            },
          ]}
        />

        <MenuCard
          items={[
            {
              icon: <IconLogoutR />,
              label: 'Log Out',
              onClick: handleLogout,
            },
          ]}
        />
      </div>

      <RestaurantBottomNav />
    </div>
  );
}
