/**
 * FilterPopup — centered dialog filter cho restaurant detail.
 * Figma node: 602:363 | Primitive: @radix-ui/react-dialog
 */
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';

// ── Constants ─────────────────────────────────────────────────────────────────

const OFFER_OPTIONS = [
  'Delivery',
  'Pick Up',
  'Offer',
  'Online payment available',
];
const DELIVERY_OPTIONS = ['10-15 min', '20 min', '30 min'];
const PRICING_OPTIONS = ['$', '$$', '$$$'];

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p className="text-[13px] text-[#32343E] uppercase mb-3.5">{children}</p>
  );
}

function PillButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 h-11.5 rounded-full text-[16px] border tracking-[-0.33px] transition-colors ${
        active
          ? 'bg-[#F58D1D] text-white border-[#F58D1D]'
          : 'bg-white text-[#464E57] border-[#EDEDED]'
      }`}
    >
      {label}
    </button>
  );
}

function CircleButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-12 h-12 rounded-full text-[18px] border transition-colors ${
        active
          ? 'bg-[#F58D1D] text-white border-[#F58D1D]'
          : 'bg-white text-[#464E57] border-[#EDEDED]'
      }`}
    >
      {label}
    </button>
  );
}

function StarIcon({ filled }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? '#F58D1D' : 'none'}
      stroke="#F58D1D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function FilterPopup({ open, onClose }) {
  const [selectedOffers, setSelectedOffers] = useState(['Delivery']);
  const [selectedDelivery, setSelectedDelivery] = useState('10-15 min');
  const [selectedPricing, setSelectedPricing] = useState('$$');
  const [selectedRating, setSelectedRating] = useState(4);

  function toggleOffer(offer) {
    setSelectedOffers(prev =>
      prev.includes(offer) ? prev.filter(o => o !== offer) : [...prev, offer],
    );
  }

  return (
    <Dialog.Root open={open} onOpenChange={v => !v && onClose()}>
      <Dialog.Portal>
        {/* Backdrop */}
        <Dialog.Overlay className="animate-overlay-in fixed inset-0 z-50 bg-[#181C2E]/45" />

        {/* Centered card */}
        <Dialog.Content
          className="animate-dialog-in fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[calc(100%-28px)] max-w-[428px] max-h-[90svh] overflow-y-auto no-scrollbar
                     bg-white rounded-[12px] shadow-xl
                     p-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-[17px] text-[#181C2E]">
              Filter your search
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                aria-label="Close filter"
                className="w-[45px] h-[45px] rounded-full bg-[#ECF0F4] flex items-center justify-center shrink-0"
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path
                    d="M1 1L12 12M12 1L1 12"
                    stroke="#181C2E"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </Dialog.Close>
          </div>

          {/* OFFERS */}
          <section className="mb-6">
            <SectionLabel>Offers</SectionLabel>
            <div className="flex flex-wrap gap-2.5">
              {OFFER_OPTIONS.map(offer => (
                <PillButton
                  key={offer}
                  label={offer}
                  active={selectedOffers.includes(offer)}
                  onClick={() => toggleOffer(offer)}
                />
              ))}
            </div>
          </section>

          {/* DELIVER TIME */}
          <section className="mb-6">
            <SectionLabel>Deliver Time</SectionLabel>
            <div className="flex gap-2.5">
              {DELIVERY_OPTIONS.map(opt => (
                <PillButton
                  key={opt}
                  label={opt}
                  active={selectedDelivery === opt}
                  onClick={() => setSelectedDelivery(opt)}
                />
              ))}
            </div>
          </section>

          {/* PRICING */}
          <section className="mb-6">
            <SectionLabel>Pricing</SectionLabel>
            <div className="flex gap-2.5">
              {PRICING_OPTIONS.map(opt => (
                <CircleButton
                  key={opt}
                  label={opt}
                  active={selectedPricing === opt}
                  onClick={() => setSelectedPricing(opt)}
                />
              ))}
            </div>
          </section>

          {/* RATING */}
          <section className="mb-8">
            <SectionLabel>Rating</SectionLabel>
            <div className="flex gap-2.5">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setSelectedRating(star)}
                  aria-label={`${star} star`}
                  className="w-12 h-12 rounded-full border border-[#EDEDED] flex items-center justify-center"
                >
                  <StarIcon filled={star <= selectedRating} />
                </button>
              ))}
            </div>
          </section>

          {/* Apply button */}
          <Dialog.Close asChild>
            <button className="w-full h-[62px] rounded-full bg-[#F58D1D] text-white text-[16px] font-bold uppercase tracking-wide">
              Filter
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
