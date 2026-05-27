/**
 * Cart Store — Zustand global state for shopping cart.
 * Persists to localStorage so cart survives page reload.
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      /** @type {Array<{uid: string, foodId: string, name: string, size: string, unitPrice: number, qty: number}>} */
      items: [],

      /**
       * Add food to cart. If same food+size exists, increments qty.
       * @param {{ id: string, name: string, price: number }} food
       * @param {string} size
       * @param {number} qty
       */
      addItem: (food, size, qty = 1) => {
        const uid = `${food.id}--${size}`;
        const items = get().items;
        const existing = items.find(i => i.uid === uid);
        if (existing) {
          set({
            items: items.map(i =>
              i.uid === uid ? { ...i, qty: i.qty + qty } : i,
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                uid,
                foodId: food.id,
                name: food.name,
                size,
                unitPrice: food.price,
                qty,
              },
            ],
          });
        }
      },

      /** Remove item by uid */
      removeItem: uid =>
        set(s => ({ items: s.items.filter(i => i.uid !== uid) })),

      /** Update quantity; removes item if qty ≤ 0 */
      updateQty: (uid, qty) => {
        if (qty <= 0) {
          set(s => ({ items: s.items.filter(i => i.uid !== uid) }));
        } else {
          set(s => ({
            items: s.items.map(i => (i.uid === uid ? { ...i, qty } : i)),
          }));
        }
      },

      /** Clear all items */
      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-storage' },
  ),
);

// ── Selectors ──────────────────────────────────────────────────────────────────
/** Total number of individual units in cart (sum of qtys) */
export const selectTotalCount = s =>
  s.items.reduce((n, i) => n + i.qty, 0);

/** Total price */
export const selectTotalPrice = s =>
  s.items.reduce((n, i) => n + i.unitPrice * i.qty, 0);

export default useCartStore;
