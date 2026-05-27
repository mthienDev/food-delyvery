/**
 * Add Address Page — thêm địa chỉ giao hàng mới.
 * Route: /add-address
 */
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MobileFrame from '../../components/ui/mobile-frame';
import useAddressStore from '../../store/address-store';

// ── Icons ──────────────────────────────────────────────────────────────────────
function BackArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
    >
      <circle cx="22.5" cy="22.5" r="22.5" fill="#32343E" />
      <path
        d="M25 27L20 22L25 17"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

function LocationPinIcon({ color = '#FF7622' }) {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
      <path
        d="M7 0C3.13 0 0 3.13 0 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
        fill={color}
      />
    </svg>
  );
}

// ── Map Placeholder ────────────────────────────────────────────────────────────
function MapPlaceholder() {
  return (
    <div className="relative w-full h-full bg-[#DCE3EC] overflow-hidden">
      {/* Grid lines giả lập map */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        preserveAspectRatio="none"
      >
        {/* Horizontal lines */}
        {[20, 35, 50, 65, 80].map(y => (
          <line
            key={`h${y}`}
            x1="0"
            y1={`${y}%`}
            x2="100%"
            y2={`${y}%`}
            stroke="#8CA0B4"
            strokeWidth="1"
          />
        ))}
        {/* Vertical lines */}
        {[15, 30, 50, 65, 80].map(x => (
          <line
            key={`v${x}`}
            x1={`${x}%`}
            y1="0"
            x2={`${x}%`}
            y2="100%"
            stroke="#8CA0B4"
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* Tooltip + pin */}
      <div className="absolute top-[38%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <div className="flex flex-col items-center">
          <div className="bg-[#32343E] rounded-lg px-3 py-1.5 whitespace-nowrap">
            <span className="text-white text-[12px] font-medium">
              Move to edit location
            </span>
          </div>
          {/* Mũi tên xuống */}
          <div
            className="w-0 h-0"
            style={{
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid #32343E',
            }}
          />
        </div>
        {/* Pin — pulse animation */}
        <div className="relative flex items-center justify-center">
          {/* Vòng pulse */}
          <div className="absolute w-10 h-10 rounded-full bg-primary/20 animate-ping" />
          <div className="w-5 h-5 rounded-full bg-[#FB6D3A] shadow-md shadow-primary/40 z-10" />
        </div>
      </div>
    </div>
  );
}

// ── Input Field ────────────────────────────────────────────────────────────────
function InputField({
  label,
  value,
  onChange,
  placeholder,
  icon,
  className = '',
}) {
  return (
    <div className={`flex flex-col  gap-2 ${className}`}>
      {label && (
        <label className="text-[#32343E] text-[14px]  uppercase tracking-widest">
          {label}
        </label>
      )}
      <div className="h-12.5 bg-[#F0F5FA] rounded-xl px-4 flex items-center gap-3">
        {icon && <span className="shrink-0">{icon}</span>}
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 bg-transparent w-full text-[#32343E] text-[15px] placeholder:text-[#32343E]/40 outline-none"
        />
      </div>
    </div>
  );
}

// ── Label Button ───────────────────────────────────────────────────────────────
const LABELS = ['Home', 'Work', 'Other'];

function LabelSelector({ value, onChange }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[#32343E] text-[14px]  uppercase tracking-widest">
        Label As
      </span>
      <div className="flex gap-3">
        {LABELS.map(label => {
          const active = value === label;
          return (
            <button
              key={label}
              onClick={() => onChange(label)}
              className={[
                'h-11.25 px-6 rounded-[22.5px] text-[14px] font-semibold transition-colors',
                active
                  ? 'bg-[#F58D1D] text-white'
                  : 'bg-[#F0F5FA] border border-[#E0E5EC] text-[#32343E]',
              ].join(' ')}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function AddAddressPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const addAddress = useAddressStore(s => s.addAddress);
  const updateAddress = useAddressStore(s => s.updateAddress);

  // Edit mode: my-address-page truyền address qua navigation state
  const editAddress = location.state?.edit ?? null;
  const isEditing = Boolean(editAddress);

  const [form, setForm] = useState({
    address: editAddress?.address ?? '',
    street: editAddress?.street ?? '',
    postCode: editAddress?.postCode ?? '',
    apartment: editAddress?.apartment ?? '',
    label: editAddress?.label ?? 'Home',
  });

  function handleField(field) {
    return e => setForm(prev => ({ ...prev, [field]: e.target.value }));
  }

  function handleSave() {
    if (!form.address.trim()) return;
    if (isEditing) {
      updateAddress(editAddress.id, form);
    } else {
      addAddress(form);
    }
    navigate(-1);
  }

  return (
    <MobileFrame>
      <div className="bg-white overflow-y-auto no-scrollbar">
        {/* ── Map ── */}
        <div className="relative h-73.75">
          <MapPlaceholder />

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-[50px] left-5 rounded-full flex items-center justify-center shadow-md z-10"
            aria-label="Quay lại"
          >
            <BackArrow />
          </button>
        </div>

        {/* ── Form sheet + Save button ── */}
        <div className="bg-white rounded-t-3xl -mt-3 px-6 pt-10 pb-10 flex flex-col gap-6">
          {/* ADDRESS */}
          <InputField
            label="Address"
            value={form.address}
            onChange={handleField('address')}
            placeholder="3235 Royal Ln. Mesa, New Jersy 34567"
            icon={<LocationPinIcon color="#A0A5BA" />}
          />

          {/* STREET + POST CODE */}
          <div className="flex gap-4">
            <InputField
              label="Street"
              value={form.street}
              onChange={handleField('street')}
              placeholder="Hason Nagar"
              className="flex-1"
            />
            <InputField
              label="Post Code"
              value={form.postCode}
              onChange={handleField('postCode')}
              placeholder="34567"
              className="flex-1"
            />
          </div>

          {/* APARTMENT */}
          <InputField
            label="Appartment"
            value={form.apartment}
            onChange={handleField('apartment')}
            placeholder="345"
          />

          {/* LABEL AS */}
          <LabelSelector
            value={form.label}
            onChange={label => setForm(prev => ({ ...prev, label }))}
          />

          {/* ── Save button ── */}
          <button
            onClick={handleSave}
            className="w-full h-[62px] rounded-xl bg-[#FF7622] text-white text-[14px] font-bold uppercase tracking-[2px] mt-2"
          >
            {isEditing ? 'Save Changes' : 'Save Location'}
          </button>
        </div>
      </div>
    </MobileFrame>
  );
}
