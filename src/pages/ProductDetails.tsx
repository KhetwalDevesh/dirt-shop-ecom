// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "./Home";
import clsx from "clsx";
import useStore from "../store";
import { toast, Toaster } from "react-hot-toast";
import { fallbackProducts } from "../constants/fallbackProducts";

interface productDetailsProps {
	_id: string;
	name: string;
	image: Array<string>;
	price: number;
	description: string;
	countInStock: number;
	category: string;
}

const ProductDetails = () => {
	const { id } = useParams();
	const [productDetails, setProductDetails] = useState<productDetailsProps>();
	const [fallbackProductDetails, setFallbackProductDetails] =
		useState<productDetailsProps>();
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState<boolean>();
	const {
		cartItems,
		addItemToCart,
		removeItemFromCart,
		increaseQuantity,
		decreaseQuantity,
		clearCartItems,
	} = useStore();
	const [productQuantity, setProductQuantity] = useState(1);
	useEffect(() => {
		const fetchProductDetails = async () => {
			try {
				setLoading(true);
				const response = await axios.get(`${baseURL}/products/${id}`);
				setProductDetails(response.data);
				setLoading(false);
				// console.log("productDetails", JSON.stringify(productDetails, null, 2));
				// console.log("response", JSON.stringify(response.data, null, 2));
				setImages(response.data.image);
				// console.log("productDetails", JSON.stringify(productDetails, null, 2));
			} catch (error) {
				console.log("error in fetchProductDetails", error);
				throw error;
			}
		};

		const fetchFallbackProductDetails = async () => {
			try {
				fallbackProducts.map((fallbackProductItem) => {
					// console.log(fallbackProductItem);
					if (fallbackProductItem._id === id) {
						console.log("inside fallback");
						setFallbackProductDetails(fallbackProductItem);
						return;
					}
				});
			} catch (error) {
				console.log("error in fetchProductDetails", error);
				throw error;
			}
		};

		fetchFallbackProductDetails();
		fetchProductDetails();
		// clearCartItems();
	}, []);

	// if (loading)
	// 	return (
	// 		<div className="loading flex justify-center items-center w-screen min-h-screen">
	// 			<div className="circle-loader"></div>
	// 		</div>
	// 	);
	if (loading) {
		return (
			<div className="sm:gap-8 sm:flex-col sm:px-8 product-details min-h-screen w-[100vw] p-12 bg-lemon-light flex">
				<Toaster />
				<div className="product-image grid grid-cols-6 gap-y-[8px]">
					{fallbackProductDetails?.image.map((image, index) => {
						return (
							<img
								key={image}
								src={image}
								className={clsx("h-[30rem]", {
									"md:h-[20rem] lg:h-[30rem] col-start-1 col-span-6 h-[60rem]":
										index == 0,
									"sm:hidden md:h-[20rem] lg:h-[15rem] md:col-span-6 col-start-1 col-span-3 xl:h-[20rem]":
										index % 2 == 1,
									"sm:hidden md:h-[20rem] lg:h-[15rem] md:col-start-1 md:col-span-6 col-start-4 col-span-3 xl:h-[20rem]":
										index % 2 == 0 && index != 0,
								})}></img>
						);
					})}
				</div>
				<div className="sm:px-0 md:px-[2rem] min-h-screen product-info flex flex-col font-outfit gap-4 px-[4rem]">
					<span className="text-[1.6rem] text-[#191919] font-extrabold tracking-[.06rem]">
						{fallbackProductDetails?.name}
					</span>
					<span className="text-[20px] leading-[24px] tracking-[.06rem]  text-[#474747] font-semibold">
						₹{fallbackProductDetails?.price}
					</span>
					<span className="text-[17px] leading-[24px] tracking-[.06rem] text-[#474747] font-semibold">
						{fallbackProductDetails?.description}
					</span>
					<div className="sm:mt-0 mt-[40px]">
						<span className=" text-[16px] leading-[24px] tracking-[.06rem] text-[#474747] font-semibold">
							QUANTITY
						</span>
						<div className="flex space-x-8 border-2 border-[#764135] my-4 p-4 w-fit rounded-full">
							<svg
								onClick={() => {
									productQuantity === fallbackProductDetails?.countInStock
										? () => {
												removeItemFromCart({
													itemId: fallbackProductDetails?._id,
												});
										  }
										: setProductQuantity(
												(productQuantity: number) => productQuantity - 1
										  );
								}}
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 text-[#764135] cursor-pointer">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M18 12H6"
								/>
							</svg>
							<span className="text-[#764135] font-bold">
								{productQuantity}
							</span>
							<svg
								onClick={() => {
									productQuantity === fallbackProductDetails?.countInStock
										? () => {
												alert("no more items in stock");
												return;
										  }
										: setProductQuantity(
												(productQuantity: number) => productQuantity + 1
										  );
								}}
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 text-[#764135] cursor-pointer">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 6v12m6-6H6"
								/>
							</svg>
						</div>
					</div>

					<div className="flex">
						<button
							className="sm3:px-[20px] sm3:text-[16px] text-[24px] py-[10px] px-[25px] leading-1 tracking-[.1rem] bg-[#D4E07D] font-bold rounded-full"
							onClick={() => {
								addItemToCart({
									item: {
										_id: fallbackProductDetails?._id,
										name: fallbackProductDetails?.name,
										image: fallbackProductDetails?.image,
										price: fallbackProductDetails?.price,
										category: fallbackProductDetails?.category,
										description: fallbackProductDetails?.description,
										countInStock: fallbackProductDetails?.countInStock,
										quantity: productQuantity,
									},
								});
								toast.success("Item added to Cart");
							}}>
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
	}

	return (
		<div className="sm:gap-8 sm:flex-col sm:px-8 product-details min-h-screen w-[100vw] p-12 bg-lemon-light flex">
			<Toaster />
			<div className="product-image grid grid-cols-6 gap-y-[8px]">
				{images.map((image, index) => {
					return (
						<img
							key={image}
							src={image}
							className={clsx("h-[30rem]", {
								"md:h-[20rem] lg:h-[30rem] col-start-1 col-span-6 h-[60rem]":
									index == 0,
								"sm:hidden md:h-[20rem] lg:h-[15rem] md:col-span-6 col-start-1 col-span-3 xl:h-[20rem]":
									index % 2 == 1,
								"sm:hidden md:h-[20rem] lg:h-[15rem] md:col-start-1 md:col-span-6 col-start-4 col-span-3 xl:h-[20rem]":
									index % 2 == 0 && index != 0,
							})}></img>
					);
				})}
			</div>
			<div className="sm:px-0 md:px-[2rem] min-h-screen product-info flex flex-col font-outfit gap-4 px-[4rem]">
				<span className="text-[1.6rem] text-[#191919] font-extrabold tracking-[.06rem]">
					{fallbackProductDetails?.name}
				</span>
				<span className="text-[20px] leading-[24px] tracking-[.06rem]  text-[#474747] font-semibold">
					₹{productDetails?.price}
				</span>
				<span className="text-[17px] leading-[24px] tracking-[.06rem] text-[#474747] font-semibold">
					{productDetails?.description}
				</span>
				<div className="sm:mt-0 mt-[40px]">
					<span className=" text-[16px] leading-[24px] tracking-[.06rem] text-[#474747] font-semibold">
						QUANTITY
					</span>
					<div className="flex space-x-8 border-2 border-[#764135] my-4 p-4 w-fit rounded-full">
						<svg
							onClick={() => {
								productQuantity === productDetails?.countInStock
									? () => {
											removeItemFromCart({ itemId: productDetails?._id });
									  }
									: setProductQuantity(
											(productQuantity: number) => productQuantity - 1
									  );
							}}
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6 text-[#764135] cursor-pointer">
							<path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
						</svg>
						<span className="text-[#764135] font-bold">{productQuantity}</span>
						<svg
							onClick={() => {
								productQuantity === productDetails?.countInStock
									? () => {
											alert("no more items in stock");
											return;
									  }
									: setProductQuantity(
											(productQuantity: number) => productQuantity + 1
									  );
							}}
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6 text-[#764135] cursor-pointer">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 6v12m6-6H6"
							/>
						</svg>
					</div>
				</div>

				<div className="flex">
					<button
						className="sm3:px-[20px] sm3:text-[16px] text-[24px] py-[10px] px-[25px] leading-1 tracking-[.1rem] bg-[#D4E07D] font-bold rounded-full"
						onClick={() => {
							addItemToCart({
								item: {
									_id: productDetails?._id,
									name: productDetails?.name,
									image: productDetails?.image,
									price: productDetails?.price,
									category: productDetails?.category,
									description: productDetails?.description,
									countInStock: productDetails?.countInStock,
									quantity: productQuantity,
								},
							});
							toast.success("Item added to Cart");
						}}>
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
