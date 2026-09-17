import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Items from "./Items.jsx";

const fallbackProducts = [
  { id: "iphone15pro", name: "iPhone 15 Pro", price: "₹1,00,000", img: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/p/b/q/-original-imahggex2ye98xfn.jpeg?q=70&crop=false", category: "Electronics", description: "Premium smartphone with excellent camera quality." },
  { id: "s24ultra", name: "Samsung Galaxy S24 Ultra", price: "₹1,29,999", img: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/j/m/z/-original-imahgfmxumntk7sy.jpeg?q=70", category: "Electronics", description: "Powerful flagship with a vivid display." },
  { id: "ipadairm2", name: "iPad Air (M2)", price: "₹59,900", img: "https://rukminim2.flixcart.com/image/312/312/xif0q/tablet/w/p/r/-original-imahyp6gugx6vzqn.jpeg?q=70", category: "Electronics", description: "Slim and powerful tablet for work and play." },
  { id: "tabs9", name: "Samsung Galaxy Tab S9", price: "₹72,999", img: "https://rukminim2.flixcart.com/image/312/312/xif0q/tablet/n/o/f/-original-imah69ytcerzgckb.jpeg?q=70", category: "Electronics", description: "High-end tablet with a bright AMOLED display." },
  { id: "macbookairm2", name: "MacBook Air M2", price: "₹1,14,990", img: "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/f/j/g/-original-imahfthtkkzyazkf.jpeg?q=70&crop=false", category: "Electronics", description: "Ultra-portable laptop with excellent battery life." },
  { id: "legion5pro", name: "Lenovo Legion 5 Pro", price: "₹1,49,990", img: "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/z/b/6/-original-imahfkh3ezughhh4.jpeg?q=70&crop=false", category: "Electronics", description: "Gaming laptop with strong performance and cooling." },
  { id: "applewatch9", name: "Apple Watch Series 9", price: "₹41,900", img: "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/7/r/e/45-mr993hn-a-ios-apple-yes-original-imagterzzu4fsrqg.jpeg?q=70", category: "Wearables", description: "Smartwatch with health tracking and premium design." },
  { id: "galaxywatch6", name: "Samsung Galaxy Watch 6", price: "₹29,999", img: "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/z/e/e/-original-imahcn9f7grhgv8s.jpeg?q=70", category: "Wearables", description: "Well-rounded smartwatch with smart health tools." },
  { id: "airpodspro2", name: "AirPods Pro 2", price: "₹24,999", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/s/8/i/airpods-pro-2-2nd-generation-with-passive-noise-cancellation-original-imahf8fjbgaupcwp.jpeg?q=70", category: "Audio", description: "Noise-cancelling earbuds with premium sound." },
  { id: "sonywh1000xm5", name: "Sony WH-1000XM5", price: "₹29,990", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/v/d/g/-original-imahgr295uvptwq7.jpeg?q=70", category: "Audio", description: "Comfortable over-ear headphones with rich sound." },
  { id: "lgfridge", name: "LG 260L Refrigerator", price: "₹24,490", img: "https://rukminim2.flixcart.com/image/312/312/xif0q/refrigerator-new/5/w/1/mr60-gb-51-2-2023-16-blue-star-47-44-5-original-imah76cgrdkhghta.jpeg?q=70", category: "Home", description: "Spacious refrigerator with modern cooling efficiency." },
  { id: "philipsairfryer", name: "Philips Air Fryer", price: "₹8,999", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/air-fryer/y/n/y/black-4-2-1500-na120-00-philips-original-imahf3xdcpgtmzb8.jpeg?q=70", category: "Home", description: "Compact air fryer for healthy and fast cooking." },
];

const Navbar = () => {
  const location = useLocation();
  const passedProducts = location.state?.products || null;
  const productList = Array.isArray(passedProducts) && passedProducts.length ? passedProducts : fallbackProducts;

  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const initialQ = location.state?.q?.trim() || "";
    if (initialQ) {
      setQuery(initialQ);
      setFiltered(filterProducts(productList, initialQ));
    } else {
      setFiltered([]);
    }
  }, [location, productList]);

  const filterProducts = (items, value) => {
    const normalized = value.toLowerCase().trim();
    if (!normalized) return [];

    return items.filter((product) => {
      const haystack = `${product.name || ""} ${product.category || ""} ${product.description || ""}`.toLowerCase();
      return haystack.includes(normalized) || haystack.split(/\s+/).some((word) => word.startsWith(normalized));
    });
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    setFiltered(filterProducts(productList, val));
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 dark:bg-[#060816] dark:text-slate-100 sm:px-6 lg:px-8">
      <nav className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link to="/" className="text-lg font-semibold text-blue-600">← Back to home</Link>
          <input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={handleSearch}
            className="w-full max-w-xl rounded-full border border-slate-200 bg-slate-100 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-800"
          />
        </div>
      </nav>

      <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Search results</h3>
          {query.trim() && <span className="text-sm text-slate-500">Showing {filtered.length} match{filtered.length === 1 ? "" : "es"}</span>}
        </div>

        {query.trim() ? (
          filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((item) => (
                <Items key={item.id} {...item} />
              ))}
            </div>
          ) : (
            <div className="rounded-[20px] border border-dashed border-slate-300 p-8 text-center text-slate-500 dark:border-slate-700">
              No products found for “{query}”.
            </div>
          )
        ) : (
          <div className="rounded-[20px] border border-dashed border-slate-300 p-8 text-center text-slate-500 dark:border-slate-700">
            Start typing to find products by name, category, or description. Try terms like “phone”, “laptop”, or “watch”.
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
