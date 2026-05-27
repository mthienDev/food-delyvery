/**
 * Mock data cho Home page — thay bằng API call trong production.
 * RESTAURANTS và FOOD_ITEMS đều derive từ mock-restaurants + mock-foods (single source of truth).
 */
import { restaurants as ALL_RESTAURANTS } from './mock-restaurants'
import { foods as ALL_FOODS } from './mock-foods'

// Lookup map restaurantId → restaurant object
const _rMap = new Map(ALL_RESTAURANTS.map(r => [r.id, r]))

export const CATEGORIES = [
  { id: 1, name: 'Pizza' },
  { id: 2, name: 'Burger' },
  { id: 3, name: 'Sushi' },
  { id: 4, name: 'Noodle' },
  { id: 5, name: 'Taco' },
]

/**
 * Danh sách nhà hàng cho home/category — shape: { id, categoryId, name, tags, rating, delivery, time }
 */
export const RESTAURANTS = ALL_RESTAURANTS.map(r => ({
  id: r.id,
  categoryId: r.categoryId,
  name: r.name,
  tags: r.tags,
  rating: r.rating,
  delivery: r.deliveryLabel,
  time: r.time,
}))

/**
 * FOOD_ITEMS: derive từ mock-foods — mỗi item mang categoryId của nhà hàng tương ứng.
 * Dùng bởi category-page để hiển thị "Popular {Category}" grid.
 */
export const FOOD_ITEMS = ALL_FOODS
  .map(f => {
    const r = _rMap.get(f.restaurantId)
    if (!r) return null
    return { id: f.id, categoryId: r.categoryId, name: f.name, restaurant: r.name, price: f.price }
  })
  .filter(Boolean)
