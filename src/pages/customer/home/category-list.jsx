/**
 * CategoryList — horizontal scrollable grid of food categories.
 * Clicking a card navigates to /category/:id.
 */
import { useNavigate } from 'react-router-dom';
import SectionHeader from '../../../components/ui/section-header';
import useDragScroll from '../../../hooks/use-drag-scroll';

function CategoryCard({ id, name, image, onClick }) {
  return (
    <button
      onClick={() => onClick(id)}
      className="shrink-0 flex flex-col items-center gap-2"
      aria-label={`Browse ${name}`}
    >
      <div className="w-30.5 h-30.5 rounded-[20px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-24 h-20.25 object-cover rounded-[15px]"
          />
        ) : (
          <div className="w-24 h-20.25 rounded-[15px] bg-[#98a8b8]" />
        )}
      </div>
      <p className="text-[18px] font-bold text-[#32343e] capitalize">{name}</p>
    </button>
  );
}

export default function CategoryList({ categories = [], onSeeAll }) {
  const navigate = useNavigate();
  const {
    ref,
    onMouseDown,
    onMouseUp,
    onMouseMove,
    onMouseLeave,
    style,
    isDragging,
  } = useDragScroll();

  return (
    <section>
      <SectionHeader title="All Categories" onSeeAll={onSeeAll} />
      <div
        ref={ref}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={style}
        className="flex gap-3 overflow-x-auto pb-1 no-scrollbar"
      >
        {categories.map(cat => (
          <CategoryCard
            key={cat.id}
            {...cat}
            onClick={id => {
              // Chỉ navigate nếu không phải đang drag
              if (!isDragging()) navigate(`/category/${id}`);
            }}
          />
        ))}
      </div>
    </section>
  );
}
