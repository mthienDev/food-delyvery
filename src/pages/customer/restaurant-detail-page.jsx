/**
 * Restaurant Detail Page — hero slider, info, menu tabs, food grid.
 * Route: /restaurant/:id
 * Figma ref: restaurant-detail screen
 */
import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { restaurants } from '../../data/mock-restaurants';
import { getFoodsByRestaurant } from '../../data/mock-foods';
import {
  IconBack,
  IconStar,
  IconDelivery,
  IconClock,
} from '../../components/ui/icons';
import FoodCard from '../../components/ui/food-card';
import FilterPopup from '../../components/customer/filter-popup';

// ── Hero Slider ────────────────────────────────────────────────────────────────

const SLIDE_COUNT = 5;

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const startX = useRef(null);

  function handleTouchStart(e) {
    startX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (startX.current === null) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      setCurrent(prev =>
        diff > 0 ? Math.min(prev + 1, SLIDE_COUNT - 1) : Math.max(prev - 1, 0),
      );
    }
    startX.current = null;
  }

  return (
    <div className="relative">
      {/* Slides */}
      <div
        className="overflow-hidden"
        style={{
          width: '100%',
          height: '321px',
          borderRadius: '0 0 24px 24px',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
            <div
              key={i}
              className="w-full h-full shrink-0"
              style={{
                background:
                  'linear-gradient(0deg, #98A8B8 0%, #98A8B8 100%), lightgray 50% / cover no-repeat',
                borderRadius: '0 0 24px 24px',
              }}
            />
          ))}
        </div>
      </div>

      {/* Dots  */}
      <div className="absolute bottom-4 inset-x-0 flex justify-center items-center gap-2.5">
        {Array.from({ length: SLIDE_COUNT }).map((_, i) =>
          i === current ? (
            /* Active: outer ring + inner dot */
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center transition-all duration-200"
            >
              <div className="w-2 h-2 rounded-full bg-white" />
            </button>
          ) : (
            /* Inactive: small filled circle */
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className="w-2 h-2 rounded-full bg-white/50 transition-all duration-200"
            />
          ),
        )}
      </div>
    </div>
  );
}

// ── Category Tabs ─────────────────────────────────────────────────────────────

function CategoryTabs({ categories, active, onChange }) {
  return (
    <div className="flex gap-2.5 overflow-x-auto no-scrollbar px-6 py-1">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`shrink-0 px-5 h-11.5 rounded-full text-[16px] font-normal tracking-[-0.33px] transition-colors ${
            cat === active
              ? 'bg-[#F58D1D] text-white'
              : 'bg-white text-[#181C2E] border border-[#EDEDED]'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function RestaurantDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [headerSolid, setHeaderSolid] = useState(false);

  const restaurant = restaurants.find(r => r.id === id);
  const allFoods = getFoodsByRestaurant(id);

  // Unique categories from this restaurant's menu
  const categories = [...new Set(allFoods.map(f => f.category))];
  const [activeCategory, setActiveCategory] = useState(categories[0] ?? '');

  if (!restaurant) {
    return (
      <div className="flex flex-col h-svh items-center justify-center">
        <p className="text-[#a0a5ba]">Restaurant not found</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-primary">
          Go back
        </button>
      </div>
    );
  }

  const filteredFoods = allFoods.filter(f => f.category === activeCategory);

  return (
    <div
      className="h-svh overflow-y-auto no-scrollbar bg-white"
      onScroll={e => setHeaderSolid(e.currentTarget.scrollTop > 100)}
    >
      {/* Top controls — sticky overlay trên hero; h-0 không đẩy hero xuống */}
      <div className="sticky top-0 z-20 h-0">
        {/* Nền trắng mờ dần khi scroll — absolute để không ảnh hưởng layout */}
        <div
          className="absolute inset-x-0 top-0 z-0 transition-colors duration-200"
          style={{ height: '85px', background: headerSolid ? 'white' : 'transparent' }}
        />
        {/* Buttons — z-10 để nằm trên nền */}
        <div className="relative z-10 flex items-center justify-between px-6 pt-6 pb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-11.25 h-11.25 rounded-full bg-white flex items-center justify-center shadow-md"
            aria-label="Go back"
          >
            <IconBack />
          </button>
          <button
            onClick={() => setShowFilter(true)}
            className="w-11.25 h-11.25 rounded-full bg-white flex items-center justify-center shadow-md"
            aria-label="More options"
          >
            <svg width="18" height="4" viewBox="0 0 18 4" fill="none">
              <circle cx="2" cy="2" r="2" fill="#181C2E" />
              <circle cx="9" cy="2" r="2" fill="#181C2E" />
              <circle cx="16" cy="2" r="2" fill="#181C2E" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hero + dots */}
      <HeroSlider />

      {/* Filter popup */}
      <FilterPopup open={showFilter} onClose={() => setShowFilter(false)} />

      {/* Content */}
      <div className="pb-24">
        {/* Info block */}
        <div className="px-6 pt-7 pb-8">
          {/* Stats row */}
          <div className="flex items-center gap-9 mb-4">
            <span className="flex items-center gap-2.5">
              <IconStar className="w-5 h-5 shrink-0" />
              <span className="text-[16px] font-bold text-[#181C2E]">
                {restaurant.rating}
              </span>
            </span>
            <span className="flex items-center gap-2.5">
              <IconDelivery className="w-5.5 h-4 shrink-0" />
              <span className="text-[14px] text-[#181C2E]">
                {restaurant.deliveryLabel}
              </span>
            </span>
            <span className="flex items-center gap-2.5">
              <IconClock className="w-5 h-5 shrink-0" />
              <span className="text-[14px] text-[#181C2E]">
                {restaurant.deliveryTime} min
              </span>
            </span>
          </div>

          {/* Name */}
          <h1 className="text-[20px] font-bold text-[#181C2E] leading-tight mb-2">
            {restaurant.name}
          </h1>

          {/* Description */}
          <p className="text-[14px] text-[#A0A5BA] leading-5.5 ">
            {restaurant.description}
          </p>
        </div>

        {/* Category tabs */}
        {categories.length > 0 && (
          <CategoryTabs
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        )}

        {/* Food grid */}
        <div className="px-6 mt-8">
          {/* Section header */}
          <div className="mb-7">
            <h2 className="text-[18px] font-normal text-[#181C2E] capitalize">
              {activeCategory}{' '}
              <span className="text-[#A0A5BA]">({filteredFoods.length})</span>
            </h2>
          </div>

          {filteredFoods.length === 0 ? (
            <p className="text-center text-[#a0a5ba] py-10">
              No items in this category
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-x-5.25 gap-y-6">
              {filteredFoods.map(food => (
                <FoodCard
                  key={food.id}
                  id={food.id}
                  name={food.name}
                  restaurantName={restaurant.name}
                  price={food.price}
                  category={food.category}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
