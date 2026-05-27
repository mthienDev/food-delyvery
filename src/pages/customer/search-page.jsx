/**
 * Customer Search Page — search restaurants & food items.
 */
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore, { selectTotalCount } from '../../store/cart-store';
import {
  IconBack,
  IconSearch,
  IconClose,
  IconBag,
  IconStar,
} from '../../components/ui/icons';
import FoodCardBg from '../../components/ui/food-card-bg';
import { restaurants } from '../../data/mock-restaurants';
import { foods } from '../../data/mock-foods';

// ── Derived data từ mock sources ─────────────────────────────────────────────

const RECENT_KEYWORDS = ['Burger', 'Pizza', 'Sushi', 'Ramen', 'Taco', 'Noodle'];

// Top 3 nhà hàng theo rating
const SUGGESTED_RESTAURANTS = [...restaurants]
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 3)
  .map(r => ({ id: r.id, name: r.name, rating: r.rating }));

// 6 món bestseller, mỗi loại category 1 món (đảm bảo đa dạng)
const _rMap = new Map(restaurants.map(r => [r.id, r]));
const POPULAR_FAST_FOOD = (() => {
  const seen = new Set();
  const result = [];
  for (const f of foods) {
    if (!f.isBestseller) continue;
    const r = _rMap.get(f.restaurantId);
    if (!r || seen.has(r.categoryId)) continue;
    seen.add(r.categoryId);
    result.push({ id: f.id, name: f.name, restaurant: r.name });
    if (result.length >= 6) break;
  }
  // Nếu chưa đủ 6 (chỉ có 5 category), lấy thêm bestseller bất kỳ
  if (result.length < 6) {
    for (const f of foods) {
      if (!f.isBestseller || result.find(x => x.id === f.id)) continue;
      const r = _rMap.get(f.restaurantId);
      if (!r) continue;
      result.push({ id: f.id, name: f.name, restaurant: r.name });
      if (result.length >= 6) break;
    }
  }
  return result;
})();

// ── Sub-components ────────────────────────────────────────────────────────────

/** Controlled search input bar */
function SearchInput({ value, onChange, inputRef }) {
  return (
    <div className="h-15.5 rounded-2xl bg-[#F8F8F8] flex items-center px-5 gap-3 ">
      <IconSearch size={15} />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search dishes, restaurants"
        className="flex-1 bg-transparent text-[17px] text-[#1E1D1D] placeholder-[#9D9DAF] outline-none"
        autoFocus
      />
      {value.length > 0 && (
        <button onClick={() => onChange('')} className="shrink-0">
          <IconClose color="#9D9DAF" />
        </button>
      )}
    </div>
  );
}

/** Horizontal scrollable keyword chips — supports touch + mouse drag */
function RecentKeywords({ keywords, onSelect }) {
  const scrollRef = useRef(null);
  // Track drag state without re-renders
  const drag = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });

  const onMouseDown = e => {
    drag.current = {
      active: true,
      startX: e.pageX - scrollRef.current.offsetLeft,
      scrollLeft: scrollRef.current.scrollLeft,
      moved: false,
    };
  };

  const onMouseMove = e => {
    if (!drag.current.active) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - drag.current.startX;
    if (Math.abs(walk) > 4) drag.current.moved = true;
    scrollRef.current.scrollLeft = drag.current.scrollLeft - walk;
  };

  const onMouseUp = () => {
    drag.current.active = false;
  };

  return (
    <div>
      <h2 className="text-[20px] font-normal text-[#32343e] mb-3">
        Recent Keywords
      </h2>
      <div
        ref={scrollRef}
        className="flex gap-2.5 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {keywords.map((kw, i) => (
          <button
            key={i}
            // Chỉ trigger onSelect nếu không phải đang drag
            onClick={() => !drag.current.moved && onSelect(kw)}
            className="shrink-0 h-11.5 px-5 rounded-full border border-[#EDEDED] text-[16px] text-[#181c2e] tracking-[-0.0208rem] bg-white whitespace-nowrap"
          >
            {kw}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Suggested restaurants list with separator */
function SuggestedRestaurants({ restaurants, onPress }) {
  return (
    <div>
      <h2 className="text-[20px] font-normal text-[#32343e] mb-1.5">
        Suggested Restaurants
      </h2>
      <div className="flex flex-col">
        {restaurants.map(r => (
          <div key={r.id}>
            <div
              className="flex items-center gap-2.5 py-3.5 cursor-pointer"
              onClick={() => onPress?.(r.id)}
            >
              {/* Thumbnail  */}
              <div className="w-15.25 h-14.25 rounded-xl bg-[#98a8b8] shrink-0" />
              {/* Info */}
              <div className="flex flex-col gap-2">
                <p className="text-[16px] font-normal text-[#32343e] tracking-[-0.3333px]">
                  {r.name}
                </p>
                <div className="flex items-center gap-1">
                  <IconStar className="w-3.75 h-3.75 shrink-0" />
                  <span className="text-[16px] font-normal text-[#181c2e]">
                    {r.rating}
                  </span>
                </div>
              </div>
            </div>
            {/* Separator sau mỗi item  */}
            <div className="h-px bg-[#EBEBEB]" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Popular fast food 2-column grid */
function PopularFastFood({ items }) {
  const navigate = useNavigate();
  return (
    <section className="pb-8">
      <h2 className="text-[20px] text-[#181C2E] mb-6.5">Popular Fast Food</h2>
      <div className="grid grid-cols-2 gap-4">
        {items.map(item => {
          const sid = `fcs-${item.id}`;
          return (
            <div key={item.id} className="flex flex-col cursor-pointer" onClick={() => navigate(`/food/${item.id}`)}>
              <div className="relative z-10 self-center w-30.5 h-21 rounded-[15px] bg-[#98a8b8]" />

              <div className="-mt-10.5 relative h-25.5">
                <FoodCardBg filterId={sid} />

                <div className="relative z-10 pt-12 pb-4 pl-[calc(50%-80px)] pr-4">
                  <p className="text-[15px] font-bold text-[#32343e] tracking-[-0.3333px]">
                    {item.name}
                  </p>

                  <p className="mt-1 text-[13px] text-[#646982]">
                    {item.restaurant}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const cartCount = useCartStore(selectTotalCount);

  return (
    <div className="flex flex-col h-svh">
      {/* Fixed header */}
      <div className="shrink-0 bg-white px-6 py-6 z-10 relative flex justify-between items-center gap-3">
        <div className="flex items-center gap-4 ">
          {/* Back button */}

          <button
            onClick={() => navigate(-1)}
            className="w-11.25 h-11.25 rounded-full bg-[#f0f5fa] flex items-center justify-center shrink-0"
            aria-label="Go back"
          >
            <IconBack />
          </button>

          {/* Title — centered with flex-1 trick */}
          <p className="flex-1 text-center text-[17px] font-normal leading-5.5 text-[#181c2e]">
            Search
          </p>
        </div>

        {/* Cart button */}
        <button
          onClick={() => navigate('/cart')}
          className="relative shrink-0"
          aria-label="Go to cart"
        >
          <div className="w-11.25 h-11.25 rounded-full bg-[#181c2e] flex items-center justify-center">
            <IconBag />
          </div>
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-6.25 h-6.25 rounded-full bg-[#fc6e2a] text-white text-[12px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 min-h-0 overflow-y-auto px-6">
        <div className="mb-6">
          <SearchInput value={query} onChange={setQuery} inputRef={inputRef} />
        </div>
        <div className="mb-8">
          <RecentKeywords keywords={RECENT_KEYWORDS} onSelect={setQuery} />
        </div>
        <div className="mb-8">
          <SuggestedRestaurants
            restaurants={SUGGESTED_RESTAURANTS}
            onPress={id => navigate(`/restaurant/${id}`)}
          />
        </div>
        <PopularFastFood items={POPULAR_FAST_FOOD} />
      </div>
    </div>
  );
}
