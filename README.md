# ShopBoard React

A small multi-page shop built with React 19 and TypeScript. Products come from the
[ShopBoard API](https://shopboard-api.vercel.app); the cart is saved in the browser (localStorage)
and works on every page.

## Run it

```bash
npm install
npm run dev           # dev server
npm run build         # typecheck, then production build
npm run typecheck     # tsc only
npm run lint          # oxlint, fails on any warning
npm run format:check  # Prettier check
```

A pre-commit hook (husky + lint-staged) runs oxlint and Prettier on the staged files, then the
typecheck. A commit with `any`, `as` or `!` is rejected.

## Routes

Every page renders inside `RootLayout` (header, footer, cart count) and is downloaded only the first
time it opens (`React.lazy`).

| Path            | Page           | What it shows                                             |
| --------------- | -------------- | --------------------------------------------------------- |
| `/`             | `HomePage`     | Hero slider with the products and a "Buy now" button      |
| `/shop`         | `ShopPage`     | All products with search, category filter and price sort  |
| `/products/:id` | `ProductPage`  | One product, loaded from `/api/products/:id`              |
| `/cart`         | `CartPage`     | The cart: quantities, remove, subtotal, link to checkout  |
| `/checkout`     | `CheckoutPage` | Checkout form and order summary, then a thank-you message |
| `*`             | `NotFoundPage` | 404 for any other address                                 |

## Component tree

Props are in `{ }`. **State** and **reads** show where each component gets its data.

```
App
└─ MotionConfig {reducedMotion}                      (motion: respects "reduce motion")
   └─ CartProvider {children}                        STATE: lines (useReducer), saved to localStorage
      └─ RouterProvider {router}
         └─ RootLayout                               reads: cart summary (useCart)
            ├─ Header {title, links, cartCount}
            │  └─ Icon {name, size}
            ├─ Suspense {fallback}                   while a page's code downloads
            │  └─ <the page of the current route, below>
            └─ Footer {start, end}

HomePage
└─ DataBoundary {loadingMessage, errorMessage, onRetry, children}
   ├─ StatusPanel {children}                         while loading
   ├─ ErrorPanel {message, detail, onRetry}          if loading fails
   └─ HomeHero                                       reads: products (useProducts → use())
      ├─ StatusPanel {children}                      if there are no products
      └─ Hero {products, renderAction}
         └─ Carousel {products, first, renderAction} STATE: selection (index, direction)
            ├─ HeroCopy {product, children}
            │  └─ BuyNowButton {product, inStock}    STATE: addedId · reads: cart actions
            ├─ ProductStage {product, direction, onStep}
            ├─ ThumbnailSelector {products, page, selectedId, onSelect}
            └─ HeroFooter {products, index, page, onSelect}

ShopPage
└─ DataBoundary {…}
   └─ ShopCatalog                                    reads: products (useProducts)
      ├─ StatusPanel {children}                      if there are no products
      └─ ProductList {products, renderAction}        STATE: text, category, direction (filters)
         └─ ProductCard {product, children}          (one per product, key = product.id)
            └─ AddToCartButton {product}             reads: cart actions

ProductPage                                          reads: id from the address (useParams)
├─ NotFound {title, message}                         if the id is not a number
└─ DataBoundary {…} key=id
   └─ ProductSection {id}                            reads: one product (useProduct → use())
      ├─ NotFound {title, message}                   if the API answers 404
      └─ ProductDetails {product, children}
         └─ BuyNowButton {product, inStock}

CartPage
└─ CartView                                          reads: cart (useCart)
   ├─ EmptyCart                                      if the cart is empty
   └─ CartItemRow {line}                             (one per line, key = line.id) · reads: cart actions

CheckoutPage                                         STATE: customerName · reads: cart lines, clear
├─ OrderConfirmation {name}                          after the order is placed
├─ EmptyCart                                         if the cart is empty
├─ CheckoutForm {onSubmit}                           form values and errors: react-hook-form (useForm)
│  ├─ TextField {name, label, error, …input props}   (6 fields)
│  │  ├─ Label (shadcn/ui)
│  │  └─ Input (shadcn/ui)
│  └─ Button (shadcn/ui)
└─ OrderSummary                                      reads: cart (useCart)

NotFoundPage
└─ NotFound {title, message}
```

`Icon {name, size}` is used inside many of these; it is shown once under `Header`.

## Who owns the state

| State                           | Owner                              | Why there                                                   |
| ------------------------------- | ---------------------------------- | ----------------------------------------------------------- |
| Cart lines                      | `CartProvider`                     | Every page needs the cart (header count, cart, checkout)    |
| Search text, category, sort     | `ProductList`                      | Only the product list uses them                             |
| Selected slide and direction    | `Carousel`                         | Only the hero uses it                                       |
| "Added to cart" message         | `BuyNowButton`                     | Only that button shows it                                   |
| Checkout form values and errors | `CheckoutForm` (`useForm`)         | Only the form uses them                                     |
| Customer name after the order   | `CheckoutPage`                     | It switches the page from the form to the thank-you message |
| Products from the API           | Request cache in `products/api.ts` | Server data, read with `use()`; not React state             |

Everything else is worked out from these on each render: the cart count and subtotal
(`summarize`), the visible products (`filterProducts` + `sortByPrice`), the category list.

Components change the cart only through the actions `useCart()` returns: `add`, `setQuantity`,
`remove` and `clear`. Product cards and the hero get their cart button from the page as an element
(`children` / `renderAction`), so no component passes cart callbacks it doesn't use.

## Loading, errors and empty states

- **Loading:** the part of a page that needs data is wrapped in `DataBoundary` (Suspense + error
  boundary). Only that part shows "Loading…"; the header, page title and cart keep working.
- **Error:** the same boundary shows the error with a **Try again** button, which drops the failed
  request and asks the API again.
- **Empty:** "There are no products yet" when the API sends an empty list.
- **No match:** "No products match your search" when the filters hide every product.
- **Not found:** unknown pages and unknown product ids show a not-found message.

To try them, set `BASE_URL` in `src/shared/api/client.ts` to
`https://shopboard-api.vercel.app/delay/3000`, `…/fail/500` or `…/empty`.

## Folder structure

```
src/
  pages/        one file per route, plus the part that reads its data (ShopPage + ShopCatalog)
  components/   shared UI: ui/ (generic pieces and shadcn/ui), layout/ (Header, Footer, Hero, NotFound)
  modules/      features: products, cart, checkout (components, hooks, types, api, logic, styles)
  shared/       API client, formatPrice, cn
  App.tsx       router and providers
```

The rules for where each file goes are in [CLAUDE.md](CLAUDE.md).
