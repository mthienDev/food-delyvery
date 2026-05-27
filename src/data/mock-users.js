/**
 * Mock users for local development/demo login.
 * Không dùng trong production — thay bằng API auth thật.
 */
export const MOCK_USERS = [
  {
    id: 'u001',
    role: 'customer',
    name: 'Alex Johnson',
    email: 'customer@demo.com',
    password: '123456',
    phone: '+84 912 345 678',
    bio: 'I love fast food 🍔',
    avatar: null,
  },
  {
    id: 'r001',
    role: 'restaurant',
    name: 'Burger House',
    email: 'restaurant@demo.com',
    password: '123456',
    phone: '+84 999 888 777',
    bio: 'Best burgers in town!',
    avatar: null,
    address: '34 Tran Hung Dao, District 1',
    rating: 4.9,
    reviewCount: 248,
  },
];

/**
 * Trả về user nếu credentials khớp, null nếu sai.
 * @param {string} email
 * @param {string} password
 * @returns {{ id, role, name, email } | null}
 */
export function findUser(email, password) {
  return (
    MOCK_USERS.find(
      u => u.email === email && u.password === password
    ) ?? null
  );
}
