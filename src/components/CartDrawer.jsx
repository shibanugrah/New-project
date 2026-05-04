import React from "react";

import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

export default function CartDrawer({
  cartItems,
  isOpen,
  onClose,
  onCheckout,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
}) {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const deliveryFee = subtotal >= 1000 || subtotal === 0 ? 0 : 99;
  const total = subtotal + deliveryFee;

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
        aria-label="Close cart"
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-soft transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-brand-red">Shopping cart</p>
            <h2 className="font-display text-2xl font-black text-brand-ink">
              {cartItems.length} item{cartItems.length === 1 ? "" : "s"}
            </h2>
          </div>
          <button
            className="rounded-full p-2 hover:bg-stone-100"
            onClick={onClose}
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="grid flex-1 place-items-center px-6 text-center">
            <div>
              <ShoppingBag className="mx-auto text-brand-red" size={44} />
              <h3 className="mt-4 font-display text-2xl font-black">Your cart is empty</h3>
              <p className="mt-2 text-stone-600">Add products from the listing to see them here.</p>
              <button
                onClick={onClose}
                className="mt-6 rounded-md bg-brand-red px-5 py-3 font-bold text-white"
              >
                Continue shopping
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
              {cartItems.map((item) => (
                <article key={item.product.id} className="flex gap-4 border-b border-stone-100 pb-5">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-24 w-24 rounded-md bg-brand-soft object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-stone-500">{item.product.brand}</p>
                        <h3 className="font-bold leading-5 text-brand-ink">{item.product.name}</h3>
                        <p className="mt-1 text-sm text-stone-500">
                          Rs. {item.product.price} each
                        </p>
                      </div>
                      <button
                        className="rounded-full p-2 text-stone-500 hover:bg-stone-100 hover:text-brand-red"
                        onClick={() => onRemoveItem(item.product.id)}
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="flex items-center rounded-md border border-stone-200">
                        <button
                          className="p-2 hover:bg-stone-100"
                          onClick={() => onDecreaseQuantity(item.product.id)}
                          aria-label={`Decrease ${item.product.name} quantity`}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center font-bold">{item.quantity}</span>
                        <button
                          className="p-2 hover:bg-stone-100"
                          onClick={() => onIncreaseQuantity(item.product.id)}
                          aria-label={`Increase ${item.product.name} quantity`}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <p className="font-black">Rs. {item.product.price * item.quantity}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="border-t border-stone-200 p-5">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-600">Subtotal</span>
                  <span className="font-bold">Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Delivery</span>
                  <span className="font-bold">{deliveryFee === 0 ? "Free" : `Rs. ${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between border-t border-stone-200 pt-3 text-lg">
                  <span className="font-black">Total</span>
                  <span className="font-black">Rs. {total}</span>
                </div>
              </div>
              <button
                onClick={onCheckout}
                className="mt-5 w-full rounded-md bg-brand-red px-5 py-3 font-bold text-white transition hover:bg-red-800"
              >
                Proceed to checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
