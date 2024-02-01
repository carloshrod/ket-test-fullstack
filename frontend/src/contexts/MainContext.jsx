import { createContext, useEffect, useReducer } from 'react';
import reducers from './reducers';
import Cookies from 'js-cookie';
import { TYPES } from './actions';
import { jwtDecode } from 'jwt-decode';

const MainContext = createContext(undefined);

const initialState = {
	isAuth: false,
	userLogged: {},
};

const MainProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducers, initialState);
	const { isAuth, userLogged, users } = state;

	useEffect(() => {
		const authToken = Cookies.get('authToken');
		const decodedToken = authToken && jwtDecode(authToken);
		if (authToken) {
			dispatch({
				type: TYPES.SIGN_IN,
				payload: { isAuth: true, userLogged: decodedToken },
			});
		}
	}, []);

	const data = { isAuth, userLogged, users, dispatch };

	return <MainContext.Provider value={data}>{children}</MainContext.Provider>;
};

export { MainContext };
export default MainProvider;
