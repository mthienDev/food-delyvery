# CLAUDE.md — Food Delivery App

Hướng dẫn cho Claude Code khi làm việc trong repo này.

---

## Styling — Tailwind CSS

- **Dùng Tailwind CSS class** cho toàn bộ styling. Không dùng inline style nếu có thể thay bằng Tailwind class.
- Inline style chỉ dùng cho animation động (opacity/transform driven by JS state).
- Color palette, spacing, font-size → theo Tailwind defaults, không custom ngoài `tailwind.config` nếu không cần thiết.

---

## Layout — MobileFrame

- **Mọi trang (page) đều phải bọc trong `<MobileFrame>`.**
- `MobileFrame` nằm tại `src/components/ui/mobile-frame.jsx`, constrain viewport 390px (iPhone 14 Pro).
- Cấu trúc tối thiểu của một trang:

```jsx
import MobileFrame from '../components/ui/mobile-frame'

export default function MyPage() {
  return (
    <MobileFrame>
      {/* nội dung trang */}
    </MobileFrame>
  )
}
```

- Layouts (`CustomerLayout`, `RestaurantLayout`) cũng phải wrap bằng `MobileFrame`.

---

## Routing

- `BrowserRouter` + `react-router-dom` v6, cấu hình trong `src/App.jsx`.
- Customer routes: `/`, `/search`, `/cart`, `/orders`, `/profile`, `/menu`, `/personal-info`, `/edit-profile`, `/my-address`, `/category/:id`, `/restaurant/:id`, `/food/:id`, `/tracking/:id`, `/payment`, `/add-card`, `/order-success`
- Restaurant portal routes: `/restaurant-portal`, `/restaurant-portal/menu`, `/restaurant-portal/orders`, `/restaurant-portal/profile`, `/restaurant-portal/add-item`, `/restaurant-portal/food/:id`, `/restaurant-portal/withdraw-success`, `/restaurant-portal/personal-info`, `/restaurant-portal/notifications`
- Auth routes: `/login`, `/signup`, `/forgot-password`, `/verification`
- Splash screen: `/splash` — hiển thị lần đầu mỗi session, tự redirect về `/` sau 2.8s.

---

## Cấu trúc thư mục

```
src/
├── assets/            # ảnh, svg, icon tĩnh
├── components/
│   └── ui/            # shared UI components (MobileFrame, Button, ...)
├── layouts/           # CustomerLayout, RestaurantLayout
└── pages/
    ├── splash-page.jsx
    ├── customer/      # home, search, category, cart, orders, profile, restaurant-detail, food-detail, order-tracking, payment, add-card, order-success
    └── restaurant/    # dashboard, menu, orders, profile
```

---

## Quy tắc khi thêm mới

> **QUAN TRỌNG:** Mỗi khi thêm trang, component, route, hoặc convention mới → **cập nhật file này ngay**.

| Thêm gì | Cập nhật mục nào |
|---------|-----------------|
| Trang mới | Routing + Cấu trúc thư mục |
| Component dùng chung | Cấu trúc thư mục → `components/ui/` |
| Route mới | Routing |
| Convention mới | Mục tương ứng hoặc thêm mục mới |
| Thư viện mới | Thêm mục Dependencies |

---

## Ghi chú Figma

- Splash page ref: Figma node `38:1923`
- Khi implement từ Figma → ghi ref node ID vào comment đầu file.
