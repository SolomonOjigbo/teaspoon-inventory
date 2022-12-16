import {
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import React from "react";
import { styled } from "@mui/material/styles";

export const ComponentToPrint = React.forwardRef((props, ref) => {
	const { totalQuantity, grandTotal, subTotal, cart } = props;

	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: theme.palette.common.black,
			color: theme.palette.common.white,
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 16,
		},
	}));

	const StyledTableRow = styled(TableRow)(({ theme }) => ({
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
		// hide last border
		"&:last-child td, &:last-child th": {
			border: 0,
		},
	}));

	return (
		<TableContainer component={Paper} ref={ref}>
			<Table
				sx={{ minWidth: 650, mt: 10, padding: 20, alignContent: "center" }}
				aria-label="table"
			>
				<TableHead
					sx={{ backgroundColor: "teal", fontSize: 18, color: "white" }}
				>
					<StyledTableRow>
						<TableCell>Item Name</TableCell>
						<TableCell align="right">Price</TableCell>
						<TableCell align="right">Quantiy</TableCell>
						<TableCell align="right">Total Amount</TableCell>
					</StyledTableRow>
				</TableHead>
				<TableBody>
					{cart.map((cartProduct) => (
						<StyledTableRow
							key={cartProduct.name}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<StyledTableCell component="th" scope="row">
								{cartProduct.name}
							</StyledTableCell>
							<StyledTableCell align="right">
								{cartProduct.price}
							</StyledTableCell>
							<StyledTableCell align="right">
								{cartProduct.itemQuantity}
							</StyledTableCell>
							<StyledTableCell align="right">
								{cartProduct.price * cartProduct.itemQuantity}
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
			<div>Total Quantity: {totalQuantity}</div>
			<br />
			<div>SubTotal: {`₦ ${subTotal}`}</div>
			<br />
			<div>Total + VAT: {`₦ ${grandTotal}`}</div>
		</TableContainer>
	);
});
