import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import productReducer from "../redux/features/product/productSlice";
import saleReducer from "../redux/features/sales/saleSlice";
import filterReducer from "../redux/features/product/filterSlice";
import cartReducer from "./features/cart/cartSlice";

// const finalReducer = combineReducers({
// 	cartReducer,
// });

// const initialState = {
// 	cartReducer: {
// 		cartItems: localStorage.getItem("cartItems")
// 			? JSON.parse(localStorage.getItem("cartItems"))
// 			: [],
// 	},
// };

export const store = configureStore({
	reducer: {
		auth: authReducer,
		product: productReducer,
		filter: filterReducer,
		cart: cartReducer,
		sale: saleReducer,
	},
});
