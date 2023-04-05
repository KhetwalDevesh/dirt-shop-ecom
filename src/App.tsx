import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Catalog from "./pages/Catalog";
import Checkout from "./components/Checkout";
import Home from "./pages/Home";
import Payment from "./pages/Payment";
import ProductDetails from "./pages/ProductDetails";
import Shipping from "./pages/Shipping";
import Success from "./pages/Success";
function App() {
	return (
		<div className="bg-lemon-light overflow-x-hidden">
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/product/:id" element={<ProductDetails />} />
				<Route path="/catalog" element={<Catalog />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/shipping" element={<Shipping />} />
				<Route path="/payment" element={<Payment />} />
				<Route path="/checkout" element={<Checkout />} />
				<Route path="/success" element={<Success />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
