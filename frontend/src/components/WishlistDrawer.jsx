import React from "react";

import { Heart, ShoppingBag, Trash2, X } from "lucide-react";

export default function WishlistDrawer({
  wishlistItems,
  isOpen,
  onAddToCart,
  onClose,
  onRemoveItem,
  onViewProduct,
}) {
  return (
    <div
      className={`fixed inset-0 z-[80] transition ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <button
        className={`absolute inset-0 bg-black/45 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-label="Close wishlist"
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-soft transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-brand-red">Wishlist</p>
            <h2 className="font-display text-2xl font-black text-brand-ink">
              {wishlistItems.length} saved item{wishlistItems.length === 1 ? "" : "s"}
            </h2>
          </div>
          <button
            className="rounded-full p-2 hover:bg-stone-100"
            onClick={onClose}
            aria-label="Close wishlist"
          >
            <X size={24} />
          </button>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="grid flex-1 place-items-center px-6 text-center">
            <div>
              <Heart className="mx-auto text-brand-red" size={44} />
              <h3 className="mt-4 font-display text-2xl font-black">No saved products</h3>
              <p className="mt-2 text-stone-600">Tap the heart on a product to save it here.</p>
              <button
                onClick={onClose}
                className="mt-6 rounded-md bg-brand-red px-5 py-3 font-bold text-white"
              >
                Continue shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
            {wishlistItems.map((product) => (
              <article key={product._id} className="flex gap-4 border-b border-stone-100 pb-5">
                <button
                  onClick={() => {
                    onViewProduct(product);
                    onClose();
                  }}
                  className="h-24 w-24 shrink-0 overflow-hidden rounded-md bg-brand-soft"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-stone-500">{product.brand}</p>
                      <h3 className="font-bold leading-5 text-brand-ink">{product.name}</h3>
                      <p className="mt-1 text-sm text-stone-500">
                        Rs. {product.price}
                        <span className="ml-2 text-stone-400 line-through">Rs. {product.oldPrice}</span>
                      </p>
                    </div>
                    <button
                      className="rounded-full p-2 text-stone-500 hover:bg-stone-100 hover:text-brand-red"
                      onClick={() => onRemoveItem(product._id)}
                      aria-label={`Remove ${product.name} from wishlist`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-stone-300 px-4 py-2 text-sm font-bold text-brand-ink transition hover:border-brand-red hover:bg-brand-red hover:text-white"
                  >
                    Move to cart
                    <ShoppingBag size={18} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </aside>
    </div>
  );
}
