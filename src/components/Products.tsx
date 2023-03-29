import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../pages/Home";

interface productItemProps {
	_id: string;
	name: String;
	image: Array<string>;
	price: Number;
	category: String;
	description: String;
	countInStock: Number;
}

const Products = () => {
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
		<div className="px-[4rem] my-[30px] grid grid-cols-3 gap-[20px]">
			{products.map((productItem: productItemProps) => {
				return (
					<Link
						key={productItem._id}
						to={`product/${productItem._id}`}
						className="w-fit">
						<img
							src={productItem.image[0]}
							className="dirt-hat w-[25rem] h-[25rem] rounded-2xl"
						/>
						<div className="flex justify-between w-[25rem] py-[1.7rem] font-outfit text-[18px] font-semibold text-[#2C382F] leading-[28px] tracking-[.06rem]">
							<h3>{productItem.name}</h3>
							<h3>{`₹${productItem.price}`} </h3>
						</div>
					</Link>
				);
			})}
		</div>
	);
};

export default Products;
