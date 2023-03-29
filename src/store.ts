import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItemProps {
	_id: string;
	name: string;
	price: number;
	image: string;
	category: string;
	description: string;
	countInStock: number;
	quantity: number;
}

let useStore = (set, get) => ({
	// CARTITEMS

	cartItems: [],
	clearCartItems: () => {
		set({
			cartItems: [],
		});
	},
	addItemToCart: ({ item }) => {
		console.log("item", JSON.stringify(item, null, 2));
		const newCartItem = {
			_id: item._id,
			name: item.name,
			price: item.price,
			image: item.image,
			category: item.category,
			description: item.description,
			countInStock: item.countInStock,
			quantity: item.productQuantity,
		};
		const isItemInCart = get().cartItems.find((cartItem: CartItemProps) => {
			return cartItem._id === item._id;
		});
		if (isItemInCart) {
			isItemInCart.quantity += item.quantity;
			return;
		}
		const itemsInCart = get().cartItems;

		const updatedCartItems = [...itemsInCart, newCartItem];
		set({
			cartItems: updatedCartItems,
		});
	},
	removeItemFromCart: ({ itemI }) => {
		const updatedCart = get().cartItems.map((cartItem: CartItemProps) => {
			if (cartItem._id !== itemId) return cartItem;
		});
		const updatedCartItems = updatedCart.filter((item: CartItemProps) => {
			return item !== undefined;
		});
		set({ cartItems: updatedCartItems });
	},
	decreaseQuantity: ({ item }) => {
		if (item.quantity === 1) {
			get().removeItemFromCart({ itemId: item._id });
		} else {
			const updatedCartItems = get().cartItems.map(
				(cartItem: CartItemProps) => {
					if (cartItem._id === item._id) {
						cartItem.quantity -= 1;
					}
					return cartItem;
				}
			);
			set({
				cartItems: updatedCartItems,
			});
		}
	},
	increaseQuantity: ({ item }) => {
		if (item.quantity === item.countInStock) {
			alert("no more items in stock 🐔🐔");
			return;
		}
		const updatedCartItems = get().cartItems.map((cartItem: CartItemProps) => {
			if (cartItem._id === item._id) {
				const currentCartItem = {
					_id: cartItem._id,
					name: cartItem.name,
					brand: cartItem.brand,
					price: cartItem.price,
					image: cartItem.image,
					countInStock: cartItem.countInStock,
					quantity: cartItem.quantity + 1,
				};
				return currentCartItem;
			}
			return cartItem;
		});
		set({
			cartItems: updatedCartItems,
		});
	},

	// CLIENT_SECRET
	clientSecret: "",
	addClientSecret: (value: string) => {
		set({
			clientSecret: value,
		});
	},
});

useStore = persist(useStore, { name: "dirtProductStore" });
useStore = create(useStore);
export default useStore;
