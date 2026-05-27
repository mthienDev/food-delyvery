/**
 * RestaurantList — vertical list of open restaurant cards.
 */
import SectionHeader from '../../../components/ui/section-header';
import {
  IconStar,
  IconDelivery,
  IconClock,
} from '../../../components/ui/icons';

function RestaurantCard({ id, name, tags, rating, delivery, time, image, onPress }) {
  return (
    <div className="flex flex-col cursor-pointer" onClick={() => onPress?.(id)}>
      {/* Thumbnail */}
      <div className="w-full h-35 rounded-[15px] bg-[#98a8b8] overflow-hidden mb-2">
        {image && (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col">
        <p className="text-[20px] font-bold mb-1.25 text-[#181c2e] capitalize leading-normal">
          {name}
        </p>
        <p className="text-[14px] text-[#a0a5ba] leading-normal mb-3">{tags}</p>

        {/* Stats */}
        <div className="flex items-center gap-5 mt-1">
          <span className="flex items-center gap-1.5">
            <IconStar className="w-5 h-5 shrink-0" />
            <span className="text-[16px] font-bold text-[#181c2e] leading-normal">
              {rating}
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <IconDelivery className="w-5.75 h-4 shrink-0" />
            <span className="text-[14px] text-[#181c2e] leading-normal">
              {delivery}
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <IconClock className="w-5 h-5 shrink-0" />
            <span className="text-[14px] text-[#181c2e] leading-normal">
              {time}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function RestaurantList({ restaurants = [], onSeeAll, onRestaurantPress }) {
  return (
    <section>
      <SectionHeader title="Open Restaurants" onSeeAll={onSeeAll} />
      <div className="flex flex-col gap-7.25">
        {restaurants.map(r => (
          <RestaurantCard key={r.id} {...r} onPress={onRestaurantPress} />
        ))}
      </div>
    </section>
  );
}
