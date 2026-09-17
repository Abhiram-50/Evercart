import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { formatPrice } from "./utils/formatters";

const Checkout = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const cleanPrice = (price) => Number(String(price).replace(/[^\d.-]/g, "")) || 0;
  const subtotal = cartItems.reduce((acc, item) => acc + cleanPrice(item.price) * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? (subtotal > 999 ? 0 : 99) : 0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    if (!address.name || !address.phone || !address.street || !address.city || !address.pincode) {
      alert("⚠️ Please fill all delivery address fields before placing the order.");
      return;
    }

    if (cartItems.length === 0) {
      alert("🛒 Your cart is empty!");
      return;
    }

    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const newOrder = {
      id: `ORD-${Date.now()}`,
      items: cartItems.map((item) => ({ name: item.name, quantity: item.quantity, price: item.price })),
      total,
      paymentMethod,
      address,
      status: "Processing",
      date: new Date().toLocaleDateString("en-IN"),
    };

    localStorage.setItem("orders", JSON.stringify([newOrder, ...savedOrders]));
    localStorage.setItem("address", `${address.street}, ${address.city}, ${address.pincode}`);

    const endTime = Date.now() + 15 * 60 * 1000;
    localStorage.setItem("orderEndTime", endTime);

    setCartItems([]);
    navigate("/orders");
  };

  const addressFields = [
    { key: "name", label: "Full Name", type: "text" },
    { key: "phone", label: "Phone Number", type: "tel" },
    { key: "street", label: "Street Address", type: "text" },
    { key: "city", label: "City", type: "text" },
    { key: "pincode", label: "Pincode", type: "text" },
  ];

  const paymentOptions = [
    { value: "COD", label: "Cash on Delivery" },
    { value: "UPI", label: "UPI" },
    { value: "Card", label: "Card" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-[#060816] dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">Checkout</p>
            <h1 className="text-3xl font-bold">Complete your order</h1>
          </div>
          <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
            Secure checkout • Fast delivery
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }} className="space-y-6">
            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
              <h2 className="text-xl font-semibold">Delivery address</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {addressFields.map((field) => (
                  <input
                    key={field.key}
                    type={field.type}
                    placeholder={field.label}
                    value={address[field.key]}
                    onChange={(e) => setAddress({ ...address, [field.key]: e.target.value })}
                    className="w-full rounded-[16px] border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-950"
                  />
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
              <h2 className="text-xl font-semibold">Payment method</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {paymentOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setPaymentMethod(option.value)}
                    className={`rounded-[18px] border px-4 py-3 text-sm font-semibold transition ${paymentMethod === option.value ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/40 dark:text-blue-300' : 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 }} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <h2 className="text-xl font-semibold">Order summary</h2>
            <div className="mt-4 space-y-3">
              {cartItems.length === 0 ? (
                <p className="rounded-[18px] border border-dashed border-slate-300 p-4 text-sm text-slate-500 dark:border-slate-700">Your cart is empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between rounded-[18px] bg-slate-50 p-3 dark:bg-slate-950/70">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">{formatPrice(cleanPrice(item.price) * item.quantity)}</p>
                  </div>
                ))
              )}
            </div>

            <div className="mt-5 space-y-3 border-t border-slate-200 pt-4 text-sm dark:border-slate-700">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-semibold dark:border-slate-700">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <button onClick={handlePlaceOrder} className="mt-6 w-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 font-semibold text-white transition hover:opacity-90">
              Place order
            </button>
            <button onClick={() => navigate('/cart')} className="mt-3 w-full rounded-full border border-slate-300 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
              ← Back to cart
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
