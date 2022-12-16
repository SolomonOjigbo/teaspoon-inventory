import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/invoices`;

const Sales = () => {
	// const dispatch = useDispatch();
	const [salesData, setSalesData] = useState([]);

	// const getAllInvoices = async () => {
	// 	try {
	// 		const { data } = await axios.get(API_URL);
	// 		setBillsData(data);
	// 		console.log(data);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	// useEffect(() => {
	// 	getAllInvoices();
	// }, []);

	const columns = [
		{
			field: "id",
			headerName: "id",
			width: 80,
		},
		{
			field: "customerName",
			headerName: "Customer Name",
			width: 180,
		},
		{
			headerName: "Phone Number",
			field: "customerPhone",
			width: 190,
		},
		{
			headerName: "Customer Address",
			field: "customerAddress",
			width: 200,
		},
		{
			headerName: "Payment Method",
			field: "paymentMethod",
			width: 200,
		},
		{
			headerName: "Amount Paid",
			field: "grandTotal",
			width: 200,
		},
	];

	return (
		<div>
			<h2>All Sales </h2>
			<div style={{ height: 600, width: "100%" }}>
				<DataGrid
					rows={salesData}
					columns={columns}
					pageSize={10}
					rowsPerPageOptions={[10, 20, 30]}
					checkboxSelection
					sx={{ fontSize: 16 }}
				/>
			</div>
		</div>
	);
};

export default Sales;
