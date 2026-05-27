/**
 * Shared SVG icon components — used across the app.
 * Each icon accepts an optional `className` prop for size/color overrides.
 */

export function IconMenu({ className = '' }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
    >
      <circle cx="22.5" cy="22.5" r="22.5" fill="white" />
      <path
        d="M16 28H26"
        stroke="#181C2E"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16 22H32"
        stroke="#181C2E"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16 16H22"
        stroke="#181C2E"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export function IconSearch({ className = '', color = '#9D9DAF', size = 18 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
    >
      <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.8" />
      <path
        d="M13 13l3.5 3.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconChevronDown({ className = '', color = '#181C2E' }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="9"
      height="6"
      viewBox="0 0 9 6"
      fill="none"
    >
      <path
        d="M4.49797 5.27819C4.29784 5.52578 3.92037 5.52578 3.72025 5.27819L0.11219 0.814372C-0.152097 0.487402 0.0806232 6.40278e-05 0.501048 6.40645e-05L7.71717 6.46954e-05C8.1376 6.47321e-05 8.37031 0.487404 8.10603 0.814374L4.49797 5.27819Z"
        fill={color}
      />
    </svg>
  );
}

export function IconChevronRight({ color = '#A0A5BA', className = '' }) {
  return (
    <svg
      className={className}
      width="7"
      height="12"
      viewBox="0 0 7 12"
      fill="none"
    >
      <path
        d="M1 1l5 5-5 5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconBag({ className = '' }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

export function IconStar({ className = '' }) {
  return (
    <svg
      className={className}
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.90279 1.13855C9.9624 0.953735 10.2239 0.953734 10.2835 1.13855L12.2819 7.33514C12.3086 7.41791 12.3857 7.47395 12.4727 7.47376L18.9836 7.45953C19.1778 7.4591 19.2586 7.70779 19.1012 7.82158L13.8254 11.6371C13.755 11.688 13.7255 11.7787 13.7526 11.8613L15.7781 18.0491C15.8385 18.2337 15.6269 18.3874 15.4701 18.2729L10.2111 14.4344C10.1408 14.3831 10.0455 14.3831 9.97523 14.4344L4.7162 18.2729C4.55934 18.3874 4.3478 18.2337 4.40821 18.0491L6.43371 11.8613C6.46077 11.7787 6.43131 11.688 6.36084 11.6371L1.08508 7.82158C0.927726 7.70779 1.00853 7.4591 1.20272 7.45953L7.71358 7.47376C7.80055 7.47395 7.87767 7.41791 7.90436 7.33514L9.90279 1.13855Z"
        stroke="#FF7622"
        strokeWidth="2"
      />
    </svg>
  );
}

export function IconStar2({ className = '' }) {
  return (
    <svg
      className={className}
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.90279 1.13855C9.9624 0.953735 10.2239 0.953734 10.2835 1.13855L12.2819 7.33514C12.3086 7.41791 12.3857 7.47395 12.4727 7.47376L18.9836 7.45953C19.1778 7.4591 19.2586 7.70779 19.1012 7.82158L13.8254 11.6371C13.755 11.688 13.7255 11.7787 13.7526 11.8613L15.7781 18.0491C15.8385 18.2337 15.6269 18.3874 15.4701 18.2729L10.2111 14.4344C10.1408 14.3831 10.0455 14.3831 9.97523 14.4344L4.7162 18.2729C4.55934 18.3874 4.3478 18.2337 4.40821 18.0491L6.43371 11.8613C6.46077 11.7787 6.43131 11.688 6.36084 11.6371L1.08508 7.82158C0.927726 7.70779 1.00853 7.4591 1.20272 7.45953L7.71358 7.47376C7.80055 7.47395 7.87767 7.41791 7.90436 7.33514L9.90279 1.13855Z"
        stroke="#FF7622"
        strokeWidth="2"
      />
    </svg>
  );
}

export function IconDelivery({ className = '' }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="16"
      viewBox="0 0 23 16"
      fill="none"
    >
      <path
        d="M0 0V2H14V6V8V11H8.2207C7.67163 10.3907 6.88492 10 6 10C5.11508 10 4.32837 10.3907 3.7793 11H3V10L5 8H1V13H3C3 14.657 4.343 16 6 16C7.657 16 9 14.657 9 13H15C15 14.657 16.343 16 18 16C19.657 16 21 14.657 21 13H22H23V8L20.2754 2.55273C20.1064 2.21373 19.7618 2 19.3828 2H16V0H0ZM1 4V6H8V4H1ZM16 4H18.7637L19.7637 6H16V4ZM16 8H20.7637L21 8.47266V11H20.2207C19.6716 10.3907 18.8849 10 18 10C17.2279 10 16.5316 10.3002 16 10.7793V8ZM6 11.75C6.689 11.75 7.25 12.311 7.25 13C7.25 13.689 6.689 14.25 6 14.25C5.311 14.25 4.75 13.689 4.75 13C4.75 12.311 5.311 11.75 6 11.75ZM18 11.75C18.689 11.75 19.25 12.311 19.25 13C19.25 13.689 18.689 14.25 18 14.25C17.311 14.25 16.75 13.689 16.75 13C16.75 12.311 17.311 11.75 18 11.75Z"
        fill="#FF7622"
      />
    </svg>
  );
}

export function IconBack({ className = '' }) {
  return (
    <svg
      className={className}
      width="10"
      height="18"
      viewBox="0 0 10 18"
      fill="none"
    >
      <path
        d="M9 1L1 9L9 17"
        stroke="#181C2E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconClose({ className = '', color = '#9D9DAF' }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M12 4L4 12M4 4l8 8"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconFilter({ className = '' }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
    >
      <rect width="46" height="46" rx="23" fill="#ECF0F4" />
      <path
        d="M15.5 33V26"
        stroke="#181C2E"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.5 22V15"
        stroke="#181C2E"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M23.5 33V24"
        stroke="#181C2E"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M23.5 20V15"
        stroke="#181C2E"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M31.5 33V28"
        stroke="#181C2E"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M31.5 24V15"
        stroke="#181C2E"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.5 26H18.5"
        stroke="#F58D1D"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20.5 20H26.5"
        stroke="#F58D1D"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M28.5 28H34.5"
        stroke="#F58D1D"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export function IconBell({ className = '', color = 'white' }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

/** 2×2 grid icon – used for Dashboard nav tab */
export function IconGrid({ className = '', color = '#9D9DAF' }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <rect x="2" y="2" width="7" height="7" rx="1.5" fill={color} />
      <rect x="11" y="2" width="7" height="7" rx="1.5" fill={color} />
      <rect x="2" y="11" width="7" height="7" rx="1.5" fill={color} />
      <rect x="11" y="11" width="7" height="7" rx="1.5" fill={color} />
    </svg>
  );
}

/** Hamburger / 3-line icon – used for Menu nav tab */
export function IconHamburger({ className = '', color = '#9D9DAF' }) {
  return (
    <svg
      className={className}
      color={color}
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        d="M3.125 12H21.875"
        stroke="#AFAFAF"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.125 6H21.875"
        stroke="#AFAFAF"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.125 18H21.875"
        stroke="#AFAFAF"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

/** User silhouette icon – used for Profile nav tab */
export function IconUser({ className = '', color = '#9D9DAF' }) {
  return (
    <svg
      className={className}
      color={color}
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        d="M20.8333 21V19C20.8333 17.9391 20.3943 16.9217 19.6129 16.1716C18.8315 15.4214 17.7717 15 16.6667 15H8.33332C7.22825 15 6.16845 15.4214 5.38704 16.1716C4.60564 16.9217 4.16666 17.9391 4.16666 19V21"
        stroke="#AFAFAF"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.5 11C14.8012 11 16.6667 9.20914 16.6667 7C16.6667 4.79086 14.8012 3 12.5 3C10.1988 3 8.33334 4.79086 8.33334 7C8.33334 9.20914 10.1988 11 12.5 11Z"
        stroke="#AFAFAF"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

/** Plus icon – used for center FAB button in nav */
export function IconPlus({ className = '', color = '#FF7622' }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M8 2v12M2 8h12"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Filled star – used for ratings */
export function IconStarFilled({ className = '' }) {
  return (
    <svg
      className={className}
      width="26"
      height="26"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.90279 1.13855C9.9624 0.953735 10.2239 0.953734 10.2835 1.13855L12.2819 7.33514C12.3086 7.41791 12.3857 7.47395 12.4727 7.47376L18.9836 7.45953C19.1778 7.4591 19.2586 7.70779 19.1012 7.82158L13.8254 11.6371C13.755 11.688 13.7255 11.7787 13.7526 11.8613L15.7781 18.0491C15.8385 18.2337 15.6269 18.3874 15.4701 18.2729L10.2111 14.4344C10.1408 14.3831 10.0455 14.3831 9.97523 14.4344L4.7162 18.2729C4.55934 18.3874 4.3478 18.2337 4.40821 18.0491L6.43371 11.8613C6.46077 11.7787 6.43131 11.688 6.36084 11.6371L1.08508 7.82158C0.927726 7.70779 1.00853 7.4591 1.20272 7.45953L7.71358 7.47376C7.80055 7.47395 7.87767 7.41791 7.90436 7.33514L9.90279 1.13855Z"
        fill="#fb6d3a"
        stroke="#fb6d3a"
        strokeWidth="1"
      />
    </svg>
  );
}

export function IconClock({ className = '' }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <circle cx="10" cy="10" r="8.5" stroke="#FF7622" strokeWidth="1.8" />
      <path
        d="M10 5.5V10.5L13 12.5"
        stroke="#FF7622"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
