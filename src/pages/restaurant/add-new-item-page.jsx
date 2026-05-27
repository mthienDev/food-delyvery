import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IconBack } from '../../components/ui/icons';
import { INGREDIENT_ICONS } from '../../assets/icons/ingredients/index.js';
import useDragScroll from '../../hooks/use-drag-scroll';
import useFoodStore from '../../store/food-store';

/* ── Static ingredient data ────────────────────────────────── */
const BASIC_DEFAULT = [
  { id: 'salt',    label: 'Salt',    icon: 'salt',    selected: true  },
  { id: 'chicken', label: 'Chicken', icon: 'chicken', selected: false },
  { id: 'onion',   label: 'Onion',   icon: 'onion',   selected: true  },
  { id: 'garlic',  label: 'Garlic',  icon: 'garlic',  selected: false },
  { id: 'pappers', label: 'Pappers', icon: 'pepper',  selected: true  },
  { id: 'ginger',  label: 'Ginger',  icon: 'ginger',  selected: false },
];

const FRUIT_DEFAULT = [
  { id: 'broccoli', label: 'Broccoli', icon: 'broccoli', selected: false },
  { id: 'orange',   label: 'Orange',   icon: 'orange',   selected: false },
  { id: 'walnut',   label: 'Walnut',   icon: 'walnut',   selected: false },
];

const CATEGORIES = ['Breakfast', 'Lunch', 'Dinner'];

/* ── Small helpers ─────────────────────────────────────────── */
function UploadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
      <circle opacity="0.1" cx="20.7405" cy="20.7405" r="20.7405" fill="#523BB1" />
      <path d="M24.7407 24.7407L20.7407 20.7407L16.7407 24.7407" stroke="#523BB1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.7407 20.7407V29.7407" stroke="#523BB1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M29.1307 27.1307C30.106 26.599 30.8765 25.7576 31.3206 24.7393C31.7646 23.7211 31.8569 22.5839 31.5829 21.5074C31.3089 20.4309 30.6842 19.4762 29.8074 18.7942C28.9305 18.1121 27.8515 17.7414 26.7407 17.7407H25.4807C25.178 16.5699 24.6138 15.483 23.8306 14.5617C23.0474 13.6404 22.0655 12.9086 20.9588 12.4213C19.852 11.9341 18.6492 11.7041 17.4408 11.7486C16.2324 11.7931 15.0497 12.111 13.9819 12.6784C12.914 13.2457 11.9886 14.0478 11.2753 15.0243C10.562 16.0008 10.0794 17.1262 9.86366 18.3161C9.64795 19.506 9.70479 20.7292 10.0299 21.894C10.355 23.0587 10.9399 24.1346 11.7407 25.0407" stroke="#523BB1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24.7407 24.7407L20.7407 20.7407L16.7407 24.7407" stroke="#523BB1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
      <path d="M1 3.5L4 6.5L10 1" stroke="#FB6D3A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
      <path d="M1 1L5 5L9 1" stroke="#9C9BA6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Ingredient item ───────────────────────────────────────── */
function IngredientItem({ item, onToggle }) {
  return (
    <button onClick={() => onToggle(item.id)} className="flex flex-col items-center gap-1.5 shrink-0 w-12.5">
      <div className={`w-12.5 h-12.5 rounded-full flex items-center justify-center border transition-colors ${item.selected ? 'bg-[#FFEBE4] border-transparent' : 'bg-[#FDFDFD] border-[#E8EAED]'}`}>
        <img src={INGREDIENT_ICONS[item.icon]} alt={item.label} className="w-6 h-6 object-contain" />
      </div>
      <span className="text-[11px] text-[#9C9BA6] capitalize leading-tight text-center">{item.label}</span>
    </button>
  );
}

/* ── Ingredient row ────────────────────────────────────────── */
function IngredientRow({ title, items, onToggle }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[14px] text-[#32343E] capitalize tracking-[0.28px]">{title}</span>
        <button className="flex items-center gap-1 text-[14px] text-[#9C9BA6] tracking-[0.28px]">
          See All <ChevronDown />
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <IngredientItem key={item.id} item={item} onToggle={onToggle} />
        ))}
      </div>
    </div>
  );
}

/* ── Main page ─────────────────────────────────────────────── */
export default function AddNewItemPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const editId   = searchParams.get('edit');
  const addFood    = useFoodStore((s) => s.addFood);
  const updateFood = useFoodStore((s) => s.updateFood);
  // editFood chỉ có giá trị khi ở edit mode
  const editFood = useFoodStore((s) => editId ? s.foods.find((f) => f.id === editId) : null);
  const isEdit   = Boolean(editFood);

  // Khởi tạo state: nếu edit thì pre-fill từ editFood, không thì dùng default
  const storedIngredients = editFood?.ingredients ?? [];
  const [itemName, setItemName] = useState(editFood?.name     ?? '');
  const [price,    setPrice]    = useState(editFood?.price?.toString() ?? '');
  const [category, setCategory] = useState(editFood?.category ?? 'Breakfast');
  const [pickup,   setPickup]   = useState(editFood?.pickup   ?? true);
  const [delivery, setDelivery] = useState(editFood?.delivery ?? false);
  const [details,  setDetails]  = useState(editFood?.details  ?? '');
  const [basic, setBasic] = useState(() =>
    BASIC_DEFAULT.map((i) => ({
      ...i,
      selected: isEdit ? storedIngredients.includes(i.label) : i.selected,
    }))
  );
  const [fruit, setFruit] = useState(() =>
    FRUIT_DEFAULT.map((i) => ({
      ...i,
      selected: isEdit ? storedIngredients.includes(i.label) : i.selected,
    }))
  );

  const {
    ref: scrollRef,
    onMouseDown, onMouseUp, onMouseMove, onMouseLeave,
    style: scrollStyle,
  } = useDragScroll();

  const toggle = (setter) => (id) =>
    setter((prev) => prev.map((i) => (i.id === id ? { ...i, selected: !i.selected } : i)));

  const handleReset = () => {
    if (isEdit) {
      // Edit mode: reset về giá trị gốc của food
      setItemName(editFood.name);
      setPrice(editFood.price.toString());
      setCategory(editFood.category);
      setPickup(editFood.pickup);
      setDelivery(editFood.delivery);
      setDetails(editFood.details ?? '');
      setBasic(BASIC_DEFAULT.map((i) => ({ ...i, selected: storedIngredients.includes(i.label) })));
      setFruit(FRUIT_DEFAULT.map((i) => ({ ...i, selected: storedIngredients.includes(i.label) })));
    } else {
      setItemName(''); setPrice(''); setCategory('Breakfast');
      setPickup(true); setDelivery(false); setDetails('');
      setBasic(BASIC_DEFAULT); setFruit(FRUIT_DEFAULT);
    }
  };

  const handleSave = () => {
    if (!itemName.trim() || !price) return;
    const selectedIngredients = [
      ...basic.filter((i) => i.selected).map((i) => i.label),
      ...fruit.filter((i) => i.selected).map((i) => i.label),
    ];
    const data = {
      name: itemName.trim(), category, price: Number(price),
      pickup, delivery, details: details.trim(), ingredients: selectedIngredients,
    };
    if (isEdit) {
      updateFood(editId, data);
      navigate(-1);
    } else {
      addFood(data);
      navigate('/restaurant-portal/menu');
    }
  };

  const canSave = itemName.trim() !== '' && price !== '';

  return (
    <div className="flex flex-col h-svh bg-white">
      {/* Scrollable area */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center px-6 py-6">
          <button
            onClick={() => navigate(-1)}
            className="w-[45px] h-[45px] rounded-full bg-[#ECF0F4] flex items-center justify-center shrink-0"
          >
            <IconBack className="w-2.5 h-4" />
          </button>
          <h1 className="flex-1 text-[17px] text-[#181C2E] leading-[22px] ml-4">
            {isEdit ? 'Edit Item' : 'Add New Items'}
          </h1>
          <button onClick={handleReset} className="text-[14px] text-[#FB6D3A] uppercase tracking-[0.28px]">
            Reset
          </button>
        </div>

        <div className="px-6 pb-8 flex flex-col gap-5">
          {/* Item Name */}
          <div className="flex flex-col gap-2">
            <label className="font-normal text-[13px] text-[#32343E] uppercase tracking-[0.26px]">
              item name
            </label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Mazalichiken Halim"
              className="w-full h-[50px] rounded-[10px] border border-[#E8EAED] bg-[#FDFDFD] px-4 capitalize text-[12px] text-[#9C9BA6] tracking-[0.24px] outline-none focus:border-[#FB6D3A]"
            />
          </div>

          {/* Upload Photo/Video — UI only, no actual upload */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] text-[#32343E] uppercase tracking-[0.26px]">
              Upload Photo/Video
            </label>
            <div className="flex gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
              <div className="w-[111px] h-[111px] rounded-[20px] bg-[#98A8B8] shrink-0" />
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-[111px] h-[111px] shrink-0 rounded-[10px] border border-dashed border-[#E8EAED] bg-[#FDFDFD] flex flex-col items-center justify-center gap-1"
                >
                  <UploadIcon />
                  <span className="text-[13px] text-[#9C9BA6]">Add</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] text-[#32343E] uppercase tracking-[0.26px]">Category</label>
            <div
              ref={scrollRef}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              style={scrollStyle}
              className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-colors shrink-0 ${
                    category === cat
                      ? 'bg-[#FB6D3A] text-white border-[#FB6D3A]'
                      : 'bg-[#FDFDFD] text-[#9C9BA6] border-[#E8EAED]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price + Availability */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] text-[#32343E] uppercase tracking-[0.26px]">Price</label>
            <div className="flex items-center gap-4">
              <div className="w-[115px] h-[42px] rounded-[10px] border border-[#E8EAED] bg-[#FDFDFD] flex items-center px-4">
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="$50"
                  className="w-full bg-transparent text-[14px] text-[#9C9BA6] tracking-[0.28px] outline-none"
                />
              </div>
              {[
                { label: 'Pick up', val: pickup,   set: setPickup   },
                { label: 'Delivery', val: delivery, set: setDelivery },
              ].map(({ label, val, set }) => (
                <button key={label} onClick={() => set((v) => !v)} className="flex items-center gap-2">
                  <div className={`w-4.5 h-4.5 rounded-[3px] border flex items-center justify-center transition-colors ${val ? 'border-[#FB6D3A]' : 'border-[#E8EAED] bg-[#FDFDFD]'}`}>
                    {val && <CheckIcon />}
                  </div>
                  <span className="text-[13px] text-[#9C9BA6] tracking-[0.26px]">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <div className="flex flex-col gap-4">
            <h2 className="text-[13px] text-[#32343E] uppercase tracking-[0.26px]">Ingredients</h2>
            <IngredientRow title="Basic" items={basic} onToggle={toggle(setBasic)} />
            <IngredientRow title="Fruit" items={fruit}  onToggle={toggle(setFruit)} />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] text-[#32343E] uppercase tracking-[0.26px]">Details</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={4}
              placeholder="Lorem ipsum dolor sit amet, consectetur adips cing elit..."
              className="w-full rounded-lg border border-[#E8EAED] bg-[#FDFDFD] p-4 text-[12px] text-[#6B6E82] tracking-[0.24px] outline-none focus:border-[#FB6D3A] resize-none leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Save Changes */}
      <div className="px-6 pb-6 pt-2 bg-white">
        <button
          onClick={handleSave}
          disabled={!canSave}
          className={`w-full h-15.5 rounded-[18px] text-white text-[18px] uppercase tracking-[0.36px] transition-opacity ${canSave ? 'bg-[#FB6D3A]' : 'bg-[#FB6D3A] opacity-40'}`}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
