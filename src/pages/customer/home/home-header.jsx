/**
 * HomeHeader — top bar: hamburger menu / delivery location / cart badge.
 */
import { useNavigate } from 'react-router-dom';
import {
  IconMenu,
  IconChevronDown,
  IconBag,
} from '../../../components/ui/icons';

export default function HomeHeader({ cartCount = 0 }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 py-1">
      {/* Menu button — 45×45 light circle */}
      <button
        onClick={() => navigate('/menu')}
        className="w-11.25 h-11.25 rounded-full bg-[#f0f5fa] flex items-center justify-center shrink-0"
      >
        <IconMenu />
      </button>

      {/* Delivery location */}
      <div className="flex-1">
        <p className="text-[12px] font-bold text-[#fc6e2a] uppercase">
          Deliver to
        </p>
        <div className="flex items-center gap-1 mt-0.5">
          <p className="text-[14px] font-normal text-[#676767]">
            Halal Lab office
          </p>
          <IconChevronDown />
        </div>
      </div>

      {/* Cart button*/}
      <button onClick={() => navigate('/cart')} className="relative shrink-0">
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
  );
}
