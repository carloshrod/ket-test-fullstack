import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import RegisterForm from '@/components/forms/RegisterForm';
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

describe('RegisterForm component', () => {
	it('should render form elements correctly', () => {
		const { getByText, getByLabelText } = renderWithProvider(<RegisterForm />);

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

	it('should render 2 input fields on the screen', () => {
		const { getAllByRole } = renderWithProvider(<RegisterForm />);

		const textInputs = getAllByRole('textbox');
		const passwordInputs = getAllByRole('textbox', { type: 'password' });
		const inputFields = [...textInputs, ...passwordInputs];

		expect(inputFields).toHaveLength(4);
	});

	it('should handle input changes correctly', () => {
		const { getByLabelText } = renderWithProvider(<RegisterForm />);

		fireEvent.change(getByLabelText('Nombre'), {
			target: { value: 'John' },
		});
		fireEvent.change(getByLabelText('Usuario'), {
			target: { value: 'john123' },
		});
		fireEvent.change(getByLabelText('Contraseña'), {
			target: { value: 'password123' },
		});
		fireEvent.change(getByLabelText('Repetir contraseña'), {
			target: { value: 'password123' },
		});

		expect(getByLabelText('Nombre').value).toBe('John');
		expect(getByLabelText('Usuario').value).toBe('john123');
		expect(getByLabelText('Contraseña').value).toBe('password123');
		expect(getByLabelText('Repetir contraseña').value).toBe('password123');
	});

	it('should redirect to sign-in page when "Inicia sesión" button is clicked', () => {
		const { getByText } = renderWithProvider(<RegisterForm />);
		const registerLink = getByText('Inicia sesión');

		fireEvent.click(registerLink);

		act(() => {
			expect(window.location.pathname).toBe('/auth/signin');
		});
	});
});
