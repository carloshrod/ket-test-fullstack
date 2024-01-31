import { createContext, useContext, useReducer } from 'react';
import reducers from './reducers';

const MainContext = createContext(undefined);

const initialState = {
	isAuth: false,
	users: [],
};

const MainProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducers, initialState);
	const { isAuth, users } = state;

	const data = { isAuth, users, dispatch };

	return <MainContext.Provider value={data}>{children}</MainContext.Provider>;
};

export const useMainContext = () => useContext(MainContext);

export default MainProvider;
