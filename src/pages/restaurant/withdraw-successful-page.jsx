/**
 * Withdraw Successful — xác nhận rút tiền thành công.
 * Route: /restaurant-portal/withdraw-success
 */
import { useNavigate } from 'react-router-dom';

/** SVG 4-pointed star sparkle */
function Sparkle({ size, color, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={`absolute ${className}`}
    >
      <path d="M12 0L13.8 10.2L24 12L13.8 13.8L12 24L10.2 13.8L0 12L10.2 10.2Z" />
    </svg>
  );
}

export default function WithdrawSuccessfulPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-svh bg-white items-center justify-center px-6">
      {/* Sparkle + circle wrapper */}
      <div className="relative w-65 h-65 flex items-center justify-center">
        {/* Sparkles */}
        <Sparkle size={22} color="#F8A491" className="top-5.5 left-5.5" />
        <Sparkle size={13} color="#FF6040" className="top-9.5 right-3" />
        <Sparkle size={16} color="#FFCFC0" className="top-22.5 right-0.5" />
        <Sparkle size={10} color="#FF9070" className="bottom-18 right-2.5" />
        <Sparkle size={20} color="#FFD6C8" className="bottom-11 left-1" />
        <Sparkle size={12} color="#F8B09C" className="bottom-5 left-15" />

        {/* Small dots */}
        <div className="absolute top-17 right-6 w-2.5 h-2.5 rounded-full bg-[#FFBFA8]" />
        <div className="absolute bottom-22.5 left-6.5 w-2.5 h-2.5 rounded-full bg-[#FFBFA8]" />

        {/* Orange circle with checkmark */}
        <div className="w-32.5 h-32.5 rounded-full bg-primary flex items-center justify-center">
          <svg width="54" height="40" viewBox="0 0 54 40" fill="none">
            <path
              d="M4 20L19 36L50 4"
              stroke="white"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Title */}
      <p className="mt-6 text-[22px] font-semibold text-[#333333]">
        Withdraw Successful
      </p>

      {/* ── OK button — cách title 20px ── */}
      <button
        type="button"
        onClick={() => navigate('/restaurant-portal/profile', { replace: true })}
        className="mt-5 w-full h-15.5 rounded-[10px] bg-primary text-white text-[18px] uppercase tracking-wider"
      >
        OK
      </button>
    </div>
  );
}
