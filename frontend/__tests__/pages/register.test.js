import Register from '@/pages/auth/register';
import { renderWithProvider } from '../../test-utils/utils';

describe('Register page', () => {
	it('should render RegisterForm component correctly', () => {
		const { getByText, getByLabelText } = renderWithProvider(<Register />);

		expect(getByText('KUEPA')).toBeInTheDocument();
		expect(getByText('Registrate con tus datos:')).toBeInTheDocument();

		expect(getByLabelText('Nombre')).toBeInTheDocument();
		expect(getByLabelText('Usuario')).toBeInTheDocument();
		expect(getByLabelText('Contraseña')).toBeInTheDocument();
		expect(getByLabelText('Repetir contraseña')).toBeInTheDocument();
		expect(getByText('REGISTRARSE')).toBeInTheDocument();

		expect(getByText('Ya tienes una cuenta?')).toBeInTheDocument();
		expect(getByText('Inicia sesión')).toBeInTheDocument();
	});
});
