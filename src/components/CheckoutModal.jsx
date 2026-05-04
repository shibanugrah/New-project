import React from "react";

import { CheckCircle2, CreditCard, MapPin, X } from "lucide-react";

export default function CheckoutModal({
  cartItems,
  isOpen,
  onClose,
  onPlaceOrder,
}) {
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "card",
  });
  const [isOrderPlaced, setIsOrderPlaced] = React.useState(false);
  const [orderId, setOrderId] = React.useState("");

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const deliveryFee = subtotal >= 1000 || subtotal === 0 ? 0 : 99;
  const total = subtotal + deliveryFee;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newOrderId = `SS-${Date.now().toString().slice(-6)}`;
    setOrderId(newOrderId);
    setIsOrderPlaced(true);
    onPlaceOrder({
      id: newOrderId,
      customer: formData,
      items: cartItems,
      placedAt: new Date().toISOString(),
      total,
      status: "Placed",
    });
  }

  function handleClose() {
    setIsOrderPlaced(false);
    setOrderId("");
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-black/50 px-4 py-6">
      <section className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-lg bg-white shadow-soft">
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-brand-red">Checkout</p>
            <h2 className="font-display text-2xl font-black text-brand-ink">Fake payment demo</h2>
          </div>
          <button
            className="rounded-full p-2 hover:bg-stone-100"
            onClick={handleClose}
            aria-label="Close checkout"
          >
            <X size={24} />
          </button>
        </div>

        {isOrderPlaced ? (
          <div className="px-5 py-12 text-center">
            <CheckCircle2 className="mx-auto text-green-600" size={58} />
            <h3 className="mt-5 font-display text-3xl font-black text-brand-ink">
              Order placed successfully
            </h3>
            <p className="mt-2 text-stone-600">
              Your fake payment was successful. Order ID: <span className="font-bold">{orderId}</span>
            </p>
            <button
              onClick={handleClose}
              className="mt-8 rounded-md bg-brand-red px-6 py-3 font-bold text-white"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-8 p-5 lg:grid-cols-[1fr_360px]">
            <div className="space-y-6">
              <div>
                <h3 className="flex items-center gap-2 font-display text-xl font-black">
                  <MapPin size={22} />
                  Delivery details
                </h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="rounded-md border border-stone-300 px-4 py-3 outline-none focus:border-brand-red"
                    placeholder="Full name"
                  />
                  <input
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="rounded-md border border-stone-300 px-4 py-3 outline-none focus:border-brand-red"
                    placeholder="Mobile number"
                  />
                  <input
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="rounded-md border border-stone-300 px-4 py-3 outline-none focus:border-brand-red sm:col-span-2"
                    placeholder="Address"
                  />
                  <input
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="rounded-md border border-stone-300 px-4 py-3 outline-none focus:border-brand-red"
                    placeholder="City"
                  />
                </div>
              </div>

              <div>
                <h3 className="flex items-center gap-2 font-display text-xl font-black">
                  <CreditCard size={22} />
                  Payment method
                </h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {["card", "upi", "cash"].map((method) => (
                    <label
                      key={method}
                      className={`cursor-pointer rounded-md border px-4 py-3 text-center font-bold capitalize ${
                        formData.paymentMethod === method
                          ? "border-brand-red bg-red-50 text-brand-red"
                          : "border-stone-200"
                      }`}
                    >
                      <input
                        checked={formData.paymentMethod === method}
                        className="sr-only"
                        name="paymentMethod"
                        onChange={handleChange}
                        type="radio"
                        value={method}
                      />
                      {method === "cash" ? "COD" : method}
                    </label>
                  ))}
                </div>
                <p className="mt-3 text-sm text-stone-600">
                  This is a project demo, so no real payment gateway is used.
                </p>
              </div>
            </div>

            <aside className="rounded-lg border border-stone-200 bg-stone-50 p-5">
              <h3 className="font-display text-xl font-black">Order summary</h3>
              <div className="mt-4 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold leading-5">{item.product.name}</p>
                      <p className="text-sm text-stone-500">
                        Qty {item.quantity} x Rs. {item.product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-3 border-t border-stone-200 pt-4 text-sm">
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
                className="mt-5 w-full rounded-md bg-brand-red px-5 py-3 font-bold text-white transition hover:bg-red-800"
                type="submit"
              >
                Pay Rs. {total}
              </button>
            </aside>
          </form>
        )}
      </section>
    </div>
  );
}
