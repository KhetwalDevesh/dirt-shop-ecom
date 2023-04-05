import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useStore from "../store";
import { useLocation } from "react-router-dom";
import Checkout from "../components/Checkout";
const STRIPE_PUBLISHABLE_KEY =
	"pk_test_51Mg6UGSCB333o0lIZra1AOi4Z2ED7CJHOp9ThNQJjSaBQjm5sLnWv3HXCrNVaAt9Waf947lhmFHxfFnpIeijrrIP002SFfhEao";
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
const Payment = () => {
	const location = useLocation();
	const orderDetails = location.state.orderResponse;
	console.log("orderDetails", JSON.stringify(orderDetails, null, 2));
	const { clientSecret } = useStore();
	const options = {
		clientSecret,
	};
	return (
		<div className="sm3:px-8 md:p-12 lg:p-16 p-36 border-t-2 border-gray-400 bg-lemon-light">
			<div className="md:gap-8 md:flex-col flex justify-between">
				<div className="sm2:gap-8 md:gap-12 flex gap-20 lg:gap-16">
					<span className="sm3:text-lg sm2:w-[120px] md:w-[150px] text-xl">
						<b>Delivery Address</b>
					</span>
					<div className="sm3:text-sm flex flex-col">
						<div>
							<span>{orderDetails.contactInfo.firstName}</span>{" "}
							<span>{orderDetails.contactInfo.lastName}</span>
						</div>
						<span className="whitespace-nowrap">
							Mobile : {orderDetails.contactInfo.phone}
						</span>
						<span className="whitespace-nowrap">
							{orderDetails.deliveryAddress.address}
						</span>
						<span className="whitespace-nowrap">
							Pincode : {orderDetails.deliveryAddress.pincode}
						</span>
						<span>{orderDetails.deliveryAddress.city}</span>
						<span>{orderDetails.deliveryAddress.state}</span>
						<span>{orderDetails.deliveryAddress.country}</span>
					</div>
				</div>
				<div className="sm2:gap-8 md:gap-12 lg:gap-16 flex gap-20 ">
					<span className="sm3:text-lg sm2:w-[120px] md:w-[150px] text-xl">
						<b>Order Total </b>
					</span>
					<span className="sm3:text-sm">₹{orderDetails.orderAmount}</span>
				</div>
			</div>
			<div className="">
				{clientSecret && (
					<Elements options={options} stripe={stripePromise}>
						<Checkout />
					</Elements>
				)}
			</div>
		</div>
	);
};

export default Payment;
