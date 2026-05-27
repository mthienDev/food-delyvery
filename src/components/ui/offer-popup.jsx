/**
 * OfferPopup — hiển thị popup khuyến mãi khi lần đầu vào trang Home mỗi session.

 * 
 */
import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { IconClose } from './icons';

import decoImg from '../../assets/popup-offerrs-decorate.png';
const SESSION_KEY = 'offer_popup_shown';

const CARD_GRADIENT =
  'linear-gradient(-24.26deg, rgb(231, 111, 0) 22.075%, rgb(255, 235, 52) 109.56%)';

export default function OfferPopup() {
  // Lazy init: đọc sessionStorage ngay khi khởi tạo, không cần useEffect
  const [open, setOpen] = useState(() => !sessionStorage.getItem(SESSION_KEY));

  function handleOpenChange(isOpen) {
    if (!isOpen) sessionStorage.setItem(SESSION_KEY, '1');
    setOpen(isOpen);
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        {/* Overlay — dùng màu Figma rgba(39,63,85,0.67) */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[rgba(39,63,85,0.67)]" />

        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-50 w-[327px] -translate-x-1/2 -translate-y-1/2 focus:outline-none"
        >
          {/* Thẻ khuyến mãi gradient cam → vàng */}
          <div
            className="relative rounded-[35px] overflow-hidden"
            style={{ background: CARD_GRADIENT }}
          >
            {/* Hình trang trí sparkle/confetti — overlay phần trên */}
            <img
              src={decoImg}
              alt=""
              aria-hidden="true"
              draggable="false"
              className="absolute top-9 left-[34px] w-[270px] h-[190px] pointer-events-none select-none"
            />

            {/* Nội dung chính */}
            <div className="relative px-6 pt-[82px] pb-8 text-center">
              <Dialog.Title className="text-white font-extrabold text-[41px] leading-[56px] capitalize">
                Hurry Offers!
              </Dialog.Title>

              <div className="mt-8">
                <p className="text-white font-bold text-[30px] leading-[56px]">
                  #1243CD2
                </p>
                <p className="text-white text-[18px] leading-snug">
                  Use the cupon get 25% discount
                </p>
              </div>

              {/* Nút GOT IT — đóng popup */}
              <Dialog.Close asChild>
                <button className="mt-12 w-full h-[62px] rounded-full border-[1.5px] border-white/70 text-white font-bold text-[16px] uppercase tracking-wide transition-opacity active:opacity-75">
                  Got it
                </button>
              </Dialog.Close>
            </div>
          </div>

          {/* Nút đóng X — nằm góc trên phải, nhô lên trên thẻ */}
          <Dialog.Close
            aria-label="Đóng khuyến mãi"
            className="absolute -top-3 right-1 flex size-[45px] items-center justify-center rounded-full bg-[#FFE194] shadow-md transition-opacity active:opacity-70"
          >
            <IconClose color="#EF761A" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
