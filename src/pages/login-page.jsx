/**
 * Login Page — Trang đăng nhập.
 * Figma ref: Log In_Empty
 * Layout: hero tối (#121223) + form card trắng rounded-top
 */

import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import MobileFrame from '../components/ui/mobile-frame';
import decorateAuth from '../assets/decodate-auth.png';
import { EyeIcon, EyeOffIcon } from '../components/ui/eye-icons';
import iconFacebook from '../assets/icon-facebook.svg';
import iconTwitter from '../assets/icon-twitter.svg';
import iconApple from '../assets/icon-apple.svg';
import useAuthStore from '../store/auth-store';



/* ── Main component ── */
export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore(s => s.login);
  const user = useAuthStore(s => s.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  // Đã đăng nhập → redirect về home tương ứng (sau tất cả hooks)
  if (user) {
    return <Navigate to={user.role === 'restaurant' ? '/restaurant-portal' : '/'} replace />;
  }

  const handleSubmit = e => {
    e.preventDefault();
    const user = login(email.trim(), password);
    if (!user) {
      setError('Email hoặc mật khẩu không đúng.');
      return;
    }
    navigate(user.role === 'restaurant' ? '/restaurant-portal' : '/');
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
          <div className=" text-center mt-29.5">
            <h1 className="text-white text-[30px] font-bold leading-normal text-center mb-px">
              Log In
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
              <label className="text-[13px] font-normal text-[#32343E]  uppercase font-['Sen']">
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className=" h-15.5 rounded-xl w-full px-4 bg-[#F0F5FA] text-[#32343E] text-[14px] font-normal font-['Sen'] outline-none placeholder:text-[#A0A5BA]"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-normal text-[#32343E]  uppercase font-['Sen']">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className=" h-15.5 rounded-xl px-4 pr-12 bg-[#F0F5FA] text-[#32343E] w-full text-[14px] font-normal font-['Sen'] outline-none placeholder:text-[#A0A5BA]"
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

            {/* Remember me + Forgot */}
            <div className="flex items-center justify-between mt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="w-5 h-5 accent-primary rounded bg-[#F0F5FA] border border-[#E3EBF2] cursor-pointer"
                />
                <span className="text-[13px] font-normal text-[#7E8A97] font-['Sen']">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-[14px] font-bold text-primary"
              >
                Forgot Password
              </button>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-500 text-[13px] text-center -mt-2">{error}</p>
            )}

            {/* LOG IN button */}
            <button
              type="submit"
              className="mt-2 w-full h-15.5 rounded-xl bg-primary text-white text-center font-bold text-[14px] font-['Sen'] uppercase"
            >
              Log In
            </button>

            {/* Sign up */}
            <p className="text-center  text-[#646982] mt-3.5">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="font-bold text-primary tracking-wide"
              >
                SIGN UP
              </button>
            </p>

            {/* Divider */}
            <p className="text-sm mt-1 text-[#646982] text-center">Or</p>

            {/* Social buttons */}
            <div className="flex justify-center gap-5">
              <button type="button" aria-label="Login with Facebook">
                <img src={iconFacebook} alt="Facebook" width={62} height={62} />
              </button>
              <button type="button" aria-label="Login with Twitter">
                <img src={iconTwitter} alt="Twitter" width={62} height={62} />
              </button>
              <button type="button" aria-label="Login with Apple">
                <img src={iconApple} alt="Apple" width={62} height={62} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </MobileFrame>
  );
}
