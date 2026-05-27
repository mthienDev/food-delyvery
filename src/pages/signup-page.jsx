/**
 * Sign Up Page — Trang đăng ký tài khoản.
 * Layout: hero tối (#121223) + form card trắng rounded-top (giống Login)
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFrame from '../components/ui/mobile-frame';
import decorateAuth from '../assets/decodate-auth.png';
import iconBack from '../assets/icon-back.svg';
import { EyeIcon, EyeOffIcon } from '../components/ui/eye-icons';

/* ── Main component ── */
export default function SignUpPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showRePwd, setShowRePwd] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Vui lòng nhập họ tên.');
      return;
    }
    if (!email.trim()) {
      setError('Vui lòng nhập email.');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu tối thiểu 6 ký tự.');
      return;
    }
    if (password !== rePassword) {
      setError('Mật khẩu nhập lại không khớp.');
      return;
    }

    setError('');
    // TODO: gọi API đăng ký thật ở đây
    navigate('/login');
  };

  return (
    <MobileFrame>
      <div
        className="flex flex-col min-h-svh"
        style={{ background: '#121223' }}
      >
        {/* ── TOP: Hero dark ── */}
        <div
          className="relative flex flex-col items-center justify-end px-6 pb-12.5 overflow-hidden"
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
            className="absolute  left-10  z-10  top-12 w-12 h-12 rounded-full bg-white flex items-center justify-center "
          >
            <img src={iconBack} alt="" aria-hidden="true" />
          </button>

          <div className="text-center mt-29.5">
            <h1 className="text-white text-[30px] font-bold leading-normal text-center mb-px">
              Sign Up
            </h1>
            <p className="text-[#FFF2E0] text-[16px] font-normal leading-6.5">
              Please sign up to get started
            </p>
          </div>
        </div>

        {/* ── BOTTOM: Form card trắng ── */}
        <div className="flex-1 bg-white rounded-t-3xl p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-normal text-[#32343E] uppercase font-['Sen']">
                Name
              </label>
              <input
                type="text"
                autoComplete="name"
                placeholder="John doe"
                value={name}
                onChange={e => setName(e.target.value)}
                className="h-15.5 rounded-xl w-full px-4 bg-[#F0F5FA] text-[#32343E] text-[14px] font-normal font-['Sen'] outline-none placeholder:text-[#A0A5BA]"
              />
            </div>

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
                onChange={e => setEmail(e.target.value)}
                className="h-15.5 rounded-xl w-full px-4 bg-[#F0F5FA] text-[#32343E] text-[14px] font-normal font-['Sen'] outline-none placeholder:text-[#A0A5BA]"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-normal text-[#32343E] uppercase font-['Sen']">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="h-15.5 rounded-xl px-4 pr-12 bg-[#F0F5FA] text-[#32343E] w-full text-[14px] font-normal font-['Sen'] outline-none placeholder:text-[#A0A5BA]"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999]"
                  aria-label={showPwd ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPwd ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* Re-type Password */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-normal text-[#32343E] uppercase font-['Sen']">
                Re-type Password
              </label>
              <div className="relative">
                <input
                  type={showRePwd ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="••••••••••"
                  value={rePassword}
                  onChange={e => setRePassword(e.target.value)}
                  className="h-15.5 rounded-xl px-4 pr-12 bg-[#F0F5FA] text-[#32343E] w-full text-[14px] font-normal font-['Sen'] outline-none placeholder:text-[#A0A5BA]"
                />
                <button
                  type="button"
                  onClick={() => setShowRePwd(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999]"
                  aria-label={showRePwd ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showRePwd ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-500 text-[13px] text-center -mt-2">
                {error}
              </p>
            )}

            {/* SIGN UP button */}
            <button
              type="submit"
              className="mt-3.5 w-full h-15.5 rounded-xl bg-primary text-white text-center font-bold text-[14px] percase"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </MobileFrame>
  );
}
