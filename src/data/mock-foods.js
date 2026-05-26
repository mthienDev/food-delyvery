/**
 * Mock food/dish data keyed by restaurantId.
 * Each item: id, restaurantId, name, description, price, image,
 * category, isAvailable, isBestseller, options[].
 */
export const foods = [
  // Phở Hà Nội (r1)
  {
    id: 'f1', restaurantId: 'r1',
    name: 'Phở Bò Tái Chín', description: 'Tái + chín, nước dùng trong vắt, thịt mềm.',
    price: 65000, image: 'https://placehold.co/300x200/FF6B35/white?text=Phở+Bò',
    category: 'Nước', isAvailable: true, isBestseller: true,
    options: [
      { label: 'Size', choices: ['Nhỏ (-5k)', 'Vừa', 'Lớn (+10k)'] },
      { label: 'Độ chín', choices: ['Tái', 'Chín', 'Tái chín'] },
    ],
  },
  {
    id: 'f2', restaurantId: 'r1',
    name: 'Phở Gà', description: 'Gà ta xé sợi, nước dùng thanh ngọt.',
    price: 60000, image: 'https://placehold.co/300x200/FF8C42/white?text=Phở+Gà',
    category: 'Nước', isAvailable: true, isBestseller: false,
    options: [{ label: 'Size', choices: ['Nhỏ', 'Vừa', 'Lớn'] }],
  },
  {
    id: 'f3', restaurantId: 'r1',
    name: 'Quẩy', description: 'Giòn vàng, ăn kèm phở.',
    price: 10000, image: 'https://placehold.co/300x200/FFD166/black?text=Quẩy',
    category: 'Thêm', isAvailable: true, isBestseller: false,
    options: [],
  },

  // Burger Bros (r2)
  {
    id: 'f4', restaurantId: 'r2',
    name: 'Classic Cheeseburger', description: 'Thịt bò Mỹ 150g, phô mai cheddar, rau củ tươi.',
    price: 85000, image: 'https://placehold.co/300x200/E63946/white?text=Cheeseburger',
    category: 'Burger', isAvailable: true, isBestseller: true,
    options: [
      { label: 'Độ chín thịt', choices: ['Medium', 'Well done'] },
      { label: 'Thêm', choices: ['Thêm phô mai (+10k)', 'Thêm bacon (+15k)'] },
    ],
  },
  {
    id: 'f5', restaurantId: 'r2',
    name: 'Crispy Chicken Burger', description: 'Gà giòn sốt mayo cay.',
    price: 75000, image: 'https://placehold.co/300x200/F4A261/white?text=Chicken+Burger',
    category: 'Burger', isAvailable: true, isBestseller: false,
    options: [{ label: 'Mức cay', choices: ['Không cay', 'Cay nhẹ', 'Cay vừa', 'Cay nhiều'] }],
  },
  {
    id: 'f6', restaurantId: 'r2',
    name: 'French Fries (L)', description: 'Khoai tây chiên giòn, muối biển.',
    price: 35000, image: 'https://placehold.co/300x200/FFD166/black?text=Fries',
    category: 'Sides', isAvailable: true, isBestseller: false,
    options: [],
  },

  // Sushi Sakura (r3)
  {
    id: 'f7', restaurantId: 'r3',
    name: 'Salmon Sashimi (8 miếng)', description: 'Cá hồi Na Uy tươi nhập khẩu, cắt dày.',
    price: 180000, image: 'https://placehold.co/300x200/EF233C/white?text=Sashimi',
    category: 'Sashimi', isAvailable: true, isBestseller: true,
    options: [],
  },
  {
    id: 'f8', restaurantId: 'r3',
    name: 'Dragon Roll (8 cuốn)', description: 'Tôm tempura, bơ, trứng cá masago.',
    price: 145000, image: 'https://placehold.co/300x200/2B2D42/white?text=Dragon+Roll',
    category: 'Maki', isAvailable: true, isBestseller: true,
    options: [],
  },

  // Cơm Tấm Sài Gòn (r4)
  {
    id: 'f9', restaurantId: 'r4',
    name: 'Cơm Sườn Bì Chả', description: 'Đầy đủ sườn nướng, bì, chả, trứng ốp la.',
    price: 55000, image: 'https://placehold.co/300x200/F4A261/white?text=Cơm+Tấm',
    category: 'Cơm', isAvailable: true, isBestseller: true,
    options: [{ label: 'Thêm', choices: ['Thêm trứng (+8k)', 'Thêm chả (+15k)'] }],
  },
]

/** Helper: get foods by restaurantId */
export function getFoodsByRestaurant(restaurantId) {
  return foods.filter((f) => f.restaurantId === restaurantId)
}
