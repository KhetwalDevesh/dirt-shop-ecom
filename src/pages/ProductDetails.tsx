import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "./Home";
import clsx from "clsx";

const ProductDetails = () => {
	const { id } = useParams();
	const [productDetails, setProductDetails] = useState([]);
	const [images, setImages] = useState([]);
	useEffect(() => {
		const fetchProductDetails = async () => {
			try {
				const response = await axios.get(`${baseURL}/products/${id}`);
				setProductDetails(response.data);
				setImages(response.data.image);
				console.log("productDetails", JSON.stringify(productDetails, null, 2));
			} catch (error) {
				console.log("error in fetchProductDetails", error);
				throw error;
			}
		};
		fetchProductDetails();
	}, []);
	return (
		<div className="product-details min-h-screen w-screen p-12 bg-lemon-light flex">
			<div className="product-image grid grid-cols-6 gap-y-[8px] gap-x-[20px]">
				{images.map((image, index) => {
					return (
						<img
							src={image}
							className={clsx("h-[30rem]", {
								"col-start-1 col-span-6 h-[60rem]": index == 0,
								"col-start-1 col-span-3": index % 2 == 1,
								"col-start-4 col-span-3": index % 2 == 0 && index != 0,
							})}></img>
					);
				})}
			</div>
			<div className="product-info flex flex-col font-outfit gap-4 px-[4rem]">
				<span className="text-[1.6rem] text-[#191919] font-extrabold tracking-[.06rem]">
					{productDetails.name}
				</span>
				<span className="text-[20px] leading-[24px] tracking-[.06rem]  text-[#474747] font-semibold">
					${productDetails.price} USD
				</span>
				<span className="text-[17px] leading-[24px] tracking-[.06rem] text-[#474747] font-semibold">
					{productDetails.description}
				</span>
				<div className="mt-[40px]">
					<span className=" text-[16px] leading-[24px] tracking-[.06rem] text-[#474747] font-semibold">
						QUANTITY
					</span>
					<div className="flex space-x-8 border-2 border-[#764135] my-4 p-4 w-fit rounded-full">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6 text-[#764135]">
							<path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
						</svg>
						<span className="text-[#764135] font-bold">1</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6 text-[#764135]">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 6v12m6-6H6"
							/>
						</svg>
					</div>
				</div>

				<div className="flex">
					<button className="text-[24px] py-[10px] px-[25px] leading-1 tracking-[.1rem] bg-[#D4E07D] font-bold rounded-full">
						ADD TO CART
					</button>
					<button className="bg-[#D4E07D] rounded-full flex justify-center items-center p-[20px]">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
							/>
						</svg>
					</button>
				</div>

				<button className="my-[5px] font-medium  tracking-[.1rem] min-h-[3rem] bg-[#5a31f4] text-[#fff]">
					Buy with{" "}
					<span className="font-extrabold text-[1rem] p-[5px] px-[12px] bg-[#fff] text-[#5a31f4] rounded-3xl text-center">
						Shop pay
					</span>
				</button>
			</div>
		</div>
	);
};

export default ProductDetails;

// "name": "Dirt Hat",
//         "image": ["https://cdn.shopify.com/s/files/1/0656/2424/4438/products/IMG-7701.jpg?v=1663070639&width=1100",
// 					"https://cdn.shopify.com/s/files/1/0656/2424/4438/products/IMG-1922.jpg?v=1663070639&width=823",
// 					"https://cdn.shopify.com/s/files/1/0656/2424/4438/products/Untitleddesign_35.png?v=1663070639",
// 					"https://cdn.shopify.com/s/files/1/0656/2424/4438/products/IMG-7703.jpg?v=1663070634&width=823"
// 					],
//         "price": 20,
//         "category": "Clothing",
//         "description": "Designed by David Alderman in partnership with Beezer Printing.",
//         "countInStock": 10,

// {
//     "name":"Rainy Dirty",
//     "image":["https://cdn.shopify.com/s/files/1/0656/2424/4438/products/IMG_6672.jpg?v=1659376693&width=823",
// 				"https://cdn.shopify.com/s/files/1/0656/2424/4438/products/IMG_6660.jpg?v=1659376693&width=823",
// 				"https://cdn.shopify.com/s/files/1/0656/2424/4438/products/IMG_6717.jpg?v=1659376693&width=823"
// 				],
//     "price":30.00,
//     "category":"Clothing",
//     "description":"Screen printed by Danger Press in Atlanta, GA. 100% Cotton",
//     "countInStock":10
// }

// "name": "Friendship Dirt",
// "image": ["https://cdn.shopify.com/s/files/1/0656/2424/4438/products/2.png?v=1659367833&width=823",
// 			"https://cdn.shopify.com/s/files/1/0656/2424/4438/products/5.png?v=1659367893",
// 			"https://cdn.shopify.com/s/files/1/0656/2424/4438/products/1.png?v=1659367893",
// 			"https://cdn.shopify.com/s/files/1/0656/2424/4438/products/4.png?v=1659367893",
// 			"https://cdn.shopify.com/s/files/1/0656/2424/4438/products/7.png?v=1659367833"
// 			],
// "price": 50,
// "category": "Cosmetics",
// "description": "A custom bracelet designed and made by Ian Charms. Each bracelet is slightly unique, and may vary from those pictured.",
// "countInStock": 10,

// with clsx
// className={clsx("h-[30rem]", {
// 	"col-start-1 col-span-6 h-[60rem]": index == 0,
// 	"col-start-1 col-span-3": index % 2 == 1,
// 	"col-start-4 col-span-3": index % 2 == 0 && index != 0,
// })}

// without clsx
// className={`h-[30rem] ${
// 	index == 0 ? `col-start-1 col-span-6 h-[60rem]` : ``
// }
// ${index % 2 == 1 ? `col-start-1 col-span-3` : ``}
// ${index % 2 == 0 && index != 0 ? `col-start-4 col-span-3` : ``}`}
