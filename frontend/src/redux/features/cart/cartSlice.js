import { createSlice } from "@reduxjs/toolkit";

// define initialState

const initialState = {
	cartItems: [],
	// cartQuantity: 0,
};

// function to export
const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			let newProduct = action.payload;
			let existingProduct = state.cartItems.find(
				(product) => product.id === action.payload.id
			);
			if (!existingProduct) state.cartItems = [...state.cartItems, newProduct];
			else
				state.cartItems = state.cartItems.map((product) =>
					product.name === action.payload.name
						? { ...product, itemQuantity: action.payload.itemQuantity++ }
						: product
				);
		},

		increaseCart: (state, action) => {
			state.cartItems = state.cartItems.map((product) =>
				product.id === action.payload.id
					? {
							...product,
							itemQuantity: parseInt(action.payload.itemQuantity) + 1,
					  }
					: product
			);
		},
		decreaseCart: (state, action) => {
			state.cartItems = state.cartItems.map((product) =>
				product.id === action.payload.id && action.payload.itemQuantity > 1
					? {
							...product,
							itemQuantity: Number(action.payload.itemQuantity - 1),
					  }
					: product
			);
		},
		deleteFromCart: (state, action) => {
			state.cartItems = state.cartItems.filter(
				(product) => product.id !== action.payload.id
			);
		},

		resetCart: (state, action) => {
			state.cartItems = [];
		},
	},
});

export const {
	addToCart,
	increaseCart,
	decreaseCart,
	deleteFromCart,
	resetCart,
} = cartSlice.actions;

// selectors
export const selectCartItem = (state) => state.cart.cartItems;

export default cartSlice.reducer;
