# Debug lab log

The five bugs of [shopboard-api.vercel.app/debug-lab](https://shopboard-api.vercel.app/debug-lab).
The code compiles and `tsc` shows no errors; each bug only shows when the app runs.

## Bug 1: list without keys

- **What I saw:** right after loading, the Console shows `Each child in a list should have a unique "key" prop. Check the render method of CategoryChips.`
- **Component:** `CategoryChips`
- **How I found it:** Console warning. In the Components tab the chips have no `key` next to their names.
- **Cause:** `categories.map((category) => <span className="chip">{category}</span>)` gives the `<span>` no `key`, so React can't tell the chips apart between renders.
- **Fix:** use the category name, which is unique in the list:
  `<span key={category} className="chip">{category}</span>`

## Bug 2: a "0" nobody wrote

- **What I saw:** the sold-out cards (Mini Crossbody Bag, Wool Scarf) show a lone `0` under the price, and the empty cart shows a `0` under its title.
- **Component:** `StockNote` and `CartPanel`
- **How I found it:** looking at the page, then the props in the Components tab: `StockNote` has `stock: 0`.
- **Cause:** `{stock && <span>…</span>}` and `{cart.length && <ul>…</ul>}`. When the left side is `0`, `&&` returns `0`, and React renders the number `0` as text (it only skips `false`, `null` and `undefined`).
- **Fix:** make the left side a real boolean: `{stock > 0 && <span>Only {stock} left</span>}` and `{cart.length > 0 && <ul>…</ul>}`.

## Bug 3: the heart moves to another product

- **What I saw:** I saved (♡) the Leather Tote Bag, then sorted by "Price: low to high". The heart was now on the Wool Scarf, the product that moved into the first place.
- **Component:** `ProductList` (the state lives in `ProductCard`)
- **How I found it:** keys in the Components tab: each `ProductCard` has `key="0"`, `key="1"`… The `saved` state stayed with `key="0"`, not with the product.
- **Cause:** `shown.map((product, index) => <ProductCard key={index} … />)`. The key is the position, so after sorting React keeps the first card's state (`saved: true`) for whatever product is now first.
- **Fix:** key by the product's id: `<ProductCard key={product.id} … />`.

## Bug 4: "Featured" is not the first order anymore

- **What I saw:** after sorting by price and going back to "Featured", the products stay in price order. The order from the first load is gone.
- **Component:** `ProductList`
- **How I found it:** Sources tab, `ProductList.tsx`: the sort line.
- **Cause:** `products.sort(...)` sorts the array in place. `products` is the shared `PRODUCTS` array, so sorting changes the original data, and "Featured" now shows the changed array.
- **Fix:** sort a copy and leave the props alone: `[...products].sort((a, b) => a.price - b.price)` (or `products.toSorted(...)`).

## Bug 5: the + button does nothing, then jumps

- **What I saw:** I added the Canvas Backpack and clicked + twice. The row still said `× 1`, the total stayed `$49` and the header said `Cart (1)`. Then I added White Sneakers and the backpack suddenly showed `× 3` (total $222, `Cart (4)`).
- **Component:** `CartRow` (and `App`'s `onChange`)
- **How I found it:** "Highlight updates when components render" in the Components tab: clicking + renders nothing. In Sources, `increase()` changes `item.qty` directly.
- **Cause:** `item.qty = item.qty + 1` changes the state object in place, and `onChange={() => setCart(cart)}` sets the same array again. React compares the old and new state with `Object.is`, sees the same array and skips the render. The next real change (adding sneakers) renders the changed objects, so the hidden `3` appears.
- **Fix:** never change state in place; send an action up and build a new array in `App`:
  `onIncrease={(id) => setCart(cart.map((item) => item.id === id ? { ...item, qty: item.qty + 1 } : item))}`
  and in `CartRow`: `onClick={() => onIncrease(item.id)}`.
