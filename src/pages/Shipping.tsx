import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useStore from "../store";
import { baseURL } from "./Home";

const Shipping = () => {
	const [totalPrice, setTotalPrice] = useState(0);
	const { cartItems, addClientSecret } = useStore();
	const { register, handleSubmit, getValues } = useForm();
	const navigate = useNavigate();
	const onSubmit = handleSubmit((data) => {
		proceedToCheckout();
	});

	const calculateShippingTotal = () => {
		let shippingTotal = 0;
		cartItems.map((cartItem) => {
			shippingTotal += cartItem?.price * cartItem?.quantity;
		});
		setTotalPrice(shippingTotal);
	};

	const proceedToCheckout = async () => {
		try {
			const {
				email,
				phone,
				country,
				firstName,
				lastName,
				address,
				city,
				state,
				pincode,
			} = getValues();
			const orderItem = {
				orderItems: cartItems,
				contactInfo: {
					firstName: firstName,
					lastName: lastName,
					email: email,
					phone: phone,
				},
				deliveryAddress: {
					address: address,
					pincode: pincode,
					city: city,
					state: state,
					country: country,
				},
				orderStatus: "pending",
			};
			console.log("orderItem", JSON.stringify(orderItem, null, 2));
			const response = await axios({
				method: "POST",
				url: `${baseURL}/orders`,
				data: { ...orderItem },
			});
			if (response.data.clientSecret) {
				addClientSecret({ value: response.data.clientSecret });
				navigate("/payment", { state: { orderResponse: response.data } });
			}
		} catch (error) {
			console.log("shipping error");
			console.log(error);
		}
	};
	useEffect(() => {
		calculateShippingTotal();
	}, []);
	return (
		<div className="sm2:flex-col min-h-screen flex">
			<div className="sm2:w-full sm:px-10 w-1/2 bg-lemon-light min-h-screen border-t-[1px] border-gray-400 px-20 py-10">
				<form className="flex flex-col">
					<div className="flex flex-col gap-4">
						<label>Contact Information</label>
						<label>Email</label>
						<input
							placeholder="Email"
							{...register("email")}
							className="border-[1px] p-4 bg-lemon-light border-[#afafa6] rounded-sm outline-0 bg-transparent"
						/>
						<label>Phone</label>
						<input
							placeholder="Phone"
							{...register("phone")}
							className="border-[1px] p-4 bg-lemon-light border-[#afafa6] rounded-sm outline-0 bg-transparent"
						/>
					</div>

					<div className="flex flex-col gap-4 my-4">
						<label>Shipping Address</label>
						<input
							placeholder="Country"
							{...register("country")}
							className="border-[1px] p-4 bg-lemon-light border-[#afafa6] rounded-sm outline-0 bg-transparent"
						/>
						{/* <div className="my-4 flex justify-between"> */}
						<input
							placeholder="First Name"
							{...register("firstName")}
							className="border-[1px] p-4 bg-lemon-light border-[#afafa6] rounded-sm outline-0 bg-transparent"
						/>
						<input
							placeholder="Last Name"
							{...register("lastName")}
							className="border-[1px] p-4 bg-lemon-light border-[#afafa6] rounded-sm outline-0 bg-transparent"
						/>
						{/* </div> */}

						<input
							placeholder="Address"
							{...register("address")}
							className="border-[1px] p-4 bg-lemon-light border-[#afafa6] rounded-sm outline-0 bg-transparent"
						/>

						{/* <div className="my-4 flex justify-between"> */}
						<input
							placeholder="City"
							{...register("city")}
							className="border-[1px] p-4 bg-lemon-light border-[#afafa6] rounded-sm outline-0 bg-transparent"
						/>
						<input
							placeholder="State"
							{...register("state")}
							className="border-[1px] p-4 bg-lemon-light border-[#afafa6] rounded-sm outline-0 bg-transparent"
						/>
						<input
							placeholder="Pincode"
							{...register("pincode")}
							className="border-[1px] p-4 bg-lemon-light border-[#afafa6] rounded-sm outline-0 bg-transparent"
						/>
						{/* </div> */}
					</div>

					<div>
						<button
							className="bg-[#3875B2] p-4 text-white rounded-md font-medium"
							onClick={onSubmit}>
							Continue to shipping
						</button>
					</div>
				</form>
			</div>
			<div className="sm2:w-full sm2:min-h-full w-1/2 bg-[#D4E07D] min-h-screen border-t-[1px] border-l-[1px] border-gray-400 p-8">
				<div className="flex flex-col gap-4">
					{cartItems.map((cartItem) => {
						return (
							<div key={cartItem?._id} className="flex justify-between">
								<div className="flex gap-4 ">
									<div className="relative">
										<img
											src={`${cartItem?.image}`}
											className="h-[100px] w-[100px]"
										/>
										<span className="bg-black text-[#D4E07D] h-[16px] w-[16px] rounded-full absolute -top-1 -right-2 flex justify-center items-center text-[10px] absolute">
											{cartItem?.quantity}
										</span>
									</div>
									<span className="flex items-center ">{cartItem?.name}</span>
								</div>
								<div className="flex items-center">
									₹{cartItem?.price * cartItem?.quantity}
								</div>
							</div>
						);
					})}
				</div>
				<div className="flex justify-between pt-4 text-2xl font-medium border-t-[1px] border-[#afafa6] mt-8">
					<span>Total</span>
					<span>₹{totalPrice}</span>
				</div>
			</div>
		</div>
	);
};

export default Shipping;
