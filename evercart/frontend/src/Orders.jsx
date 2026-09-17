import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from './utils/formatters';

const demoOrders = [
  { id: 'ORD-1001', items: [{ name: 'iPhone 15 Pro', quantity: 1 }], status: 'Delivered', date: '10 Jul 2026', total: 140000 },
  { id: 'ORD-1002', items: [{ name: 'MacBook Air M2', quantity: 1 }], status: 'In Transit', date: '12 Jul 2026', total: 114990 },
  { id: 'ORD-1003', items: [{ name: 'Sony WH-1000XM5', quantity: 1 }], status: 'Processing', date: '14 Jul 2026', total: 29990 },
];

const Orders = () => {
  const [query, setQuery] = useState('');
  const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
  const orders = storedOrders.length ? storedOrders : demoOrders;

  const filtered = orders.filter((order) => `${order.id} ${order.items?.map((item) => item.name).join(' ')}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-[#060816] dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">Orders</p>
            <h2 className="text-3xl font-bold">Your order history</h2>
          </div>
          <Link to="/" className="text-sm font-semibold text-blue-600">← Back home</Link>
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search orders"
          className="mb-6 w-full max-w-md rounded-full border border-slate-200 bg-slate-100 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-800"
        />

        <div className="space-y-3">
          {filtered.map((order) => (
            <div key={order.id} className="flex flex-wrap items-center justify-between gap-3 rounded-[20px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/80">
              <div>
                <p className="font-semibold">{order.items?.map((item) => item.name).join(', ') || 'Order item'}</p>
                <p className="text-sm text-slate-500">{order.id} • {order.date}</p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{formatPrice(order.total || 0)}</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">{order.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
