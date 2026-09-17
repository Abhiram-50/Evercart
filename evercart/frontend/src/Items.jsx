import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getProductImage } from './utils/productUtils';

const Items = ({ id, img, name, price, badge, rating, description, category }) => {
  const imageUrl = getProductImage({ img, name, category });
  return (
    <motion.div whileHover={{ y: -8, scale: 1.02, rotateX: 4, rotateY: -4 }} transition={{ type: "spring", stiffness: 220, damping: 20 }} className="h-full">
      <Link
        to={`/item/${id}`}
        state={{ product: { id, img, name, price, badge, rating, description } }}
        className="group flex h-full flex-col rounded-[22px] border border-slate-200 bg-white p-4 text-left shadow-sm transition duration-300 hover:shadow-xl dark:border-slate-700 dark:bg-[#1e1e1e]"
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-600 dark:bg-blue-950/50 dark:text-blue-300">
            {badge || "Deal"}
          </span>
          <span className="text-sm font-semibold text-amber-500">★ {rating || "4.5"}</span>
        </div>

        <img src={imageUrl} alt={name} className="mb-4 h-40 w-full object-contain transition duration-300 group-hover:scale-105" />

        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
          {name}
        </h3>

        <p className="mb-3 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
          {description || "Premium quality item with fast delivery."}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <p className="text-base font-bold text-slate-900 dark:text-white">{typeof price === 'number' ? `₹${price.toLocaleString('en-IN')}` : typeof price === 'string' && /^\d+(\.\d+)?$/.test(price) ? `₹${Number(price).toLocaleString('en-IN')}` : price || 'Price available soon'}</p>
          <span className="text-sm font-semibold text-blue-600 transition group-hover:translate-x-1">Buy now →</span>
        </div>
      </Link>
    </motion.div>
  );
};

export default Items;
