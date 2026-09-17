import { useNavigate } from "react-router-dom";
import { formatPrice } from "./utils/formatters";

const Cart = ({ cartItems, setCartItems, wishlistItems, setWishlistItems }) => {
  const navigate = useNavigate();

  const updateCart = (newCart) => {
    setCartItems(newCart);
  };

  const handleRemove = (productId) => {
    updateCart(cartItems.filter((item) => item.productId !== productId));
  };

  const handleIncrease = (productId) => {
    updateCart(
      cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (productId) => {
    updateCart(
      cartItems
        .map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cleanPrice = (price) => Number(String(price).replace(/[^\d.-]/g, ""));

  const subTotal = cartItems.reduce(
    (total, item) => total + cleanPrice(item.price) * item.quantity,
    0
  );
  const deliveryFee = subTotal > 0 ? (subTotal > 999 ? 0 : 99) : 0;
  const totalPrice = subTotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6 py-16 text-center">
        <div className="rounded-[28px] border border-slate-200 bg-white p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Your cart is empty</h2>
          <p className="mt-3 text-slate-500">Add a few favorites and they’ll appear here with full details.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 rounded-full bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
          >
            Continue shopping
          </button>
        </div>
      </div>
    );
  }

  const goToCheckout = () => navigate("/checkout");

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-[#060816] dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Cart</p>
              <h2 className="text-3xl font-bold">Your selections</h2>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
              {cartItems.length} item{cartItems.length > 1 ? "s" : ""}
            </span>
          </div>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.productId} className="flex flex-col gap-4 rounded-[22px] border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-950/80">
                <img src={item.img} alt={item.name} className="h-32 w-full rounded-[18px] bg-white object-contain p-3 sm:w-32" />
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">Premium pick • Delivered in 2–4 days</p>
                    </div>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{formatPrice(cleanPrice(item.price) * item.quantity)}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-900">
                      <button onClick={() => handleDecrease(item.productId)} className="h-8 w-8 rounded-full bg-slate-900 text-lg text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900">
                        −
                      </button>
                      <span className="min-w-6 text-center font-semibold">{item.quantity}</span>
                      <button onClick={() => handleIncrease(item.productId)} className="h-8 w-8 rounded-full bg-blue-600 text-lg text-white transition hover:bg-blue-700">
                        +
                      </button>
                    </div>

                    <button onClick={() => handleRemove(item.productId)} className="text-sm font-semibold text-red-500 transition hover:text-red-600">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <h3 className="text-xl font-semibold">Price summary</h3>
          <div className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center justify-between">
              <span>Sub total</span>
              <span>{formatPrice(subTotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Delivery</span>
              <span>{deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <button onClick={goToCheckout} className="mt-6 w-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 font-semibold text-white transition hover:opacity-90">
            Proceed to checkout
          </button>
          <p className="mt-3 text-center text-xs text-slate-500">Secure checkout • Fast delivery • Easy returns</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
