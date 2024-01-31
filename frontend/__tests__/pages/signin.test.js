import SignIn from '@/pages/auth/signin';
import { useRouter } from 'next/router';
import { renderWithProvider } from '../../test-utils/utils';

jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}));

describe('SignIn page', () => {
	it('should render SignInForm component correctly', () => {
		useRouter.mockImplementation(() => ({
			push: jest.fn(),
		}));

		const { getByText } = renderWithProvider(<SignIn />);

		expect(getByText('KUEPA')).toBeInTheDocument();
		expect(getByText('Ingresa a la plataforma:')).toBeInTheDocument();

		expect(getByText('Usuario')).toBeInTheDocument();
		expect(getByText('Contraseña')).toBeInTheDocument();
		expect(getByText('INICIAR SESIÓN')).toBeInTheDocument();

		expect(getByText('No tienes una cuenta?')).toBeInTheDocument();
		expect(getByText('Registrate')).toBeInTheDocument();
	});
});
