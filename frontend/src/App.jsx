import React from "react";
import { useEffect } from "react";

import { products } from "./data/products";
import {
  createOrderApi,
  createProductApi,
  deleteProductApi,
  getAllOrdersApi,
  getMyOrdersApi,
  getProductsApi,
  loginApi,
  registerApi,
  updateProductApi,
} from "./services/api";
import AdminDashboard from "./components/AdminDashboard";
import ProductCard from "./components/ProductCard";
import AuthModal from "./components/AuthModal";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import OrderHistoryDrawer from "./components/OrderHistoryDrawer";
import ProductDetail from "./components/ProductDetail";
import ProductListing from "./components/ProductListing";
import SearchOverlay from "./components/SearchOverlay";
import WishlistDrawer from "./components/WishlistDrawer";

import {
  Heart,
  Menu,
  Package,
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


function Header({
  cartCount,
  currentUser,
  onOpenAdmin,
  onOpenAuth,
  onOpenCart,
  onOpenOrders,
  onOpenSearch,
  onOpenWishlist,
  orderCount,
  wishlistCount,
}) {
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
          {currentUser?.role === "admin" && (
            <button
              className="hidden items-center rounded-md bg-stone-100 px-3 py-2 text-stone-500 xl:flex"
              onClick={onOpenAdmin}
              type="button"
            >
              <span className="w-24 text-left text-sm">Admin</span>
              <ShieldCheck size={20} />
            </button>
          )}
          <button
            className="hidden items-center rounded-md bg-stone-100 px-3 py-2 text-stone-500 md:flex"
            onClick={onOpenSearch}
            type="button"
          >
            <span className="w-44 text-left text-sm">Search</span>
            <Search size={20} />
          </button>
          <button
            className="relative rounded-full p-2 hover:bg-stone-100"
            onClick={onOpenWishlist}
            aria-label="Open wishlist"
          >
            <Heart size={22} />
            <span className="absolute right-0 top-0 grid h-5 w-5 place-items-center rounded-full bg-brand-red text-xs font-bold text-white">
              {wishlistCount}
            </span>
          </button>
          <button
            className="relative rounded-full p-2 hover:bg-stone-100"
            onClick={onOpenOrders}
            aria-label="Open order history"
          >
            <Package size={22} />
            <span className="absolute right-0 top-0 grid h-5 w-5 place-items-center rounded-full bg-brand-red text-xs font-bold text-white">
              {orderCount}
            </span>
          </button>
          <button
            className={`rounded-full p-2 hover:bg-stone-100 ${
              currentUser ? "text-brand-red" : "text-brand-ink"
            }`}
            onClick={onOpenAuth}
            aria-label="Open account login"
          >
            <User size={22} />
          </button>
          <button
            className="relative rounded-full p-2 hover:bg-stone-100"
            onClick={onOpenCart}
            aria-label="Open cart"
          >
            <ShoppingBag size={22} />
            <span className="absolute right-0 top-0 grid h-5 w-5 place-items-center rounded-full bg-brand-red text-xs font-bold text-white">
              {cartCount}
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

function FeaturedProducts({
  isProductWishlisted,
  onAddToCart,
  onSelectProduct,
  onToggleWishlist,
  products,
}) {
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
            isWishlisted={isProductWishlisted(product.id)}
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
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
  const [productItems, setProductItems] = React.useState(() => {
    const saved = localStorage.getItem("productItems");
    return saved ? JSON.parse(saved) : products;
  });
  const [selectedProduct, setSelectedProduct] = React.useState(productItems[0]);
  const [currentUser, setCurrentUser] = React.useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });
  
  const [cartItems, setCartItems] = React.useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);
  const [isAdminOpen, setIsAdminOpen] = React.useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = React.useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  
  const [wishlistItems, setWishlistItems] = React.useState(() => {
    const saved = localStorage.getItem("wishlistItems");
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = React.useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const orderCount = orders.length;
  const wishlistCount = wishlistItems.length;

  function isProductWishlisted(productId) {
    return wishlistItems.some((product) => product.id === productId);
  }

  function handleSelectProduct(product) {
    setSelectedProduct(product);

    setTimeout(() => {
      document.getElementById("product-detail")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  function handleAddToCart(product) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.product.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }

  function handleToggleWishlist(product) {
    setWishlistItems((currentItems) => {
      const alreadySaved = currentItems.some((item) => item.id === product.id);

      if (alreadySaved) {
        return currentItems.filter((item) => item.id !== product.id);
      }

      return [...currentItems, product];
    });
  }

  function handleIncreaseQuantity(productId) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function handleDecreaseQuantity(productId) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function handleRemoveItem(productId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId)
    );
  }

  function handleRemoveWishlistItem(productId) {
    setWishlistItems((currentItems) =>
      currentItems.filter((product) => product.id !== productId)
    );
  }

  function handleOpenCheckout() {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  }

  async function handlePlaceOrder(order) {
    if (!currentUser) {
      throw new Error("Please login before placing an order.");
    }

    const savedOrder = await createOrderApi(order);
    setOrders((currentOrders) => [savedOrder, ...currentOrders]);
    setCartItems([]);
    return savedOrder;
  }

  async function handleLogin(user) {
    let loggedInUser;

    if (user.mode === "register") {
      loggedInUser = await registerApi(user);
    } else if (user.mode === "admin") {
      try {
        loggedInUser = await loginApi(user);
      } catch {
        loggedInUser = await registerApi(user);
      }
    } else {
      loggedInUser = await loginApi(user);
    }

    localStorage.setItem("token", loggedInUser.token);
    setCurrentUser(loggedInUser);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setOrders([]);
  }

  async function handleCreateProduct(product) {
    try {
      const createdProduct = await createProductApi(product);
      setProductItems((currentProducts) => [createdProduct, ...currentProducts]);
      setSelectedProduct(createdProduct);
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleUpdateProduct(updatedProduct) {
    try {
      const savedProduct = await updateProductApi(updatedProduct);
      setProductItems((currentProducts) =>
        currentProducts.map((product) =>
          product.id === savedProduct.id ? savedProduct : product
        )
      );
      setSelectedProduct(savedProduct);
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleDeleteProduct(productId) {
    try {
      await deleteProductApi(productId);
      setProductItems((currentProducts) => {
        const nextProducts = currentProducts.filter((product) => product.id !== productId);
        setSelectedProduct(nextProducts[0] || products[0]);
        return nextProducts;
      });
    } catch (error) {
      alert(error.message);
    }
  }

  async function loadProductsFromApi() {
    try {
      const apiProducts = await getProductsApi();
      if (apiProducts.length > 0) {
        setProductItems(apiProducts);
        setSelectedProduct(apiProducts[0]);
      }
    } catch (error) {
      console.log(`Using frontend fallback products: ${error.message}`);
    }
  }

  async function loadOrdersFromApi(user) {
    if (!user) return;

    try {
      const apiOrders = user.role === "admin" ? await getAllOrdersApi() : await getMyOrdersApi();
      setOrders(apiOrders);
    } catch (error) {
      console.log(`Could not load orders: ${error.message}`);
    }
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      if (currentUser.token) {
        localStorage.setItem("token", currentUser.token);
      }
    } else {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token");
    }
  }, [currentUser]);

  useEffect(() => {
    loadProductsFromApi();
  }, []);

  useEffect(() => {
    loadOrdersFromApi(currentUser);
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-white font-body text-brand-ink">
      <Header
        cartCount={cartCount}
        currentUser={currentUser}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrders={() => setIsOrderHistoryOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        orderCount={orderCount}
        wishlistCount={wishlistCount}
      />
      <main>
        <Hero />
        <CategorySection />
        <StylePills />
        <FeaturedProducts
          isProductWishlisted={isProductWishlisted}
          onAddToCart={handleAddToCart}
          onSelectProduct={handleSelectProduct}
          onToggleWishlist={handleToggleWishlist}
          products={productItems}
        />
        <ProductDetail
          isProductWishlisted={isProductWishlisted}
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          onSelectProduct={handleSelectProduct}
          onToggleWishlist={handleToggleWishlist}
          products={productItems}
        />
        <ProductListing
          isProductWishlisted={isProductWishlisted}
          onAddToCart={handleAddToCart}
          onSelectProduct={handleSelectProduct}
          onToggleWishlist={handleToggleWishlist}
          products={productItems}
        />
        <TrustBand />
      </main>
      <Footer />
      <AuthModal
        currentUser={currentUser}
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onCreateProduct={handleCreateProduct}
        onDeleteProduct={handleDeleteProduct}
        onUpdateProduct={handleUpdateProduct}
        orders={orders}
        products={productItems}
      />
      <CartDrawer
        cartItems={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleOpenCheckout}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
        onRemoveItem={handleRemoveItem}
      />
      <CheckoutModal
        cartItems={cartItems}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onPlaceOrder={handlePlaceOrder}
      />
      <OrderHistoryDrawer
        isOpen={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
        orders={orders}
      />
      <WishlistDrawer
        wishlistItems={wishlistItems}
        isOpen={isWishlistOpen}
        onAddToCart={handleAddToCart}
        onClose={() => setIsWishlistOpen(false)}
        onRemoveItem={handleRemoveWishlistItem}
        onViewProduct={handleSelectProduct}
      />
      <SearchOverlay
        isOpen={isSearchOpen}
        isProductWishlisted={isProductWishlisted}
        onAddToCart={handleAddToCart}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
        onToggleWishlist={handleToggleWishlist}
        products={productItems}
      />
    </div>
  );
}
