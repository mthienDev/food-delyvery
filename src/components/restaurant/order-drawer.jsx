// ── Order item row ────────────────────────────────────────────────────────────
function OrderItem({ order, type }) {
  const primaryLabel = type === 'running' ? 'Done' : 'Accept';
  const secondaryLabel = type === 'running' ? 'Cancel' : 'Reject';

  return (
    <div className="flex gap-3 px-6   ">
      {/* Food image placeholder */}
      <div className="size-25.5 bg-[#98a8b8] rounded-[20px] shrink-0" />

      {/* Order info */}
      <div className="flex-1 min-w-0">
        <p className="text-[14px] text-[#ed7a63]">#{order.category}</p>
        <p className="text-[14px] font-bold text-[#32343e] mt-0.5 truncate">
          {order.name}
        </p>
        <p className="text-[13px] text-[#9c9ba6]">ID: {order.id}</p>

        {/* Price + action buttons */}
        <div className="flex items-center gap-2 mt-2">
          <p className="text-[18px] text-[#32343e] mr-auto">${order.price}</p>
          <button className="px-4 py-1.5 bg-[#ff7622] border border-[#ff7622] text-white text-[14px] rounded-[9px] active:opacity-80">
            {primaryLabel}
          </button>
          <button className="px-4 py-1.5 border border-[#ff3326] text-[#ff3326] text-[14px] rounded-[9px] active:opacity-80">
            {secondaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Drawer ────────────────────────────────────────────────────────────────────
export default function OrderDrawer({
  open,
  onClose,
  title,
  orders = [],
  type,
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`
          absolute inset-0 bg-black/40 z-40
          transition-opacity duration-300
          ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 z-50
          bg-white rounded-t-[25px]
          max-h-[80%] flex flex-col
          transition-transform duration-300 ease-in-out
          ${open ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        {/* Drag handle indicator */}
        <div className="w-[60px] h-[6px] bg-[#c1c8d2] rounded-full mx-auto mt-3 shrink-0" />

        {/* Title */}
        <p className="px-6 pt-3 pb-6 text-[17px] leading-[22px] text-[#181c2e] shrink-0">
          {title}
        </p>

        {/* Scrollable order list */}
        <div className="overflow-y-auto flex-1  pb-6">
          <div className="flex flex-col gap-5.25">
            {orders.map(order => (
              <OrderItem key={order.id} order={order} type={type} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
