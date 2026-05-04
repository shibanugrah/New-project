import React from "react";

import { CheckCircle2, Clock3, PackageCheck, ShoppingBag, Truck, X } from "lucide-react";

const trackingSteps = ["Placed", "Packed", "Shipped", "Delivered"];

const statusIconMap = {
  Placed: CheckCircle2,
  Packed: PackageCheck,
  Shipped: Truck,
  Delivered: CheckCircle2,
};

function getTrackingStatus(orderIndex) {
  return trackingSteps[Math.min(orderIndex, trackingSteps.length - 1)];
}

export default function OrderHistoryDrawer({ isOpen, onClose, orders }) {
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
        aria-label="Close order history"
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-2xl flex-col bg-white shadow-soft transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-brand-red">Orders</p>
            <h2 className="font-display text-2xl font-black text-brand-ink">
              Order history & tracking
            </h2>
          </div>
          <button
            className="rounded-full p-2 hover:bg-stone-100"
            onClick={onClose}
            aria-label="Close order history"
          >
            <X size={24} />
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="grid flex-1 place-items-center px-6 text-center">
            <div>
              <ShoppingBag className="mx-auto text-brand-red" size={44} />
              <h3 className="mt-4 font-display text-2xl font-black">No orders yet</h3>
              <p className="mt-2 text-stone-600">
                Complete checkout once and your order tracking will appear here.
              </p>
              <button
                onClick={onClose}
                className="mt-6 rounded-md bg-brand-red px-5 py-3 font-bold text-white"
              >
                Continue shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
            {orders.map((order, orderIndex) => {
              const currentStatus = getTrackingStatus(orderIndex);
              const currentStepIndex = trackingSteps.indexOf(currentStatus);

              return (
                <article key={order.id} className="rounded-lg border border-stone-200 p-5">
                  <div className="flex flex-col gap-3 border-b border-stone-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-stone-500">Order ID</p>
                      <h3 className="font-display text-xl font-black text-brand-ink">{order.id}</h3>
                    </div>
                    <div className="rounded-md bg-red-50 px-3 py-2 text-sm font-bold text-brand-red">
                      {currentStatus}
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-semibold text-stone-500">Placed on</p>
                      <p className="font-bold">
                        {order.placedAt
                          ? new Date(order.placedAt).toLocaleDateString()
                          : "Today"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-500">Payment</p>
                      <p className="font-bold capitalize">
                        {order.customer?.paymentMethod === "cash"
                          ? "COD"
                          : order.customer?.paymentMethod || "Fake payment"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-500">Customer</p>
                      <p className="font-bold">{order.customer?.name || "Demo User"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-500">Total</p>
                      <p className="font-black">Rs. {order.total}</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {order.items.map((item) => {
                      const product = item.product || item;

                      return (
                      <div key={product._id || product.productId || product.name} className="flex gap-3 rounded-md bg-stone-50 p-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-16 w-16 rounded-md object-cover"
                        />
                        <div className="min-w-0">
                          <p className="font-bold leading-5">{product.name}</p>
                          <p className="text-sm text-stone-500">
                            Qty {item.quantity} x Rs. {product.price}
                          </p>
                        </div>
                      </div>
                    );
                    })}
                  </div>

                  <div className="mt-6">
                    <p className="mb-4 font-bold">Tracking</p>
                    <div className="grid gap-3 sm:grid-cols-4">
                      {trackingSteps.map((step, stepIndex) => {
                        const StepIcon = statusIconMap[step] || Clock3;
                        const isComplete = stepIndex <= currentStepIndex;

                        return (
                          <div
                            key={step}
                            className={`rounded-md border px-3 py-4 text-center ${
                              isComplete
                                ? "border-brand-red bg-red-50 text-brand-red"
                                : "border-stone-200 text-stone-400"
                            }`}
                          >
                            <StepIcon className="mx-auto" size={22} />
                            <p className="mt-2 text-sm font-bold">{step}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </aside>
    </div>
  );
}
