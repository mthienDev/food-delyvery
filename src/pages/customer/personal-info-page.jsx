/**
 * Customer Personal Info page — hiển thị thông tin cá nhân.
 * Figma node ref: Menu → Personal Info
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
      <rect
        x="2"
        y="4"
        width="16"
        height="12"
        rx="2"
        stroke="#6366F1"
        strokeWidth="1.7"
      />
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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <circle cx="20" cy="20" r="19.5" fill="white" stroke="white" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.3613 14.748C13.5944 14.3621 15.0523 12.6161 15.9687 12.6585C16.2426 12.6812 16.4848 12.8469 16.6815 13.0391C17.1333 13.4803 18.4266 15.1488 18.5 15.4999C18.6786 16.3611 17.1859 17.1319 17.5 17.9999C18.3006 19.959 20.04 21.7 22 22.4999C22.8672 22.8139 23.6388 21.3207 24.5 21.5C24.8504 21.5734 26.5588 23.0482 27 23.5C27.1915 23.696 27.3579 23.9389 27.3806 24.2128C27.4147 25.1776 25.5427 26.4718 25.2521 26.6382C24.5665 27.1286 23.672 27.1203 22.5815 26.6133C19.5386 25.3473 14.6758 20.5762 13.3863 17.4185C12.8929 16.3341 12.8588 15.4336 13.3613 14.748Z"
        stroke="#369BFF"
        stroke-width="1.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

/** Một hàng thông tin trong card */
function InfoRow({ icon, label, value }) {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-[14px]  text-[#32343E] uppercase tracking-wide">
            {label}
          </span>
          <span className="text-[14px] text-[#6B6E82] mt-0.5">
            {value || '—'}
          </span>
        </div>
      </div>
    </>
  );
}

export default function PersonalInfoPage() {
  const navigate = useNavigate();
  const user = useAuthStore(s => s.user);
  const initials = (user?.name ?? 'U').slice(0, 2).toUpperCase();

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
          onClick={() => navigate('/edit-profile')}
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
              {user?.name ?? 'Guest'}
            </p>
            <p className="text-[13px] text-[#A0A5BA] mt-0.5">
              {user?.bio ?? 'I love fast food'}
            </p>
          </div>
        </div>

        {/* Info card */}
        <div className="bg-[#F6F8FA] rounded-2xl p-5 flex flex-col gap-5.5">
          <InfoRow icon={<IconPerson />} label="Full Name" value={user?.name} />
          <InfoRow icon={<IconEmail />} label="Email" value={user?.email} />
          <InfoRow
            icon={<IconPhone />}
            label="Phone Number"
            value={user?.phone}
            showDivider={false}
          />
        </div>
      </div>
    </div>
  );
}
