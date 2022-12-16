import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import saleService from "./saleService";
import { toast } from "react-toastify";

const initialState = {
	sale: {},
	sales: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
	totalSalesValue: 0,
	// outOfStock:
	// category: [],
};

// Create New Sale
export const createSale = createAsyncThunk(
	"sales/newsale",
	async (newSale, thunkAPI) => {
		try {
			return await saleService.createSale(newSale);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			console.log(message);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Get all sales
export const getSales = createAsyncThunk(
	"sales/getAll",
	async (_, thunkAPI) => {
		try {
			return await saleService.getSales();
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			console.log(message);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Get a Sale
export const getSale = createAsyncThunk(
	"sales/getSale",
	async (id, thunkAPI) => {
		try {
			return await saleService.getSale(id);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			console.log(message);
			return thunkAPI.rejectWithValue(message);
		}
	}
);
// Update sale record
// export const updateSale = createAsyncThunk(
// 	"sales/updateSale",
// 	async ({ id, formData }, thunkAPI) => {
// 		try {
// 			return await saleService.updateSale(id, formData);
// 		} catch (error) {
// 			const message =
// 				(error.response &&
// 					error.response.data &&
// 					error.response.data.message) ||
// 				error.message ||
// 				error.toString();
// 			console.log(message);
// 			return thunkAPI.rejectWithValue(message);
// 		}
// 	}
// );

const saleSlice = createSlice({
	name: "sale",
	initialState,
	reducers: {
		TOTAL_SALES_VALUE(state, action) {
			const sales = action.payload;
			// const array = [];
			// sales.map((item) => {
			// 	const { price, quantity } = item;
			// 	const productValue = price * quantity;
			// 	return array.push(productValue);
			// });
			const totalSalesValue = sales.reduce((a, b) => {
				return a + b.grandTotal;
			}, 0);
			state.totalSalesValue = totalSalesValue;
		},
		NEW_SALE(state, action) {
			state.sale = action.payload;
		},
		// CALC_OUTOFSTOCK(state, action) {
		// 	const products = action.payload;
		// 	const array = [];
		// 	products.map((item) => {
		// 		const { quantity } = item;

		// 		return array.push(quantity);
		// 	});
		// 	let count = 0;
		// 	array.forEach((number) => {
		// 		if (number === 0 || number === "0") {
		// 			count += 1;
		// 		}
		// 	});
		// 	state.outOfStock = count;
		// },
		// CALC_CATEGORY(state, action) {
		// 	const sales = action.payload;
		// 	const array = [];
		// 	sales.map((item) => {
		// 		const { category } = item;

		// 		return array.push(category);
		// 	});
		// 	const uniqueCategory = [...new Set(array)];
		// 	state.category = uniqueCategory;
		// },
	},
	extraReducers: (builder) => {
		builder
			.addCase(createSale.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createSale.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.sale = action.payload;
				console.log(action.payload);
				state.sales.push(action.payload);
				toast.success("Sale completed successfully");
			})
			.addCase(createSale.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(action.payload);
			})
			.addCase(getSales.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getSales.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				console.log(action.payload);

				state.sales = action.payload;
			})
			.addCase(getSales.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(action.payload);
			})
			.addCase(getSale.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getSale.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.sale = action.payload;
			})
			.addCase(getSale.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(action.payload);
			});
		// .addCase(updateSale.pending, (state) => {
		// 	state.isLoading = true;
		// })
		// .addCase(updateSale.fulfilled, (state, action) => {
		// 	state.isLoading = false;
		// 	state.isSuccess = true;
		// 	state.isError = false;
		// 	toast.success("Sale updated successfully");
		// })
		// .addCase(updateSale.rejected, (state, action) => {
		// 	state.isLoading = false;
		// 	state.isError = true;
		// 	state.message = action.payload;
		// 	toast.error(action.payload);
		// });
	},
});

export const { TOTAL_SALES_VALUE, NEW_SALE } = saleSlice.actions;

export const saleIsLoading = (state) => state.sale.isLoading;
export const selectSale = (state) => state.sale.sale;
export const selectSales = (state) => state.sale.sales;
export const selectTotalSalesValue = (state) => state.sale.totalSalesValue;

export default saleSlice.reducer;
