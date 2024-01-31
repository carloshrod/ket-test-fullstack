import React from 'react';

const Container = ({ children }) => {
	return (
		<div className='container d-flex justify-content-center align-items-center min-vh-100'>
			{children}
		</div>
	);
};

export default Container;
