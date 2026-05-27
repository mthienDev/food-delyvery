/**
 * Master restaurant data — single source of truth.
 * Used by: home-page, category-page, restaurant-detail-page, search-page.
 * Fields: id (URL slug), categoryId (matches mock-home CATEGORIES), name, tags,
 *   rating, reviewCount, deliveryTime, time (display), deliveryFee, deliveryLabel,
 *   minOrder, isOpen, address, description, featured.
 */
export const restaurants = [
  // ── Pizza (categoryId: 1) ──────────────────────────────────────────────────
  { id: 'pizza-palace', categoryId: 1, name: 'Pizza Palace',
    tags: 'Pizza · Pasta · Calzone', rating: 4.8, reviewCount: 324,
    deliveryTime: '20-30', time: '20 min', deliveryFee: 0, deliveryLabel: 'Free',
    minOrder: 15, isOpen: true, address: '12 Le Loi, District 1',
    description: 'Hand-tossed authentic Italian pizza with fresh ingredients and house-made tomato sauce.', featured: true },

  { id: 'napoli-express', categoryId: 1, name: 'Napoli Express',
    tags: 'Pizza · Bruschetta · Tiramisu', rating: 4.6, reviewCount: 210,
    deliveryTime: '30-40', time: '30 min', deliveryFee: 1, deliveryLabel: '$1.00',
    minOrder: 12, isOpen: true, address: '45 Nguyen Hue, District 1',
    description: 'Classic Neapolitan pizzas baked in traditional wood-fired ovens, served with crispy bruschetta.', featured: false },

  { id: 'crispy-crust', categoryId: 1, name: 'Crispy Crust',
    tags: 'Pizza · Garlic Bread · Salad', rating: 4.4, reviewCount: 145,
    deliveryTime: '25-35', time: '25 min', deliveryFee: 0, deliveryLabel: 'Free',
    minOrder: 10, isOpen: true, address: '88 Pasteur, District 3',
    description: 'Thin & crispy crust pizza with premium toppings and fresh garden salads.', featured: false },

  // ── Burger (categoryId: 2) ─────────────────────────────────────────────────
  { id: 'rose-garden', categoryId: 2, name: 'Rose Garden Restaurant',
    tags: 'Burger · Chicken · Rice · Wings', rating: 4.7, reviewCount: 512,
    deliveryTime: '20-30', time: '20 min', deliveryFee: 0, deliveryLabel: 'Free',
    minOrder: 12, isOpen: true, address: '23 Vo Van Tan, District 3',
    description: 'Juicy beef burgers and crispy wings made with premium ingredients. A local favourite since 2018.', featured: true },

  { id: 'burger-joint', categoryId: 2, name: 'The Burger Joint',
    tags: 'Burger · Fries · Shakes', rating: 4.5, reviewCount: 320,
    deliveryTime: '25-35', time: '25 min', deliveryFee: 0, deliveryLabel: 'Free',
    minOrder: 10, isOpen: true, address: '5 Dinh Tien Hoang, Binh Thanh',
    description: 'Classic American burgers with hand-cut fries and thick, creamy milkshakes.', featured: false },

  { id: 'smash-stack', categoryId: 2, name: 'Smash & Stack',
    tags: 'Smash Burger · Loaded Fries · Soda', rating: 4.3, reviewCount: 180,
    deliveryTime: '15-25', time: '15 min', deliveryFee: 0.5, deliveryLabel: '$0.50',
    minOrder: 8, isOpen: true, address: '34 Tran Hung Dao, District 1',
    description: 'Double smash patties with signature crispy sear and loaded fries piled high.', featured: false },

  // ── Sushi (categoryId: 3) ──────────────────────────────────────────────────
  { id: 'sakura-sushi', categoryId: 3, name: 'Sakura Sushi Bar',
    tags: 'Sushi · Sashimi · Miso Soup', rating: 4.9, reviewCount: 680,
    deliveryTime: '35-45', time: '35 min', deliveryFee: 0, deliveryLabel: 'Free',
    minOrder: 25, isOpen: true, address: '12 Ly Tu Trong, District 1',
    description: 'Premium sushi & sashimi crafted from imported Japanese ingredients. Best in the city.', featured: true },

  { id: 'tokyo-rolls', categoryId: 3, name: 'Tokyo Rolls',
    tags: 'Sushi Roll · Tempura · Edamame', rating: 4.7, reviewCount: 430,
    deliveryTime: '30-40', time: '30 min', deliveryFee: 1.5, deliveryLabel: '$1.50',
    minOrder: 20, isOpen: true, address: '67 Nguyen Thi Minh Khai, District 3',
    description: 'Creative sushi rolls with premium ingredients, bold flavors, and crunchy tempura.', featured: false },

  { id: 'umami-house', categoryId: 3, name: 'Umami House',
    tags: 'Sushi · Ramen · Gyoza', rating: 4.5, reviewCount: 260,
    deliveryTime: '40-55', time: '40 min', deliveryFee: 0, deliveryLabel: 'Free',
    minOrder: 18, isOpen: false, address: '90 Cach Mang Thang 8, District 3',
    description: 'Japanese comfort food combining fresh sushi, rich ramen bowls, and crispy pan-fried gyoza.', featured: false },

  // ── Noodle (categoryId: 4) ─────────────────────────────────────────────────
  { id: 'pho-saigon', categoryId: 4, name: 'Pho Saigon',
    tags: 'Pho · Spring Rolls · Bun Bo', rating: 4.8, reviewCount: 890,
    deliveryTime: '20-30', time: '20 min', deliveryFee: 0, deliveryLabel: 'Free',
    minOrder: 8, isOpen: true, address: '10 Bui Thi Xuan, Tan Binh',
    description: 'Authentic Saigon pho broth slow-simmered for 12 hours with fresh herbs and tender beef.', featured: true },

  { id: 'ramen-republic', categoryId: 4, name: 'Ramen Republic',
    tags: 'Ramen · Gyoza · Karaage', rating: 4.6, reviewCount: 345,
    deliveryTime: '30-45', time: '30 min', deliveryFee: 1, deliveryLabel: '$1.00',
    minOrder: 14, isOpen: true, address: '55 Pham Van Dong, Binh Thanh',
    description: 'Rich tonkotsu and shoyu ramen bowls inspired by the bustling streets of Tokyo.', featured: false },

  { id: 'noodle-street', categoryId: 4, name: 'Noodle Street',
    tags: 'Pad Thai · Tom Yum · Wonton', rating: 4.4, reviewCount: 210,
    deliveryTime: '25-35', time: '25 min', deliveryFee: 0, deliveryLabel: 'Free',
    minOrder: 10, isOpen: true, address: '78 Dinh Bo Linh, Binh Thanh',
    description: 'Pan-Asian noodle dishes spanning Thailand, Vietnam, and China — bold flavors every bowl.', featured: false },

  // ── Taco (categoryId: 5) ───────────────────────────────────────────────────
  { id: 'taco-fiesta', categoryId: 5, name: 'Taco Fiesta',
    tags: 'Taco · Burrito · Quesadilla', rating: 4.6, reviewCount: 290,
    deliveryTime: '20-30', time: '20 min', deliveryFee: 0, deliveryLabel: 'Free',
    minOrder: 10, isOpen: true, address: '23 Hoang Dieu, District 4',
    description: 'Authentic Mexican street tacos with hand-made corn tortillas and fresh house-made salsa.', featured: false },

  { id: 'el-rancho', categoryId: 5, name: 'El Rancho',
    tags: 'Taco · Nachos · Guacamole', rating: 4.4, reviewCount: 165,
    deliveryTime: '25-35', time: '25 min', deliveryFee: 0.5, deliveryLabel: '$0.50',
    minOrder: 10, isOpen: true, address: '45 Ben Nghe, District 4',
    description: 'Street-style Mexican kitchen with loaded nachos, creamy guacamole, and bold taco fillings.', featured: false },

  { id: 'cantina-loco', categoryId: 5, name: 'Cantina Loco',
    tags: 'Taco · Enchilada · Churros', rating: 4.3, reviewCount: 130,
    deliveryTime: '30-40', time: '30 min', deliveryFee: 0, deliveryLabel: 'Free',
    minOrder: 8, isOpen: true, address: '12 Nguyen Tat Thanh, District 4',
    description: 'Lively Mexican cantina serving enchiladas, crunchy tacos, and warm churros dusted with cinnamon.', featured: false },
]

/** Helper: get restaurant by ID */
export function getRestaurantById(id) {
  return restaurants.find(r => r.id === id) ?? null
}
