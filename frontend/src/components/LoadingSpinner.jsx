import React from 'react';

const LoadingSpinner = () => {
	return (
		<div className="flex justify-center items-center min-h-screen">
			<div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-600 h-16 w-16"></div>
		</div>
	);
};

export default LoadingSpinner;
