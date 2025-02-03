import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	useEffect(() => {
		if (token) {
			navigate('/invoices');
		}
	}, [token, navigate]);

	const handleLogin = () => {
		window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;
	};

	const handleLogout = () => {
		localStorage.clear();
		navigate("/");
	};
	return (
		<nav className="bg-gray-600 text-white p-4 flex justify-between">
			<h1 className="text-lg font-semibold">Invoice Reminder</h1>
			<div>
				{!token ? <button
					onClick={handleLogin}
					className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all"
				>
					Login with Google
				</button>
					: <button
						onClick={handleLogout}
						className="bg-red-500 text-white px-4 py-2 rounded-lg"
					>
						Logout
					</button>}
			</div>
		</nav>
	);
};

export default Navbar;
