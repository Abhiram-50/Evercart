import logo from "./logo.jpg";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Items from "./Items.jsx";
import { normalizeProduct } from './utils/productUtils';

const fallbackProducts = [];

function Main({ cartCount = 0 }) {
  const [query, setQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL}/api/products` : 'https://fakestoreapi.com/products?limit=40';

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
    document.body.classList.toggle("dark", savedMode);

    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  useEffect(() => {
    let active = true;

    const loadProducts = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        const mapped = Array.isArray(data)
          ? data.map((item) => normalizeProduct({
              ...item,
              name: item.title || item.name || item.productName,
              price: typeof item.price === 'number' ? `₹${(item.price * 83).toLocaleString('en-IN')}` : item.price,
              img: item.image || item.img || item.thumbnail || item.imageUrl,
              rating: item.rating?.rate ?? item.rating,
            }))
          : fallbackProducts;

        if (active) {
          setProducts(mapped.length ? mapped : fallbackProducts);
        }
      } catch (error) {
        console.error('Failed to load products', error);
        if (active) {
          setProducts(fallbackProducts);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    const intervalId = window.setInterval(() => {
      loadProducts();
    }, 15000);

    const handleVisibility = () => {
      if (!document.hidden) {
        loadProducts();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      active = false;
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [apiUrl]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate("/SearchBar", { state: { q: query, products } });
      setQuery("");
    }
  };

  const toggleMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      document.body.classList.toggle("dark", newMode);
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/");
  };

  const groupedProducts = products.reduce((acc, product) => {
    const key = product.category?.toLowerCase().includes("electronics") ? "Electronics" : product.category?.toLowerCase().includes("jewel") ? "Fashion" : "Featured";
    if (!acc[key]) acc[key] = [];
    acc[key].push(product);
    return acc;
  }, {});

  const featuredProduct = products[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#060816] dark:text-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <img src={logo} alt="Evercart" className="h-12 w-12 rounded-2xl object-cover" />

          <form onSubmit={handleSearch} className="hidden flex-1 items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-2 md:flex">
            <i className="fa-solid fa-magnifying-glass text-slate-500" />
            <input className="ml-2 w-full bg-transparent text-sm outline-none" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" />
          </form>

          <div className="flex items-center gap-3 text-sm font-medium">
            {isLoggedIn ? <button onClick={handleLogout} className="transition hover:text-blue-600">Logout</button> : <Link to="/login" className="transition hover:text-blue-600">Login</Link>}
            <Link to="/cart" className="transition hover:text-blue-600">
              Cart{cartCount > 0 ? ` (${cartCount})` : ''}
            </Link>
            <button onClick={toggleMode} className="rounded-full bg-slate-900 px-3 py-1.5 text-white transition dark:bg-slate-100 dark:text-slate-900">
              {isDarkMode ? "Light" : "Dark"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-6 text-white shadow-[0_25px_80px_rgba(37,99,235,0.24)] sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.27),_transparent_35%)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur">
                Top deals • Fast shipping • Curated picks
              </p>
              <h1 className="mb-3 text-4xl font-black tracking-tight sm:text-5xl">EverCart</h1>
              <p className="text-base text-slate-100 sm:text-lg">
                Shop the latest items from a live catalog with a cinematic, 3D-inspired storefront experience.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/SearchBar" state={{ q: "latest", products }} className="rounded-full bg-white px-4 py-2.5 font-semibold text-slate-900 transition hover:-translate-y-0.5">
                  Explore deals
                </Link>
                <a href="#featured" className="rounded-full border border-white/30 bg-white/10 px-4 py-2.5 font-semibold backdrop-blur transition hover:bg-white/20">
                  Browse catalog
                </a>
              </div>
            </div>

            {featuredProduct && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.45 }} className="rounded-[24px] border border-white/20 bg-white/10 p-4 backdrop-blur">
                <div className="rounded-[20px] bg-slate-950/70 p-4">
                  <p className="mb-2 text-xs uppercase tracking-[0.3em] text-slate-400">Featured</p>
                  <img src={featuredProduct.img} alt={featuredProduct.name} className="mx-auto h-36 w-full object-contain" />
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-sm font-semibold">{featuredProduct.name}</h2>
                      <p className="text-sm text-slate-400">{featuredProduct.price}</p>
                    </div>
                    <Link to={`/item/${featuredProduct.id}`} state={{ product: featuredProduct }} className="rounded-full bg-blue-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-400">
                      View
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.section>

        {loading ? (
          <div className="mt-8 rounded-[24px] border border-slate-200 bg-white p-8 text-center text-slate-500 dark:border-slate-800 dark:bg-slate-900">
            Loading products...
          </div>
        ) : (
          <motion.div id="featured" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-8 space-y-6">
            {Object.entries(groupedProducts).map(([title, items], index) => (
              <motion.section key={title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06, duration: 0.4 }} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{title}</h2>
                  <span className="text-sm text-slate-500">Trending now</span>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {items.map((item) => <Items key={item.id} {...item} />)}
                </div>
              </motion.section>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default Main;
