/**
 * SectionHeader — "Title + See All >" dùng chung cho mọi section dạng danh sách.
 */
import { IconChevronRight } from './icons';

export default function SectionHeader({ title, onSeeAll, className = '' }) {
  return (
    <div className={`flex items-center justify-between mb-5.5 ${className}`}>
      <h2 className="text-[20px] font-normal text-[#32343e] capitalize">
        {title}
      </h2>
      {onSeeAll && (
        <button
          onClick={onSeeAll}
          className="flex items-center gap-1 text-[16px] text-[#333] font-normal"
        >
          See All <IconChevronRight />
        </button>
      )}
    </div>
  );
}
