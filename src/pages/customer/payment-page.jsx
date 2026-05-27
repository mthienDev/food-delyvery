/**
 * Payment Page — chọn phương thức thanh toán & xác nhận đơn hàng.
 * Route: /payment
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore, { selectTotalPrice } from '../../store/cart-store';
import useCardStore from '../../store/card-store';
import mastercardImg from '../../assets/mastercard.png';

// ── Icons ──────────────────────────────────────────────────────────────────────
function BackArrow() {
  return (
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
      <path
        d="M9 1L1 9L9 17"
        stroke="#32343E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
      <path
        d="M1 5L4.5 8.5L11 1.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CardIllustration() {
  return (
    <div
      className="relative w-52.5 h-35 rounded-[20px] overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #F58D1D 0%, #F5A623 100%)',
        boxShadow: '0 16px 40px rgba(14,39,62,0.18)',
      }}
    >
      {/* Red diagonal stripe */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(145deg, transparent 33%, #D9534F 33%, #D9534F 62%, transparent 62%)',
          opacity: 0.9,
        }}
      />
      {/* Mastercard logo — top left */}
      <div className="absolute top-3.5 left-3.5">
        <img
          src={mastercardImg}
          alt="Mastercard"
          className="w-10 h-7 object-contain"
        />
      </div>
      {/* Yellow diamond accent — bottom right */}
      <div className="absolute bottom-5 right-8 w-10 h-10 bg-[#F7C948] rotate-45 opacity-90" />
      {/* White accent — bottom-right corner */}
      <div
        className="absolute bottom-0 right-0 w-16 h-16"
        style={{
          background:
            'linear-gradient(225deg, rgba(255,255,255,0.3) 0%, transparent 65%)',
        }}
      />
      {/* Card number lines */}
      <div className="absolute bottom-9 left-4 w-32.75 h-4.75 rounded-sm bg-white/50" />
      <div className="absolute bottom-5.5 left-4 w-12.5 h-2.25 rounded-sm bg-white/50" />
      <div className="absolute bottom-2.75 left-4 w-9.5 h-2.25 rounded-sm bg-white/50" />
    </div>
  );
}

// ── Payment method tab ─────────────────────────────────────────────────────────
const METHODS = [
  { id: 'cash', label: 'Cash', icon: CashIcon },
  { id: 'visa', label: 'Visa', icon: VisaIcon },
  { id: 'mastercard', label: 'Mastercard', icon: MastercardIcon },
];

function CashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12.9688 0C10.7695 0 8.96875 1.80078 8.96875 4C8.96875 5.48047 9.79688 6.77734 11 7.46875C10.9805 7.64453 10.9688 7.81641 10.9688 8C10.9688 10.75 13.2188 13 15.9688 13C18.7188 13 20.9688 10.75 20.9688 8C20.9688 5.55078 19.1758 3.48047 16.8438 3.0625C16.4219 1.30859 14.8477 0 12.9688 0ZM12.9688 2C13.7812 2 14.4648 2.47266 14.7812 3.15625C13.4727 3.48047 12.3633 4.33594 11.6875 5.46875C11.2578 5.10938 10.9688 4.60938 10.9688 4C10.9688 2.88281 11.8516 2 12.9688 2ZM15.9688 5C17.6367 5 18.9688 6.33203 18.9688 8C18.9688 9.66797 17.6367 11 15.9688 11C14.3008 11 12.9688 9.66797 12.9688 8C12.9688 6.33203 14.3008 5 15.9688 5ZM7.4375 12C4.24219 12 0 13.75 0 13.75L0.75 15.625C0.75 15.625 5.04688 14 7.4375 14C8.40625 14 10.0586 14.5938 11.4062 15.2812C12.0781 15.625 12.6797 15.9844 13.125 16.2812C13.3477 16.4297 13.5352 16.5625 13.6562 16.6562C13.7148 16.7031 13.7578 16.7578 13.7812 16.7812L13.9375 17C14.0156 17.2227 13.9922 17.4727 13.8438 17.6875C13.6523 17.957 13.3125 18.0625 13 17.9688H12.9688L8.625 15.875L7.78125 17.6875L12.2188 19.8125H12.25L12.3125 19.8438C13.4688 20.25 14.7617 19.8477 15.4688 18.8438C15.8672 18.2773 15.9844 17.6133 15.9062 16.9688L20.7188 16.1562C21.25 16.0664 21.7383 16.3984 21.9062 16.9062C22.0859 17.4453 21.832 17.9922 21.3125 18.2188C19.8477 18.8633 17.4922 19.8281 15.375 20.625C14.3164 21.0234 13.3047 21.375 12.5312 21.625C12.1445 21.75 11.8086 21.8438 11.5625 21.9062C11.3164 21.9688 11.1172 22 11.2188 22C11.2812 22 10.8789 21.9102 10.4062 21.6562C9.93359 21.4023 9.33984 21.0312 8.75 20.6562C8.16016 20.2812 7.55078 19.9023 6.96875 19.5938C6.38672 19.2852 5.86328 19 5.15625 19C3.51953 19 2.0625 19.625 2.0625 19.625L2.84375 21.4688C2.84375 21.4688 4.06641 21 5.15625 21C5.12891 21 5.55469 21.0898 6.03125 21.3438C6.50781 21.5977 7.09766 21.9688 7.6875 22.3438C8.27734 22.7188 8.86719 23.0977 9.4375 23.4062C10.0078 23.7148 10.5078 24 11.2188 24C11.5586 24 11.7539 23.9258 12.0625 23.8438C12.3711 23.7617 12.7461 23.6641 13.1562 23.5312C13.9766 23.2656 14.9844 22.9062 16.0625 22.5C18.2148 21.6914 20.6016 20.7344 22.125 20.0625C23.5703 19.4258 24.3125 17.7461 23.8125 16.25C23.3359 14.8203 21.8633 13.9414 20.375 14.1875L14.9062 15.0938C14.9023 15.0898 14.8828 15.0977 14.875 15.0938C14.8438 15.0703 14.8125 15.0234 14.7812 15L14.5 14.7812V14.8125C14.4141 14.75 14.3516 14.6914 14.25 14.625C13.7305 14.2812 13.0547 13.8789 12.3125 13.5C10.8242 12.7422 9.07812 12 7.4375 12Z"
        fill="#FF7622"
      />
    </svg>
  );
}

function VisaIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="41"
      height="14"
      viewBox="0 0 41 14"
      fill="none"
    >
      <path
        d="M17.6432 12.9834H14.3223L16.3978 0.227922H19.7191L17.6432 12.9834ZM11.5285 0.227922L8.36251 9.00124L7.98787 7.11201L7.98821 7.11269L6.87077 1.37641C6.87077 1.37641 6.73566 0.227922 5.29545 0.227922H0.0614164L0 0.443903C0 0.443903 1.60058 0.776915 3.47377 1.90186L6.35897 12.9837H9.8191L15.1026 0.227922H11.5285ZM37.6492 12.9834H40.6985L38.0399 0.227581H35.3703C34.1375 0.227581 33.8373 1.17817 33.8373 1.17817L28.8844 12.9834H32.3462L33.0385 11.0887H37.2602L37.6492 12.9834ZM33.9949 8.47135L35.7398 3.69794L36.7215 8.47135H33.9949ZM29.1441 3.29532L29.618 0.556158C29.618 0.556158 28.1556 0 26.6311 0C24.9831 0 21.0695 0.720276 21.0695 4.22271C21.0695 7.51804 25.6628 7.55898 25.6628 9.2899C25.6628 11.0208 21.5428 10.7107 20.1831 9.61916L19.6894 12.4832C19.6894 12.4832 21.1722 13.2035 23.4378 13.2035C25.7041 13.2035 29.1229 12.0301 29.1229 8.83644C29.1229 5.51996 24.4884 5.21117 24.4884 3.76926C24.4887 2.327 27.723 2.51227 29.1441 3.29532Z"
        fill="#2566AF"
      />
    </svg>
  );
}

function MastercardIcon() {
  return (
    <img
      src={mastercardImg}
      alt="Mastercard"
      className="w-12 h-8 object-contain"
    />
  );
}

function PaymentMethodTab({ method, selected, onClick }) {
  const Icon = method.icon;
  return (
    <button
      onClick={() => onClick(method.id)}
      className="flex flex-col items-center gap-2 shrink-0"
      aria-pressed={selected}
    >
      <div
        className={`w-21.25 h-18 rounded-2xl flex items-center justify-center relative
        ${selected ? 'bg-white border-2 border-primary' : 'bg-[#F0F5FA]'}`}
      >
        <Icon />
        {selected && (
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#F58D1D] flex items-center justify-center">
            <CheckIcon />
          </div>
        )}
      </div>
      <span
        className={`text-[13px] ${selected ? 'text-[#F58D1D] font-semibold' : 'text-[#A0A5BA]'}`}
      >
        {method.label}
      </span>
    </button>
  );
}

function EmptyCardState({ method }) {
  const label = METHODS.find(m => m.id === method)?.label ?? method;
  return (
    <div className="flex flex-col items-center gap-5">
      <CardIllustration />
      <div className="text-center">
        <p className="text-[#32343E] text-[16px] font-bold leading-normal mb-1">
          No {label.toLowerCase()} card added
        </p>
        <p className="text-[15px] leading-6 text-[#2D2D2D] tracking-[0.5px] text-center max-w-66.5">
          You can add a {label.toLowerCase()} and save it for later
        </p>
      </div>
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
      <path
        d="M1 1L5.5 6.5L10 1"
        stroke="#32343E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CardRow({ card, selected, onSelect, onRemove, onEdit }) {
  const digits = card.cardNumber.replace(/\s/g, '');
  const last3 = digits.slice(-3);
  const label = card.type === 'visa' ? 'Visa' : 'Master Card';

  return (
    <div
      className={`relative h-20.5 rounded-2xl bg-[#F0F5FA] px-5 flex flex-col justify-center cursor-pointer transition-all
        ${selected ? 'ring-2 ring-[#F58D1D]' : ''}`}
      onClick={() => onSelect(card.id)}
    >
      {/* Card type name */}
      <p className="font-bold text-[#32343E] text-[16px] leading-normal mb-1.5">
        {label}
      </p>

      {/* Icon + masked number + last digits */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-4.5 flex items-center shrink-0">
          {card.type === 'visa' ? <VisaIcon /> : <MastercardIcon />}
        </div>
        <span className="text-[#32343E]/50 text-[16px] leading-none">
          *************
        </span>
        <span className="text-[#32343E] text-[16px] leading-none">{last3}</span>
      </div>

      {/* Right side: chevron + remove */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
        {/* Remove button */}
        <button
          onClick={e => {
            e.stopPropagation();
            onRemove(card.id);
          }}
          className="w-7 h-7 rounded-full bg-[#FF000015] flex items-center justify-center"
          aria-label="Remove card"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M1 1L9 9M9 1L1 9"
              stroke="#E53935"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button
          onClick={e => {
            e.stopPropagation();
            onEdit(card);
          }}
          aria-label="Edit card"
        >
          <ChevronDownIcon />
        </button>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function PaymentPage() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('mastercard');

  const total = useCartStore(selectTotalPrice);
  const clearCart = useCartStore(s => s.clearCart);

  // Read stable references — filter locally to avoid infinite re-render loop
  const cards = useCardStore(s => s.cards);
  const selectedCardId = useCardStore(s => s.selectedCardId);
  const selectCard = useCardStore(s => s.selectCard);
  const removeCard = useCardStore(s => s.removeCard);

  /** Navigate to add-card page với data thẻ hiện tại để edit */
  function handleEditCard(card) {
    navigate('/add-card', { state: { card, type: card.type } });
  }

  /** Cards relevant to the active payment method tab */
  const activeCards =
    selectedMethod === 'visa' || selectedMethod === 'mastercard'
      ? cards.filter(c => c.type === selectedMethod)
      : [];

  /** Cho phép confirm khi: cash, hoặc card method đã chọn 1 thẻ trong tab hiện tại */
  const canConfirm =
    selectedMethod === 'cash' ||
    (activeCards.length > 0 && activeCards.some(c => c.id === selectedCardId));

  function handleConfirm() {
    if (!canConfirm) return;
    clearCart();
    navigate('/order-success');
  }

  return (
    <div className="flex flex-col h-svh bg-white">
      {/* ── Header ── */}
      <div className="flex items-center gap-4.5 px-6 pt-6 shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="w-11.25 h-11.25 rounded-full bg-[#ECF0F4] flex items-center justify-center"
          aria-label="Go back"
        >
          <BackArrow />
        </button>
        <span className="text-[#181C2E] text-[17px]">Payment</span>
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-6 flex flex-col gap-6">
        {/* Payment method selector */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1 pt-8">
          {METHODS.map(m => (
            <PaymentMethodTab
              key={m.id}
              method={m}
              selected={selectedMethod === m.id}
              onClick={setSelectedMethod}
            />
          ))}
        </div>

        {/* Card illustration panel — luôn hiện cho cash, hoặc khi chưa có thẻ */}
        {(selectedMethod === 'cash' || activeCards.length === 0) && (
          <div className="bg-[#F0F5FA] rounded-3xl p-6 flex items-center justify-center min-h-65">
            {selectedMethod === 'cash' ? (
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <CashIcon />
                </div>
                <p className="text-[#181C2E] text-[18px] font-bold mt-4 mb-1">
                  Pay with Cash
                </p>
                <p className="text-[#A0A5BA] text-[14px]">
                  Pay the delivery person on arrival
                </p>
              </div>
            ) : (
              <EmptyCardState method={selectedMethod} />
            )}
          </div>
        )}

        {/* Card rows — ngoài panel, từng thẻ là item riêng */}
        {activeCards.length > 0 &&
          activeCards.map(card => (
            <CardRow
              key={card.id}
              card={card}
              selected={card.id === selectedCardId}
              onSelect={selectCard}
              onRemove={removeCard}
              onEdit={handleEditCard}
            />
          ))}

        {/* Add new button — only for card methods */}
        {selectedMethod !== 'cash' && (
          <button
            onClick={() =>
              navigate('/add-card', { state: { type: selectedMethod } })
            }
            className="w-full h-15.5 rounded-2xl border-2 border-[#F0F5FA] flex items-center justify-center gap-2"
          >
            <span className="text-primary text-[20px] font-light">+</span>
            <span className="text-primary text-[14px] font-bold tracking-widest uppercase">
              Add New
            </span>
          </button>
        )}
      </div>

      {/* ── Bottom panel ── */}
      <div className="px-6 pt-5 pb-8 shrink-0">
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-[#A0A5BA] text-[14px] uppercase tracking-wide">
            Total:
          </span>
          <span className="text-[#181C2E] text-[30px]">${total || 96}</span>
        </div>
        <button
          onClick={handleConfirm}
          disabled={!canConfirm}
          className={`w-full h-15.5 rounded-2xl text-[14px] font-bold uppercase tracking-wider transition-colors
            ${canConfirm
              ? 'bg-primary text-white'
              : 'bg-[#F0F5FA] text-[#A0A5BA] cursor-not-allowed'}`}
        >
          Pay &amp; Confirm
        </button>
      </div>
    </div>
  );
}
