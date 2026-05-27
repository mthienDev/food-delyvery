/**
 * Edit Profile page — form chỉnh sửa thông tin cá nhân.
 * Figma node ref: 190:628
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/auth-store';

/** Icon bút chì dùng cho nút edit avatar */
function IconPencil() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M11.333 2a1.886 1.886 0 0 1 2.667 2.667L4.888 13.778l-3.555.777.777-3.555L11.333 2Z"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Một field label + input/textarea */
function FormField({ label, value, onChange, multiline = false }) {
  const baseClass =
    'w-full bg-[#f0f5fa] text-[14px] text-[#6b6e82] outline-none px-5 font-normal';

  return (
    <div>
      <p className="text-[14px] text-[#32343e] uppercase tracking-[0.26px] mb-[8px] font-normal">
        {label}
      </p>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={4}
          className={`${baseClass} rounded-[8px] pt-[14px] pb-[14px] resize-none`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`${baseClass} h-14 rounded-[10px]`}
        />
      )}
    </div>
  );
}

export default function EditProfilePage() {
  const navigate = useNavigate();
  const user = useAuthStore(s => s.user);
  const updateProfile = useAuthStore(s => s.updateProfile);

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');

  const initials = (user?.name ?? 'U').slice(0, 2).toUpperCase();

  const handleSave = () => {
    updateProfile({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      bio: bio.trim(),
    });
    navigate(-1);
  };

  return (
    <div className="flex flex-col h-svh bg-white">
      {/* ── Header ── */}
      <div className="flex items-center gap-5 px-6 pt-[50px] pb-5 shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="w-[45px] h-[45px] rounded-full bg-[#ECF0F4] flex items-center justify-center shrink-0"
        >
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path
              d="M6 11L1 6L6 1"
              stroke="#5E616F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <p className="text-[17px] font-normal text-[#181c2e] leading-[22px]">
          Edit Profile
        </p>
      </div>

      {/* ── Scrollable form ── */}
      <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-8 no-scrollbar">
        {/* Avatar */}
        <div className="flex justify-center mt-2 mb-8">
          <div className="relative w-[130px] h-[130px]">
            <div className="w-full h-full rounded-full bg-[#FFC6AE] flex items-center justify-center text-[28px] font-bold text-white">
              {initials}
            </div>
            {/* Edit avatar button */}
            <button className="absolute bottom-[2px] right-[2px] w-[41px] h-[41px] rounded-full bg-primary flex items-center justify-center shadow-md">
              <IconPencil />
            </button>
          </div>
        </div>

        {/* Form fields */}
        <div className="flex flex-col gap-[26px]">
          <FormField label="Full Name" value={name} onChange={setName} />
          <FormField label="Email" value={email} onChange={setEmail} />
          <FormField label="Phone Number" value={phone} onChange={setPhone} />
          <FormField label="Bio" value={bio} onChange={setBio} multiline />
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="mt-8 w-full h-[62px] bg-primary rounded-xl text-white font-bold text-[16px] uppercase tracking-[0.5px]"
        >
          Save
        </button>
      </div>
    </div>
  );
}
