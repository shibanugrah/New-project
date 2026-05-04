import React from "react";

import { Heart, ShoppingBag, Star, Truck } from "lucide-react";
import ProductCard from "./ProductCard";
import { getRecommendedProducts } from "../services/productService";

const colorClassNames = {
  Black: "bg-black",
  White: "bg-white",
  Brown: "bg-amber-900",
  Tan: "bg-amber-300",
  Blue: "bg-blue-600",
  Red: "bg-red-600",
  Wine: "bg-red-900",
};

export default function ProductDetail({ product, onSelectProduct }) {
  const recommendedProducts = getRecommendedProducts(product);

  return (
    <section id="product-detail" className="bg-stone-50 py-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-wide text-brand-red">Product detail</p>
          <h2 className="mt-2 font-display text-3xl font-black text-brand-ink">
            {product.name}
          </h2>
        </div>

        <div className="grid gap-10 rounded-lg bg-white p-5 shadow-soft lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
          <div className="overflow-hidden rounded-lg bg-brand-soft">
            <img
              className="aspect-[4/3] h-full w-full object-cover"
              src={product.image}
              alt={product.name}
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-brand-red px-3 py-1 text-sm font-bold text-white">
                {product.discount}% OFF
              </span>
              <span className="rounded-full bg-stone-100 px-3 py-1 text-sm font-bold text-brand-ink">
                {product.category}
              </span>
              <span className="rounded-full bg-stone-100 px-3 py-1 text-sm font-bold text-brand-ink">
                {product.type}
              </span>
            </div>

            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-stone-500">
              {product.brand}
            </p>
            <h3 className="mt-1 font-display text-4xl font-black leading-tight text-brand-ink">
              {product.name}
            </h3>
            <p className="mt-4 leading-7 text-stone-600">{product.description}</p>

            <div className="mt-5 flex items-center gap-2">
              <span className="text-3xl font-black text-brand-dark">Rs. {product.price}</span>
              <span className="text-lg text-stone-400 line-through">Rs. {product.oldPrice}</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-green-700">Inclusive of all taxes</p>

            <div className="mt-7">
              <p className="mb-3 font-bold">Select size</p>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className="grid h-12 w-12 place-items-center rounded-full border border-stone-300 font-bold transition hover:border-brand-red hover:text-brand-red"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <p className="mb-3 font-bold">Available colors</p>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-2 text-sm font-semibold"
                  >
                    <span
                      className={`h-5 w-5 rounded-full border border-stone-300 ${
                        colorClassNames[color] || "bg-stone-300"
                      }`}
                    />
                    {color}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button className="flex items-center justify-center gap-2 rounded-md bg-brand-red px-5 py-3 font-bold text-white transition hover:bg-red-800">
                Add to cart
                <ShoppingBag size={20} />
              </button>
              <button className="flex items-center justify-center gap-2 rounded-md border border-stone-300 px-5 py-3 font-bold text-brand-ink transition hover:border-brand-red hover:text-brand-red">
                Wishlist
                <Heart size={20} />
              </button>
            </div>

            <div className="mt-8 grid gap-4 border-t border-stone-200 pt-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Truck className="text-brand-red" size={24} />
                <div>
                  <p className="font-bold">Delivery</p>
                  <p className="text-sm text-stone-600">Free shipping above Rs. 1000</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Star className="text-brand-red" size={24} />
                <div>
                  <p className="font-bold">Recommendation ready</p>
                  <p className="text-sm text-stone-600">Based on category, type, and brand</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {recommendedProducts.length > 0 && (
          <div className="mt-12">
            <h3 className="font-display text-2xl font-black text-brand-ink">Similar products</h3>
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {recommendedProducts.map((recommendedProduct) => (
                <ProductCard
                  key={recommendedProduct.id}
                  product={recommendedProduct}
                  onViewProduct={onSelectProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
