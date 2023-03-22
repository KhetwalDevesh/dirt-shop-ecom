import React from "react";
import HomeTitle from "../components/HomeTitle";
import Products from "../components/Products";
export const baseURL = "http://localhost:8000";
const Home = () => {
	return (
		<div className="bg-lemon-light h-screen w-screen">
			<HomeTitle />
			<Products />
		</div>
	);
};

export default Home;
