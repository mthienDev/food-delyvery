/**
 * Customer Food Detail Page — hero image, food info, size selector, add to cart.
 * Route: /food/:id
 */
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCartStore from '../../store/cart-store';
import { getFoodDetail } from '../../data/mock-foods';
import { restaurants } from '../../data/mock-restaurants';
import { IconBack, IconStar, IconDelivery, IconClock } from '../../components/ui/icons';
import resHeartIcon from '../../assets/icons/res-heart-icon.svg';
import { INGREDIENT_ICONS } from '../../assets/icons/ingredients/index.js';

// ── Restaurant badge heart (res-heart-icon.svg with opacity) ──────────────────

function HeartIcon({ filled = false, size = 20 }) {
  return (
    <img
      src={resHeartIcon}
      width={size}
      height={size}
      alt=""
      style={{ opacity: filled ? 1 : 0.35, transition: 'opacity 0.15s' }}
    />
  );
}

// ── Header heart toggle (inline SVG) ─────────────────────────────────────────

function TopHeartIcon({ filled = false }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="13"
      viewBox="0 0 15 13"
      fill="none"
      style={{ opacity: filled ? 1 : 0.35, transition: 'opacity 0.15s' }}
    >
      <path
        d="M13.8434 1.14929C13.4768 0.784935 13.0417 0.495898 12.5627 0.298699C12.0837 0.101499 11.5704 0 11.0519 0C10.5335 0 10.0201 0.101499 9.54111 0.298699C9.06215 0.495898 8.62698 0.784935 8.26046 1.14929L7.49981 1.90512L6.73916 1.14929C5.99882 0.413658 4.9947 0.000381306 3.94771 0.000381314C2.90071 0.000381322 1.89659 0.413658 1.15626 1.14929C0.415918 1.88493 7.80073e-09 2.88267 0 3.92302C-7.80073e-09 4.96336 0.415918 5.9611 1.15626 6.69674L1.91691 7.45256L7.49981 13L13.0827 7.45256L13.8434 6.69674C14.21 6.33255 14.5009 5.90014 14.6994 5.42422C14.8979 4.94829 15 4.43818 15 3.92302C15 3.40785 14.8979 2.89774 14.6994 2.42182C14.5009 1.94589 14.21 1.51348 13.8434 1.14929Z"
        fill="#FF8400"
      />
    </svg>
  );
}

// ── Quantity stepper ──────────────────────────────────────────────────────────

function QuantityStepper({ value, onChange }) {
  return (
    <div className="flex items-center justify-between bg-[#121223] rounded-full px-2" style={{ width: 125, height: 48 }}>
      <button onClick={() => onChange(Math.max(1, value - 1))} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-lg font-bold" aria-label="Decrease quantity">−</button>
      <span className="text-white text-[16px] font-bold">{value}</span>
      <button onClick={() => onChange(value + 1)} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-lg font-bold" aria-label="Increase quantity">+</button>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function FoodDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const food = getFoodDetail(id);
  const restaurant = food ? restaurants.find(r => r.id === food.restaurantId) : null;
  const addItem = useCartStore(s => s.addItem);

  const [sizeIdx, setSizeIdx] = useState(() => food?.defSizeIdx ?? 1);
  const [qty, setQty] = useState(2);
  const [fav, setFav] = useState(false);
  const [headerSolid, setHeaderSolid] = useState(false);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    const size = food.sizes[sizeIdx];
    addItem({ id: food.id, name: food.name, price: food.price }, size, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  if (!food || !restaurant) return (
    <div className="flex flex-col h-svh items-center justify-center">
      <p className="text-[#A0A5BA]">Food not found</p>
      <button onClick={() => navigate(-1)} className="mt-4 text-[#F58D1D]">Go back</button>
    </div>
  );

  return (
    <div className="flex flex-col h-svh bg-white">

      {/* ── Scrollable content ── */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar" onScroll={e => setHeaderSolid(e.currentTarget.scrollTop > 100)}>

        {/* Floating header — overlay on hero, h-0 không đẩy content xuống */}
        <div className="sticky top-0 z-20 h-0">
          <div className="absolute inset-x-0 top-0 z-0 transition-colors duration-200" style={{ height: '85px', background: headerSolid ? 'white' : 'transparent' }} />
          <div className="relative z-10 flex items-center justify-between px-6 pt-6 pb-4">
            <button onClick={() => navigate(-1)} className="w-11.25 h-11.25 rounded-full bg-white flex items-center justify-center shadow-md" aria-label="Go back">
              <IconBack />
            </button>
            <button onClick={() => setFav(v => !v)} className="w-11.25 h-11.25 rounded-full bg-white flex items-center justify-center shadow-md" aria-label="Toggle favourite">
              <TopHeartIcon filled={fav} />
            </button>
          </div>
        </div>

        {/* Hero placeholder */}
        <div style={{ height: 321, background: 'linear-gradient(0deg, #98A8B8 0%, #98A8B8 100%)', borderRadius: '0 0 24px 24px' }} />

        {/* Info block */}
        <div className="px-6 pt-6 pb-8">
          <h1 className="text-[20px] font-bold text-[#181C2E] leading-tight mb-1.5">{food.name}</h1>

          {/* Restaurant badge */}
          <div className="flex items-center gap-1.5 mb-5">
            <HeartIcon filled size={22} />
            <span className="text-[14px] text-[#181C2E]">{restaurant.name}</span>
          </div>

          {/* Stats: rating, delivery, time */}
          <div className="flex items-center gap-9 mb-5">
            <span className="flex items-center gap-2.5">
              <IconStar className="w-5 h-5 shrink-0" />
              <span className="text-[16px] font-bold text-[#181C2E]">{restaurant.rating}</span>
            </span>
            <span className="flex items-center gap-2.5">
              <IconDelivery className="w-5.5 h-4 shrink-0" />
              <span className="text-[14px] text-[#181C2E]">{restaurant.deliveryLabel}</span>
            </span>
            <span className="flex items-center gap-2.5">
              <IconClock className="w-5 h-5 shrink-0" />
              <span className="text-[14px] text-[#181C2E]">{restaurant.deliveryTime} min</span>
            </span>
          </div>

          <p className="text-[14px] text-[#A0A5BA] leading-6 mb-5">{food.description}</p>

          {/* Size selector */}
          <div className="flex items-center gap-2.5 mb-7">
            <span className="text-[14px] font-semibold text-[#A0A5BA] uppercase tracking-wide shrink-0">Size:</span>
            <div className="flex gap-2.5">
              {food.sizes.map((s, i) => (
                <button key={s} onClick={() => setSizeIdx(i)}
                  className={`w-12 h-12 rounded-full text-[14px] transition-colors ${i === sizeIdx ? 'bg-[#F58D1D] text-white' : 'bg-white text-[#181C2E] border border-[#EDEDED]'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <span className="block text-[13px] font-normal text-[#32343E] uppercase tracking-[0.26px] mb-4">Ingridents</span>
          <div className="flex flex-wrap gap-x-4.75 gap-y-5">
            {food.ingredients.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1.25">
                <div className="w-12.5 h-12.5 rounded-full bg-[#FFEBE4] flex items-center justify-center shrink-0">
                  <img src={INGREDIENT_ICONS[item.icon]} alt={item.name} className="w-6 h-6 object-contain" />
                </div>
                <div className="text-center leading-none">
                  <p className="text-[12px] font-medium text-[#747783] capitalize">{item.name}</p>
                  {item.allergy && <p className="text-[8px] font-normal text-[#747783] mt-0.5">(Alergy)</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom action bar ── */}
      <div className="bg-[#f0f5fa] px-6 py-7 rounded-tl-3xl rounded-tr-3xl">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[28px] font-normal text-[#181C2E]">${food.price}</span>
          <QuantityStepper value={qty} onChange={setQty} />
        </div>
        <button onClick={handleAddToCart}
          className={`w-full h-15.5 rounded-xl text-white text-[16px] font-bold tracking-[1px] uppercase transition-colors ${added ? 'bg-green-500' : 'bg-primary'}`}>
          {added ? 'Added ✓' : 'Add To Cart'}
        </button>
      </div>
    </div>
  );
}
