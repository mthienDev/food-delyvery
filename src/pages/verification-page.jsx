/**
 * Verification Page — Trang nhập mã OTP.
 * Figma ref: Verification
 * Layout: hero tối (#121223) + form card trắng rounded-top (tương tự Login)
 */

import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MobileFrame from '../components/ui/mobile-frame';
import decorateAuth from '../assets/decodate-auth.png';
import iconBack from '../assets/icon-back.svg';

const OTP_LENGTH = 4;
const RESEND_SECONDS = 50;

/* ── Main component ── */
export default function VerificationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email ?? 'example@gmail.com';

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const inputRefs = useRef([]);

  /* Đếm ngược resend */
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  /* Focus ô đầu tiên khi mount */
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (idx, val) => {
    // Chỉ nhận 1 chữ số
    const digit = val.replace(/\D/g, '').slice(-1);
    const next = digits.map((d, i) => (i === idx ? digit : d));
    setDigits(next);
    // Auto-advance
    if (digit && idx < OTP_LENGTH - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = e => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, OTP_LENGTH);
    const next = Array(OTP_LENGTH)
      .fill('')
      .map((_, i) => pasted[i] ?? '');
    setDigits(next);
    const lastFilled = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[lastFilled]?.focus();
  };

  const handleResend = () => {
    if (countdown > 0) return;
    setCountdown(RESEND_SECONDS);
    setDigits(Array(OTP_LENGTH).fill(''));
    inputRefs.current[0]?.focus();
    // TODO: gọi API gửi lại mã
  };

  const handleVerify = e => {
    e.preventDefault();
    const code = digits.join('');
    if (code.length < OTP_LENGTH) return;
    // TODO: xác thực OTP với API
    navigate('/login');
  };

  const isFilled = digits.every(d => d !== '');

  return (
    <MobileFrame>
      <div
        className="flex flex-col min-h-svh"
        style={{ background: '#121223' }}
      >
        {/* ── TOP: Hero dark ── */}
        <div
          className="relative flex flex-col px-6 overflow-hidden"
          style={{ minHeight: '38%' }}
        >
          {/* Decorate background */}
          <img
            src={decorateAuth}
            alt=""
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 w-full pointer-events-none"
          />

          {/* Back button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Quay lại"
            className="relative mt-12 w-12 h-12 rounded-full bg-white flex items-center justify-center"
          >
            <img src={iconBack} alt="" aria-hidden="true" />
          </button>

          {/* Title */}
          <div className="relative text-center mt-6 pb-6.25">
            <h1 className="text-white text-[30px] font-bold leading-normal mb-px">
              Verification
            </h1>
            <p className="text-[#FFF2E0] text-[16px] font-normal leading-6.5">
              We have sent a code to your email
            </p>
            <p className="text-white text-[16px] font-bold leading-6.5">
              {email}
            </p>
          </div>
        </div>

        {/* ── BOTTOM: Form card trắng ── */}
        <div className="flex-1 bg-white rounded-t-3xl p-6">
          <form onSubmit={handleVerify} className="flex flex-col ">
            {/* Code label + Resend */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] font-normal text-[#32343E] uppercase font-['Sen']">
                Code
              </span>
              <button
                type="button"
                onClick={handleResend}
                className={`text-[14px]  text-[#32343E]`}
              >
                <>
                  <span className="font-bold underline">Resend </span>
                  {countdown > 0 && (
                    <span>
                      {' '}
                      in.
                      {countdown}sec
                    </span>
                  )}
                </>
              </button>
            </div>

            {/* OTP boxes */}
            <div
              className="flex gap-6.25 justify-center mb-7.5"
              onPaste={handlePaste}
            >
              {digits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={el => {
                    inputRefs.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleChange(idx, e.target.value)}
                  onKeyDown={e => handleKeyDown(idx, e)}
                  className={`w-15.5 h-15.5 rounded-xl text-center text-[24px] font-bold text-[#32343E] bg-[#F0F5FA] outline-none transition-all
                    ${digit ? 'ring-2 ring-primary' : 'ring-1 ring-transparent focus:ring-2 focus:ring-primary/40'}`}
                />
              ))}
            </div>

            {/* Verify button */}
            <button
              type="submit"
              disabled={!isFilled}
              className={`w-full h-15.5 rounded-xl text-white text-center font-bold text-[14px] uppercase transition-opacity
                ${isFilled ? 'bg-primary' : 'bg-primary/40'}`}
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </MobileFrame>
  );
}
