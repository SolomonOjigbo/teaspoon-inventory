import React, { useEffect, useState } from "react";
import "./items.scss";
import { useSelector, useDispatch } from "react-redux";
import {
	FILTER_PRODUCTS,
	selectFilteredPoducts,
} from "../../redux/features/product/filterSlice";
import { addToCart, selectCartItem } from "../../redux/features/cart/cartSlice";
import ReactPaginate from "react-paginate";
import Search from "../search/Search";
import { Card } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ItemCards = ({ products }) => {
	const [search, setSearch] = useState("");
	const filteredProducts = useSelector(selectFilteredPoducts);
	const dispatch = useDispatch();

	const [currentItems, setCurrentItems] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 5;

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;

		setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, filteredProducts]);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
		setItemOffset(newOffset);
	};
	//   End Pagination

	useEffect(() => {
		dispatch(FILTER_PRODUCTS({ products, search }));
	}, [products, search, dispatch]);

	const handleAddToCart = (product) => {
		dispatch(
			addToCart({
				...product,
				itemQuantity: 1,
				id: product._id,
			})
		);
	};
	return (
		<div className="main">
			<div>
				<Search value={search} onChange={(e) => setSearch(e.target.value)} />
			</div>
			<div className="card_items">
				{currentItems.map((product) => (
					<Card
						sx={{ maxWidth: 345 }}
						key={product._id}
						className="item-card"
						onClick={() => handleAddToCart(product)}
					>
						<CardMedia
							component="img"
							alt={product.name}
							height="160"
							image={product.image.filePath}
							className="cart-image"
						/>
						<CardContent>
							<Typography gutterBottom variant="h4" component="div">
								{product.name}
							</Typography>
							<Typography gutterBottom variant="h5" component="div">
								{product.category}
							</Typography>
							<Typography variant="h6" color="text.secondary">
								{`₦ ${product.price}`}
							</Typography>
						</CardContent>
						<CardActions
							className="card-buttons"
							onClick={() => handleAddToCart(product)}
						>
							<Button sx={{ color: "white", fontSize: 12 }}>Add to Cart</Button>
						</CardActions>
					</Card>
				))}
			</div>
			<div className="clearfix"></div>
			<div>
				<ReactPaginate
					breakLabel="..."
					nextLabel="Next"
					onPageChange={handlePageClick}
					pageRangeDisplayed={3}
					pageCount={pageCount}
					previousLabel="Prev"
					renderOnZeroPageCount={null}
					containerClassName="pagination"
					pageLinkClassName="page-num"
					previousLinkClassName="page-num"
					nextLinkClassName="page-num"
					activeLinkClassName="activePage"
				/>
			</div>
		</div>
	);
};

export default ItemCards;
