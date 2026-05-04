import React from "react";

import { LockKeyhole, ShieldCheck, UserPlus, X } from "lucide-react";

const modeCopy = {
  login: {
    title: "User login",
    subtitle: "Access cart, wishlist, and order history.",
    button: "Login",
    icon: LockKeyhole,
  },
  register: {
    title: "Create account",
    subtitle: "Register as a new Shoe Shopper customer.",
    button: "Register",
    icon: UserPlus,
  },
  admin: {
    title: "Admin login",
    subtitle: "Demo admin access for product and order management.",
    button: "Login as admin",
    icon: ShieldCheck,
  },
};

export default function AuthModal({ currentUser, isOpen, onClose, onLogin, onLogout }) {
  const [mode, setMode] = React.useState("login");
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const ActiveIcon = modeCopy[mode].icon;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await onLogin({
        mode,
        name: mode === "register" ? formData.name : mode === "admin" ? "Admin User" : "Demo User",
        email: formData.email,
        password: formData.password,
        role: mode === "admin" ? "admin" : "user",
      });
      onClose();
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-black/50 px-4 py-6">
      <section className="w-full max-w-lg rounded-lg bg-white shadow-soft">
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-brand-red">Authentication</p>
            <h2 className="font-display text-2xl font-black text-brand-ink">Account access</h2>
          </div>
          <button
            className="rounded-full p-2 hover:bg-stone-100"
            onClick={onClose}
            aria-label="Close authentication"
          >
            <X size={24} />
          </button>
        </div>

        {currentUser ? (
          <div className="p-5">
            <div className="rounded-lg bg-stone-50 p-5 text-center">
              <ShieldCheck className="mx-auto text-brand-red" size={42} />
              <h3 className="mt-4 font-display text-2xl font-black">
                Logged in as {currentUser.role}
              </h3>
              <p className="mt-2 text-stone-600">{currentUser.email}</p>
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="mt-6 rounded-md bg-brand-red px-5 py-3 font-bold text-white"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5">
            <div className="mb-5 grid grid-cols-3 gap-2 rounded-md bg-stone-100 p-1">
              {["login", "register", "admin"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setMode(item)}
                  className={`rounded-md px-3 py-2 text-sm font-bold capitalize ${
                    mode === item ? "bg-white text-brand-red shadow-sm" : "text-stone-600"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mb-5 rounded-lg bg-red-50 p-4">
              <ActiveIcon className="text-brand-red" size={30} />
              <h3 className="mt-3 font-display text-2xl font-black text-brand-ink">
                {modeCopy[mode].title}
              </h3>
              <p className="mt-1 text-sm text-stone-600">{modeCopy[mode].subtitle}</p>
            </div>

            <div className="space-y-4">
              {mode === "register" && (
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-stone-300 px-4 py-3 outline-none focus:border-brand-red"
                  placeholder="Full name"
                />
              )}
              <input
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md border border-stone-300 px-4 py-3 outline-none focus:border-brand-red"
                placeholder={mode === "admin" ? "admin@shoeshopper.com" : "Email address"}
                type="email"
              />
              <input
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-md border border-stone-300 px-4 py-3 outline-none focus:border-brand-red"
                placeholder="Password"
                type="password"
              />
            </div>

            <button
              className="mt-5 w-full rounded-md bg-brand-red px-5 py-3 font-bold text-white transition hover:bg-red-800"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Please wait..." : modeCopy[mode].button}
            </button>

            {error && <p className="mt-4 rounded-md bg-red-50 p-3 text-sm font-semibold text-brand-red">{error}</p>}

            <p className="mt-4 text-center text-sm text-stone-600">Connected to JWT authentication API.</p>
          </form>
        )}
      </section>
    </div>
  );
}
