import React from "react";

import { Search, X } from "lucide-react";
import ProductCard from "./ProductCard";

export default function SearchOverlay({
  isOpen,
  isProductWishlisted,
  onAddToCart,
  onClose,
  onSelectProduct,
  onToggleWishlist,
  products,
}) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const matchingProducts = products.filter((product) => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return true;

    return [product.name, product.brand, product.category, product.type]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] bg-white">
      <div className="mx-auto flex h-full max-w-7xl flex-col px-4 py-5 lg:px-8">
        <div className="flex items-center justify-between gap-4 border-b border-stone-200 pb-5">
          <div className="flex min-w-0 flex-1 items-center gap-3 rounded-md bg-stone-100 px-4 py-3">
            <Search size={22} />
            <input
              autoFocus
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full bg-transparent text-lg font-semibold outline-none placeholder:text-stone-500"
              placeholder="Search shoes, brands, categories"
              type="search"
            />
          </div>
          <button className="rounded-full p-2 hover:bg-stone-100" onClick={onClose} aria-label="Close search">
            <X size={26} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="font-display text-2xl font-black">Search results</h2>
            <p className="text-sm font-semibold text-stone-600">
              {matchingProducts.length} product{matchingProducts.length === 1 ? "" : "s"}
            </p>
          </div>

          {matchingProducts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {matchingProducts.map((product) => (
                <ProductCard
                  isWishlisted={isProductWishlisted(product._id)}
                  key={product._id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  onViewProduct={(selectedProduct) => {
                    onSelectProduct(selectedProduct);
                    onClose();
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-stone-300 p-10 text-center">
              <h3 className="font-display text-2xl font-black">No matches found</h3>
              <p className="mt-2 text-stone-600">Try sneakers, Metro, Men, Women, or Sports.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
