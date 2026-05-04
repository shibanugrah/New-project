import React from "react";

import { LockKeyhole, LogOut, PackageCheck, Save, UserRound, X } from "lucide-react";
import { getMyOrdersApi, getProfileApi, updateProfileApi } from "../services/api";

export default function Profile({ currentUser, isOpen, onClose, onLogout, onProfileUpdate }) {
  const [profile, setProfile] = React.useState(currentUser);
  const [orders, setOrders] = React.useState([]);
  const [formData, setFormData] = React.useState({
    name: currentUser?.name || "",
    password: "",
  });
  const [message, setMessage] = React.useState("");
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen || !currentUser) return;

    async function loadProfile() {
      try {
        const [profileData, orderData] = await Promise.all([
          getProfileApi(),
          getMyOrdersApi(),
        ]);

        setProfile(profileData);
        setOrders(orderData);
        setFormData({
          name: profileData.name || "",
          password: "",
        });
      } catch (error) {
        setMessage(error.message);
      }
    }

    loadProfile();
  }, [currentUser, isOpen]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      const payload = {
        name: formData.name,
        ...(formData.password ? { password: formData.password } : {}),
      };
      const updatedProfile = await updateProfileApi(payload);

      setProfile(updatedProfile);
      setFormData({
        name: updatedProfile.name,
        password: "",
      });
      onProfileUpdate(updatedProfile);
      setMessage("Profile updated successfully.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  if (!isOpen || !currentUser) return null;

  return (
    <div className="fixed inset-0 z-[85] bg-stone-100">
      <div className="flex h-full flex-col">
        <header className="border-b border-stone-200 bg-white px-4 py-4 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-brand-red">Profile</p>
              <h2 className="font-display text-2xl font-black text-brand-ink">My account</h2>
            </div>
            <button className="rounded-full p-2 hover:bg-stone-100" onClick={onClose} aria-label="Close profile">
              <X size={26} />
            </button>
          </div>
        </header>

        <main className="mx-auto grid min-h-0 w-full max-w-7xl flex-1 gap-6 overflow-y-auto px-4 py-6 lg:grid-cols-[360px_1fr] lg:px-8">
          <section className="rounded-lg bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <UserRound className="text-brand-red" size={28} />
              <div>
                <h3 className="font-display text-xl font-black">{profile?.name}</h3>
                <p className="text-sm text-stone-500">{profile?.email}</p>
              </div>
            </div>

            <div className="space-y-3 rounded-md bg-stone-50 p-4">
              <p className="text-sm font-semibold text-stone-500">Role</p>
              <p className="font-bold capitalize">{profile?.role}</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-stone-300 px-4 py-3 outline-none focus:border-brand-red"
                placeholder="Name"
              />
              <div className="relative">
                <LockKeyhole className="absolute left-4 top-3.5 text-stone-400" size={18} />
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-md border border-stone-300 px-11 py-3 outline-none focus:border-brand-red"
                  minLength={6}
                  placeholder="New password"
                  type="password"
                />
              </div>
              <button
                className="flex w-full items-center justify-center gap-2 rounded-md bg-brand-red px-5 py-3 font-bold text-white disabled:opacity-60"
                disabled={isSaving}
                type="submit"
              >
                {isSaving ? "Saving..." : "Save profile"}
                <Save size={18} />
              </button>
              {message && <p className="rounded-md bg-stone-50 p-3 text-sm font-semibold text-stone-600">{message}</p>}
            </form>

            <button
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-stone-200 px-5 py-3 font-bold text-brand-ink transition hover:border-brand-red hover:text-brand-red"
              onClick={onLogout}
              type="button"
            >
              Logout
              <LogOut size={18} />
            </button>
          </section>

          <section className="rounded-lg bg-white p-5 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 font-display text-xl font-black">
              <PackageCheck size={22} />
              Order history
            </h3>
            {orders.length === 0 ? (
              <p className="rounded-md bg-stone-50 p-4 text-stone-600">No orders placed yet.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <article key={order.id} className="rounded-md border border-stone-200 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-stone-500">Order ID</p>
                        <h4 className="font-bold">{order.id}</h4>
                      </div>
                      <p className="font-black">Rs. {order.total}</p>
                    </div>
                    <p className="mt-2 text-sm text-stone-500">
                      {order.items.length} item{order.items.length === 1 ? "" : "s"} | {order.status || "Placed"}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
