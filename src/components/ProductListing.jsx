import React from "react";

import { useMemo, useState } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";
import ProductCard from "./ProductCard";
import { brands, categories, products, shoeTypes } from "../data/products";

const sortOptions = [
  { label: "Popularity", value: "popular" },
  { label: "Price: Low to High", value: "low" },
  { label: "Price: High to Low", value: "high" },
  { label: "Best Discount", value: "discount" },
];

function FilterButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md border px-4 py-2 text-sm font-bold transition ${
        active
          ? "border-brand-red bg-brand-red text-white"
          : "border-stone-200 bg-white text-brand-ink hover:border-brand-red"
      }`}
    >
      {label}
    </button>
  );
}

function CheckFilter({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-brand-ink">
      <input
        checked={checked}
        onChange={onChange}
        type="checkbox"
        className="h-4 w-4 rounded border-stone-300 accent-brand-red"
      />
      {label}
    </label>
  );
}

export default function ProductListing({
  isProductWishlisted,
  onAddToCart,
  onSelectProduct,
  onToggleWishlist,
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortBy, setSortBy] = useState("popular");

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
      const brandMatch = selectedBrand === "All" || product.brand === selectedBrand;
      const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(product.type);

      return categoryMatch && brandMatch && typeMatch;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "low") return a.price - b.price;
      if (sortBy === "high") return b.price - a.price;
      if (sortBy === "discount") return b.discount - a.discount;
      return a.id - b.id;
    });
  }, [selectedBrand, selectedCategory, selectedTypes, sortBy]);

  function toggleType(type) {
    setSelectedTypes((currentTypes) =>
      currentTypes.includes(type)
        ? currentTypes.filter((item) => item !== type)
        : [...currentTypes, type]
    );
  }

  return (
    <section id="products" className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand-red">
              <SlidersHorizontal size={18} />
              Product listing
            </p>
            <h2 className="mt-2 font-display text-3xl font-black text-brand-ink">
              Browse footwear products
            </h2>
            <p className="mt-2 text-stone-600">
              Sample JSON data today, MongoDB products API later.
            </p>
          </div>

          <label className="flex items-center gap-3 rounded-md border border-stone-200 bg-white px-4 py-3 text-sm font-semibold">
            Sort by
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="bg-transparent font-bold outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
          {["All", ...categories].map((category) => (
            <FilterButton
              key={category}
              label={category}
              active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            />
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-lg border border-stone-200 bg-stone-50 p-5 lg:sticky lg:top-28 lg:self-start">
            <div className="mb-5 flex items-center gap-2 border-b border-stone-200 pb-4">
              <Filter size={20} />
              <h3 className="font-display text-xl font-black">Filters</h3>
            </div>

            <div className="space-y-6">
              <div>
                <p className="mb-3 font-bold">Brand</p>
                <div className="space-y-3">
                  {["All", ...brands].map((brand) => (
                    <CheckFilter
                      key={brand}
                      label={brand}
                      checked={selectedBrand === brand}
                      onChange={() => setSelectedBrand(brand)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 font-bold">Shoe Type</p>
                <div className="space-y-3">
                  {shoeTypes.map((type) => (
                    <CheckFilter
                      key={type}
                      label={type}
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleType(type)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-stone-600">
                Showing {visibleProducts.length} of {products.length} products
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedBrand("All");
                  setSelectedTypes([]);
                  setSortBy("popular");
                }}
                className="text-sm font-bold text-brand-red"
              >
                Clear filters
              </button>
            </div>

            {visibleProducts.length > 0 ? (
              <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
                {visibleProducts.map((product) => (
                  <ProductCard
                    isWishlisted={isProductWishlisted(product.id)}
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    onViewProduct={onSelectProduct}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-stone-300 p-10 text-center">
                <h3 className="font-display text-2xl font-black">No products found</h3>
                <p className="mt-2 text-stone-600">Try clearing filters or selecting another category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
