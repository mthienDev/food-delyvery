/**
 * Auth store — quản lý trạng thái đăng nhập toàn app.
 * Persist vào localStorage (key: 'auth') để duy trì session qua refresh.
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { findUser } from '../data/mock-users';

const useAuthStore = create(
  persist(
    (set) => ({
      /** @type {{ id: string, role: string, name: string, email: string, phone?: string, bio?: string, avatar?: string | null } | null} */
      user: null,

      /**
       * Đăng nhập bằng email + password.
       * @returns {object|null} user nếu thành công, null nếu sai credentials
       */
      login: (email, password) => {
        const found = findUser(email, password);
        if (!found) return null;

        // Không lưu password vào store
        const { password: _pwd, ...safeUser } = found;
        set({ user: safeUser });
        return safeUser;
      },

      /** Đăng xuất — xóa user khỏi state và localStorage */
      logout: () => set({ user: null }),

      /**
       * Cập nhật thông tin profile (dùng khi edit profile).
       * @param {Partial<typeof user>} fields
       */
      updateProfile: (fields) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...fields } : null,
        })),
    }),
    {
      name: 'auth', // localStorage key
    }
  )
);

export default useAuthStore;
