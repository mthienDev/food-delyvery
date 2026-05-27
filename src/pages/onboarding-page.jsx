import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFrame from '../components/ui/mobile-frame';
import useAuthStore from '../store/auth-store';

/**
 * Onboarding Page — 4 bước giới thiệu trước khi vào app.
 * Figma ref: Onboarding_01 node 154:23
 */

const SLIDES = [
  {
    title: 'All your favorites',
    desc: 'Get all your loved foods in one once place,\nyou just place the orer we do the rest',
    image: null,
    placeholderBg: '#98a8b8',
  },
  {
    title: 'All your favorites',
    desc: 'Get all your loved foods in one once place,\nyou just place the orer we do the rest',
    image: null,
  },
  {
    title: 'Order from choosen chef',
    desc: 'Get all your loved foods in one once place,\nyou just place the orer we do the rest',
    image: null,
  },
  {
    title: 'Free delivery offers',
    desc: 'Get all your loved foods in one once place,\nyou just place the orer we do the rest',
    image: null,
    isLast: true,
  },
];

/** Trả về route đích sau onboarding: home theo role nếu đã login, ngược lại về /login */
function resolvePostOnboardingRoute() {
  const user = useAuthStore.getState().user;
  if (user?.role === 'restaurant') return '/restaurant-portal';
  if (user?.role === 'customer') return '/';
  return '/login';
}

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [fade, setFade] = useState(true);
  const timerRef = useRef(null);

  const transition = useCallback(action => {
    clearTimeout(timerRef.current);
    setFade(false);
    timerRef.current = setTimeout(() => {
      action();
      setFade(true);
    }, 180);
  }, []);

  const goNext = useCallback(() => {
    transition(() => {
      if (step < SLIDES.length - 1) setStep(s => s + 1);
      else navigate(resolvePostOnboardingRoute(), { replace: true });
    });
  }, [step, transition, navigate]);

  const skip = useCallback(() => {
    transition(() => navigate(resolvePostOnboardingRoute(), { replace: true }));
  }, [transition, navigate]);

  const slide = SLIDES[step];

  return (
    <MobileFrame>
      <div
        className="flex flex-col min-h-svh bg-white overflow-hidden box-border "
        style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.18s ease' }}
      >
        <div className="flex-1 flex flex-col items-center justify-center gap-15.75 px-4">
          {/* Illustration */}
          <div
            className="w-60 h-73 rounded-xl overflow-hidden shrink-0 mb-"
            style={{ background: slide.placeholderBg ?? '#98A8B8' }}
          >
            {slide.image && (
              <img
                src={slide.image}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Title + Description + Dots */}
          <div className="flex flex-col items-center">
            <p className="font-extrabold text-2xl text-[#32343E] mb-4.5 text-center">
              {slide.title}
            </p>
            <p className="font-normal text-base text-[#646982] leading-6 text-center max-w-81 whitespace-pre-line">
              {slide.desc}
            </p>

            {/* Dots */}
            <div className="flex gap-1.5 items-center mt-8">
              {SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-250 ease-in-out ${
                    i === step ? 'bg-primary' : 'bg-[#FFE1CE]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA cố định ở dưới ── */}
        <div className="w-full flex flex-col items-center px-6 pb-12 box-border">
          <button
            onClick={goNext}
            className="w-full h-15.5 rounded-xl border-0 bg-primary text-white font-bold text-sm tracking-[1px] uppercase cursor-pointer"
          >
            {slide.isLast ? 'Get Started' : 'Next'}
          </button>

          {!slide.isLast ? (
            <button
              onClick={skip}
              className="bg-transparent border-0 text-[#646982] font-normal text-base cursor-pointer pt-3.5 pb-0"
            >
              Skip
            </button>
          ) : (
            <div className="h-9.5" />
          )}
        </div>
      </div>
    </MobileFrame>
  );
}
