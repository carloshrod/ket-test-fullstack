import { TYPES } from './actions';

const reducers = (state, action) => {
	switch (action.type) {
		case TYPES.SIGN_IN: {
			const { isAuth, userLogged } = action.payload;
			return {
				...state,
				isAuth,
				userLogged,
			};
		}

		default:
			return {
				...state,
			};
	}
};

export default reducers;
