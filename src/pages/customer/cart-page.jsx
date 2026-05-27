/**
 * Cart Page — review items, set delivery address, place order.
 * Route: /cart
 * State: Zustand cart-store (global, persisted)
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore, { selectTotalPrice } from '../../store/cart-store';

// ── Back arrow (white) ─────────────────────────────────────────────────────────
function BackArrow() {
  return (
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
      <path
        d="M9 1L1 9L9 17"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Cross icon (remove item) ───────────────────────────────────────────────────
function CrossIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path
        d="M1 1L9 9M9 1L1 9"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Quantity stepper ───────────────────────────────────────────────────────────
function Stepper({ value, onDecrease, onIncrease }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onDecrease}
        className="w-5.5 h-5.5 rounded-full bg-[#2D2D44] flex items-center justify-center text-white text-sm leading-none"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="text-white text-[16px] font-bold w-4 text-center">
        {value}
      </span>
      <button
        onClick={onIncrease}
        className="w-5.5 h-5.5 rounded-full bg-[#2D2D44] flex items-center justify-center text-white text-sm leading-none"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

// ── Cart item row ──────────────────────────────────────────────────────────────
function CartItem({ item, editMode, onQtyChange, onRemove }) {
  return (
    <div className="flex gap-5 items-start">
      {/* Image placeholder */}
      <div className="w-34 h-29.25 rounded-2xl bg-[#2D2D44] shrink-0" />

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between h-29.25">
        {/* Name row — nút xoá nằm cùng hàng khi edit mode */}
        <div className="flex items-start justify-between gap-2">
          <p className="text-white text-[18px] font-normal leading-snug line-clamp-2 flex-1">
            {item.name}
          </p>
          {editMode && (
            <button
              onClick={() => onRemove(item.uid)}
              className="w-6.75 h-6.75 rounded-full bg-[#E04444] flex items-center justify-center shrink-0"
              aria-label={`Remove ${item.name}`}
            >
              <CrossIcon />
            </button>
          )}
        </div>
        <p className="text-white text-[20px] font-bold mb-2">
          ${item.unitPrice * item.qty}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-white/50 text-[18px]">{item.size}</span>
          <Stepper
            value={item.qty}
            onDecrease={() => onQtyChange(item.uid, item.qty - 1)}
            onIncrease={() => onQtyChange(item.uid, item.qty + 1)}
          />
        </div>
      </div>
    </div>
  );
}

// ── Empty state ────────────────────────────────────────────────────────────────
function EmptyCart({ onBrowse }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 px-6">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"
          stroke="#2D2D44"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="text-[#A0A5BA] text-[16px]">Your cart is empty</p>
      <button
        onClick={onBrowse}
        className="px-6 py-3 rounded-2xl bg-[#F58D1D] text-white text-[14px] font-bold"
      >
        Browse Restaurants
      </button>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function CartPage() {
  const navigate = useNavigate();
  const [address, setAddress] = useState('2118 Thornridge Cir. Syracuse');
  const [editAddress, setEditAddress] = useState(false);
  const [addressDraft, setAddressDraft] = useState(address);
  const [editMode, setEditMode] = useState(false);

  const items = useCartStore(s => s.items);
  const updateQty = useCartStore(s => s.updateQty);
  const removeItem = useCartStore(s => s.removeItem);
  const total = useCartStore(selectTotalPrice);

  return (
    <div className="flex flex-col h-svh bg-[#121223]">
      {/* ── Dark scrollable section ── */}
      <div className="flex-1 min-h-0 overflow-y-auto bg-[#121223] no-scrollbar flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 shrink-0">
          <div className="flex items-center gap-4.5">
            <button
              onClick={() => navigate(-1)}
              className="w-11.25 h-11.25 rounded-full bg-[#2D2D44] flex items-center justify-center"
              aria-label="Go back"
            >
              <BackArrow />
            </button>
            <span className="text-white text-[17px]">Cart</span>
          </div>

          {items.length > 0 && (
            <button
              onClick={() => setEditMode(v => !v)}
              className="text-[14px] underline uppercase"
              style={{ color: editMode ? '#059C6A' : '#FF7622' }}
            >
              {editMode ? 'Done' : 'Edit Items'}
            </button>
          )}
        </div>

        {/* Items list hoặc empty state */}
        {items.length === 0 ? (
          <EmptyCart onBrowse={() => navigate('/')} />
        ) : (
          <div className="px-6 pb-8 flex flex-col">
            {items.map((item, idx) => (
              <div key={item.uid}>
                <CartItem
                  item={item}
                  editMode={editMode}
                  onQtyChange={updateQty}
                  onRemove={removeItem}
                />
                {idx < items.length - 1 && (
                  <div className="my-5 border-b border-white/10" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── White bottom panel ── */}
      {items.length > 0 && (
        <div className="bg-white rounded-t-3xl px-6 pt-6 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.07)]">
          {/* Delivery address */}
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[#A0A5BA] text-[14px] uppercase">
              Delivery Address
            </span>
            {editAddress ? (
              <button
                className="text-[#059C6A] text-[14px] uppercase underline"
                onClick={() => { setAddress(addressDraft); setEditAddress(false); }}
              >
                Save
              </button>
            ) : (
              <button
                className="text-primary text-[14px] uppercase underline"
                onClick={() => { setAddressDraft(address); setEditAddress(true); }}
              >
                Edit
              </button>
            )}
          </div>

          <div className="bg-[#F0F5FA] rounded-xl px-3 h-15.5 flex items-center mb-9">
            {editAddress ? (
              <input
                autoFocus
                value={addressDraft}
                onChange={e => setAddressDraft(e.target.value)}
                className="w-full bg-transparent text-[#32343E] text-[16px] outline-none"
                placeholder="Enter delivery address"
              />
            ) : (
              <p className="text-[#32343E]/50 text-[16px]">{address}</p>
            )}
          </div>

          {/* Total row */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <span className="text-[#A0A5BA] text-[14px] uppercase">
                Total:
              </span>
              <span className="text-[#181C2E] text-[30px]">${total}</span>
            </div>
            <button className="flex items-center gap-1 text-primary text-[14px]">
              Breakdown
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path
                  d="M1 1l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Place order button */}
          <button
            className="w-full h-15.5 rounded-xl bg-primary text-white text-[14px] font-bold uppercase"
            onClick={() => navigate('/payment')}
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
