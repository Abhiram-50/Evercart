import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductGallery from "./components/ProductGallery";
import { useToast } from "./components/ToastProvider";
import { toCurrency } from "./utils/formatters";

const InsideItems = ({ cartItems, setCartItems, wishlistItems, setWishlistItems }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};
  const { addToast } = useToast();

  const [isInCart, setIsInCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (!product) return;
    setIsInCart(cartItems.some((item) => item.productId === product.id));
    setIsWishlisted(wishlistItems.some((item) => item.id === product.id));
  }, [cartItems, wishlistItems, product]);

  const handleToggleCart = () => {
    if (isInCart) {
      setCartItems((prev) => prev.filter((item) => item.productId !== product.id));
      setIsInCart(false);
      addToast('Removed from cart', 'info');
      return;
    }

    setCartItems((prev) => [...prev, { productId: product.id, name: product.name, price: product.price, img: product.img, quantity: 1 }]);
    setIsInCart(true);
    addToast('Added to cart', 'success');
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      setWishlistItems((prev) => prev.filter((item) => item.id !== product.id));
      setIsWishlisted(false);
      addToast('Removed from wishlist', 'info');
      return;
    }

    setWishlistItems((prev) => [...prev, { id: product.id, name: product.name, price: product.price, img: product.img, category: product.category }]);
    setIsWishlisted(true);
    addToast('Added to wishlist', 'success');
  };

  const handleBuyNow = () => {
    if (!isInCart) {
      setCartItems((prev) => [...prev, { productId: product.id, name: product.name, price: product.price, img: product.img, quantity: 1 }]);
    }
    navigate('/checkout');
  };

  if (!product) {
    return <h2 className="mt-10 text-center text-2xl">Product Not Found</h2>;
  }

  const images = [product.img, product.img, product.img];

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-[#060816] dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[32px] border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900 md:p-10">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <Link to="/" className="text-sm font-semibold text-blue-600">← Back to home</Link>
          <div className="flex gap-2">
            <Link to="/wishlist" className="rounded-full border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">Wishlist</Link>
            <Link to="/orders" className="rounded-full border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">Orders</Link>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}>
            <ProductGallery images={images} title={product.name} />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            <div>
              <p className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">{product.badge || 'Best deal'}</p>
              <h2 className="mt-3 text-3xl font-bold">{product.name}</h2>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span>⭐ {product.rating || '4.7'}</span>
                <span>•</span>
                <span>{product.category || 'Featured product'}</span>
                <span>•</span>
                <span>4,280 ratings</span>
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/80">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-rose-100 px-2.5 py-1 text-sm font-semibold text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">-20%</span>
                <span className="text-sm text-slate-500 line-through">{toCurrency(product.price)}</span>
              </div>
              <div className="mt-2 flex items-end gap-3">
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{toCurrency(product.price)}</p>
                <p className="rounded-full bg-emerald-100 px-2.5 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">In stock</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button onClick={handleToggleCart} className={`rounded-full px-5 py-3 font-semibold text-white transition ${isInCart ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                {isInCart ? 'Added to cart' : 'Add to cart'}
              </button>
              <button onClick={handleBuyNow} className="rounded-full bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900">Buy now</button>
              <button onClick={handleWishlist} className={`rounded-full px-5 py-3 font-semibold border ${isWishlisted ? 'border-rose-500 text-rose-600' : 'border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-200'}`}>
                {isWishlisted ? '♥ Saved' : '♡ Save'}
              </button>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950/80">
              <h3 className="font-semibold">Product highlights</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li>• Premium quality with fast delivery</li>
                <li>• 12-month seller warranty</li>
                <li>• Free installation on select categories</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InsideItems;
