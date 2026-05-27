/** Restaurant My Food List — filter by meal type, manage items */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantBottomNav from '../../components/restaurant/restaurant-bottom-nav';
import { IconBack, IconStarFilled } from '../../components/ui/icons';
import useFoodStore from '../../store/food-store';

const TABS = ['All', 'Breakfast', 'Lunch', 'Dinner'];

function FoodItem({ food, onDelete }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="flex gap-3 relative cursor-pointer"
      onClick={() => navigate(`/restaurant-portal/food/${food.id}`)}
    >
      {/* Image placeholder */}
      <div className="size-25.5 rounded-[20px] bg-[#98A8B8] shrink-0" />

      {/* Info */}
      <div className="flex-1 min-w-0">
        {/* Row 1: name + three dots */}
        <div className="flex items-start justify-between">
          <p className="font-semibold text-[#32343E] text-[14px] leading-snug pr-2">
            {food.name}
          </p>
          <div className="relative" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="text-gray-400 text-lg leading-none px-1 -mt-0.5"
            >
              •••
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-6 bg-white border border-gray-100 rounded-xl shadow-lg z-10 py-1 min-w-27.5">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete(food.id);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                >
                  Xoá món
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Row 2: category badge + price */}
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-xs font-medium text-primary bg-primary/20 px-2.5 py-0.5 rounded-full">
            {food.category}
          </span>
          <span className="font-bold text-[#32343E] text-[17px]">
            ${food.price}
          </span>
        </div>

        {/* Row 3: rating + availability */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1">
            <IconStarFilled className="w-3.5 h-3.5" />
            <span className="text-xs text-[#AFAFAF]">
              {food.rating}&nbsp;
              <span className="text-gray-400">({food.reviews} Review)</span>
            </span>
          </div>
          <span className="text-xs font-medium text-[#AFAFAF]">
            {food.pickup ? 'Pick UP' : 'Delivery'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function MenuPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  const foods = useFoodStore(s => s.foods);
  const removeFood = useFoodStore(s => s.removeFood);

  const filtered =
    activeTab === 'All' ? foods : foods.filter(f => f.category === activeTab);

  const totalLabel = String(filtered.length).padStart(2, '0');

  return (
    <div className="flex flex-col h-svh bg-white">
      <div className="flex-1 min-h-0 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center gap-4 px-5 pt-6 pb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-11.25 h-11.25 rounded-full bg-[#ECF0F4] flex items-center justify-center shrink-0"
          >
            <IconBack className="w-2.5 h-4" />
          </button>
          <h1 className="flex-1 text-lg text-[#181C2E]">My Food List</h1>
        </div>

        {/* Filter tabs */}
        <div className="flex border-b border-gray-100 px-5">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 mr-7 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'text-[#FB6D3A] border-[#FB6D3A]'
                  : 'text-gray-400 border-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="px-5 pt-6 pb-5 text-xs text-[#9C9BA6]">
          Total {totalLabel} items
        </p>

        {/* List */}
        <div className="px-5 pb-4">
          {filtered.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-10">
              Chưa có món nào
            </p>
          ) : (
            <div className="flex flex-col gap-5">
              {filtered.map(food => (
                <FoodItem key={food.id} food={food} onDelete={removeFood} />
              ))}
            </div>
          )}
        </div>
      </div>

      <RestaurantBottomNav />
    </div>
  );
}
