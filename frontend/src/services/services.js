import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import { useMainContext } from '@/hooks/useMainContext';
import { TYPES } from '@/contexts/actions';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const options = {
	headers: { 'Content-Type': 'application/json' },
};

const useServices = () => {
	const { dispatch } = useMainContext();
	const router = useRouter();

	const createUser = async data => {
		try {
			const res = await axios.post(API_URL, data, options);
			if (res.status === 201) {
				toast.success('Te has registrado con éxito!');
				router.push('/auth/signin');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const signIn = async data => {
		try {
			const res = await axios.post(`${API_URL}/signin`, data, options);
			if (res.status === 200) {
				Cookies.set('authToken', res?.data?.token);
				const decodedToken = jwtDecode(res?.data?.token);
				dispatch({
					type: TYPES.SIGN_IN,
					payload: { isAuth: true, userLogged: decodedToken },
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	const signOut = () => {
		try {
			Cookies.remove('authToken');
			router.push('/auth/signin');
			dispatch({
				type: TYPES.SIGN_IN,
				payload: { isAuth: false, userLogged: null },
			});
		} catch (error) {
			console.error(error);
		}
	};

	return { createUser, signIn, signOut };
};

export default useServices;
