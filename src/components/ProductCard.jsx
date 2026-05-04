import React from "react";

import { Heart, ShoppingBag } from "lucide-react";

export default function ProductCard({ product, onViewProduct }) {
  return (
    <article className="group bg-white">
      <div className="relative overflow-hidden rounded-lg bg-brand-soft">
        <span className="absolute left-0 top-0 z-10 bg-brand-red px-3 py-1 text-sm font-bold text-white">
          {product.discount}% OFF
        </span>
        <button
          className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 shadow-sm transition hover:text-brand-red"
          aria-label={`Add ${product.name} to wishlist`}
        >
          <Heart size={20} />
        </button>
        <button onClick={() => onViewProduct?.(product)} className="block w-full text-left">
          <img
            className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
            src={product.image}
            alt={product.name}
          />
        </button>
      </div>

      <div className="pt-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-stone-500">{product.brand}</p>
          <p className="text-xs font-semibold uppercase text-stone-400">{product.category}</p>
        </div>
        <h3 className="mt-1 min-h-12 text-lg font-bold leading-6 text-brand-ink">{product.name}</h3>
        <p className="text-sm text-stone-500">
          Size: {product.sizes.join(", ")}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-black text-brand-dark">Rs. {product.price}</span>
          <span className="text-sm text-stone-400 line-through">Rs. {product.oldPrice}</span>
        </div>
        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-stone-300 px-4 py-2 text-sm font-bold text-brand-ink transition hover:border-brand-red hover:bg-brand-red hover:text-white">
          Add to cart
          <ShoppingBag size={18} />
        </button>
        <button
          onClick={() => onViewProduct?.(product)}
          className="mt-2 w-full text-sm font-bold text-brand-red"
        >
          View details
        </button>
      </div>
    </article>
  );
}
