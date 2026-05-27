/**
 * Order Success Page — thông báo thanh toán thành công.
 * Route: /order-success
 */
import { useNavigate } from 'react-router-dom';

export default function OrderSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-svh bg-white px-6">
      {/* ── Illustration area ── */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        {/* Placeholder illustration */}
        <div
          className="rounded-[20px]"
          style={{ width: '228px', height: '207.328px', background: '#98A8B8' }}
        />

        {/* Text block */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-[#111A2C] text-[24px] font-bold leading-[32px]">
            Congratulations!
          </h1>
          <p className="text-[#525C67] text-[14px] leading-[24px] opacity-60">
            You successfully maked a payment,
            <br />
            enjoy our service!
          </p>
        </div>
      </div>

      {/* ── CTA button ── */}
      <div className="pb-8 shrink-0">
        <button
          onClick={() => navigate('/')}
          className="w-full h-15.5 rounded-2xl bg-primary text-white text-[14px] font-bold uppercase tracking-widest"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
