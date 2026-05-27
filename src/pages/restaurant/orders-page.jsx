/** Restaurant Orders — incoming orders queue, accept/reject/mark-ready actions */
import RestaurantBottomNav from '../../components/restaurant/restaurant-bottom-nav';

export default function RestaurantOrdersPage() {
  return (
    <div className="flex flex-col h-svh bg-white">
      <div className="flex-1 min-h-0 overflow-y-scroll p-4">
        <h1 className="text-xl font-bold text-gray-800">Orders</h1>
        <p className="text-sm text-gray-400 mt-1">TODO: implement</p>
      </div>
      <div className="shrink-0"><RestaurantBottomNav /></div>
    </div>
  );
}
