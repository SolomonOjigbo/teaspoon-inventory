import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/sales`;

const API_NEW_SALE = `${API_URL}/newsale`;

// Create New Sale
const createSale = async (newSale) => {
	const response = await axios.post(API_NEW_SALE, newSale);
	const json = response.data;
	localStorage.setItem("sale", JSON.stringify(json));
	return json;
};

// Get all Sales
const getSales = async () => {
	const response = await axios.get(API_URL);
	return response.data;
};

// Delete a Sale
// const deleteSale = async (id) => {
// 	const response = await axios.delete(API_URL + id);
// 	return response.data;
// };
// Get a Sale
const getSale = async (id) => {
	const response = await axios.get(API_URL + id);
	return response.data;
};

const saleService = {
	createSale,
	getSales,
	getSale,
};

export default saleService;
