import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Products from "../components/Products";
import { baseURL } from "./Home";

interface productItemProps {
	_id: string;
	name: String;
	image: string;
	price: Number;
	category: String;
	description: String;
	countInStock: Number;
}

const Catalog = () => {
	const navigate = useNavigate();

	const handleCategoryFilter = (e) => {
		const filterClassSelector = document.querySelector(`.category`);
		filterClassSelector?.classList.toggle("show");
	};

	const handleCostFilter = (e) => {
		const filterClassSelector = document.querySelector(`.cost`);
		filterClassSelector?.classList.toggle("show");
	};

	window.onclick = (e) => {
		console.log(e);
		console.log(e.target.classList[0]);
		if (e.target.classList[0] == "dropbtn") {
			return;
		}
		const filterClasses = document.getElementsByClassName("filter");
		for (let i = 0; i < filterClasses.length; i++) {
			const currentClass = filterClasses[i];
			if (currentClass.classList.contains("show")) {
				currentClass.classList.remove("show");
			}
		}
	};

	const [products, setProducts] = useState([]);
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get(`${baseURL}/products`);
				setProducts(response.data);
				console.log("products", JSON.stringify(products, null, 2));
			} catch (error) {
				console.log("error in fetchProducts", error);
				throw error;
			}
		};
		fetchProducts();
	}, []);

	return (
		<div className="bg-lemon-light min-h-screen ">
			<h1 className="text-[48px] leading-[60px] mx-[3.5rem] py-[1rem] tracking-[.06rem] text-[#DD7339]">
				Products
			</h1>
			<div className="px-[4rem] my-[30px] grid grid-cols-3 gap-[20px]">
				{products.map((productItem: productItemProps) => {
					return (
						<div
							key={productItem._id}
							onClick={() => {
								navigate(`/product/${productItem._id}`);
							}}
							className="w-fit cursor-pointer">
							<img
								src={productItem.image}
								className="dirt-hat w-[25rem] h-[25rem] rounded-2xl"
							/>
							<div className="flex justify-between w-[25rem] py-[1.7rem] pb-0 font-outfit text-[18px] font-semibold text-[#2C382F] leading-[28px] tracking-[.06rem]">
								<h3>{productItem.name}</h3>
								<h3>{`₹${productItem.price}`}</h3>
							</div>
						</div>
					);
				})}
			</div>
			{/* <Products /> */}
			{/* <div className="filter-sort flex justify-between px-[5rem] py-[36px]">
				<div className="filters flex gap-8">
					<span>FILTER: </span>
					<div className="inline">
						<button
							className="dropbtn flex gap-2"
							onClick={(e) => {
								handleCategoryFilter(e);
							}}>
							<span className="dropbtn">CATEGORY </span>
							<span className="dropbtn items-center flex h-[24px]">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="dropbtn w-4 h-4">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19.5 8.25l-7.5 7.5-7.5-7.5"
									/>
								</svg>
							</span>
						</button>
						<div className="dropbtn filter category hidden flex flex-col border-2 border-gray-400 p-4 w-[20rem] h-[8rem] fixed">
							<div className="dropbtn">
								<input type="checkbox" value="Clothing" className="dropbtn" />
								<label className="dropbtn pl-2">Clothing</label>
							</div>
							<div className="dropbtn">
								<input type="checkbox" value="Cosmetics" className="dropbtn" />
								<label className="dropbtn pl-2">Cosmetics</label>
							</div>
						</div>
					</div>

					<div className="inline">
						<button
							className="dropbtn flex gap-2"
							onClick={(e) => {
								handleCostFilter(e);
							}}>
							<span className="dropbtn">COST </span>
							<span className="dropbtn items-center flex h-[24px]">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="dropbtn w-4 h-4">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19.5 8.25l-7.5 7.5-7.5-7.5"
									/>
								</svg>
							</span>
						</button>
						<div className="dropbtn filter cost hidden flex flex-col  border-2 border-gray-400 p-4 w-[20rem] h-[8rem] fixed">
							<div className="dropbtn flex justify-between">
								<input
									type="text"
									placeholder="$ From"
									value=""
									className="dropbtn w-[6rem] p-3 border-2 border-gray-400 bg-lemon-light"
								/>

								<input
									type="text"
									placeholder="$ To"
									value=""
									className="dropbtn w-[6rem] p-3 border-2 border-gray-400 bg-lemon-light"
								/>
							</div>
						</div>
					</div>
				</div>
				<div>
					<span>SORT BY: </span>
					<select className="bg-lemon-light">
						<option>ALPHABETICALLY,A-Z</option>
						<option>ALPHABETICALLY,Z-A</option>
						<option>PRICE,LOW TO HIGH</option>
						<option>PRICE,HIGH TO LOW</option>
					</select>
				</div>
			</div> */}
		</div>
	);
};

export default Catalog;
