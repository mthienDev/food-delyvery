/**
 * Food Store — Zustand global state for restaurant's food list.
 * Persists to localStorage so data survives page reload.
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/** @typedef {{ id: string, name: string, category: string, price: number, pickup: boolean, delivery: boolean, details: string, rating: number, reviews: number }} FoodItem */

const INITIAL_FOODS = [
  { id: '1', name: 'Chicken Thai Biriyani', category: 'Breakfast', price: 60, pickup: true,  delivery: false, details: 'Aromatic basmati rice slow-cooked with tender chicken, Thai spices, and fresh herbs. A fragrant one-pot classic.',      rating: 4.9, reviews: 10 },
  { id: '2', name: 'Chicken Bhuna',         category: 'Breakfast', price: 30, pickup: true,  delivery: false, details: 'Succulent chicken simmered in a rich, deeply-spiced tomato sauce until thick and caramelised.',                        rating: 4.9, reviews: 10 },
  { id: '3', name: 'Mazali Chicken Halim',  category: 'Breakfast', price: 25, pickup: true,  delivery: false, details: 'A hearty slow-cooked blend of chicken, lentils, and broken wheat, seasoned with warming spices and crispy shallots.', rating: 4.9, reviews: 10 },
  { id: '4', name: 'Grilled Salmon Bowl',   category: 'Lunch',     price: 45, pickup: true,  delivery: true,  details: 'Pan-seared Atlantic salmon fillet served over steamed jasmine rice with roasted veggies and a sesame-ginger glaze.', rating: 4.7, reviews: 8  },
  { id: '5', name: 'Caesar Salad',          category: 'Lunch',     price: 20, pickup: true,  delivery: false, details: 'Crisp romaine lettuce, house-made Caesar dressing, shaved parmesan, croutons, and a squeeze of fresh lemon.',          rating: 4.5, reviews: 12 },
  { id: '6', name: 'Veggie Pasta',          category: 'Lunch',     price: 28, pickup: true,  delivery: true,  details: 'Al dente penne tossed with roasted bell peppers, zucchini, cherry tomatoes, and a light garlic-herb olive oil sauce.', rating: 4.6, reviews: 7  },
  { id: '7', name: 'BBQ Beef Ribs',         category: 'Dinner',    price: 70, pickup: true,  delivery: false, details: 'Fall-off-the-bone beef ribs glazed with our signature smoky BBQ sauce, slow-smoked for 6 hours over hickory wood.',   rating: 4.8, reviews: 15 },
  { id: '8', name: 'Garlic Butter Steak',   category: 'Dinner',    price: 85, pickup: true,  delivery: false, details: 'Prime-cut sirloin pan-seared to a perfect medium-rare, finished with garlic herb butter and served with fries.',        rating: 4.9, reviews: 11 },
];

const useFoodStore = create(
  persist(
    (set, get) => ({
      /** @type {FoodItem[]} */
      foods: INITIAL_FOODS,

      /**
       * Add a new food item.
       * @param {Omit<FoodItem, 'id' | 'rating' | 'reviews'>} data
       */
      addFood: (data) =>
        set((s) => ({
          foods: [
            { ...data, id: Date.now().toString(), rating: 0, reviews: 0 },
            ...s.foods,
          ],
        })),

      /**
       * Update an existing food item by id.
       * @param {string} id
       * @param {Partial<FoodItem>} fields
       */
      updateFood: (id, fields) =>
        set((s) => ({
          foods: s.foods.map((f) => (f.id === id ? { ...f, ...fields } : f)),
        })),

      /** Remove a food item by id */
      removeFood: (id) =>
        set((s) => ({ foods: s.foods.filter((f) => f.id !== id) })),

      /** Get foods filtered by category ('All' returns everything) */
      getFoodsByCategory: (category) => {
        const { foods } = get();
        return category === 'All' ? foods : foods.filter((f) => f.category === category);
      },
    }),
    { name: 'food-list-storage', version: 2 },
  ),
);

export default useFoodStore;
