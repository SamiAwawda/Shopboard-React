# ShopBoard React

## Architecture: Feature-based

Code is organized by feature, not by file type.

```
src/
  modules/<feature>/   # one folder per feature (e.g. products)
    api.ts             # API calls + mapper (API shape -> app type)
    types.ts           # types for this feature
    <Component>.tsx    # components used by this feature
  shared/              # reusable code with no feature knowledge
    api/               # API client (BASE_URL lives here, in one place)
    components/        # generic UI (Header, ...)
  App.tsx              # composes features
  main.tsx
```

Rules:

- A feature owns its components, types and API calls.
- `shared/` never imports from `modules/`.
- A feature does not import from another feature's internals.

## API

Base URL: https://shopboard-api.vercel.app (`GET /api/products`, `GET /api/products/:id`).
Keep `BASE_URL` only in `src/shared/api/client.ts`. The API uses its own names
(`title`, `price_cents`, `in_stock`); convert them once in a mapper (`toProduct`).

## Conventions

- TypeScript, function components, typed props via `interface`.
- Lists use `key={item.id}`, never the index.
- Commands: `npm run dev`, `npm run build`, `npm run lint`.
