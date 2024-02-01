import { useMainContext } from '@/hooks/useMainContext';
import useServices from '@/services/services';

const Navbar = () => {
	const { isAuth, userLogged } = useMainContext();
	const { signOut } = useServices();

	return isAuth ? (
		<nav className='d-flex justify-content-between navbar navbar-expand-lg px-5'>
			<div className='d-flex justify-content-center align-items-center'>
				<h1 className='text-primary me-3'>KUEPA</h1>
				<span>Bienvenido</span>{' '}
				<span className='ms-1 fw-bold'>{userLogged?.name?.toUpperCase()}</span>
			</div>
			<div id='navbarNav'>
				<button className='btn btn-primary ml-2' onClick={() => signOut()}>
					Cerrar sesión <i className='bi bi-box-arrow-right'></i>
				</button>
			</div>
		</nav>
	) : null;
};

export default Navbar;
