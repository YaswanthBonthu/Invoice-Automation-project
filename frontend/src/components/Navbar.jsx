import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className="bg-blue-600 text-white p-4 flex justify-between">
			<h1 className="text-lg font-semibold">Invoice Reminder</h1>
			<div>
				<Link className="mr-4" to="/login">Login</Link>
				<Link to="/invoices">Dashboard</Link>
			</div>
		</nav>
	);
};

export default Navbar;
