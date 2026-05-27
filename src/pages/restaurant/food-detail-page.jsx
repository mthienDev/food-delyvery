/**
 * Restaurant Food Detail Page — Figma ref: node 602:851 "Chef Food Details"
 * Route: /restaurant-portal/food/:id
 * Data: useFoodStore (restaurant's own menu) + useAuthStore (restaurant info)
 */
import { useRef, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFoodStore from '../../store/food-store';
import useAuthStore from '../../store/auth-store';
import { getIngredientsByCategory } from '../../data/mock-foods';
import { IconBack, IconStarFilled } from '../../components/ui/icons';
import { INGREDIENT_ICONS } from '../../assets/icons/ingredients/index.js';
import RestaurantBottomNav from '../../components/restaurant/restaurant-bottom-nav';

// ── Category → gradient slide backgrounds ────────────────────────────────────

const CATEGORY_PALETTES = {
  Pizza:      ['#FF6B35','#F7931E','#FFD23F','#FF6B9D','#C77DFF'],
  Burger:     ['#E63946','#F4A261','#E9C46A','#2A9D8F','#264653'],
  Sushi:      ['#48CAE4','#023E8A','#90E0EF','#ADE8F4','#CAF0F8'],
  Pasta:      ['#FFBA08','#FAA307','#F48C06','#E85D04','#DC2F02'],
  Salad:      ['#80B918','#AACC00','#BFD200','#CCDE00','#D4E157'],
  Wings:      ['#FF4500','#FF6B35','#FF8C42','#FFA552','#FFBA6B'],
  Rice:       ['#F9C74F','#F9844A','#F8961E','#F3722C','#90BE6D'],
  Drinks:     ['#4CC9F0','#4361EE','#3A0CA3','#7209B7','#F72585'],
  Dessert:    ['#FF85A1','#FBB1BD','#FF0A54','#FF477E','#FF5C8A'],
  Bruschetta: ['#BC6C25','#DDA15E','#FEFAE0','#606C38','#283618'],
};
const DEFAULT_PALETTE = ['#98A8B8','#7B8FA1','#B0C4DE','#A9B8C3','#8FA4B2'];

const SLIDE_COUNT = 5;
const DRAG_THRESHOLD = 40;

// ── Carousel ──────────────────────────────────────────────────────────────────

function FoodImageCarousel({ category, foodName, delivery }) {
  const [active, setActive] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  // isDragging state → re-render để đổi cursor/transition
  const [isDragging, setIsDragging] = useState(false);
  // dragging ref → check trong event handlers (tránh stale closure)
  const dragging = useRef(false);
  const startX = useRef(0);
  const palette = CATEGORY_PALETTES[category] ?? DEFAULT_PALETTE;

  const goTo = useCallback((idx) => {
    setActive(Math.max(0, Math.min(SLIDE_COUNT - 1, idx)));
    setDragOffset(0);
  }, []);

  function onPointerDown(e) {
    e.currentTarget.setPointerCapture(e.pointerId);
    startX.current = e.clientX;
    dragging.current = true;
    setIsDragging(true);
  }

  function onPointerMove(e) {
    if (!dragging.current) return; // ref: không bị stale closure
    setDragOffset(e.clientX - startX.current);
  }

  function onPointerUp() {
    if (!dragging.current) return;
    dragging.current = false;
    setIsDragging(false);
    setDragOffset(prev => {
      if (prev < -DRAG_THRESHOLD) setActive(a => Math.min(SLIDE_COUNT - 1, a + 1));
      else if (prev > DRAG_THRESHOLD) setActive(a => Math.max(0, a - 1));
      return 0;
    });
  }

  // translateX(%): 100% = chiều rộng của track (= SLIDE_COUNT × container)
  // → mỗi bước = 1 container width = 100/SLIDE_COUNT % của track
  // dragOffset là px thực, cộng trực tiếp không cần chia
  const translateX = `calc(${-active * (100 / SLIDE_COUNT)}% + ${dragOffset}px)`;

  return (
    <div
      className="mx-6 relative rounded-[20px] overflow-hidden select-none"
      style={{ height: 250 }}
    >
      <div
        className="flex h-full touch-pan-y"
        style={{
          width: `${SLIDE_COUNT * 100}%`,
          transform: `translateX(${translateX})`,
          transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
          cursor: isDragging ? 'grabbing' : 'grab',
          willChange: 'transform',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {palette.map((bg, i) => (
          <div
            key={i}
            className="h-full relative flex items-center justify-center"
            style={{ width: `${100 / SLIDE_COUNT}%`, background: bg }}
          >
            <span
              className="text-white/90 text-[14px] font-semibold px-6 text-center leading-snug pointer-events-none"
              style={{ textShadow: '0 1px 6px rgba(0,0,0,.4)' }}
            >
              {foodName}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 inset-x-4 flex items-center justify-between pointer-events-none">
        <span className="bg-white/80 text-[#32343e] text-[13px] px-3 py-1.5 rounded-full backdrop-blur-sm">
          {category}
        </span>
        <div className="flex items-center gap-1.5 pointer-events-auto">
          {palette.map((_, i) => (
            <button
              key={i}
              aria-label={`Anh ${i + 1}`}
              onClick={() => goTo(i)}
              className={[
                'rounded-full transition-all duration-300',
                i === active ? 'w-5 h-2 bg-[#fb6d3a]' : 'w-2 h-2 bg-white/60',
              ].join(' ')}
            />
          ))}
        </div>
        <span className="bg-white/80 text-[#32343e] text-[13px] px-3 py-1.5 rounded-full backdrop-blur-sm">
          {delivery ? 'Delivery' : 'Pick Up'}
        </span>
      </div>
    </div>
  );
}

// ── Location pin icon ─────────────────────────────────────────────────────────

function LocationPinIcon() {
  return (
    <svg width="10" height="13" viewBox="0 0 10 13" fill="none" aria-hidden="true">
      <path
        d="M5 0C2.243 0 0 2.243 0 5C0 8.75 5 13 5 13C5 13 10 8.75 10 5C10 2.243 7.757 0 5 0ZM5 7C3.897 7 3 6.103 3 5C3 3.897 3.897 3 5 3C6.103 3 7 3.897 7 5C7 6.103 6.103 7 5 7Z"
        fill="#AFAFAF"
      />
    </svg>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function RestaurantFoodDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const food = useFoodStore(s => s.foods.find(f => f.id === id));
  const restaurant = useAuthStore(s => s.user);
  const ingredients = food ? getIngredientsByCategory(food.category) : [];

  if (!food)
    return (
      <div className="flex flex-col h-svh items-center justify-center">
        <p className="text-[#A0A5BA]">Food not found</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-[#F58D1D]">
          Go back
        </button>
      </div>
    );

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between px-6 pt-6 pb-8 bg-white">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-11.25 h-11.25 rounded-full bg-[#ECF0F4] flex items-center justify-center shrink-0"
            aria-label="Go back"
          >
            <IconBack />
          </button>
          <span className="text-[17px] font-normal text-[#181c2e] leading-5.5">
            Food Details
          </span>
        </div>
        <button
          onClick={() => navigate(`/restaurant-portal/add-item?edit=${id}`)}
          className="text-[14px] font-medium text-[#FB6D3A] uppercase tracking-wide"
        >
          Edit
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
        <FoodImageCarousel category={food.category} foodName={food.name} delivery={food.delivery} />

        <div className="px-6 pt-5 pb-8">
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-[16px] font-bold text-[#32343e] leading-snug flex-1 mr-4">
              {food.name}
            </h1>
            <span className="text-[18px] font-bold text-[#32343e] shrink-0">
              ${food.price}
            </span>
          </div>

          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-1.5">
              <LocationPinIcon />
              <span className="text-[13px] text-[#afafaf]">
                {restaurant?.address ?? 'No address'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <IconStarFilled className="w-3.5 h-3.5" />
              <span className="text-[14px] font-bold text-[#fb6d3a]">{food.rating}</span>
              <span className="text-[14px] text-[#afafaf] ml-0.5">
                ({food.reviews} Reviews)
              </span>
            </div>
          </div>

          <div className="h-px bg-[#ebebeb] mb-5" />

          <p className="text-[14px] text-[#32343e] uppercase tracking-[0.28px] mb-4">
            Ingridents
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-5 mb-5">
            {ingredients.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className="w-12.5 h-12.5 rounded-full bg-[#FFEBE4] flex items-center justify-center">
                  <img
                    src={INGREDIENT_ICONS[item.icon]}
                    alt={item.name}
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <div className="text-center leading-none">
                  <p className="text-[12px] text-[#747783] capitalize">{item.name}</p>
                  {item.allergy && (
                    <p className="text-[8px] text-[#747783] mt-0.5">(Alergy)</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="h-px bg-[#ebebeb] mb-5" />

          <p className="text-[14px] text-[#32343e] mb-3">Description</p>
          <p className="text-[13px] text-[#747783] leading-6">
            {food.details || 'No description available.'}
          </p>
        </div>
      </div>

      <RestaurantBottomNav />
    </div>
  );
}
