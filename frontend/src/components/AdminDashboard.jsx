import React from "react";

import { Edit3, PackageCheck, Plus, Trash2, X } from "lucide-react";

const emptyProduct = {
  name: "",
  brand: "",
  category: "Men",
  type: "",
  price: "",
  oldPrice: "",
  discount: "",
  sizes: "7, 8, 9",
  colors: "Black",
  description: "",
  image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
};

function normalizeProduct(formData, productId) {
  return {
    ...formData,
    ...(productId ? { _id: productId } : {}),
    price: Number(formData.price),
    oldPrice: Number(formData.oldPrice),
    discount: Number(formData.discount),
    sizes: String(formData.sizes)
      .split(",")
      .map((size) => Number(size.trim()))
      .filter(Boolean),
    colors: String(formData.colors)
      .split(",")
      .map((color) => color.trim())
      .filter(Boolean),
  };
}

export default function AdminDashboard({
  isOpen,
  onClose,
  onCreateProduct,
  onDeleteProduct,
  onUpdateProduct,
  orders,
  products,
}) {
  const [editingProduct, setEditingProduct] = React.useState(null);
  const [formData, setFormData] = React.useState(emptyProduct);

  function startAddProduct() {
    setEditingProduct(null);
    setFormData(emptyProduct);
  }

  function startEditProduct(product) {
    setEditingProduct(product);
    setFormData({
      ...product,
      sizes: product.sizes.join(", "),
      colors: product.colors.join(", "),
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const productPayload = normalizeProduct(formData, editingProduct?._id);

    if (editingProduct) {
      await onUpdateProduct(productPayload);
    } else {
      await onCreateProduct(productPayload);
    }

    startAddProduct();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] bg-stone-100">
      <div className="flex h-full flex-col">
        <header className="border-b border-stone-200 bg-white px-4 py-4 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-brand-red">Admin dashboard</p>
              <h2 className="font-display text-2xl font-black text-brand-ink">Manage Shoe Shopper</h2>
            </div>
            <button className="rounded-full p-2 hover:bg-stone-100" onClick={onClose} aria-label="Close admin">
              <X size={26} />
            </button>
          </div>
        </header>

        <main className="mx-auto grid min-h-0 w-full max-w-7xl flex-1 gap-6 overflow-y-auto px-4 py-6 lg:grid-cols-[360px_1fr] lg:px-8">
          <section className="rounded-lg bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-xl font-black">
                {editingProduct ? "Edit product" : "Add product"}
              </h3>
              <button onClick={startAddProduct} className="rounded-md bg-stone-100 px-3 py-2 text-sm font-bold">
                Reset
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {["name", "brand", "type", "price", "oldPrice", "discount"].map((field) => (
                <input
                  required
                  key={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full rounded-md border border-stone-300 px-4 py-3 outline-none focus:border-brand-red"
                  placeholder={field}
                  type={["price", "oldPrice", "discount"].includes(field) ? "number" : "text"}
                />
              ))}
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-md border border-stone-300 px-4 py-3 outline-none focus:border-brand-red"
              >
                {["Men", "Women", "Kids"].map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
              <input
                required
                name="sizes"
                value={formData.sizes}
                onChange={handleChange}
                className="w-full rounded-md border border-stone-300 px-4 py-3 outline-none focus:border-brand-red"
                placeholder="Sizes: 7, 8, 9"
              />
              <input
                required
                name="colors"
                value={formData.colors}
                onChange={handleChange}
                className="w-full rounded-md border border-stone-300 px-4 py-3 outline-none focus:border-brand-red"
                placeholder="Colors: Black, Brown"
              />
              <input
                required
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full rounded-md border border-stone-300 px-4 py-3 outline-none focus:border-brand-red"
                placeholder="Image URL"
              />
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="min-h-24 w-full rounded-md border border-stone-300 px-4 py-3 outline-none focus:border-brand-red"
                placeholder="Description"
              />
              <button className="flex w-full items-center justify-center gap-2 rounded-md bg-brand-red px-5 py-3 font-bold text-white">
                {editingProduct ? "Update product" : "Add product"}
                <Plus size={18} />
              </button>
            </form>
          </section>

          <section className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-stone-500">Products</p>
                <p className="mt-2 font-display text-3xl font-black">{products.length}</p>
              </div>
              <div className="rounded-lg bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-stone-500">Orders</p>
                <p className="mt-2 font-display text-3xl font-black">{orders.length}</p>
              </div>
              <div className="rounded-lg bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-stone-500">Revenue</p>
                <p className="mt-2 font-display text-3xl font-black">
                  Rs. {orders.reduce((total, order) => total + order.total, 0)}
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-white p-5 shadow-sm">
              <h3 className="mb-4 font-display text-xl font-black">Product listings</h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="bg-stone-50 text-xs uppercase text-stone-500">
                    <tr>
                      <th className="px-3 py-3">Product</th>
                      <th className="px-3 py-3">Category</th>
                      <th className="px-3 py-3">Price</th>
                      <th className="px-3 py-3">Discount</th>
                      <th className="px-3 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id} className="border-b border-stone-100">
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-3">
                            <img src={product.image} alt={product.name} className="h-12 w-12 rounded-md object-cover" />
                            <div>
                              <p className="font-bold">{product.name}</p>
                              <p className="text-stone-500">{product.brand}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3">{product.category}</td>
                        <td className="px-3 py-3">Rs. {product.price}</td>
                        <td className="px-3 py-3">{product.discount}%</td>
                        <td className="px-3 py-3">
                          <div className="flex gap-2">
                            <button className="rounded-md bg-stone-100 p-2" onClick={() => startEditProduct(product)}>
                              <Edit3 size={16} />
                            </button>
                            <button className="rounded-md bg-red-50 p-2 text-brand-red" onClick={() => onDeleteProduct(product._id)}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-lg bg-white p-5 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 font-display text-xl font-black">
                <PackageCheck size={22} />
                Recent orders
              </h3>
              {orders.length === 0 ? (
                <p className="rounded-md bg-stone-50 p-4 text-stone-600">No orders placed yet.</p>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div key={order.id} className="rounded-md border border-stone-200 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-bold">{order.id}</p>
                          <p className="text-sm text-stone-500">{order.customer?.name || "Demo User"}</p>
                        </div>
                        <p className="font-black">Rs. {order.total}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
