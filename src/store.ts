import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItemProps {
	_id: string;
	name: string;
	price: number;
	image: Array<string>;
	category: string;
	description: string;
	countInStock: number;
	quantity: number;
}

interface ICartItem {
	_id: string;
	item: CartItemProps;
	name: string;
	price: number;
	image: Array<string>;
	category: string;
	description: string;
	countInStock: number;
	quantity: number;
}
interface IitemId {
	itemId: string;
}

interface IClientSecret {
	value: string;
}

interface IGlobalStore {
	cartItems: ICartItem[];
	addItemToCart: ({ item }: ICartItem) => void;
	removeItemFromCart: ({ itemId }: IitemId) => void;
	decreaseQuantity: ({ item }: ICartItem) => void;
	increaseQuantity: ({ item }: ICartItem) => void;
	clearCartItems: () => void;
	clientSecret: string;
	addClientSecret: ({ value }: IClientSecret) => void;
}

let useStore = create<IGlobalStore>()(
	persist(
		(set, get) => ({
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
					quantity: item.quantity,
				};
				const isItemInCart = get().cartItems.find((cartItem) => {
					return cartItem._id === item._id;
				});
				if (isItemInCart) {
					isItemInCart.quantity += item.quantity;
					set({
						cartItems: get().cartItems,
					});
					return;
				}
				const itemsInCart = get().cartItems;

				const updatedCartItems = [...itemsInCart, newCartItem];
				set({
					cartItems: updatedCartItems,
				});
			},
			removeItemFromCart: ({ itemId }) => {
				const updatedCart = get().cartItems.map((cartItem) => {
					if (cartItem._id !== itemId) return cartItem;
				});
				const updatedCartItems = updatedCart.filter((item) => {
					return item !== undefined;
				});
				set({ cartItems: updatedCartItems });
			},
			decreaseQuantity: ({ item }) => {
				if (item.quantity === 1) {
					get().removeItemFromCart({ itemId: item._id });
				} else {
					const updatedCartItems = get().cartItems.map((cartItem) => {
						if (cartItem._id === item._id) {
							cartItem.quantity -= 1;
						}
						return cartItem;
					});
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
				const updatedCartItems = get().cartItems.map((cartItem) => {
					if (cartItem._id === item._id) {
						const currentCartItem = {
							_id: cartItem._id,
							name: cartItem.name,
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
			addClientSecret: ({ value }) => {
				set({
					clientSecret: value,
				});
			},
		}),
		{
			name: "dirtProductStore",
		}
	)
);

// useStore = create<IGlobalStore>(useStore);
// useStore = persist(useStore, { name: "dirtProductStore" });
export default useStore;
