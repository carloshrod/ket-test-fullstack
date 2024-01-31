import Register from '@/pages/auth/register';
import { renderWithProvider } from '../../test-utils/utils';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}));

describe('Register page', () => {
	it('should render RegisterForm component correctly', () => {
		const { getByText, getByLabelText } = renderWithProvider(<Register />);

		useRouter.mockImplementation(() => ({
			push: jest.fn(),
		}));

		expect(getByText('KUEPA')).toBeInTheDocument();
		expect(getByText('Registrate con tus datos:')).toBeInTheDocument();

		expect(getByLabelText('Nombre')).toBeInTheDocument();
		expect(getByLabelText('Usuario')).toBeInTheDocument();
		expect(getByLabelText('Contraseña')).toBeInTheDocument();
		expect(getByLabelText('Repetir contraseña')).toBeInTheDocument();
		expect(getByLabelText('Eres un estudiante?')).toBeInTheDocument();
		expect(getByText('REGISTRARSE')).toBeInTheDocument();

		expect(getByText('Ya tienes una cuenta?')).toBeInTheDocument();
		expect(getByText('Inicia sesión')).toBeInTheDocument();
	});
});
