/**
 * Forgot Password Page — Trang quên mật khẩu.
 * Figma ref: Forgot Password
 * Layout: hero tối (#121223) + form card trắng rounded-top (tương tự Login)
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFrame from '../components/ui/mobile-frame';
import decorateAuth from '../assets/decodate-auth.png';
import iconBack from '../assets/icon-back.svg';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ── Main component ── */
export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validate = val => {
    if (!val.trim()) return 'Email không được để trống.';
    if (!EMAIL_RE.test(val.trim())) return 'Email không hợp lệ.';
    return '';
  };

  const handleChange = e => {
    setEmail(e.target.value);
    if (error) setError(validate(e.target.value)); // live-clear khi đang có lỗi
  };

  const handleSubmit = e => {
    e.preventDefault();
    const err = validate(email);
    if (err) {
      setError(err);
      return;
    }
    setError('');
    // TODO: gọi API gửi mã OTP
    navigate('/verification', { state: { email: email.trim() } });
  };

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
            className="relative mt-12 w-12 h-12 rounded-full bg-white flex items-center justify-center text-white"
          >
            <img src={iconBack} alt="" aria-hidden="true" />
          </button>

          {/* Title */}
          <div className="relative text-center mt-6 pb-12.5">
            <h1 className="text-white text-[30px] font-bold leading-normal text-center mb-px">
              Forgot Password
            </h1>
            <p className="text-[#FFF2E0] text-[16px] font-normal leading-6.5">
              Please sign in to your existing account
            </p>
          </div>
        </div>

        {/* ── BOTTOM: Form card trắng ── */}
        <div className="flex-1 bg-white rounded-t-3xl p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-normal text-[#32343E] uppercase font-['Sen']">
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={handleChange}
                onBlur={() => setError(validate(email))}
                className={`h-15.5 rounded-xl w-full px-4 bg-[#F0F5FA] text-[#32343E] text-[14px] font-normal font-['Sen'] outline-none placeholder:text-[#A0A5BA] transition-all
                  ${error ? 'ring-2 ring-red-400' : ''}`}
              />
              {error && (
                <p className="text-red-500 text-[12px] font-['Sen'] -mt-1">
                  {error}
                </p>
              )}
            </div>

            {/* Send Code button */}
            <button
              type="submit"
              className="mt-2 w-full h-15.5 rounded-xl bg-primary text-white text-center font-bold text-[14px] uppercase"
            >
              Send Code
            </button>
          </form>
        </div>
      </div>
    </MobileFrame>
  );
}
