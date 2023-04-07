// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store";
import { Toaster, toast } from "react-hot-toast";

const Cart = () => {
	const { cartItems, decreaseQuantity, increaseQuantity, removeItemFromCart } =
		useStore();
	const [totalPrice, setTotalPrice] = useState(0);
	const navigate = useNavigate();
	console.log("cartItems", JSON.stringify(cartItems, null, 2));

	const calculateShippingTotal = () => {
		let shippingTotal = 0;
		cartItems.map((cartItem) => {
			shippingTotal += cartItem?.price * cartItem?.quantity;
		});
		setTotalPrice(shippingTotal);
	};

	useEffect(() => {
		calculateShippingTotal();
	}, [cartItems]);

	return (
		<div className="bg-lemon-light min-h-screen sm:pt-[60px]">
			<Toaster />
			<h1 className="sm3:text-[42px] text-[48px] leading-[60px] mx-12 py-[1rem] tracking-[.06rem] text-[#DD7339]">
				Your Cart
			</h1>
			<div className="md:hidden grid grid-cols-4 mx-12 py-10 border-b-[1px] border-black">
				<div className="flex justify-start">
					<span>NAME</span>
				</div>
				<div className="flex justify-center">
					<span>QUANTITY</span>
				</div>
				<div className=""></div>
				<div className="flex justify-center">
					<span>TOTAL</span>
				</div>
			</div>

			<div>
				{cartItems.map((cartItem) => {
					return (
						<div key={cartItem?._id} className="min-w-screen">
							<div className="md:grid-cols-2 grid grid-cols-4 justify-between min-w-screen mx-12 py-10 border-b-[1px] border-black">
								<div className="md:flex-col md:gap-4 xl:gap-4 flex gap-8">
									<img
										src={`${cartItem?.image}`}
										className="sm2:h-[100px] sm2:w-[100px] xl:h-[150px] xl:w-[150px] h-[200px] w-[200px] rounded-xl"
									/>
									<div className="sm2:w-[100px] flex flex-col justify-center items-start md:items-center md:w-[150px]">
										<span className="break-words">{cartItem?.name}</span>
										<span>₹{cartItem?.price}</span>
									</div>
								</div>

								<div className="hidden md:flex md:flex-col">
									<div className="flex items-center justify-center">
										<div className="sm3:space-x-2 sm3:p-0 sm2:space-x-4 md:m-0 sm2:p-1 mdlg:p-2 flex space-x-8 border-2 border-[#764135] my-4 p-4 w-fit rounded-full">
											<svg
												onClick={() => {
													decreaseQuantity({ item: cartItem });
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
												{cartItem?.quantity}
											</span>
											<svg
												onClick={() => {
													increaseQuantity({ item: cartItem });
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

									<div className="flex justify-center items-center h-[60px]">
										<svg
											onClick={() => {
												removeItemFromCart({ itemId: cartItem?._id });
												toast.success("Product Item deleted successfully");
											}}
											className="icon icon-remove h-[15px] w-[15px] inline-block cursor-pointer"
											xmlns="http://www.w3.org/2000/svg"
											// viewBox="0 0 24 24"
											aria-hidden="true"
											focusable="false"
											role="presentation">
											<path
												d="M14 3h-3.53a3.07 3.07 0 00-.6-1.65C9.44.82 8.8.5 8 .5s-1.44.32-1.87.85A3.06 3.06 0 005.53 3H2a.5.5 0 000 1h1.25v10c0 .28.22.5.5.5h8.5a.5.5 0 00.5-.5V4H14a.5.5 0 000-1zM6.91 1.98c.23-.29.58-.48 1.09-.48s.85.19 1.09.48c.2.24.3.6.36 1.02h-2.9c.05-.42.17-.78.36-1.02zm4.84 11.52h-7.5V4h7.5v9.5z"
												fill="currentColor"></path>
											<path
												d="M6.55 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5zM9.45 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5z"
												fill="currentColor"></path>
										</svg>
									</div>

									<div className="flex justify-center items-center">
										<span className="">
											₹{cartItem?.price * cartItem?.quantity}
										</span>
									</div>
								</div>

								<div className="md:hidden flex items-center justify-center">
									<div className="md:space-x-4 md:p-1 mdlg:p-2 flex space-x-8 border-2 border-[#764135] my-4 p-4 w-fit rounded-full">
										<svg
											onClick={() => {
												decreaseQuantity({ item: cartItem });
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
											{cartItem?.quantity}
										</span>
										<svg
											onClick={() => {
												increaseQuantity({ item: cartItem });
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

								<div className="md:hidden flex justify-center items-center h-full">
									<svg
										onClick={() => {
											removeItemFromCart({ itemId: cartItem?._id });
											toast.success("Product Item deleted successfully");
										}}
										className="icon icon-remove h-[15px] w-[15px] inline-block cursor-pointer"
										xmlns="http://www.w3.org/2000/svg"
										// viewBox="0 0 24 24"
										aria-hidden="true"
										focusable="false"
										role="presentation">
										<path
											d="M14 3h-3.53a3.07 3.07 0 00-.6-1.65C9.44.82 8.8.5 8 .5s-1.44.32-1.87.85A3.06 3.06 0 005.53 3H2a.5.5 0 000 1h1.25v10c0 .28.22.5.5.5h8.5a.5.5 0 00.5-.5V4H14a.5.5 0 000-1zM6.91 1.98c.23-.29.58-.48 1.09-.48s.85.19 1.09.48c.2.24.3.6.36 1.02h-2.9c.05-.42.17-.78.36-1.02zm4.84 11.52h-7.5V4h7.5v9.5z"
											fill="currentColor"></path>
										<path
											d="M6.55 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5zM9.45 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5z"
											fill="currentColor"></path>
									</svg>
								</div>

								<div className="md:hidden flex justify-center items-center">
									<span className="">
										₹{cartItem?.price * cartItem?.quantity}
									</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<div className="flex justify-end">
				<div className="w-[20rem] mx-12 py-10 flex flex-col gap-4">
					<div className="flex justify-between tracking-[.06rem] text-[1.2rem]">
						<span>Subtotal</span>
						<span className="">₹{totalPrice}</span>
					</div>
					<button
						className="bg-black text-[#D4E07D] w-[100%] py-2 tracking-[.06rem]"
						onClick={() => {
							navigate("/shipping");
						}}>
						Check out
					</button>
				</div>
			</div>
		</div>
	);
};

export default Cart;
