# ShopBoard React

ShopBoard: a one-page shop. A hero slider and a product list (with search, category and sort filters) show the products from the ShopBoard API.

## Stack

- Vite, React 19 and TypeScript (`strict`). Function components only. `motion` animates the hero slider.
- Prettier formats the code. oxlint checks it.
- husky + lint-staged run both on every commit.

## Commands

- `npm run dev`: start the dev server
- `npm run lint`: check the code
- `npm run format`: format every file
- `npm run format:check`: check the formatting without changing files
- `npm run build`: typecheck (`tsc -b`), then build for production

## Architecture: Feature-based

Code is organized by feature, not by file type. One folder per feature, one job per file.

```
src/
  components/              # SHARED UI of the whole project (not owned by one feature)
    ui/                    # small generic pieces: Icon, Modal, StatusPanel. shadcn/ui installs here later
    layout/                # page frame and page sections: Header, Hero
      Hero/                # a component with its own logic, types and css gets its own folder
  modules/<feature>/       # one folder per feature (products, cart)
    components/            # ALL React components of the feature, one file each (ProductCard.tsx)
    use<Name>.ts           # hooks of the feature (useProducts.ts)
    types.ts               # the feature's types. Types only, no code
    data.ts                # fixed data only
    api.ts                 # API paths, type guards for the reply, mapper (API names -> app types)
    logic.ts               # pure functions (search, sort, cart math). No React, no localStorage
    state.ts               # saved data in localStorage
    <feature>.css          # styles of the feature (tokens come from src/index.css)
  shared/                  # shared code that is not UI
    api/client.ts          # the API client. BASE_URL lives here, in one place
    money.ts               # formatPrice: cents -> "$89.00"
  App.tsx                  # composes components and features and passes data between them
  main.tsx                 # mounts <App />. No logic
public/                    # fonts, photos, logos: files served as they are
```

Examples: `src/modules/products/components/ProductCard.tsx` (a feature component),
`src/components/layout/Hero/Hero.tsx` (a page section, shared by the whole project).

Features today: `products` (API, list, filters) and `cart` (popup, localStorage).
Shared components today: `ui/` (Icon, Modal, StatusPanel) and `layout/` (Header, Hero).

Where does a component go?

- Used by one feature only, and it knows that feature's data: `modules/<feature>/components/`.
- A page section or the page frame (header, hero, footer, sidebar): `components/layout/`. A section is not a feature, even when it shows products.
- A generic piece with no business knowledge (button, dialog, icon, input, message): `components/ui/`.
- Components from a library like shadcn/ui: `components/ui/` (their `components.json` points to `src/components`). Never edit them for one feature; wrap them instead.

Rules:

- A feature owns its components, types and API calls. Components always go in the feature's `components/` folder, never loose in the feature root.
- One component per file, and the file is named after the component (`CartDialog.tsx`). Its CSS stays next to it (feature root for features, same folder for `components/`).
- A module never imports from another module. `App.tsx` passes data between them. Each module defines the types it needs itself (the cart has its own `CartProduct`).
- `components/` and `shared/` never import from `modules/`. A shared component gets its data as props and defines the types of those props itself (`Hero` has its own `HeroProduct`).
- Modules may import from `components/` and `shared/`. Nothing else.
- `logic.ts` is pure: no React, no DOM, no localStorage, no imports (except `import type` and the feature's own `data.ts`).
- `state.ts`: data read from localStorage is `unknown` until a type guard (like `isCart`) checks it. Reading is wrapped in `try/catch`, so broken text gives an empty value, never a crash. Every localStorage key starts with `shopboard-` and ends with a version (`shopboard-cart-v1`). Change the version when the saved shape changes.
- Components render. They don't do API math or parsing. Text from the API goes into JSX as text. Never `dangerouslySetInnerHTML`.
- Prices are whole numbers of cents everywhere in the code (the API sends `price_cents`). Only `formatPrice` turns cents into dollars, when the price is shown.

## Rules

1. Semantic HTML first (in JSX): header, nav, main, section, article, footer. One h1 per page.
2. Buttons are `<button>`, links are `<a href>`. Never a clickable div.
3. Every input has a `<label>`. Use native validation (required, type, minlength) before JavaScript.
4. Mobile-first CSS: base styles are for phones, then `min-width` media queries only. No `!important`.
5. Use `===`, `const` by default, `let` only when the value changes. Never `var`.
6. Reuse existing functions and components. Don't duplicate logic.
7. Don't change what I didn't ask for.
8. Write the types yourself (`Product`, `CartItem`, `Cart`). No `any`, no `as`, no `!`. Give every function parameter and return value a type. Props are typed with an `interface`.
9. Lists use `key={item.id}`, never the index.
10. A component that has several parts is split into small components in its folder (`Hero/HeroCopy.tsx`, `Hero/ThumbnailSelector.tsx`). The parent owns the state and passes data and callbacks down. No boolean props that switch a component's look: use separate components or `children`.
11. Hooks follow the rules of hooks. State lives in the lowest component that needs it. Data goes down as props, events come up as callbacks.
