import React from "react";
import { products } from "./data/products";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import ProductListing from "./components/ProductListing";

import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Truck,
  User,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const navItems = ["Men", "Women", "Kids", "Brands", "Sale", "New"];

const categories = [
  {
    title: "Men",
    copy: "Office-ready shoes, sneakers, loafers and sandals.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Women",
    copy: "Heels, flats, wedges and everyday comfort picks.",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Kids",
    copy: "Durable, playful footwear for school and weekends.",
    image:
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=900&q=80",
  },
];

const styles = [
  "Sneakers",
  "Sandals",
  "Loafers",
  "Heels",
  "Sports",
  "Formal",
];


function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="bg-brand-dark px-4 py-2 text-center text-xs font-semibold uppercase tracking-wide text-white sm:text-sm">
        Get 5% extra discount on prepaid orders above Rs. 1000
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <button className="rounded-full p-2 text-brand-ink hover:bg-stone-100 lg:hidden" aria-label="Open menu">
            <Menu size={24} />
          </button>
          <a href="#" className="font-display text-2xl font-black uppercase tracking-[0.22em] text-brand-red">
            Shoe Shopper
          </a>
        </div>

        <div className="hidden items-center gap-8 font-semibold uppercase text-brand-ink lg:flex">
          {navItems.map((item) => (
            <a key={item} href="#" className="text-sm transition hover:text-brand-red">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-md bg-stone-100 px-3 py-2 md:flex">
            <input
              className="w-44 bg-transparent text-sm outline-none placeholder:text-stone-500"
              placeholder="Search"
              type="search"
            />
            <Search size={20} />
          </div>
          <button className="rounded-full p-2 hover:bg-stone-100" aria-label="Wishlist">
            <Heart size={22} />
          </button>
          <button className="rounded-full p-2 hover:bg-stone-100" aria-label="Account">
            <User size={22} />
          </button>
          <button className="relative rounded-full p-2 hover:bg-stone-100" aria-label="Cart">
            <ShoppingBag size={22} />
            <span className="absolute right-0 top-0 grid h-5 w-5 place-items-center rounded-full bg-brand-red text-xs font-bold text-white">
              0
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[520px] overflow-hidden bg-brand-soft">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=2200&q=85"
        alt="Premium sneakers on a warm retail display"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
      <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-4 py-16 lg:px-8">
        <div className="max-w-xl text-white">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
            <Sparkles size={18} />
            Summer collection is live
          </p>
          <h1 className="font-display text-5xl font-black leading-tight sm:text-6xl">
            Shoe Shopper
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-white/90">
            A clean footwear store for men, women and kids with easy browsing, sharp product cards and a simple shopping flow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#featured"
              className="rounded-md bg-brand-red px-6 py-3 font-bold text-white transition hover:bg-red-800"
            >
              Shop New Arrivals
            </a>
            <a
              href="#categories"
              className="rounded-md border border-white/70 px-6 py-3 font-bold text-white transition hover:bg-white hover:text-brand-dark"
            >
              Browse Categories
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategorySection() {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-brand-red">Shop by category</p>
          <h2 className="mt-2 font-display text-3xl font-black text-brand-ink">Find your perfect pair</h2>
        </div>
        <a href="#" className="hidden font-semibold text-brand-red sm:block">
          View all
        </a>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {categories.map((category) => (
          <article key={category.title} className="group overflow-hidden rounded-lg bg-stone-100">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                src={category.image}
                alt={`${category.title} footwear category`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="font-display text-3xl font-black">{category.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-white/85">{category.copy}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function StylePills() {
  return (
    <section className="bg-stone-50 py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-center font-display text-3xl font-black text-brand-ink">Shop by style</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {styles.map((style) => (
            <a
              key={style}
              href="#"
              className="rounded-md border border-stone-200 bg-white px-4 py-4 text-center font-bold text-brand-ink shadow-sm transition hover:border-brand-red hover:text-brand-red"
            >
              {style}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts({ onSelectProduct }) {
  const featuredProducts = products.slice(0, 4);

  return (
    <section id="featured" className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-sm font-bold uppercase tracking-wide text-brand-red">Featured collection</p>
        <h2 className="mt-2 font-display text-3xl font-black text-brand-ink">Fresh drops for every day</h2>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewProduct={onSelectProduct}
          />
        ))}
      </div>
    </section>
  );
}

function TrustBand() {
  const items = [
    { icon: Truck, title: "Free shipping", copy: "On orders above Rs. 1000" },
    { icon: RotateCcw, title: "Easy returns", copy: "Hassle-free exchange support" },
    { icon: ShieldCheck, title: "Secure checkout", copy: "Fake payment flow for project demo" },
  ];

  return (
    <section className="border-y border-stone-200 bg-white py-10">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 text-center md:grid-cols-3 lg:px-8">
        {items.map(({ icon: Icon, title, copy }) => (
          <div key={title}>
            <Icon className="mx-auto text-brand-red" size={34} />
            <h3 className="mt-4 text-lg font-black text-brand-ink">{title}</h3>
            <p className="mt-2 text-stone-600">{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-brand-dark px-4 py-10 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
        <div>
          <h2 className="font-display text-xl font-black uppercase tracking-[0.2em] text-brand-gold">Shoe Shopper</h2>
          <p className="mt-4 text-sm leading-6 text-white/70">
            MCA final year footwear e-commerce project using React, Tailwind, Node, Express and MongoDB.
          </p>
        </div>
        {["Shop", "Company", "Support"].map((heading) => (
          <div key={heading}>
            <h3 className="font-bold uppercase tracking-wide">{heading}</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li><a href="#" className="hover:text-white">Men Shoes</a></li>
              <li><a href="#" className="hover:text-white">Women Shoes</a></li>
              <li><a href="#" className="hover:text-white">Kids Shoes</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}

export default function App() {
  const [selectedProduct, setSelectedProduct] = React.useState(products[0]);

  function handleSelectProduct(product) {
    setSelectedProduct(product);

    setTimeout(() => {
      document.getElementById("product-detail")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  return (
    <div className="min-h-screen bg-white font-body text-brand-ink">
      <Header />
      <main>
        <Hero />
        <CategorySection />
        <StylePills />
        <FeaturedProducts onSelectProduct={handleSelectProduct} />
        <ProductDetail product={selectedProduct} onSelectProduct={handleSelectProduct} />
        <ProductListing onSelectProduct={handleSelectProduct} />
        <TrustBand />
      </main>
      <Footer />
    </div>
  );
}
