# متجر سحر — Luxury Arabic eCommerce Store

A complete RTL Arabic eCommerce platform inspired by Dar Alamirat's structure and quality, branded as **سحر** (Sahar) for premium perfumes & cosmetics.

## Brand & Design

- **Name:** سحر
- **Palette:** Rose gold (#B76E79), cream (#FBF6F0), deep burgundy (#5C1A2B), soft blush accents, charcoal text
- **Typography:** Tajawal or Cairo (Arabic), elegant serif accents for headings
- **Direction:** Full RTL (`<html dir="rtl" lang="ar">`)
- **Feel:** Glassy, soft shadows, generous whitespace, smooth fade/scale animations, hover lifts on product cards
- **Responsive:** Mobile-first; bottom nav bar on mobile, sticky header on desktop

## Storefront Pages

1. **Home (`/`)**
   - Top promo strip (توصيل مجاني للطلبات فوق ١٩٩ ر.س)
   - Sticky header: logo سحر, search, account, wishlist, cart (with badge)
   - Hero slider (3 luxury banners with CTA)
   - Category grid (8 circular category tiles)
   - "الأكثر مبيعًا" carousel
   - Featured collection banner (split layout)
   - "وصل حديثًا" carousel
   - Brands marquee
   - Testimonials
   - Footer with links, payment icons, social, newsletter

2. **Category page (`/category/$slug`)** — sidebar filters (price, brand, rating), sort dropdown, grid/list toggle, pagination

3. **Product page (`/product/$slug`)** — image gallery with zoom, title, price, discount badge, variants (size/scent), qty, add to cart, wishlist, tabs (الوصف، المكونات، التقييمات، الشحن), related products

4. **Search (`/search`)** — query + filters; instant results

5. **Cart (`/cart`)** — line items, qty controls, coupon code, totals, checkout CTA

6. **Checkout (`/checkout`)** — address form, shipping method, payment method (cash on delivery / simulated card), order summary, place order → confirmation page

7. **Wishlist (`/wishlist`)** — saved items, move-to-cart

8. **Account area (`/account/*`)** — profile, addresses, orders list, order detail

9. **Auth (`/login`, `/register`, `/reset-password`)** — email/password + Google

10. **Static** — `/about`, `/contact`, `/policies/shipping`, `/policies/returns`, `/policies/privacy`

## Admin Dashboard (`/admin/*`)

Protected by admin role (separate `user_roles` table).

- Overview: revenue, orders, customers, top products
- Products: list, create, edit, delete, images, variants, inventory
- Categories: CRUD with images
- Orders: list, filter by status, view detail, update status (pending → processing → shipped → delivered)
- Customers: list, view orders
- Coupons: create discount codes
- Settings: store info, shipping zones

## Data Model

- `categories` (id, slug, name_ar, image, sort_order)
- `products` (id, slug, name_ar, description_ar, ingredients_ar, price, compare_price, stock, category_id, brand, rating, is_featured, is_new)
- `product_images` (id, product_id, url, sort_order)
- `product_variants` (id, product_id, name_ar, price_delta, stock)
- `profiles` (id → auth.users, full_name, phone)
- `addresses` (id, user_id, name, phone, city, district, street, is_default)
- `user_roles` (id, user_id, role enum: admin|customer)
- `wishlists` (user_id, product_id)
- `cart_items` (user_id, product_id, variant_id, qty) — guest cart in localStorage, merges on login
- `orders` (id, user_id, status, subtotal, shipping, discount, total, address snapshot, payment_method, created_at)
- `order_items` (order_id, product_id, name_ar snapshot, price snapshot, qty)
- `coupons` (code, type, value, min_total, expires_at, usage_limit)

All tables with RLS. `has_role()` security-definer function for admin checks.

## Seed Content (~40 products / 8 categories)

Categories: عطور نسائية، عطور رجالية، عناية بالبشرة، عناية بالشعر، مكياج، عناية بالجسم، أدوات تجميل، هدايا فاخرة. ~5 products each with Arabic names, descriptions, prices in SAR, placeholder luxury imagery.

## Features

- Arabic RTL across all components
- Full-text search with category/price/brand filters
- Persistent cart (DB for logged-in, localStorage for guests, merged on login)
- Wishlist sync
- Coupon codes at checkout
- Order confirmation + order tracking page
- Toast notifications (sonner)
- Smooth animations (fade-in, scale, slide)
- SEO `<head>` per route (title, description, og tags) in Arabic
- Lazy-loaded images, route-level code splitting

## Checkout

Simulated checkout: collects address, creates order in DB with `payment_method: cash_on_delivery` or `simulated_card`, marks paid instantly for card, shows confirmation. No real money movement.

## Technical Notes (for reference)

- **Stack:** TanStack Start (React 19, SSR) + Tailwind v4 + Lovable Cloud (Supabase: Postgres, Auth, Storage, RLS)
- Server functions (`createServerFn`) for cart/checkout/admin mutations
- `requireSupabaseAuth` middleware for protected actions
- Admin routes guarded by `_admin` layout checking `has_role(uid,'admin')`
- Images stored in Supabase Storage (`product-images` bucket, public read)
- Email/password + Google sign-in via Supabase Auth

## Out of Scope (v1)

- Real payment processing (can add Stripe later)
- Multi-language (Arabic only)
- Multi-currency (SAR only)
- Email notifications (can add via edge function later)

## Deployment

One-click via Lovable's Publish button → `.lovable.app` subdomain. Custom domain attachable from project settings after publish.

## Build Order

1. Design system (RTL, fonts, colors, tokens)
2. Database schema + RLS + seed data
3. Auth + account pages
4. Storefront (home, category, product, search)
5. Cart + wishlist + checkout
6. Admin dashboard
7. Polish: animations, SEO, responsive QA
