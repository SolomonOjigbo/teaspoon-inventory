import React, { useEffect, useRef, useState } from "react";
import { getProducts } from "../../redux/features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import ItemCards from "../../components/CartItems/ItemCards";
import CartItems from "../../components/CartItems/CartItems";
import "./POS.scss";

function POSPage() {
	useRedirectLoggedOutUser("/login");
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const { products, isLoading, isError, message } = useSelector(
		(state) => state.product
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isLoggedIn === true) {
			dispatch(getProducts());
		}

		if (isError) {
			console.log(message);
		}
	}, [isLoggedIn, isError, message, dispatch]);

	return (
		<div className="pos_main">
			<div className="sales-content-area">
				<h3> Point of Sale</h3>
				<p className="text-white">Pick Items</p>
				<div className="cards-holder">
					<ItemCards products={products} isLoading={isLoading} />
				</div>
			</div>
			<div className="cart-content-area">
				<hr />
				<div className="cart-holder">
					<CartItems />
				</div>
			</div>
		</div>
	);
}

export default POSPage;
