import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFrame from '../components/ui/mobile-frame';
import useAuthStore from '../store/auth-store';

import logo from '../assets/logo.svg';
import decorateTopLeft from '../assets/splash-decorate-2.png';
import decorateBottomRight from '../assets/splash-decorate-1.png';

/**
 * Splash Page — hiện lần đầu vào session, tự redirect sang onboarding sau ~2.8s.
 * Figma ref: node 38:1923
 */
export default function SplashPage() {
  const navigate = useNavigate();
  const [logoVisible, setLogoVisible] = useState(false);
  const [decorVisible, setDecorVisible] = useState(false);

  useEffect(() => {
    // Guard: ngăn Strict Mode chạy effect lần 2 restart animation.
    // sessionStorage không bị React reset — đáng tin hơn useRef/useState.
    if (sessionStorage.getItem('splashAnimating')) return;
    sessionStorage.setItem('splashAnimating', '1');

    // Không return cleanup → timers của lần chạy đầu không bị clear bởi Strict Mode.
    // Strict Mode chạy lần 2 → bị guard block → chỉ 1 set timer chạy.
    setTimeout(() => setLogoVisible(true), 100);
    setTimeout(() => setDecorVisible(true), 1000);
    setTimeout(() => {
      sessionStorage.removeItem('splashAnimating');
      const user = useAuthStore.getState().user;
      if (user?.role === 'restaurant')
        navigate('/restaurant-portal', { replace: true });
      else if (user?.role === 'customer') navigate('/', { replace: true });
      else navigate('/onboarding', { replace: true });
    }, 2800);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MobileFrame>
      <div className="relative w-full h-full min-h-svh bg-white overflow-hidden">
        <img
          src={decorateTopLeft}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 220,
            height: 220,
            objectFit: 'contain',
            objectPosition: 'top left',
            opacity: decorVisible ? 1 : 0,
            transform: decorVisible
              ? 'translate(0, 0)'
              : 'translate(-40px, -40px)',
            transition: 'opacity 1s ease, transform 1s ease',
          }}
        />

        <img
          src={decorateBottomRight}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 220,
            height: 220,
            objectFit: 'contain',
            objectPosition: 'bottom right',
            opacity: decorVisible ? 1 : 0,
            transform: decorVisible
              ? 'translate(0, 0)'
              : 'translate(40px, 40px)',
            transition: 'opacity 1s ease, transform 1s ease',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: logoVisible ? 1 : 0,
            transform: logoVisible ? 'scale(1)' : 'scale(0.85)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <img
            alt="Food"
            src={logo}
            style={{ width: 121, height: 59, display: 'block' }}
          />
        </div>
      </div>
    </MobileFrame>
  );
}
