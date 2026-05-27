/**
 * Restaurant Personal Info page — hiển thị thông tin cá nhân nhà hàng.
 */
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/auth-store';

/** Icon person (outline, orange) */
function IconPerson() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="6" r="3" stroke="#FC6E2A" strokeWidth="1.7" />
      <path
        d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7"
        stroke="#FC6E2A"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Icon email/envelope (blue-indigo) */
function IconEmail() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="16" height="12" rx="2" stroke="#6366F1" strokeWidth="1.7" />
      <path
        d="M2 7l8 5 8-5"
        stroke="#6366F1"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Icon phone (blue) */
function IconPhone() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.68 7.374c.117-.197.75-.99 1.198-.968.137.011.242.093.34.189.226.22.866.994.9 1.165.089.43-.648.83-.49 1.25.4.98 1.27 1.85 2.25 2.25.42.157.82-.536 1.25-.45.175.037.975.772 1.2 1.0.096.098.179.219.19.356.017.482-.932 1.136-1.074 1.219-.342.245-.786.241-1.334-.013-1.522-.633-4.012-3.137-4.657-4.69-.247-.532-.263-.987-.023-1.308z"
        stroke="#369BFF"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="1"
        y="1"
        width="18"
        height="18"
        rx="9"
        stroke="#369BFF"
        strokeWidth="1.3"
        strokeOpacity="0.25"
      />
    </svg>
  );
}

/** Một hàng thông tin trong card */
function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[14px] text-[#32343E] uppercase tracking-wide">
          {label}
        </span>
        <span className="text-[14px] text-[#6B6E82] mt-0.5">
          {value || '—'}
        </span>
      </div>
    </div>
  );
}

export default function RestaurantPersonalInfoPage() {
  const navigate = useNavigate();
  const user = useAuthStore(s => s.user);
  const initials = (user?.name ?? 'R').slice(0, 2).toUpperCase();

  return (
    <div className="flex flex-col h-svh bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-6 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-11 h-11 rounded-full bg-[#ECF0F4] flex items-center justify-center"
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
          <p className="text-[17px] font-bold text-[#181c2e]">Personal Info</p>
        </div>
        <button
          onClick={() => navigate('/restaurant-portal/edit-profile')}
          className="text-[14px] text-primary underline underline-offset-2"
        >
          EDIT
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-8">
        {/* Avatar + name */}
        <div className="flex items-center gap-6 mb-8 mt-2">
          <div className="w-[90px] h-[90px] rounded-full bg-[#FFC6AE] flex items-center justify-center shrink-0 text-[22px] font-bold text-white">
            {initials}
          </div>
          <div>
            <p className="text-[18px] font-bold text-[#32343E] leading-snug">
              {user?.name ?? 'Restaurant'}
            </p>
            <p className="text-[13px] text-[#A0A5BA] mt-0.5">
              {user?.bio ?? 'Serving the best food'}
            </p>
          </div>
        </div>

        {/* Info card */}
        <div className="bg-[#F6F8FA] rounded-2xl p-5 flex flex-col gap-5">
          <InfoRow icon={<IconPerson />} label="Full Name" value={user?.name} />
          <InfoRow icon={<IconEmail />} label="Email" value={user?.email} />
          <InfoRow icon={<IconPhone />} label="Phone Number" value={user?.phone} />
        </div>
      </div>
    </div>
  );
}
