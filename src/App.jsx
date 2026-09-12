import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Men from './pages/Men'
import Sports from './pages/Sports'
import Sandals from './pages/Sandals'
import Formal from './pages/Formal'
import Casual from './pages/Casual'
import Running from './pages/Running'
import Women from './pages/Women'
import Bestsellers from './pages/Bestsellers'
import NewArrivals from './pages/NewArrivals'
import Sale from './pages/Sale'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Search from './pages/Search'
import { CurrencyProvider } from './context/CurrencyContext'
import { CartProvider } from './context/CartContext'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <CurrencyProvider>
      <CartProvider>
        <ScrollToTop />
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="men" element={<Men />} />
          <Route path="sports" element={<Sports />} />
          <Route path="sandals" element={<Sandals />} />
          <Route path="formal" element={<Formal />} />
          <Route path="casual" element={<Casual />} />
          <Route path="running" element={<Running />} />
          <Route path="women" element={<Women />} />
          <Route path="bestsellers" element={<Bestsellers />} />
          <Route path="new-arrivals" element={<NewArrivals />} />
          <Route path="sale" element={<Sale />} />
          <Route path="product" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="search" element={<Search />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        </Routes>
      </CartProvider>
    </CurrencyProvider>
  )
}

export default App
