import React from "react";
import HomeTitle from "../components/HomeTitle";
import Products from "../components/Products";
export const baseURL = "https://dirt-shop-ecom-backend-v2.onrender.com";
const Home = () => {
	return (
		<div className="bg-lemon-light min-h-screen w-screen">
			<HomeTitle />
			<Products />
		</div>
	);
};

export default Home;
