import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleOAuthLogin = ({ isLoggedIn }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) {
			navigate('/');
		}
	}, [isLoggedIn, navigate]);
	const handleLogin = () => {
		window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;
	};

	return (
		<div className="flex justify-center items-center min-h-screen">
			<button
				onClick={handleLogin}
				className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all"
			>
				Login with Google
			</button>
		</div>
	);
};

export default GoogleOAuthLogin;
