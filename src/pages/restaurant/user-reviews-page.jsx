import { useNavigate } from 'react-router-dom';
import { IconBack, IconStarFilled } from '../../components/ui/icons';

/** Sample reviews data */
const REVIEWS = [
  {
    id: '1',
    date: '20/12/2020',
    title: 'Great Food and Service',
    rating: 5,
    text: "This Food so tasty & delicious. Breakfast so fast Delivered in my place. Chef is very friendly. I'm really like chef for Home Food Order. Thanks.",
  },
  {
    id: '2',
    date: '20/12/2020',
    title: 'Awesome and Nice',
    rating: 4,
    text: 'This Food so tasty & delicious. Breakfast so fast Delivered in my place.',
  },
  {
    id: '3',
    date: '20/12/2020',
    title: 'Awesome and Nice',
    rating: 3,
    text: 'This Food so tasty & delicious.',
  },
  {
    id: '4',
    date: '20/12/2020',
    title: 'Awesome and Nice',
    rating: 4,
    text: 'This Food so tasty & delicious. Breakfast so fast Delivered in my place.',
  },
  {
    id: '5',
    date: '20/12/2020',
    title: 'Awesome and Nice',
    rating: 4,
    text: 'This Food so tasty & delicious. Breakfast so fast Delivered in my place.',
  },
];

/** Three-dot horizontal menu icon */
function IconMoreDots() {
  return (
    <svg
      width="18"
      height="4"
      viewBox="0 0 18 4"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="2" cy="2" r="2" fill="#9C9BA6" />
      <circle cx="9" cy="2" r="2" fill="#9C9BA6" />
      <circle cx="16" cy="2" r="2" fill="#9C9BA6" />
    </svg>
  );
}

/** Empty star outline (gray) */
function IconStarEmpty({ className = '' }) {
  return (
    <svg
      className={className}
      width="13"
      height="13"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.90279 1.13855C9.9624 0.953735 10.2239 0.953734 10.2835 1.13855L12.2819 7.33514C12.3086 7.41791 12.3857 7.47395 12.4727 7.47376L18.9836 7.45953C19.1778 7.4591 19.2586 7.70779 19.1012 7.82158L13.8254 11.6371C13.755 11.688 13.7255 11.7787 13.7526 11.8613L15.7781 18.0491C15.8385 18.2337 15.6269 18.3874 15.4701 18.2729L10.2111 14.4344C10.1408 14.3831 10.0455 14.3831 9.97523 14.4344L4.7162 18.2729C4.55934 18.3874 4.3478 18.2337 4.40821 18.0491L6.43371 11.8613C6.46077 11.7787 6.43131 11.688 6.36084 11.6371L1.08508 7.82158C0.927726 7.70779 1.00853 7.4591 1.20272 7.45953L7.71358 7.47376C7.80055 7.47395 7.87767 7.41791 7.90436 7.33514L9.90279 1.13855Z"
        stroke="#D3D3D3"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** Row of 5 stars based on integer rating */
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-[2px]">
      {Array.from({ length: 5 }, (_, i) =>
        i < rating ? (
          <IconStarFilled key={i} className="w-[13px] h-[13px]" />
        ) : (
          <IconStarEmpty key={i} />
        ),
      )}
    </div>
  );
}

/** Single review card: avatar on left, content card on right */
function ReviewCard({ date, title, rating, text }) {
  return (
    <div className="flex items-start gap-[10px] px-6">
      {/* Avatar placeholder */}
      <div className="w-[43px] h-[43px] rounded-full bg-[#98A8B8] shrink-0 mt-2" />

      {/* Card */}
      <div className="flex-1 bg-[#F6F8FA] rounded-[15px] px-4 py-3">
        {/* Date row */}
        <div className="flex items-center justify-between mb-1">
          <p className="text-[12px] text-[#9C9BA6]">{date}</p>
          <button type="button" aria-label="More options" className="p-1 -mr-1">
            <IconMoreDots />
          </button>
        </div>

        {/* Title */}
        <p className="text-[14px] font-bold text-[#32343E] mb-1.5">{title}</p>

        {/* Stars */}
        <StarRating rating={rating} />

        {/* Review text */}
        <p className="text-[12px] text-[#747783] mt-2 leading-[1.6]">{text}</p>
      </div>
    </div>
  );
}

/** User Reviews page */
export default function UserReviewsPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center gap-5 px-6 py-6">
        <button
          onClick={() => navigate(-1)}
          className="w-[45px] h-[45px] rounded-full bg-[#ECF0F4] flex items-center justify-center shrink-0"
          aria-label="Go back"
        >
          <IconBack />
        </button>
        <h1 className="text-[17px] font-normal text-[#181C2E] leading-[22px]">
          Reviews
        </h1>
      </div>

      {/* Review list */}
      <div className="flex-1 min-h-0 overflow-y-scroll flex flex-col gap-4 pb-6">
        {REVIEWS.map(review => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </div>
    </div>
  );
}
