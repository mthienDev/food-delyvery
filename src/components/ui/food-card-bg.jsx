/**
 * FoodCardBg — barrel-shaped SVG card background with drop shadow.
 * Dùng chung cho food item cards (search-page, category-page, ...).
 * @param {string} filterId — unique ID tránh SVG filter ID collision
 */
export default function FoodCardBg({ filterId }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      viewBox="18 18 150.5 102"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter
          id={filterId}
          x="0"
          y="0"
          width="210.49"
          height="162"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="12" dy="12" />
          <feGaussianBlur stdDeviation="15" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.588235 0 0 0 0 0.588235 0 0 0 0 0.603922 0 0 0 0.15 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="shadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="shadow" result="shape" />
        </filter>
      </defs>
      {/* Barrel path — trên hẹp, dưới rộng hơn */}
      <path
        filter={`url(#${filterId})`}
        d="M20.5796 41.776C21.2323 28.4606 32.2183 18 45.5496 18H140.941C154.272 18 165.258 28.4607 165.911 41.776L168.46 93.776C169.158 108.047 157.777 120 143.49 120H43.0006C28.7128 120 17.3311 108.047 18.0306 93.776L20.5796 41.776Z"
        fill="white"
      />
    </svg>
  );
}
