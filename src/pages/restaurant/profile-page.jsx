/** Restaurant Profile — store info, hours, contact, cover photo */
import RestaurantBottomNav from '../../components/restaurant/restaurant-bottom-nav';

export default function RestaurantProfilePage() {
  return (
    <div className="flex flex-col h-svh bg-white">
      <div className="flex-1 min-h-0 overflow-y-auto p-4">
        <h1 className="text-xl font-bold text-gray-800">Store Profile</h1>
        <p className="text-sm text-gray-400 mt-1">TODO: implement</p>
      </div>
      <RestaurantBottomNav />
    </div>
  );
}
