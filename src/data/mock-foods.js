/**
 * Mock food/dish data — restaurantId maps to mock-restaurants.js id slugs.
 * Prices in USD. Fields: id, restaurantId, name, price, category, isBestseller.
 */
export const foods = [
  // ── Pizza Palace ────────────────────────────────────────────────────────────
  { id: 'pp-01', restaurantId: 'pizza-palace', category: 'Pizza',    isBestseller: true,  name: 'Margherita Classic',  price: 45 },
  { id: 'pp-02', restaurantId: 'pizza-palace', category: 'Pizza',    isBestseller: false, name: 'BBQ Chicken Pizza',   price: 55 },
  { id: 'pp-03', restaurantId: 'pizza-palace', category: 'Pizza',    isBestseller: false, name: 'Pepperoni Supreme',   price: 60 },
  { id: 'pp-04', restaurantId: 'pizza-palace', category: 'Pizza',    isBestseller: false, name: 'Veggie Delight',      price: 42 },
  { id: 'pp-05', restaurantId: 'pizza-palace', category: 'Pasta',    isBestseller: false, name: 'Spaghetti Carbonara', price: 38 },
  { id: 'pp-06', restaurantId: 'pizza-palace', category: 'Pasta',    isBestseller: false, name: 'Fettuccine Alfredo',  price: 42 },
  { id: 'pp-07', restaurantId: 'pizza-palace', category: 'Drinks',   isBestseller: false, name: 'Fresh Lemonade',      price: 8  },
  { id: 'pp-08', restaurantId: 'pizza-palace', category: 'Drinks',   isBestseller: false, name: 'Sparkling Water',     price: 5  },

  // ── Napoli Express ──────────────────────────────────────────────────────────
  { id: 'ne-01', restaurantId: 'napoli-express', category: 'Pizza',      isBestseller: true,  name: 'Quattro Stagioni',    price: 52 },
  { id: 'ne-02', restaurantId: 'napoli-express', category: 'Pizza',      isBestseller: false, name: 'Diavola Spicy',       price: 55 },
  { id: 'ne-03', restaurantId: 'napoli-express', category: 'Pizza',      isBestseller: false, name: 'Capricciosa',         price: 48 },
  { id: 'ne-04', restaurantId: 'napoli-express', category: 'Bruschetta', isBestseller: false, name: 'Classic Bruschetta',  price: 18 },
  { id: 'ne-05', restaurantId: 'napoli-express', category: 'Bruschetta', isBestseller: false, name: 'Mushroom Bruschetta', price: 22 },
  { id: 'ne-06', restaurantId: 'napoli-express', category: 'Dessert',    isBestseller: false, name: 'Tiramisu',            price: 28 },

  // ── Crispy Crust ────────────────────────────────────────────────────────────
  { id: 'cc-01', restaurantId: 'crispy-crust', category: 'Pizza',  isBestseller: true,  name: 'Thin Crust Margherita', price: 42 },
  { id: 'cc-02', restaurantId: 'crispy-crust', category: 'Pizza',  isBestseller: false, name: 'Crispy Pepperoni',      price: 52 },
  { id: 'cc-03', restaurantId: 'crispy-crust', category: 'Pizza',  isBestseller: false, name: 'White Pizza',           price: 48 },
  { id: 'cc-04', restaurantId: 'crispy-crust', category: 'Salad',  isBestseller: false, name: 'Caesar Salad',          price: 25 },
  { id: 'cc-05', restaurantId: 'crispy-crust', category: 'Salad',  isBestseller: false, name: 'Greek Salad',           price: 22 },
  { id: 'cc-06', restaurantId: 'crispy-crust', category: 'Sides',  isBestseller: false, name: 'Garlic Bread',          price: 12 },

  // ── Rose Garden ─────────────────────────────────────────────────────────────
  { id: 'rg-01', restaurantId: 'rose-garden', category: 'Burger', isBestseller: true,  name: 'Classic Beef Burger',  price: 45 },
  { id: 'rg-02', restaurantId: 'rose-garden', category: 'Burger', isBestseller: false, name: 'Double Smash Burger',  price: 65 },
  { id: 'rg-03', restaurantId: 'rose-garden', category: 'Burger', isBestseller: false, name: 'Crispy Chicken Burger',price: 42 },
  { id: 'rg-04', restaurantId: 'rose-garden', category: 'Burger', isBestseller: false, name: 'Veggie Burger',        price: 38 },
  { id: 'rg-05', restaurantId: 'rose-garden', category: 'Wings',  isBestseller: false, name: 'Buffalo Wings',        price: 35 },
  { id: 'rg-06', restaurantId: 'rose-garden', category: 'Wings',  isBestseller: false, name: 'Honey BBQ Wings',      price: 38 },
  { id: 'rg-07', restaurantId: 'rose-garden', category: 'Rice',   isBestseller: false, name: 'Garlic Fried Rice',    price: 28 },
  { id: 'rg-08', restaurantId: 'rose-garden', category: 'Rice',   isBestseller: false, name: 'Chicken Rice Bowl',    price: 35 },

  // ── The Burger Joint ────────────────────────────────────────────────────────
  { id: 'bj-01', restaurantId: 'burger-joint', category: 'Burger', isBestseller: true,  name: 'Classic Cheeseburger', price: 48 },
  { id: 'bj-02', restaurantId: 'burger-joint', category: 'Burger', isBestseller: false, name: 'Bacon Smash Burger',   price: 58 },
  { id: 'bj-03', restaurantId: 'burger-joint', category: 'Burger', isBestseller: false, name: 'Mushroom Swiss',       price: 52 },
  { id: 'bj-04', restaurantId: 'burger-joint', category: 'Burger', isBestseller: false, name: 'Double Stack',         price: 72 },
  { id: 'bj-05', restaurantId: 'burger-joint', category: 'Fries',  isBestseller: false, name: 'Regular Fries',        price: 12 },
  { id: 'bj-06', restaurantId: 'burger-joint', category: 'Fries',  isBestseller: false, name: 'Loaded Cheese Fries',  price: 22 },
  { id: 'bj-07', restaurantId: 'burger-joint', category: 'Shakes', isBestseller: false, name: 'Chocolate Shake',      price: 15 },
  { id: 'bj-08', restaurantId: 'burger-joint', category: 'Shakes', isBestseller: false, name: 'Strawberry Shake',     price: 15 },

  // ── Smash & Stack ───────────────────────────────────────────────────────────
  { id: 'ss-01', restaurantId: 'smash-stack', category: 'Burger',       isBestseller: true,  name: 'OG Smash Burger',   price: 42 },
  { id: 'ss-02', restaurantId: 'smash-stack', category: 'Burger',       isBestseller: false, name: 'Double Smash',      price: 65 },
  { id: 'ss-03', restaurantId: 'smash-stack', category: 'Burger',       isBestseller: false, name: 'Crispy Chicken',    price: 52 },
  { id: 'ss-04', restaurantId: 'smash-stack', category: 'Loaded Fries', isBestseller: false, name: 'Classic Loaded',    price: 18 },
  { id: 'ss-05', restaurantId: 'smash-stack', category: 'Loaded Fries', isBestseller: false, name: 'BBQ Bacon Fries',   price: 25 },

  // ── Sakura Sushi Bar ────────────────────────────────────────────────────────
  { id: 'sk-01', restaurantId: 'sakura-sushi', category: 'Sashimi', isBestseller: true,  name: 'Salmon Sashimi 8pc',  price: 35 },
  { id: 'sk-02', restaurantId: 'sakura-sushi', category: 'Sashimi', isBestseller: false, name: 'Tuna Sashimi 8pc',    price: 45 },
  { id: 'sk-03', restaurantId: 'sakura-sushi', category: 'Sashimi', isBestseller: false, name: 'Mixed Sashimi 12pc',  price: 55 },
  { id: 'sk-04', restaurantId: 'sakura-sushi', category: 'Maki',    isBestseller: false, name: 'California Roll',     price: 28 },
  { id: 'sk-05', restaurantId: 'sakura-sushi', category: 'Maki',    isBestseller: false, name: 'Spicy Tuna Roll',     price: 32 },
  { id: 'sk-06', restaurantId: 'sakura-sushi', category: 'Maki',    isBestseller: false, name: 'Dragon Roll',         price: 42 },
  { id: 'sk-07', restaurantId: 'sakura-sushi', category: 'Nigiri',  isBestseller: false, name: 'Salmon Nigiri 2pc',   price: 22 },
  { id: 'sk-08', restaurantId: 'sakura-sushi', category: 'Nigiri',  isBestseller: false, name: 'Tuna Nigiri 2pc',     price: 25 },

  // ── Tokyo Rolls ─────────────────────────────────────────────────────────────
  { id: 'tr-01', restaurantId: 'tokyo-rolls', category: 'Maki',    isBestseller: true,  name: 'Rainbow Roll 8pc',  price: 48 },
  { id: 'tr-02', restaurantId: 'tokyo-rolls', category: 'Maki',    isBestseller: false, name: 'Tiger Roll 8pc',    price: 45 },
  { id: 'tr-03', restaurantId: 'tokyo-rolls', category: 'Maki',    isBestseller: false, name: 'Spider Roll 8pc',   price: 52 },
  { id: 'tr-04', restaurantId: 'tokyo-rolls', category: 'Tempura', isBestseller: false, name: 'Shrimp Tempura',    price: 35 },
  { id: 'tr-05', restaurantId: 'tokyo-rolls', category: 'Tempura', isBestseller: false, name: 'Veggie Tempura',    price: 28 },

  // ── Umami House ─────────────────────────────────────────────────────────────
  { id: 'uh-01', restaurantId: 'umami-house', category: 'Sushi', isBestseller: true,  name: 'Avocado Roll 6pc',   price: 25 },
  { id: 'uh-02', restaurantId: 'umami-house', category: 'Sushi', isBestseller: false, name: 'Cucumber Roll 6pc',  price: 20 },
  { id: 'uh-03', restaurantId: 'umami-house', category: 'Ramen', isBestseller: false, name: 'Tonkotsu Ramen',     price: 32 },
  { id: 'uh-04', restaurantId: 'umami-house', category: 'Ramen', isBestseller: false, name: 'Miso Ramen',         price: 28 },
  { id: 'uh-05', restaurantId: 'umami-house', category: 'Gyoza', isBestseller: false, name: 'Pan-fried Gyoza 6pc',price: 18 },

  // ── Pho Saigon ──────────────────────────────────────────────────────────────
  { id: 'ps-01', restaurantId: 'pho-saigon', category: 'Noodle',       isBestseller: true,  name: 'Beef Pho',            price: 18 },
  { id: 'ps-02', restaurantId: 'pho-saigon', category: 'Noodle',       isBestseller: false, name: 'Chicken Pho',         price: 16 },
  { id: 'ps-03', restaurantId: 'pho-saigon', category: 'Noodle',       isBestseller: false, name: 'Bun Bo Hue',          price: 19 },
  { id: 'ps-04', restaurantId: 'pho-saigon', category: 'Spring Rolls', isBestseller: false, name: 'Fresh Spring Rolls',  price: 12 },
  { id: 'ps-05', restaurantId: 'pho-saigon', category: 'Spring Rolls', isBestseller: false, name: 'Fried Spring Rolls',  price: 14 },

  // ── Ramen Republic ──────────────────────────────────────────────────────────
  { id: 'rr-01', restaurantId: 'ramen-republic', category: 'Ramen', isBestseller: true,  name: 'Tonkotsu Ramen',    price: 28 },
  { id: 'rr-02', restaurantId: 'ramen-republic', category: 'Ramen', isBestseller: false, name: 'Shoyu Ramen',       price: 25 },
  { id: 'rr-03', restaurantId: 'ramen-republic', category: 'Ramen', isBestseller: false, name: 'Spicy Miso Ramen',  price: 30 },
  { id: 'rr-04', restaurantId: 'ramen-republic', category: 'Sides', isBestseller: false, name: 'Gyoza 6pc',         price: 12 },
  { id: 'rr-05', restaurantId: 'ramen-republic', category: 'Sides', isBestseller: false, name: 'Karaage Chicken',   price: 15 },

  // ── Noodle Street ───────────────────────────────────────────────────────────
  { id: 'ns-01', restaurantId: 'noodle-street', category: 'Noodle', isBestseller: true,  name: 'Pad Thai',          price: 22 },
  { id: 'ns-02', restaurantId: 'noodle-street', category: 'Noodle', isBestseller: false, name: 'Tom Yum Noodle',    price: 24 },
  { id: 'ns-03', restaurantId: 'noodle-street', category: 'Noodle', isBestseller: false, name: 'Wonton Noodle',     price: 20 },
  { id: 'ns-04', restaurantId: 'noodle-street', category: 'Soup',   isBestseller: false, name: 'Tom Yum Soup',      price: 18 },
  { id: 'ns-05', restaurantId: 'noodle-street', category: 'Soup',   isBestseller: false, name: 'Wonton Soup',       price: 15 },

  // ── Taco Fiesta ─────────────────────────────────────────────────────────────
  { id: 'tf-01', restaurantId: 'taco-fiesta', category: 'Taco',    isBestseller: true,  name: 'Beef Street Taco',   price: 15 },
  { id: 'tf-02', restaurantId: 'taco-fiesta', category: 'Taco',    isBestseller: false, name: 'Chicken Taco',       price: 14 },
  { id: 'tf-03', restaurantId: 'taco-fiesta', category: 'Taco',    isBestseller: false, name: 'Al Pastor Taco',     price: 16 },
  { id: 'tf-04', restaurantId: 'taco-fiesta', category: 'Taco',    isBestseller: false, name: 'Fish Taco',          price: 18 },
  { id: 'tf-05', restaurantId: 'taco-fiesta', category: 'Burrito', isBestseller: false, name: 'Beef Burrito',       price: 22 },
  { id: 'tf-06', restaurantId: 'taco-fiesta', category: 'Burrito', isBestseller: false, name: 'Chicken Burrito',    price: 20 },

  // ── El Rancho ───────────────────────────────────────────────────────────────
  { id: 'er-01', restaurantId: 'el-rancho', category: 'Taco',  isBestseller: true,  name: 'Shrimp Taco',       price: 18 },
  { id: 'er-02', restaurantId: 'el-rancho', category: 'Taco',  isBestseller: false, name: 'Carne Asada Taco',  price: 16 },
  { id: 'er-03', restaurantId: 'el-rancho', category: 'Taco',  isBestseller: false, name: 'Veggie Taco',       price: 14 },
  { id: 'er-04', restaurantId: 'el-rancho', category: 'Sides', isBestseller: false, name: 'Loaded Nachos',     price: 18 },
  { id: 'er-05', restaurantId: 'el-rancho', category: 'Sides', isBestseller: false, name: 'Fresh Guacamole',   price: 10 },

  // ── Cantina Loco ────────────────────────────────────────────────────────────
  { id: 'cl-01', restaurantId: 'cantina-loco', category: 'Taco',    isBestseller: true,  name: 'Classic Beef Taco', price: 14 },
  { id: 'cl-02', restaurantId: 'cantina-loco', category: 'Taco',    isBestseller: false, name: 'Pork Taco',         price: 16 },
  { id: 'cl-03', restaurantId: 'cantina-loco', category: 'Dessert', isBestseller: false, name: 'Churros',           price: 12 },
  { id: 'cl-04', restaurantId: 'cantina-loco', category: 'Dessert', isBestseller: false, name: 'Tres Leches Cake',  price: 15 },
]

/** Get all food items for a restaurant */
export function getFoodsByRestaurant(restaurantId) {
  return foods.filter(f => f.restaurantId === restaurantId)
}

// ── Food detail extras (description, sizes, ingredients per category) ──────────

const FOOD_DESC =
  'Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.'

// ── Ingredient sets keyed by icon slug (see src/assets/icons/ingredients/) ──
const ING = {
  salt:     { name: 'Salt',     icon: 'salt' },
  chicken:  { name: 'Chicken',  icon: 'chicken' },
  onion:    { name: 'Onion',    icon: 'onion',    allergy: true },
  garlic:   { name: 'Garlic',   icon: 'garlic' },
  pepper:   { name: 'Pappers',  icon: 'pepper',   allergy: true },
  ginger:   { name: 'Ginger',   icon: 'ginger' },
  broccoli: { name: 'Broccoli', icon: 'broccoli' },
  orange:   { name: 'Orange',   icon: 'orange' },
  walnut:   { name: 'Walnut',   icon: 'walnut',   allergy: true },
}

const CATEGORY_DETAIL = {
  // Burger — Figma reference design (salt+chicken+alliums+spice+veggies+nuts)
  Burger:  { sizes: ['10"', '14"', '16"'],   defSizeIdx: 1, ingredients: [ING.salt, ING.chicken, ING.onion, ING.garlic, ING.pepper, ING.ginger, ING.broccoli, ING.orange, ING.walnut] },
  // Pizza — classic toppings: garlic, onion, pepper, broccoli, salt
  Pizza:   { sizes: ['10"', '14"', '16"'],   defSizeIdx: 1, ingredients: [ING.garlic, ING.onion, ING.pepper, ING.broccoli, ING.salt, ING.orange] },
  // Wings — spicy marinade: chicken, garlic, ginger, pepper, salt
  Wings:   { sizes: ['6pc', '12pc', '20pc'], defSizeIdx: 0, ingredients: [ING.chicken, ING.garlic, ING.ginger, ING.pepper, ING.salt] },
  // Sashimi — clean flavors: salt, ginger, orange (citrus), garlic
  Sashimi: { sizes: ['6pc', '8pc', '12pc'],  defSizeIdx: 1, ingredients: [ING.salt, ING.ginger, ING.orange, ING.garlic] },
  // Maki — sushi roll: ginger, orange, broccoli, onion, salt
  Maki:    { sizes: ['6pc', '8pc', '12pc'],  defSizeIdx: 1, ingredients: [ING.ginger, ING.orange, ING.broccoli, ING.onion, ING.salt] },
  // Nigiri — minimal: salt, ginger, orange
  Nigiri:  { sizes: ['2pc', '4pc', '6pc'],   defSizeIdx: 0, ingredients: [ING.salt, ING.ginger, ING.orange, ING.garlic] },
  // Ramen — rich broth: chicken, onion, ginger, garlic, broccoli, salt
  Ramen:   { sizes: ['10"', '14"', '16"'],   defSizeIdx: 1, ingredients: [ING.chicken, ING.onion, ING.ginger, ING.garlic, ING.broccoli, ING.salt] },
  // Noodle — stir-fry: chicken, onion, garlic, pepper, broccoli, salt
  Noodle:  { sizes: ['10"', '14"', '16"'],   defSizeIdx: 1, ingredients: [ING.chicken, ING.onion, ING.garlic, ING.pepper, ING.broccoli, ING.salt] },
  // Taco — Mexican filling: chicken, onion, garlic, pepper, salt
  Taco:    { sizes: ['1pc', '2pc', '3pc'],   defSizeIdx: 1, ingredients: [ING.chicken, ING.onion, ING.garlic, ING.pepper, ING.salt] },
  // Burrito — wrapped: chicken, onion, garlic, pepper, broccoli, salt
  Burrito: { sizes: ['10"', '14"', '16"'],   defSizeIdx: 0, ingredients: [ING.chicken, ING.onion, ING.garlic, ING.pepper, ING.broccoli, ING.salt] },
  // Pasta — Italian: garlic, onion, pepper, broccoli, salt
  Pasta:   { sizes: ['10"', '14"', '16"'],   defSizeIdx: 1, ingredients: [ING.garlic, ING.onion, ING.pepper, ING.broccoli, ING.salt] },
  // Salad — fresh bowl: broccoli, onion, orange, walnut, salt
  Salad:   { sizes: ['10"', '14"', '16"'],   defSizeIdx: 0, ingredients: [ING.broccoli, ING.onion, ING.orange, ING.walnut, ING.salt] },
  // Dessert — sweet: orange, walnut, ginger, salt
  Dessert: { sizes: ['10"', '14"', '16"'],   defSizeIdx: 0, ingredients: [ING.orange, ING.walnut, ING.ginger, ING.salt] },
  // Sides — simple: salt, garlic, onion, ginger
  Sides:   { sizes: ['10"', '14"', '16"'],   defSizeIdx: 0, ingredients: [ING.salt, ING.garlic, ING.onion, ING.ginger] },
  // Spring Rolls — fresh: broccoli, chicken, garlic, onion, ginger, salt
  'Spring Rolls': { sizes: ['3pc', '6pc', '9pc'], defSizeIdx: 0, ingredients: [ING.broccoli, ING.chicken, ING.garlic, ING.onion, ING.ginger, ING.salt] },
  // Gyoza — dumpling: chicken, garlic, ginger, onion, salt
  Gyoza:   { sizes: ['3pc', '6pc', '9pc'],   defSizeIdx: 1, ingredients: [ING.chicken, ING.garlic, ING.ginger, ING.onion, ING.salt] },
  // Bruschetta — Italian appetizer: garlic, onion, salt, orange
  Bruschetta: { sizes: ['2pc', '4pc', '6pc'], defSizeIdx: 0, ingredients: [ING.garlic, ING.onion, ING.salt, ING.orange, ING.pepper] },
  // Tempura — fried: broccoli, salt, ginger, garlic
  Tempura: { sizes: ['4pc', '6pc', '8pc'],   defSizeIdx: 0, ingredients: [ING.broccoli, ING.salt, ING.ginger, ING.garlic, ING.pepper] },
  // Soup — broth: onion, garlic, ginger, salt, broccoli
  Soup:    { sizes: ['S', 'M', 'L'],         defSizeIdx: 1, ingredients: [ING.onion, ING.garlic, ING.ginger, ING.salt, ING.broccoli] },
  // Loaded Fries — hearty: salt, pepper, onion, garlic, chicken
  'Loaded Fries': { sizes: ['S', 'M', 'L'], defSizeIdx: 0, ingredients: [ING.salt, ING.pepper, ING.onion, ING.garlic, ING.chicken] },
  // Fries — simple: salt, pepper, garlic
  Fries:   { sizes: ['S', 'M', 'L'],         defSizeIdx: 0, ingredients: [ING.salt, ING.pepper, ING.garlic] },
  // Shakes — sweet: orange, walnut, ginger, salt
  Shakes:  { sizes: ['S', 'M', 'L'],         defSizeIdx: 1, ingredients: [ING.orange, ING.walnut, ING.ginger] },
  // Drinks — minimal: orange, salt
  Drinks:  { sizes: ['S', 'M', 'L'],         defSizeIdx: 0, ingredients: [ING.orange, ING.salt, ING.ginger] },
  default: { sizes: ['10"', '14"', '16"'],   defSizeIdx: 1, ingredients: [ING.salt, ING.garlic, ING.onion, ING.ginger, ING.broccoli, ING.pepper] },
}

/** Get food with extended detail data (description, sizes, ingredients) */
export function getFoodDetail(id) {
  const food = foods.find(f => f.id === id)
  if (!food) return null
  const extra = CATEGORY_DETAIL[food.category] ?? CATEGORY_DETAIL.default
  return { ...food, description: FOOD_DESC, ...extra }
}

/** Get default size label for a given food category */
export function getDefaultSize(category) {
  const detail = CATEGORY_DETAIL[category] ?? CATEGORY_DETAIL.default
  return detail.sizes[detail.defSizeIdx]
}

/** Get ingredient list (with icons) for a given food category */
export function getIngredientsByCategory(category) {
  return (CATEGORY_DETAIL[category] ?? CATEGORY_DETAIL.default).ingredients
}
