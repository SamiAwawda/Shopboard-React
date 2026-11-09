# ShopBoard React

ShopBoard: a small multi-page shop. Products come from the ShopBoard API (`shared/api/client.ts`); the cart is saved in localStorage.

Routes (all inside `pages/RootLayout.tsx`, each page loaded with `lazy()`):

| Path            | Page                                       |
| --------------- | ------------------------------------------ |
| `/`             | `HomePage`: hero slider                    |
| `/shop`         | `ShopPage`: product list with filters      |
| `/products/:id` | `ProductPage`: one product, by id from API |
| `/cart`         | `CartPage`                                 |
| `/checkout`     | `CheckoutPage`: form, then thank-you       |
| `*`             | `NotFoundPage` (404)                       |

## Stack

- Vite, React 19, TypeScript (strict). Function components only.
- `react-router` (data router: `createBrowserRouter`), `react-error-boundary`, `motion` (hero slider).
- Checkout: `react-hook-form` + `zod` (via `@hookform/resolvers`) + shadcn/ui (`Button`, `Input`, `Label`).
- Tailwind v4 serves only the shadcn/ui components. `index.css` imports it without preflight and maps shadcn's colors to the ShopBoard tokens. Everything else is plain CSS.
- The pre-commit hook runs lint-staged (oxlint with `--deny-warnings`, Prettier) and `npm run typecheck`.

To see the loading, error and empty states, set `BASE_URL` in `shared/api/client.ts` to `…vercel.app/delay/3000`, `…/fail/500` or `…/empty`, then set it back.

## Architecture: feature-based

```
src/
  pages/                   # one file per route + its data part (ShopPage + ShopCatalog). Pages compose modules
  components/              # shared UI of the whole project (owned by no feature)
    ui/                    # generic pieces: Icon, StatusPanel, ErrorPanel, DataBoundary, TextField + shadcn files
    layout/                # page frame and page sections: Header, Footer, NotFound, Hero/
  modules/<feature>/       # products, cart, checkout
    components/            # every React component of the feature, one file each
    use<Name>.ts           # hooks of the feature
    types.ts               # types only, no code
    data.ts                # fixed data only
    api.ts                 # API paths, type guards, mapper (API names -> app types), request cache
    logic.ts               # pure functions
    state.ts               # localStorage
    context.ts             # the feature's React context (cart)
    schema.ts              # the feature's Zod schema and the types inferred from it (checkout)
    <feature>.css
  shared/                  # shared code that is not UI: api/client.ts, money.ts, cn.ts (shadcn class helper)
  App.tsx                  # the router and the providers
```

Where a component goes:

- Knows one feature's data: `modules/<feature>/components/`.
- Page frame or a page section (header, hero, footer, not found): `components/layout/`. A section is not a feature, even when it shows products.
- Generic, no business knowledge: `components/ui/`.
- shadcn/ui files: `components/ui/` (lowercase, as shadcn names them). Wrap them (`TextField` wraps `Label` + `Input`); keep their code as shadcn ships it.
- Reads data and joins modules for one route: `pages/`.

Imports:

- `pages/` may import from `modules/`, `components/` and `shared/`. This is where modules meet.
- A module imports from `components/` and `shared/` only, never from another module. Each module defines the types it needs (`cart` has its own `CartProduct`, `Hero` its own `HeroProduct`).
- `components/` and `shared/` never import from `modules/` or `pages/`.

## State

- The cart is the only shared state. It lives in `CartProvider` (Context + `useReducer`); the lines are its only state. Components read it with `useCart()` and change it only through its actions (`add`, `setQuantity`, `remove`, `clear`).
- One owner, one copy. Totals, counts and filtered lists are worked out on each render, never stored.
- State that one component needs stays in that component (filters in `ProductList`, the selected slide in `Carousel`, the customer name in `CheckoutPage`).
- A cart line keeps the name, price and photo the shopper picked, so `/cart` and `/checkout` need no API call.

## Data loading

- Products load with `use()` on a promise kept in `products/api.ts` (`loadProducts`, `loadProduct`). Each request is made once; `forgetProductRequests()` drops them so "Try again" asks again.
- The part of a page that reads data sits inside `DataBoundary` (Suspense + error boundary with "Try again"). The page title, header and cart stay outside it, so they keep working while data loads or fails.
- Every list that reads data handles empty ("There are no products yet") and, with filters, no match ("No products match your search").
- Effects are for syncing with something outside React (localStorage, window keys, timers). Data loading uses `use()`.

## Forms

- One Zod schema per form in `schema.ts`; the form's types are `z.infer` of it. Every rule and every message lives in the schema.
- `useForm` with `zodResolver`, `mode: "onTouched"`. The form has `noValidate` so the schema's messages show; inputs still get `type`, `autoComplete` and `required`.
- Each field is a `TextField`: a `<label>`, the input, and the error linked with `aria-describedby`.

## Styles

- Tokens (color, radius, shadow, duration) live in `:root` in `src/index.css`. Rules use a token, or add one.
- Mobile-first: base styles are for phones, then `min-width` queries only (481, 761, 1051, 1450px). No `!important`.
- Element base rules sit in `@layer base`, so Tailwind utilities on shadcn components can override them.
- Product photos: `public/products/<slug>-hero|card|thumb.webp`, slug from the API title (`Leather Tote Bag` -> `leather-tote-bag`). A product without a look in `products/data.ts` shows `placeholder.svg`.

## Rules

1. Semantic HTML: header, nav, main, section, article, aside, footer. One h1 per page.
2. Buttons are `<button>`. Links are `<Link to>` inside the app, `<a href>` outside it.
3. `===`, `const` by default, `let` only when the value changes.
4. Reuse existing functions and components. One meaning, one place.
5. Write the types yourself. Every function parameter and return value has a type. Props are an `interface`. Data from outside (API, localStorage) is `unknown` until a type guard checks it.
6. Prices are whole cents everywhere. Only `formatPrice` turns them into dollars, when shown.
7. Text from the API goes into JSX as text.
8. Components render. Math, parsing and filtering live in `logic.ts`.
9. localStorage keys start with `shopboard-` and end with a version (`shopboard-cart-v1`). Bump the version when the saved shape changes.
10. Change only what the task asks for.

## Rules from our mistakes

Each rule comes from a bug we made or found. Follow the rule; the reason is there so you can judge new cases.

1. **Key every list item by an id from the data** (`key={product.id}`, or the first product's id for a page dot). _Why:_ the hero's page dots used the index, and in the Debug Lab an index key moved a saved heart to another product after sorting.
2. **Treat props and state as read-only: copy, then change** (`[...list].sort(...)`, `lines.map(line => ({ ...line, quantity }))`). _Why:_ in the Debug Lab `products.sort()` destroyed the "Featured" order, and `item.qty++` plus `setCart(cart)` gave React the same array, so nothing re-rendered.
3. **Give `&&` a real boolean** (`stock > 0 && …`, `cart.length > 0 && …`). _Why:_ `0 && …` renders a stray "0" on the page (Debug Lab).
4. **Pass a ready element instead of passing callbacks down** (`children`, or `renderAction(product)` for lists). _Why:_ `canAdd`/`onAdd` went `App -> Hero -> Carousel -> HeroCopy -> BuyButton` and two of those never used them.
5. **Load data with `use()` inside a `DataBoundary`**. _Why:_ `useProducts` fetched in a `useEffect` with a status union; Suspense and error boundaries replaced all of it.
6. **Show only real data.** _Why:_ `data.ts` once invented "old prices" for a sale the API never had.
7. **Prove a guard works by tripping it.** _Why:_ the lint config never had the `any`/`as`/`!` rules on: a test file with all three passed lint. Now the hook rejects a commit with any of them.
8. **Before `shadcn add`, check `components.json` aliases and `paths` in the root `tsconfig.json`.** _Why:_ without them shadcn wrote a literal `@/` folder and installed an unrelated npm package named `cn`.
