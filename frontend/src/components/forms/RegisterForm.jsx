import Link from 'next/link';
import { inputUserProps } from './const';
import useForm from '@/hooks/useForm';

const RegisterForm = () => {
	const { handleInputChange, handleRegisterSubmit } = useForm({
		displayName: '',
		userName: '',
		password: '',
		rePassword: '',
	});

	return (
		<form className='grid g-3 m-5' onSubmit={handleRegisterSubmit} noValidate>
			<h1 className='text-primary text-center mb-3'>KUEPA</h1>
			<h5 className='text-center mb-4'>Registrate con tus datos:</h5>
			{inputUserProps.map(input => (
				<div key={input.id} className='mb-3'>
					<label htmlFor={input.id} className='form-label'>
						{input.label}
					</label>
					<input
						{...input}
						className='form-control bg-dark'
						onChange={handleInputChange}
					/>
				</div>
			))}
			<div className='mb-4'>
				<button className='btn btn-primary w-100'>REGISTRARSE</button>
			</div>
			<div className='mb-3 text-center'>
				{' '}
				<hr />
				Ya tienes una cuenta?
			</div>
			<div className='mb-3'>
				<Link href='/auth/signin'>
					<button className='btn btn-outline-primary w-100'>
						Inicia sesión
					</button>
				</Link>
			</div>
		</form>
	);
};

export default RegisterForm;
