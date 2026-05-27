/**
 * Card Store — Zustand global state for saved payment cards.
 * Persists to localStorage so cards survive page reload.
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Detect card network from card number.
 * Visa: starts with 4
 * Mastercard: starts with 51-55 or 2221-2720
 * @param {string} cardNumber
 * @returns {'visa' | 'mastercard' | 'other'}
 */
function detectCardType(cardNumber) {
  const raw = cardNumber.replace(/\s/g, '');
  if (/^4/.test(raw)) return 'visa';
  if (/^5[1-5]/.test(raw) || /^2[2-7]\d{2}/.test(raw)) return 'mastercard';
  return 'other';
}

const useCardStore = create(
  persist(
    (set, get) => ({
      /** @type {Array<{id: string, holderName: string, cardNumber: string, expireDate: string, cvc: string, type: 'visa'|'mastercard'|'other'}>} */
      cards: [],

      /** ID of the card selected for payment */
      selectedCardId: null,

      /**
       * Add a new card.
       * Uses explicit `type` if provided, falls back to auto-detect from card number.
       * First card added becomes selected automatically.
       * @param {{ holderName: string, cardNumber: string, expireDate: string, cvc: string }} card
       * @param {'visa' | 'mastercard' | undefined} explicitType
       */
      addCard: (card, explicitType) => {
        const id = `card-${Date.now()}`;
        const type = explicitType ?? detectCardType(card.cardNumber);
        set(s => ({
          cards: [...s.cards, { ...card, id, type }],
          selectedCardId: s.selectedCardId ?? id,
        }));
      },

      /** Remove card by id. If it was selected, fall back to first remaining. */
      removeCard: (id) =>
        set(s => {
          const cards = s.cards.filter(c => c.id !== id);
          const selectedCardId =
            s.selectedCardId === id ? (cards[0]?.id ?? null) : s.selectedCardId;
          return { cards, selectedCardId };
        }),

      /** Update existing card fields by id (type preserved) */
      updateCard: (id, fields) =>
        set(s => ({
          cards: s.cards.map(c => c.id === id ? { ...c, ...fields } : c),
        })),

      /** Select card for payment */
      selectCard: (id) => set({ selectedCardId: id }),
    }),
    { name: 'card-storage' },
  ),
);

// ── Selectors ──────────────────────────────────────────────────────────────────
/** All cards of a given type */
export const selectCardsByType = type => s => s.cards.filter(c => c.type === type);

/** Currently selected card object */
export const selectActiveCard = s => s.cards.find(c => c.id === s.selectedCardId) ?? null;

export default useCardStore;
