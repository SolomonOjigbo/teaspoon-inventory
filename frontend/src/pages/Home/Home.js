import React from "react";
import { GiSpoon } from "react-icons/gi";
import { Link } from "react-router-dom";
import "./Home.scss";
import heroImg from "../../assets/inv-img.png";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";

const Home = () => {
	return (
		<div className="home">
			<nav className="header">
				<div className="logo">
					<GiSpoon size={35} />
					<span>
						{" "}
						<h4>Teaspoon App</h4>
					</span>
				</div>

				<ul className="home-links">
					<ShowOnLogout>
						<li>
							<Link to="/register">Register</Link>
						</li>
					</ShowOnLogout>
					<ShowOnLogout>
						<li>
							<button className="--btn --btn-primary">
								<Link to="/login">Login</Link>
							</button>
						</li>
					</ShowOnLogout>
					<ShowOnLogin>
						<li>
							<button className="--btn --btn-primary">
								<Link to="/dashboard">Dashboard</Link>
							</button>
						</li>
					</ShowOnLogin>
				</ul>
			</nav>
			{/* HERO SECTION */}
			<div className="container hero">
				<div className="hero-text">
					<h2>Pharmacy Inventory, POS {"&"} Stock Management Solution</h2>
					<p>
						Inventory system to control and manage proucts in your pharmacy
						store in real time and integrated with point of sale system (POS) to
						make it easier to manage your business.
					</p>
					<div className="hero-buttons">
						<button className="--btn --btn-secondary">
							<Link to="/register">Get Started</Link>
						</button>
					</div>
					<div className="--flex-start">
						<NumberText num="14K" text="Brand Owners" />
						<NumberText num="23K" text="Active Users" />
						<NumberText num="500+" text="Partners" />
					</div>
				</div>

				<div className="hero-image">
					<img src={heroImg} alt="Inventory" />
				</div>
			</div>
		</div>
	);
};

const NumberText = ({ num, text }) => {
	return (
		<div className="--mr">
			<h3 className="--color-white">{num}</h3>
			<p className="--color-white">{text}</p>
		</div>
	);
};

export default Home;
