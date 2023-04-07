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
	const [loading, setLoading] = useState<boolean>();
	const [mouseEntered, setMouseEntered] = useState<string>("");
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const response = await axios.get(`${baseURL}/products`);
				setProducts(response.data);
				setLoading(false);
				console.log("products", JSON.stringify(products, null, 2));
			} catch (error) {
				console.log("error in fetchProducts", error);
				throw error;
			}
		};
		fetchProducts();
	}, []);

	if (loading)
		return (
			<div className="loading flex justify-center items-center w-screen h-[100%]">
				<div className="circle-loader"></div>
			</div>
		);

	return (
		<div className="sm:px-[30px] my-[30px] flex flex-wrap basis-4/12  justify-between px-[60px]">
			{products.map((productItem: productItemProps) => {
				return (
					<div className="flex sm:justify-center sm:w-full mb-[40px]">
						<Link
							key={productItem._id}
							to={`product/${productItem._id}`}
							className="w-fit items-center"
							onMouseEnter={() => {
								setMouseEntered(productItem._id);
							}}
							onMouseLeave={() => {
								setMouseEntered("");
							}}>
							{mouseEntered === productItem._id ? (
								<div className="overflow-hidden rounded-2xl">
									<img
										src={productItem.image[1]}
										className="onMouseEnterImage dirt-hat sm4:w-[12rem] sm4:h-[12rem] sm3:w-[15rem] sm3:h-[15rem] sm2:w-[20rem] sm2:h-[20rem] sm:w-[25rem] sm:h-[25rem] md:w-[12rem] md:h-[12rem] lg:w-[17rem] lg:h-[17rem] xl:w-[20rem] xl:h-[20rem] 2xl:w-[28rem] 2xl:h-[28rem] w-[30rem] h-[30rem] rounded-2xl"
									/>
								</div>
							) : (
								<img
									src={productItem.image[0]}
									className="dirt-hat sm4:w-[12rem] sm4:h-[12rem] sm3:w-[15rem] sm3:h-[15rem] sm2:w-[20rem] sm2:h-[20rem] sm:w-[25rem] sm:h-[25rem] md:w-[12rem] md:h-[12rem] lg:w-[17rem] lg:h-[17rem] xl:w-[20rem] xl:h-[20rem] 2xl:w-[28rem] 2xl:h-[28rem] w-[30rem] h-[30rem] rounded-2xl"
								/>
							)}
							<div className="flex justify-between sm4:w-[12rem] sm3:w-[15rem] sm2:w-[20rem]  sm:w-[25rem] md:text-[16px] md:w-[12rem] lg:w-[17rem] xl:w-[20rem] 2xl:w-[28rem]  pt-[1.7rem] font-outfit text-[18px] w-[30rem]  font-semibold text-[#2C382F] leading-[28px] tracking-[.06rem]">
								<h3>{productItem.name}</h3>
								<h3>{`₹${productItem.price}`} </h3>
							</div>
						</Link>
					</div>
				);
			})}
		</div>
	);
};

export default Products;
