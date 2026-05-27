/**
 * Category Detail Page — danh sách món ăn & nhà hàng theo category.
 * Route: /category/:id
 */
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CATEGORIES, FOOD_ITEMS, RESTAURANTS } from '../../data/mock-home';
import {
  IconBack,
  IconSearch,
  IconChevronDown,
  IconFilter,
  IconStar,
  IconDelivery,
  IconClock,
} from '../../components/ui/icons';
import SectionHeader from '../../components/ui/section-header';
import FoodCardBg from '../../components/ui/food-card-bg';
import FilterPopup from '../../components/customer/filter-popup';

// ── Food card (2-col grid)  ──────────────────────────────

function FoodCard({ id, name, restaurant, price }) {
  const navigate = useNavigate();
  const filterId = `fcc-${id}`;
  return (
    <div className="flex flex-col cursor-pointer" onClick={() => navigate(`/food/${id}`)}>
      <div className="relative z-10 self-center w-30.5 h-21 rounded-[15px] bg-[#98a8b8]" />
      <div className="-mt-8.5 relative h-32.5">
        <FoodCardBg filterId={filterId} />
        <div className="relative z-10 pt-12 px-4 pb-3 flex flex-col h-full">
          <p className="text-[15px] font-bold text-[#32343e] tracking-[-0.3333px] capitalize line-clamp-1">
            {name}
          </p>
          <p className="mt-0.5 text-[13px] text-[#646982] capitalize line-clamp-1">
            {restaurant}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-[16px] font-bold text-[#32343e]">
              ${price}
            </span>
            <button
              className="w-7.5 h-7.5 rounded-full bg-[#F58D1D] flex items-center justify-center shrink-0"
              aria-label={`Add ${name} to cart`}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 1v8M1 5h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Restaurant card (list) ────────────────────────────────────────────────────

function RestaurantCard({ id, name, tags, rating, delivery, time, onPress }) {
  return (
    <div className="flex flex-col cursor-pointer" onClick={() => onPress?.(id)}>
      <div className="w-full h-35 rounded-[15px] bg-[#98a8b8] mb-2" />
      <p className="text-[20px] font-bold text-[#181c2e] mb-1 leading-normal capitalize">
        {name}
      </p>
      <p className="text-[14px] text-[#a0a5ba] mb-3">{tags}</p>
      <div className="flex items-center gap-5">
        <span className="flex items-center gap-1.5">
          <IconStar className="w-5 h-5 shrink-0" />
          <span className="text-[16px] font-bold text-[#181c2e]">{rating}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <IconDelivery className="w-5.75 h-4 shrink-0" />
          <span className="text-[14px] text-[#181c2e]">{delivery}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <IconClock className="w-5 h-5 shrink-0" />
          <span className="text-[14px] text-[#181c2e]">{time}</span>
        </span>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function CategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const catId = Number(id);
  const category = CATEGORIES.find(c => c.id === catId);

  // Dropdown + filter state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handle = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [dropdownOpen]);

  // Lấy food items theo category, áp dụng sort
  const rawFoods = FOOD_ITEMS.filter(f => f.categoryId === catId);
  const foods = [...rawFoods].sort((a, b) => {
    return a.price - b.price;
  });

  const restaurants = RESTAURANTS.filter(r => r.categoryId === catId);

  if (!category) {
    return (
      <div className="flex flex-col h-svh items-center justify-center">
        <p className="text-[#a0a5ba]">Category not found</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-[#FC6E2A]">
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-svh">
      {/* Header  */}
      <div className="shrink-0 bg-white p-6 flex items-center gap-3">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="w-11.25 h-11.25 rounded-full bg-[#ECF0F4] flex items-center justify-center shrink-0"
          aria-label="Go back"
        >
          <IconBack />
        </button>

        {/* Category pill — dropdown để chọn category */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(v => !v)}
            className="flex items-center gap-2 h-11.25 px-4 rounded-full border border-[#ECF0F4] bg-white"
          >
            <span className="text-[12px] font-bold text-[#181c2e] uppercase tracking-wide">
              {category.name}
            </span>
            <IconChevronDown
              color="#F58D1D"
              style={{
                transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-lg overflow-hidden z-50 min-w-35">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { navigate(`/category/${cat.id}`); setDropdownOpen(false); }}
                  className={`w-full px-4 py-2.5 text-left text-[12px] font-bold uppercase tracking-wide transition-colors ${
                    cat.id === catId
                      ? 'text-[#F58D1D] bg-[#FFF4EA]'
                      : 'text-[#181c2e] hover:bg-[#F9F9F9]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search — dark bg */}
        <button
          onClick={() => navigate('/search')}
          className="w-11.5 h-11.5 rounded-full bg-[#121223] flex items-center justify-center shrink-0"
          aria-label="Search"
        >
          <IconSearch size={15} color="white" />
        </button>

        {/* Filter */}
        <button
          onClick={() => setFilterOpen(true)}
          className="w-11.5 h-11.5 rounded-full bg-[#ecf0f4] flex items-center justify-center shrink-0"
          aria-label="Filter"
        >
          <IconFilter />
        </button>
      </div>

      <FilterPopup open={filterOpen} onClose={() => setFilterOpen(false)} />

      {/* Scrollable body */}
      <div className="flex-1 min-h-0 overflow-y-auto px-6 pt-4 pb-20">
        {/* Popular foods grid  */}
        <section className="mb-8">
          <SectionHeader title={`Popular ${category.name}s`} />
          {foods.length === 0 ? (
            <p className="text-[#a0a5ba] text-center py-8">No items found</p>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
              {foods.slice(0, 4).map(food => (
                <FoodCard key={food.id} {...food} />
              ))}
            </div>
          )}
        </section>

        {/* Restaurants of this category */}
        {restaurants.length > 0 && (
          <section>
            <SectionHeader title="Open Restaurants" className="mb-4" />
            <div className="flex flex-col gap-7">
              {restaurants.map(r => (
                <RestaurantCard
                  key={r.id}
                  {...r}
                  onPress={id => navigate(`/restaurant/${id}`)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
