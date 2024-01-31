import { TYPES } from './actions';

const reducers = (state, action) => {
	switch (action.type) {
		case TYPES.SIGN_IN: {
			return {
				...state,
				isAuth: action.payload,
			};
		}

		default:
			return {
				...state,
			};
	}
};

export default reducers;
