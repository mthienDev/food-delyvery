/**
 * Add Card Page — nhập thông tin thẻ tín dụng/ghi nợ.
 * Route: /add-card
 */
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MobileFrame from '../../components/ui/mobile-frame';
import useCardStore from '../../store/card-store';

// ── Icons ──────────────────────────────────────────────────────────────────────
function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M1 1L13 13M13 1L1 13"
        stroke="#32343E"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Input Field ────────────────────────────────────────────────────────────────
function InputField({ label, value, onChange, placeholder, type = 'text', className = '' }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-[#A0A5BA] text-[14px] leading-6 uppercase tracking-wide">
        {label}
      </label>
      <div className="h-[62px] bg-[#F0F5FA] rounded-xl px-5 flex items-center">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent text-[#32343E] text-[16px] placeholder:text-[#32343E]/50 outline-none"
        />
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function AddCardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const addCard = useCardStore(s => s.addCard);
  const updateCard = useCardStore(s => s.updateCard);

  // Edit mode: payment-page truyền card hiện tại qua navigation state
  const editCard = location.state?.card ?? null;
  const isEditing = Boolean(editCard);

  const [form, setForm] = useState({
    holderName: editCard?.holderName ?? '',
    cardNumber: editCard?.cardNumber ?? '',
    expireDate: editCard?.expireDate ?? '',
    cvc: editCard?.cvc ?? '',
  });

  function handleChange(field) {
    return (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));
  }

  /** Format card number: chia thành nhóm 4 số, tối đa 16 ký tự */
  function handleCardNumberChange(e) {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(.{4})/g, '$1 ').trim();
    setForm(prev => ({ ...prev, cardNumber: formatted }));
  }

  /** Format expire date: tự thêm "/" sau 2 ký tự */
  function handleExpireDateChange(e) {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 6);
    let formatted = raw;
    if (raw.length > 2) formatted = raw.slice(0, 2) + '/' + raw.slice(2);
    setForm(prev => ({ ...prev, expireDate: formatted }));
  }

  /** CVC: chỉ nhận số, tối đa 4 ký tự */
  function handleCvcChange(e) {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    setForm(prev => ({ ...prev, cvc: raw }));
  }

  function handleSubmit() {
    if (!form.holderName || !form.cardNumber || !form.expireDate || !form.cvc) return;
    if (isEditing) {
      updateCard(editCard.id, form);
    } else {
      const cardType = location.state?.type;
      addCard(form, cardType);
    }
    navigate(-1);
  }

  return (
    <MobileFrame>
      <div className="flex flex-col h-svh bg-white">
        {/* ── Header ── */}
        <div className="flex items-center gap-6 px-6 pt-[50px] pb-6 shrink-0">
          <button
            onClick={() => navigate(-1)}
            className="w-[45px] h-[45px] rounded-full bg-[#ECF0F4] flex items-center justify-center"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
          <span className="text-[#181C2E] text-[17px] leading-[22px]">
            {isEditing ? 'Edit Card' : 'Add Card'}
          </span>
        </div>

        {/* ── Form ── */}
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-6 flex flex-col gap-6 pb-6">
          {/* Card Holder Name */}
          <InputField
            label="Card Holder Name"
            value={form.holderName}
            onChange={handleChange('holderName')}
            placeholder="Vishal Khadok"
          />

          {/* Card Number */}
          <InputField
            label="Card Number"
            value={form.cardNumber}
            onChange={handleCardNumberChange}
            placeholder="2134   ____   ____"
            type="text"
          />

          {/* Expire Date + CVC — hàng ngang */}
          <div className="flex gap-[27px]">
            <InputField
              label="Expire Date"
              value={form.expireDate}
              onChange={handleExpireDateChange}
              placeholder="mm/yyyy"
              className="flex-1"
            />
            <InputField
              label="CVC"
              value={form.cvc}
              onChange={handleCvcChange}
              placeholder="***"
              type="password"
              className="flex-1"
            />
          </div>
        </div>

        {/* ── Button ── */}
        <div className="px-6 pb-8 shrink-0">
          <button
            onClick={handleSubmit}
            className="w-full h-[62px] rounded-xl bg-[#FF7622] text-white text-[14px] font-bold uppercase tracking-wider"
          >
            {isEditing ? 'Save Changes' : 'Add & Make Payment'}
          </button>
        </div>
      </div>
    </MobileFrame>
  );
}
