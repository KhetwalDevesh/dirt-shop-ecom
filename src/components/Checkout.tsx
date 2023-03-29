import {
	LinkAuthenticationElement,
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
// import { stripePaymentElementOptions } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";

const Checkout = () => {
	const stripe = useStripe();
	const elements = useElements();

	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			if (!paymentIntent) return;
			switch (paymentIntent.status) {
				case "succeeded":
					setMessage("Payment succeeded");
					break;
				case "processing":
					setMessage("Your payment is processing");
					break;
				case "requires_payment_method":
					setMessage("Your payment was not successful, please try again");
					break;
				default:
					setMessage("Something went wrong");
					break;
			}
		});
	}, [stripe]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!stripe || !elements) {
			return;
		}
		setIsLoading(true);
		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `http://127.0.0.1:5173/success`,
			},
		});
		if (error.type == "card_error" || error.type == "validation_error") {
			if (!error.message) {
				return;
			}
			setMessage(error.message);
		} else {
			setMessage("An unexpected error occurred");
		}
		setIsLoading(false);
	};

	const paymentElementOptions = {
		layout: "tabs",
	};

	return (
		<div className="payment-form mt-12 p-8 relative">
			<form id="payment-form" onSubmit={handleSubmit}>
				<LinkAuthenticationElement
					id="link-authentication-element"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<PaymentElement id="payment-element" />
				<div className="w-[100%] flex justify-center items-center mt-6">
					<button
						disabled={isLoading || !stripe || !elements}
						id="submit"
						className="bg-[#1e2a27] text-xl rounded-md p-5 text-white">
						<span id="button-text">
							{isLoading ? (
								<div className="spinner" id="spinner"></div>
							) : (
								<div className="flex justify-center ">
									<span className="">Pay Now</span>
								</div>
							)}
						</span>
					</button>
				</div>
				{message && <div id="payment-message">{message}</div>}
			</form>
		</div>
	);
};
export default Checkout;
