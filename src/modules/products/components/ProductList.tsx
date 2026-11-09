import { useState } from "react";
import Icon from "../../../components/ui/Icon";
import { ALL_CATEGORIES, DEFAULT_SORT } from "../data";
import { categoryNames, filterProducts, isSortDirection, sortByPrice } from "../logic";
import ProductCard from "./ProductCard";
import type { Product, SortDirection } from "../types";
import "../products.css";

interface ProductListProps {
  products: Product[];
  onAdd: (id: number) => void;
}

// The product list with simple filters on top: search, category buttons and a price sort.
export default function ProductList({ products, onAdd }: ProductListProps): React.JSX.Element {
  const [text, setText] = useState("");
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [direction, setDirection] = useState<SortDirection>(DEFAULT_SORT);

  const visible = sortByPrice(filterProducts(products, text, category), direction);

  return (
    <section className="product-list" id="shop" aria-labelledby="shop-title">
      <h2 id="shop-title">The everyday edit</h2>
      <div className="filters">
        <label className="search-field">
          <Icon name="search" size={20} />
          <span className="sr-only">Search products</span>
          <input
            type="search"
            placeholder="Find your next favorite…"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </label>
        <div className="category-filters" role="group" aria-label="Filter by category">
          {categoryNames(products).map((name) => (
            <button
              key={name}
              type="button"
              className={name === category ? "selected" : ""}
              aria-pressed={name === category}
              onClick={() => setCategory(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <label className="sort-field">
          <span>Sort by</span>
          <select
            value={direction}
            onChange={(event) => {
              if (isSortDirection(event.target.value)) setDirection(event.target.value);
            }}
          >
            <option value="default">Featured</option>
            <option value="asc">Price: low to high</option>
            <option value="desc">Price: high to low</option>
          </select>
        </label>
      </div>
      {visible.length === 0 ? (
        <p className="list-message" role="status">
          No products match your search.
        </p>
      ) : (
        <ul className="product-grid">
          {visible.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} onAdd={onAdd} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
