/**
 * FoodCard — 2-column grid card dùng trong restaurant-detail và category page.
 *
 * Props:
 *   id            — food id
 *   name          — tên món ăn
 *   restaurantName — tên nhà hàng
 *   price         — giá (number)
 *   category      — food category (để lấy default size khi quick-add)
 */
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/cart-store';
import { getDefaultSize } from '../../data/mock-foods';

export default function FoodCard({ id, name, restaurantName, price, category }) {
  const navigate = useNavigate();
  const addItem = useCartStore(s => s.addItem);

  function handleAdd(e) {
    e.stopPropagation(); // đừng trigger navigate của card
    const size = category ? getDefaultSize(category) : '';
    addItem({ id, name, price }, size, 1);
  }

  return (
    <div
      className="bg-white rounded-[25px] shadow-[12px_12px_30px_rgba(150,150,154,0.15)] cursor-pointer"
      onClick={() => navigate(`/food/${id}`)}
    >
      {/* Food image placeholder */}
      <div className="mx-5.25 mt-3 aspect-114/75 rounded-[15px] bg-[#98A8B8]" />

      {/* Card content */}
      <div className="px-3 pt-1.5 pb-3">
        <p className="text-[15px] font-bold text-[#32343E] tracking-[-0.33px] capitalize line-clamp-1">
          {name}
        </p>
        <p className="mt-0.5 text-[13px] text-[#646982] capitalize line-clamp-1">
          {restaurantName}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[16px] font-bold text-[#181C2E] tracking-[-0.33px]">
            ${price}
          </span>
          <button
            onClick={handleAdd}
            className="w-7.5 h-7.5 rounded-full bg-[#F58D1D] flex items-center justify-center shrink-0"
            aria-label={`Add ${name} to cart`}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M5 1v8M1 5h8"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
