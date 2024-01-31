import { useMainContext } from '@/contexts/MainContext';
import { TYPES } from '@/contexts/actions';
import axios from 'axios';

const options = {
	headers: { 'Content-Type': 'application/json' },
};

const useServices = () => {
	const { dispatch } = useMainContext();

	const createUser = async data => {
		try {
			const res = await axios.post(
				'http://localhost:5000/api/v1/users',
				data,
				options,
			);
			if (res.status === 201) {
				// setUsers([...users, res.data]);
				// toast.success('Usuario registrado con éxito!');
			}
		} catch (error) {
			console.error(error);
			// toast.error(error.response?.data?.msg || error.message);
		}
	};

	const signIn = async credentials => {
		console.log(credentials);
		dispatch({ type: TYPES.SIGN_IN, payload: true });
	};

	return { createUser, signIn };
};

export default useServices;
