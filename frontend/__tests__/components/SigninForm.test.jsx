import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import SigninForm from '@/components/forms/SigninForm';
import { renderWithProvider } from '../../test-utils/utils';

jest.mock('next/link', () => {
	const MockedLink = ({ children, href }) => {
		const onClick = e => {
			e.preventDefault();
			window.history.pushState({}, '', href);
		};

		return (
			<a href={href} onClick={onClick}>
				{children}
			</a>
		);
	};

	MockedLink.displayName = 'MockedLink';

	return MockedLink;
});

jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}));

describe('SigninForm component', () => {
	it('should render form elements correctly', () => {
		const { getByLabelText, getByText } = renderWithProvider(<SigninForm />);

		expect(getByText('KUEPA')).toBeInTheDocument();
		expect(getByText('Ingresa a la plataforma:')).toBeInTheDocument();

		expect(getByLabelText('Correo electrónico')).toBeInTheDocument();
		expect(getByLabelText('Contraseña')).toBeInTheDocument();
		expect(getByText('INICIAR SESIÓN')).toBeInTheDocument();

		expect(getByText('No tienes una cuenta?')).toBeInTheDocument();
		expect(getByText('Registrate')).toBeInTheDocument();
	});

	it('should render 2 input fields on the screen', () => {
		const { getAllByRole } = renderWithProvider(<SigninForm />);

		const textInputs = getAllByRole('textbox');
		const passwordInputs = getAllByRole('textbox', { type: 'password' });
		const inputFields = [...textInputs, ...passwordInputs];

		expect(inputFields).toHaveLength(2);
	});

	it('should handle input changes correctly', () => {
		const { getByLabelText } = renderWithProvider(<SigninForm />);

		const emailInput = getByLabelText('Correo electrónico');
		const passwordInput = getByLabelText('Contraseña');

		fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
		fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

		expect(emailInput.value).toBe('test@example.com');
		expect(passwordInput.value).toBe('testPassword');
	});

	it('should redirect to registration page when "Registrate" button is clicked', () => {
		const { getByText } = renderWithProvider(<SigninForm />);
		const registerLink = getByText('Registrate');

		fireEvent.click(registerLink);

		act(() => {
			expect(window.location.pathname).toBe('/auth/register');
		});
	});
});
