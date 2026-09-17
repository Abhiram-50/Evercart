import React, { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main.jsx';
import Login from './Login.jsx';
import Cart from './Cart.jsx';
import Checkout from './checkout-new.jsx';
import InsideItems from './Inside_items.jsx';
import SearchResults from './SearchBar.jsx';
import Timer from './timer.jsx';
import Wishlist from './Wishlist.jsx';
import Orders from './Orders.jsx';
import './App.css';
import { useLocalStorage } from './hooks/useLocalStorage';



function App() {
  const [cartItems, setCartItems] = useLocalStorage('cart', []);
  const [wishlistItems, setWishlistItems] = useLocalStorage('wishlist', []);

  const cartCount = useMemo(() => cartItems.reduce((acc, item) => acc + item.quantity, 0), [cartItems]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main cartCount={cartCount} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} cartCount={cartCount} wishlistItems={wishlistItems} setWishlistItems={setWishlistItems} />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/item/:id" element={<InsideItems cartItems={cartItems} setCartItems={setCartItems} wishlistItems={wishlistItems} setWishlistItems={setWishlistItems} />} />
        <Route path="/SearchBar" element={<SearchResults cartCount={cartCount} />} />
        <Route path="/wishlist" element={<Wishlist wishlistItems={wishlistItems} setWishlistItems={setWishlistItems} cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>

      <Timer />
    </Router>
  );
}

export default App;