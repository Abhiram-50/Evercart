import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from './components/ToastProvider';
import { toCurrency } from './utils/formatters';

const Wishlist = ({ wishlistItems, setWishlistItems, cartItems, setCartItems }) => {
  const { addToast } = useToast();

  const moveToCart = (item) => {
    const exists = cartItems.some((cartItem) => cartItem.productId === item.id);
    if (exists) {
      addToast('Item already in cart', 'info');
      return;
    }

    setCartItems((prev) => [...prev, { productId: item.id, name: item.name, price: item.price, img: item.img, quantity: 1 }]);
    setWishlistItems((prev) => prev.filter((wish) => wish.id !== item.id));
    addToast('Moved to cart', 'success');
  };

  const removeItem = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
    addToast('Removed from wishlist', 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-[#060816] dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900">
        <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-fuchsia-600">Wishlist</p>
            <h2 className="text-3xl font-bold">Saved for later</h2>
          </div>
          <Link to="/" className="text-sm font-semibold text-blue-600">← Continue shopping</Link>
        </motion.header>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/70">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Saved items</p>
            <p className="mt-1 text-2xl font-bold">{wishlistItems.length}</p>
          </div>
          <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/70">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Free delivery</p>
            <p className="mt-1 text-2xl font-bold">On orders above ₹999</p>
          </div>
          <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/70">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Easy returns</p>
            <p className="mt-1 text-2xl font-bold">7-day window</p>
          </div>
        </motion.div>

        {wishlistItems.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="rounded-[24px] border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700">
            Your wishlist is empty. Save items you love to check them later.
          </motion.div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {wishlistItems.map((item, index) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} whileHover={{ y: -6, scale: 1.01 }} className="flex gap-4 rounded-[24px] border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
                <img src={item.img} alt={item.name} className="h-24 w-24 rounded-[18px] object-contain" />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">{item.category || 'Featured product'}</p>
                    </div>
                    <span className="rounded-full bg-fuchsia-100 px-2.5 py-1 text-xs font-semibold text-fuchsia-700 dark:bg-fuchsia-950/40 dark:text-fuchsia-300">Wishlist</span>
                  </div>
                  <p className="mt-3 font-semibold text-slate-900 dark:text-white">{toCurrency(item.price)}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button onClick={() => moveToCart(item)} className="rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white">Move to cart</button>
                    <button onClick={() => removeItem(item.id)} className="rounded-full border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">Remove</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
