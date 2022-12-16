import "./items.scss";
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useReactToPrint } from "react-to-print";
import {
	decreaseCart,
	deleteFromCart,
	increaseCart,
	resetCart,
} from "../../redux/features/cart/cartSlice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import {
	AiOutlineDelete,
	AiOutlineMinusCircle,
	AiOutlinePlusCircle,
} from "react-icons/ai";
import { MenuItem, TextField } from "@mui/material";
import { ComponentToPrint } from "../componentToPrint/ComponentToPrint";
import { createSale } from "../../redux/features/sales/saleSlice";

const CartItems = () => {
	const [subTotal, setSubTotal] = useState(0);
	const [totalQuantity, setTotalQuantity] = useState(0);
	const [billPopUp, setBillPopUp] = useState(false);
	const [customer, setCustomer] = useState({
		name: "",
		address: "",
		phone: "",
		paymentMethod: "cash",
	});

	const handleChange = (e) => {
		setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { cartItems } = useSelector((state) => state.cart);

	const componentRef = useRef();

	const handleReactToPrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const handlerIncrement = useCallback(
		(product) => () => {
			dispatch(increaseCart(product));
		},
		[dispatch]
	);

	const handlerDecrement = useCallback(
		(product) => () => {
			dispatch(decreaseCart(product));
		},
		[dispatch]
	);

	const handlerDelete = useCallback(
		(product) => () => {
			dispatch(deleteFromCart(product));
		},
		[dispatch]
	);

	const columns = useMemo(
		() => [
			{
				field: "name",
				headerName: "Item",
				width: 180,
			},
			{
				field: "price",
				headerName: "Price",
				width: 80,
			},
			{
				field: "itemQuantity",
				headerName: "Quantity",
				width: 100,
				type: "actions",
				getActions: (params) => [
					<GridActionsCellItem
						icon={<AiOutlineMinusCircle />}
						label="decrease"
						onClick={handlerDecrement(params.row)}
					/>,
					<>
						<span>{params.row.itemQuantity}</span>
					</>,
					<GridActionsCellItem
						icon={<AiOutlinePlusCircle />}
						label="add"
						onClick={handlerIncrement(params.row)}
					/>,
				],
			},
			{
				field: "action",
				headerName: " ",
				type: "actions",
				width: 50,
				getActions: (params) => [
					<GridActionsCellItem
						icon={<AiOutlineDelete />}
						label="delete"
						onClick={handlerDelete(params.row)}
					/>,
				],
			},
		],
		[handlerDecrement, handlerDelete, handlerIncrement]
	);

	useEffect(() => {
		let temp = 0;
		cartItems.forEach(
			(product) => (temp = temp + product.price * product.itemQuantity)
		);
		setSubTotal(temp);
	}, [cartItems]);

	useEffect(() => {
		const totalAmount = cartItems
			.map((item) => item.itemQuantity)
			.reduce((acc, item) => acc + item, 0);
		setTotalQuantity(totalAmount);
	}, [cartItems]);

	const grandTotal = Number(
		Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))
	).toFixed(2);

	const handlerSubmit = () => {
		const newSale = {
			...customer,
			cartItems: cartItems,
			subTotal: subTotal,
			vat: Number(((subTotal / 100) * 5).toFixed(2)),
			grandTotal: Number(grandTotal),
			user: JSON.parse(localStorage.getItem("user")),
		};
		dispatch(createSale(newSale));
		localStorage.setItem("newSale", JSON.stringify(newSale));
		toast.success("Sale Completed!");
		navigate("/sales");

		dispatch(resetCart);
		setCustomer({
			customerName: "",
			customerAddress: "",
			customerPhone: "",
			paymentMethod: "cash",
		});
	};

	const handlePrint = () => {
		handleReactToPrint();
	};
	return (
		<>
			<h4 style={{ padding: 10, backgroundColor: "teal", color: "white" }}>
				Cart
			</h4>
			<Box sx={{ width: 420, height: 550 }}>
				<DataGrid
					rows={cartItems}
					columns={columns}
					getRowId={(row) => row._id}
					disableColumnMenu
					sx={{ fontSize: 15 }}
				/>
			</Box>
			<div className="sub-total">
				<h5>Sub Total:</h5> <h3>₦ {subTotal.toFixed(2)}</h3>
			</div>
			<Button
				fullWidth
				variant="contained"
				sx={{
					color: "white",
					fontSize: 14,
					alignItems: "center",
					backgroundColor: "black",
				}}
				onClick={() => setBillPopUp(true)}
			>
				Checkout
			</Button>
			<Button
				fullWidth
				variant="contained"
				sx={{
					color: "white",
					fontSize: 14,
					alignItems: "center",
					backgroundColor: "teal",
				}}
				onClick={handlePrint}
			>
				Print Invoice
			</Button>

			<Modal
				title="Create Invoice"
				open={billPopUp}
				onClose={() => setBillPopUp(false)}
				className="modal"
			>
				<Box
					component="form"
					className="form"
					autoComplete="off"
					sx={{ mb: 3, fontSize: 15 }}
				>
					<TextField
						required
						name="name"
						label="Customer Name"
						id="name"
						onChange={handleChange}
						value={customer.name}
						variant="outlined"
						sx={{ mb: 3, width: 300, fontSize: 14 }}
					/>
					<TextField
						required
						name="phone"
						label="Customer Phone"
						id="phone"
						onChange={handleChange}
						value={customer.phone}
						variant="outlined"
						sx={{ mb: 3, width: 300, fontSize: 14 }}
					/>
					<TextField
						name="address"
						label="Customer Address"
						id="customerAddress"
						variant="outlined"
						onChange={handleChange}
						value={customer.address}
						required
						sx={{ mb: 3, width: 300, fontSize: 16 }}
					/>

					<TextField
						id="paymentMethod"
						name="paymentMethod"
						select
						required
						label="Select Payment Method"
						onChange={handleChange}
						value={customer.paymentMethod}
						variant="outlined"
						sx={{ mb: 3, width: 300, fontSize: 14 }}
					>
						<MenuItem value="cash">Cash</MenuItem>
						<MenuItem value="bank-transfer">Bank Transfer</MenuItem>
						<MenuItem value="card">Card</MenuItem>
					</TextField>
					<div className="total">
						<span>SubTotal: ₦{subTotal.toFixed(2)}</span>
						<br />
						<span>VAT: ₦{((subTotal / 100) * 5).toFixed(2)}</span>
						<h3>Total: ₦{grandTotal}</h3>
						<div>
							{" "}
							<h5>Total Quantity: {totalQuantity}</h5>{" "}
						</div>
					</div>
					<div className="form-btn-add">
						<Button
							type="submit"
							className="add-new"
							onSubmit={handlerSubmit}
							fullWidth
							variant="contained"
							sx={{
								color: "white",
								fontSize: 14,
								alignItems: "center",
								backgroundColor: "black",
							}}
						>
							Complete Purchase
						</Button>
					</div>
				</Box>
			</Modal>
			<div
				style={{
					display: "none",
					mt: 10,
					p: 20,
					alignContent: "center",
					width: 490,
				}}
			>
				<ComponentToPrint
					subTotal={subTotal}
					totalQuantity={totalQuantity}
					ref={componentRef}
					grandTotal={grandTotal}
					cart={cartItems}
				/>
			</div>
		</>
	);
};
export default CartItems;
