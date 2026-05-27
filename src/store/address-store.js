/**
 * Address Store — Zustand global state for saved delivery addresses.
 * Persists to localStorage so addresses survive page reload.
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/** @typedef {'Home'|'Work'|'Other'} AddressLabel */
/**
 * @typedef {Object} Address
 * @property {string} id
 * @property {AddressLabel} label
 * @property {string} address   - full address string
 * @property {string} street
 * @property {string} postCode
 * @property {string} apartment
 */

/** Seed data shown before user adds any address */
const SEED_ADDRESSES = [
  {
    id: 'a1',
    label: 'Home',
    address: '2464 Royal Ln. Mesa, New Jersey 45463',
    street: 'Royal Ln.',
    postCode: '45463',
    apartment: '',
  },
  {
    id: 'a2',
    label: 'Work',
    address: '3891 Ranchview Dr. Richardson, California 62639',
    street: 'Ranchview Dr.',
    postCode: '62639',
    apartment: '',
  },
];

const useAddressStore = create(
  persist(
    (set) => ({
      /** @type {Address[]} */
      addresses: SEED_ADDRESSES,

      /** ID of the address selected for delivery */
      selectedAddressId: SEED_ADDRESSES[0].id,

      /**
       * Add a new address.
       * First address added when list is empty becomes selected automatically.
       * @param {Omit<Address, 'id'>} data
       */
      addAddress: (data) =>
        set(s => {
          const id = `addr-${Date.now()}`;
          const addresses = [...s.addresses, { ...data, id }];
          return {
            addresses,
            selectedAddressId: s.selectedAddressId ?? id,
          };
        }),

      /**
       * Update existing address fields by id.
       * @param {string} id
       * @param {Partial<Omit<Address, 'id'>>} fields
       */
      updateAddress: (id, fields) =>
        set(s => ({
          addresses: s.addresses.map(a => a.id === id ? { ...a, ...fields } : a),
        })),

      /**
       * Remove address by id.
       * If it was selected, fall back to first remaining.
       * @param {string} id
       */
      removeAddress: (id) =>
        set(s => {
          const addresses = s.addresses.filter(a => a.id !== id);
          const selectedAddressId =
            s.selectedAddressId === id
              ? (addresses[0]?.id ?? null)
              : s.selectedAddressId;
          return { addresses, selectedAddressId };
        }),

      /**
       * Set an address as the active delivery address.
       * @param {string} id
       */
      selectAddress: (id) => set({ selectedAddressId: id }),
    }),
    { name: 'address-storage' },
  ),
);

// ── Selectors ──────────────────────────────────────────────────────────────────
/** Currently selected address object */
export const selectActiveAddress = s =>
  s.addresses.find(a => a.id === s.selectedAddressId) ?? null;

/** Addresses grouped by label */
export const selectByLabel = label => s =>
  s.addresses.filter(a => a.label === label);

export default useAddressStore;
