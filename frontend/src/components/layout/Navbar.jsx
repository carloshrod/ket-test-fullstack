import { useMainContext } from '@/contexts/MainContext';
import useServices from '@/services/services';
import React from 'react';

const Navbar = () => {
	const { isAuth, userLogged } = useMainContext();
	const { signOut } = useServices();

	return isAuth ? (
		<nav className='navbar navbar-expand-lg px-5'>
			<h1 className='text-primary'>KUEPA</h1>

			<div className='ms-3 d-flex justify-content-center align-items-center'>
				<span>Bienvenido</span>{' '}
				<span className='ms-1 fw-bold'>{userLogged?.name?.toUpperCase()}</span>
			</div>

			<button
				className='navbar-toggler'
				type='button'
				data-toggle='collapse'
				data-target='#navbarNav'
				aria-controls='navbarNav'
				aria-expanded='false'
				aria-label='Toggle navigation'
			>
				<span className='navbar-toggler-icon'></span>
			</button>
			<div
				className='collapse navbar-collapse justify-content-end'
				id='navbarNav'
			>
				<button className='btn btn-primary ml-2' onClick={() => signOut()}>
					Cerrar sesión
				</button>
			</div>
		</nav>
	) : null;
};

export default Navbar;
