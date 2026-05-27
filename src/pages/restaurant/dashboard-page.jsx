/**
 * Restaurant Dashboard — revenue stats, active orders, reviews, popular items.
 * Drawer ref: node 602:1432
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/auth-store';
import {
  IconMenu,
  IconChevronDown,
  IconStarFilled,
} from '../../components/ui/icons';
import RestaurantBottomNav from '../../components/restaurant/restaurant-bottom-nav';
import OrderDrawer from '../../components/restaurant/order-drawer';
import { foods } from '../../data/mock-foods';
import {
  runningOrders,
  orderRequests,
} from '../../data/mock-restaurant-orders';
import useDragScroll from '../../hooks/use-drag-scroll';

// ── Header ────────────────────────────────────────────────────────────────────
function DashboardHeader({ location = 'Halal Lab office' }) {
  const navigate = useNavigate();
  const user = useAuthStore(s => s.user);

  return (
    <div className="flex items-center gap-4.5">
      <button
        onClick={() => navigate('/restaurant-portal/profile')}
        className="shrink-0"
      >
        <IconMenu />
      </button>
      <div className="flex-1">
        <p className="text-[12px] font-bold text-[#fc6e2a] uppercase leading-none">
          Location
        </p>
        <div className="flex items-center gap-1 mt-1">
          <p className="text-[14px] font-normal text-[#676767] leading-none">
            {location}
          </p>
          <IconChevronDown color="#676767" />
        </div>
      </div>
      <div className="w-11.25 h-11.25 rounded-full overflow-hidden bg-gray-300 shrink-0">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#b0b3c5]" />
        )}
      </div>
    </div>
  );
}

function StatCard({ value, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 bg-white rounded-2xl px-5 py-4 shadow-sm text-left cursor-pointer
        transition-all duration-200
        hover:shadow-md hover:bg-[#fff5f0] hover:-translate-y-0.5
        active:scale-95 active:shadow-sm active:translate-y-0"
    >
      <p className="text-[52px] font-bold text-[#32343e] leading-none">
        {value}
      </p>
      <p className="text-[13px] font-bold text-[#838799] uppercase mt-2">
        {label}
      </p>
    </button>
  );
}

// ── Revenue Chart ─────────────────────────────────────────────────────────────
const CHART_DATA = [
  { time: '10AM', value: 110 },
  { time: '11AM', value: 190 },
  { time: '12PM', value: 500 },
  { time: '01PM', value: 290 },
  { time: '02PM', value: 210 },
  { time: '03PM', value: 350 },
  { time: '04PM', value: 460 },
];

const W = 300,
  H = 90,
  PAD_T = 40;

function buildCurvePath(pts) {
  return pts.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x},${pt.y}`;
    const prev = pts[i - 1];
    const step = (pt.x - prev.x) * 0.5;
    return `${acc} C ${prev.x + step},${prev.y} ${pt.x - step},${pt.y} ${pt.x},${pt.y}`;
  }, '');
}

function RevenueChart() {
  const [period, setPeriod] = useState('Daily');
  const maxVal = Math.max(...CHART_DATA.map(d => d.value));
  const minVal = Math.min(...CHART_DATA.map(d => d.value));
  const yRange = maxVal - minVal || 1;
  const xStep = W / (CHART_DATA.length - 1);

  const pts = CHART_DATA.map((d, i) => ({
    x: i * xStep,
    y: PAD_T + ((maxVal - d.value) / yRange) * (H - PAD_T),
  }));

  const linePath = buildCurvePath(pts);
  const areaPath = `${linePath} L ${pts.at(-1).x},${H} L ${pts[0].x},${H} Z`;

  // Tooltip at 12PM (index 2)
  const tip = pts[2];

  // Tooltip bubble dimensions
  const tipW = 56,
    tipH = 22,
    tipRx = 7,
    arrowSz = 6;
  const tipX = tip.x - tipW / 2;
  const tipY = tip.y - tipH - 14;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      {/* Card header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[14px] text-[#32343e]">Total Revenue</p>
          <p className="text-[22px] font-bold text-[#32343e] leading-tight">
            $2,241
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={period}
              onChange={e => setPeriod(e.target.value)}
              className="border border-[#e8eaed] rounded-lg pl-3 pr-7 py-1.5 text-[12px] text-[#9c9ba6] bg-white appearance-none cursor-pointer"
            >
              {['Daily', 'Weekly', 'Monthly'].map(p => (
                <option key={p}>{p}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#9c9ba6] text-[10px]">
              ▾
            </span>
          </div>
          <button className="text-[14px] text-[#fb6d3a] underline whitespace-nowrap">
            See Details
          </button>
        </div>
      </div>

      {/* SVG chart */}
      <div className="mt-3">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height="139"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="rev-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fc6e2a" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#fc6e2a" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="tip-line-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fc7f53" stopOpacity="1" />
              <stop offset="87%" stopColor="#fc7f53" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#rev-grad)" />
          <path
            d={linePath}
            fill="none"
            stroke="#fc6e2a"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Gradient vertical line at tooltip */}
          <rect
            x={tip.x - 1}
            y={tip.y + 5}
            width="2"
            height={H - tip.y - 5}
            fill="url(#tip-line-grad)"
          />
          {/* Dot */}
          <circle
            cx={tip.x}
            cy={tip.y}
            r="5.5"
            fill="white"
            stroke="#fc6e2a"
            strokeWidth="2"
          />
          {/* Tooltip bubble */}
          <rect
            x={tipX}
            y={tipY}
            width={tipW}
            height={tipH}
            rx={tipRx}
            fill="#32343e"
          />
          <text
            x={tip.x}
            y={tipY + tipH * 0.66}
            textAnchor="middle"
            fill="white"
            fontSize="11"
            fontWeight="700"
          >
            $500
          </text>
          {/* Tooltip downward arrow */}
          <polygon
            points={`${tip.x - arrowSz},${tipY + tipH} ${tip.x + arrowSz},${tipY + tipH} ${tip.x},${tipY + tipH + arrowSz}`}
            fill="#32343e"
          />
        </svg>

        {/* X-axis labels */}
        <div className="flex justify-between mt-0.5">
          {CHART_DATA.map(d => (
            <span key={d.time} className="text-[9px] text-[#9c9ba6] uppercase">
              {d.time}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Reviews ───────────────────────────────────────────────────────────────────
function ReviewsCard() {
  return (
    <div className="bg-white rounded-2xl px-4 py-3.5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[14px] font-normal text-[#32343e]">Reviews</p>
        <button className="text-[14px] text-[#fb6d3a] underline">
          See All Reviews
        </button>
      </div>
      <div className="flex items-center gap-2">
        <IconStarFilled />
        <span className="text-[21px] font-bold text-[#fb6d3a] leading-none">
          4.9
        </span>
        <span className="text-[14px] text-[#32343e]">Total 20 Reviews</span>
      </div>
    </div>
  );
}

function PopularItemsRow({ items }) {
  const {
    ref,
    onMouseDown,
    onMouseUp,
    onMouseMove,
    onMouseLeave,
    style,
    isDragging,
  } = useDragScroll();

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={style}
      className="flex gap-3 overflow-x-auto no-scrollbar"
    >
      {items.map(food => (
        <div
          key={food.id}
          className="shrink-0 w-37.5 h-38.25 rounded-xl overflow-hidden"
          onClick={() => {
            if (isDragging()) return;
          }}
        >
          {food.image ? (
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#b8bcc8]" />
          )}
        </div>
      ))}
    </div>
  );
}

function PopularItems() {
  const popularFoods = foods.filter(f => f.isBestseller);
  const mid = Math.ceil(popularFoods.length / 2);
  const row1 = popularFoods.slice(0, mid);
  const row2 = popularFoods.slice(mid);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[14px] text-[#32343e]">Populer Items This Weeks</p>
        <button className="text-[14px] text-[#fb6d3a] underline">
          See All
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <PopularItemsRow items={row1} />
        <PopularItemsRow items={row2} />
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  // null | 'running' | 'request'
  const [activeDrawer, setActiveDrawer] = useState(null);
  const closeDrawer = () => setActiveDrawer(null);

  return (
    <div className="flex flex-col h-svh bg-[#F7F8F9] relative overflow-hidden">
      {/* Fixed header — không scroll */}
      <div className="shrink-0 bg-[#F7F8F9] px-4 py-6 z-10">
        <DashboardHeader />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 min-h-0 overflow-y-scroll">
        <div className="flex flex-col gap-4 px-4 pb-6">
          <div className="flex gap-3">
            <StatCard
              value={String(runningOrders.length).padStart(2, '0')}
              label="Running Orders"
              onClick={() => setActiveDrawer('running')}
            />
            <StatCard
              value={String(orderRequests.length).padStart(2, '0')}
              label="Order Request"
              onClick={() => setActiveDrawer('request')}
            />
          </div>
          <RevenueChart />
          <ReviewsCard />
          <PopularItems />
        </div>
      </div>

      <div className="shrink-0"><RestaurantBottomNav /></div>

      {/* Running Orders drawer */}
      <OrderDrawer
        open={activeDrawer === 'running'}
        onClose={closeDrawer}
        title={`${runningOrders.length} Running Orders`}
        orders={runningOrders}
        type="running"
      />

      {/* Order Request drawer */}
      <OrderDrawer
        open={activeDrawer === 'request'}
        onClose={closeDrawer}
        title={`${orderRequests.length} Order Requests`}
        orders={orderRequests}
        type="request"
      />
    </div>
  );
}
