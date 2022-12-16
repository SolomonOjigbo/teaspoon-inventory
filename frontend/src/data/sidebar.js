import {
	FaTh,
	FaRegChartBar,
	FaCommentAlt,
	FaFileInvoiceDollar,
	FaSalesforce,
	FaFileInvoice,
} from "react-icons/fa";
import { BiImageAdd, BiUser } from "react-icons/bi";
import { MdOutlinePointOfSale } from "react-icons/md";

const menu = [
	{
		title: "Dashboard",
		icon: <FaTh />,
		path: "/dashboard",
	},
	{
		title: "POS",
		icon: <MdOutlinePointOfSale />,
		path: "/pos",
	},
	{
		title: "Invoices",
		icon: <FaFileInvoiceDollar />,
		path: "/invoices",
	},
	{
		title: "Sales",
		icon: <FaFileInvoice />,
		path: "/sales",
	},
	{
		title: "Reports",
		icon: <FaRegChartBar />,
		path: "/reports",
	},
	{
		title: "Add Product",
		icon: <BiImageAdd />,
		path: "/add-product",
	},
	{
		title: "Account",
		icon: <BiUser />,
		childrens: [
			{
				title: "Profile",
				path: "/profile",
			},
			{
				title: "Edit Profile",
				path: "/edit-profile",
			},
		],
	},
	{
		title: "Report Bug",
		icon: <FaCommentAlt />,
		path: "/contact-us",
	},
];

export default menu;
