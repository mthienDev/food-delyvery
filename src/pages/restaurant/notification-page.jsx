import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconBack } from '../../components/ui/icons';
import RestaurantBottomNav from '../../components/restaurant/restaurant-bottom-nav';

/** Sample notification data */
const NOTIFICATIONS = [
  { id: '01', name: 'Tanbir Ahmed', action: 'Placed a new order', time: '20 min ago' },
  { id: '02', name: 'Salim Smith', action: 'left a 5 star review', time: '20 min ago' },
  { id: '03', name: 'Royal Bengol', action: 'agreed to cancel', time: '20 min ago' },
  { id: '04', name: 'Pabel Vuiya', action: 'Placed a new order', time: '20 min ago' },
];

/** Single notification row with optional bottom divider */
function NotificationItem({ name, action, time, showDivider }) {
  return (
    <>
      <div className="flex items-center gap-4 py-5 px-6">
        {/* Avatar placeholder */}
        <div className="w-12 h-12 rounded-full bg-[#98A8B8] shrink-0" />

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-[13px] leading-5">
            <span className="font-semibold text-[#32343E]">{name}</span>
            <span className="text-[#9C9BA6]"> {action}</span>
          </p>
          <p className="text-[10px] text-[#9C9BA6] mt-0.5">{time}</p>
        </div>

        {/* Thumbnail placeholder */}
        <div className="w-12 h-12 rounded-[10px] bg-[#98A8B8] shrink-0" />
      </div>

      {showDivider && <div className="h-px bg-[#F0F4F9] mx-6" />}
    </>
  );
}

/** Restaurant Notification page */
export default function NotificationPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('notifications');

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center gap-5 px-6 pt-[50px] pb-4">
        <button
          onClick={() => navigate(-1)}
          className="w-[45px] h-[45px] rounded-full bg-[#ECF0F4] flex items-center justify-center shrink-0"
          aria-label="Go back"
        >
          <IconBack />
        </button>
        <h1 className="text-[17px] font-semibold text-[#181C2E] leading-[22px]">
          Notifications
        </h1>
      </div>

      {/* Tabs */}
      <div className="relative mt-2">
        <div className="flex border-b border-[#F0F4F9]">
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex-1 py-3 text-[14px] text-center transition-colors ${
              activeTab === 'notifications'
                ? 'font-bold text-[#FF7622]'
                : 'font-normal text-[#A5A7B9]'
            }`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex-1 py-3 text-[14px] text-center transition-colors ${
              activeTab === 'messages'
                ? 'font-bold text-[#FF7622]'
                : 'font-normal text-[#A5A7B9]'
            }`}
          >
            Messages (3)
          </button>
        </div>

        {/* Sliding active underline */}
        <div
          className={`absolute bottom-0 h-0.5 w-1/2 bg-[#FF7622] rounded-full transition-all duration-200 ${
            activeTab === 'notifications' ? 'left-0' : 'left-1/2'
          }`}
        />
      </div>

      {/* Notification list */}
      <div className="flex-1 min-h-0 overflow-y-scroll">
        {NOTIFICATIONS.map((item, i) => (
          <NotificationItem
            key={item.id}
            {...item}
            showDivider={i < NOTIFICATIONS.length - 1}
          />
        ))}
      </div>

      {/* Bottom nav */}
      <div className="shrink-0"><RestaurantBottomNav /></div>
    </div>
  );
}
