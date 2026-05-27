/**
 * My Address Page — danh sách địa chỉ giao hàng.
 * Route: /my-address
 */
import { useNavigate } from 'react-router-dom';
import useAddressStore from '../../store/address-store';

// ── Icons ──────────────────────────────────────────────────────────────────────
function BackArrow() {
  return (
    <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
      <path
        d="M8 1L1 8l7 7"
        stroke="#181C2E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
    >
      <circle cx="24" cy="24" r="24" fill="white" />
      <path
        d="M15 21L24 14L33 21V32C33 32.5304 32.7893 33.0391 32.4142 33.4142C32.0391 33.7893 31.5304 34 31 34H17C16.4696 34 15.9609 33.7893 15.5858 33.4142C15.2107 33.0391 15 32.5304 15 32V21Z"
        stroke="#2790C3"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21 34V24H27V34"
        stroke="#2790C3"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

function WorkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
    >
      <circle cx="24" cy="24" r="24" fill="white" />
      <path
        d="M32 19H16C14.8954 19 14 19.8954 14 21V31C14 32.1046 14.8954 33 16 33H32C33.1046 33 34 32.1046 34 31V21C34 19.8954 33.1046 19 32 19Z"
        stroke="#A03BB1"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M28 33V17C28 16.4696 27.7893 15.9609 27.4142 15.5858C27.0391 15.2107 26.5304 15 26 15H22C21.4696 15 20.9609 15.2107 20.5858 15.5858C20.2107 15.9609 20 16.4696 20 17V33"
        stroke="#A03BB1"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

/** Location pin - màu xanh lá cho label Other */
function OtherIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
    >
      <circle cx="24" cy="24" r="24" fill="white" />
      <path
        d="M24 14C20.134 14 17 17.134 17 21C17 26.25 24 34 24 34C24 34 31 26.25 31 21C31 17.134 27.866 14 24 14Z"
        stroke="#2BB673"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="21" r="2.5" stroke="#2BB673" strokeWidth="2" />
    </svg>
  );
}

/** Bút chì - màu cam */
function EditIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
    >
      <path
        d="M7.5 2.34082H2.25C1.85218 2.34082 1.47064 2.49886 1.18934 2.78016C0.908035 3.06146 0.75 3.443 0.75 3.84082V14.3408C0.75 14.7386 0.908035 15.1202 1.18934 15.4015C1.47064 15.6828 1.85218 15.8408 2.25 15.8408H12.75C13.1478 15.8408 13.5294 15.6828 13.8107 15.4015C14.092 15.1202 14.25 14.7386 14.25 14.3408V9.09082"
        stroke="#FB6D3A"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.125 1.21599C13.4234 0.917622 13.828 0.75 14.25 0.75C14.672 0.75 15.0766 0.917622 15.375 1.21599C15.6734 1.51436 15.841 1.91903 15.841 2.34099C15.841 2.76295 15.6734 3.16762 15.375 3.46599L8.25 10.591L5.25 11.341L6 8.34099L13.125 1.21599Z"
        stroke="#FB6D3A"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

/** Thùng rác - màu cam */
function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill="none"
    >
      <path
        d="M0.78418 3.9209H2.35251H14.8991"
        stroke="#FB6D3A"
        stroke-width="1.56833"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.70503 3.92083V2.35251C4.70503 1.93656 4.87026 1.53765 5.16438 1.24353C5.4585 0.949414 5.85741 0.78418 6.27336 0.78418H9.41001C9.82596 0.78418 10.2249 0.949414 10.519 1.24353C10.8131 1.53765 10.9783 1.93656 10.9783 2.35251V3.92083M13.3308 3.92083V14.8991C13.3308 15.3151 13.1656 15.714 12.8715 16.0081C12.5774 16.3022 12.1784 16.4675 11.7625 16.4675H3.92087C3.50492 16.4675 3.10601 16.3022 2.81189 16.0081C2.51777 15.714 2.35254 15.3151 2.35254 14.8991V3.92083H13.3308Z"
        stroke="#FB6D3A"
        stroke-width="1.56833"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.27344 7.8418V12.5468"
        stroke="#FB6D3A"
        stroke-width="1.56833"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.41016 7.8418V12.5468"
        stroke="#FB6D3A"
        stroke-width="1.56833"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

// ── AddressCard ────────────────────────────────────────────────────────────────
function AddressCard({ address, onEdit, onDelete }) {
  const Icon = address.label === 'Home' ? HomeIcon : address.label === 'Work' ? WorkIcon : OtherIcon;

  return (
    <div className="bg-[#F0F5FA] rounded-2xl p-4 flex items-start gap-3.5">
      {/* Loại địa chỉ */}
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
        <Icon />
      </div>

      {/* Thông tin */}
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-bold text-[#32343E] uppercase tracking-wide leading-normal">
          {address.label}
        </p>
        <p className="text-[14px] text-[#32343E]/50 mt-1 leading-[1.4]">
          {address.address}
        </p>
      </div>

      {/* Hành động */}
      <div className="flex items-center gap-3 shrink-0 mt-0.5">
        <button
          onClick={() => onEdit(address)}
          aria-label="Chỉnh sửa địa chỉ"
          className="w-4 h-4 flex items-center justify-center"
        >
          <EditIcon />
        </button>
        <button
          onClick={() => onDelete(address.id)}
          aria-label="Xoá địa chỉ"
          className="w-4 h-4 flex items-center justify-center"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function MyAddressPage() {
  const navigate = useNavigate();
  const addresses = useAddressStore(s => s.addresses);
  const removeAddress = useAddressStore(s => s.removeAddress);

  function handleDelete(id) {
    removeAddress(id);
  }

  function handleEdit(address) {
    navigate('/add-address', { state: { edit: address } });
  }

  return (
    <div className="flex flex-col h-svh bg-white">
      {/* ── Header ── */}
      <div className="flex items-center gap-4 px-6 pt-[50px] pb-6 shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="w-11.25 h-11.25 rounded-full bg-[#ECF0F4] flex items-center justify-center"
          aria-label="Quay lại"
        >
          <BackArrow />
        </button>
        <span className="text-[17px] text-[#32343E] leading-[22px]">
          My Address
        </span>
      </div>

      {/* ── Danh sách địa chỉ ── */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-6 flex flex-col gap-5 pb-8">
        {addresses.map(addr => (
          <AddressCard
            key={addr.id}
            address={addr}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* ── Nút thêm địa chỉ ── */}
      <div className="px-6 pb-10 shrink-0">
        <button
          className="w-full h-[62px] bg-[#FF7622] rounded-[12px] text-white text-[14px] font-bold uppercase tracking-[2px]"
          onClick={() => navigate('/add-address')}
        >
          Add New Address
        </button>
      </div>
    </div>
  );
}
