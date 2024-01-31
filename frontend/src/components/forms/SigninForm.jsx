import Link from 'next/link';
import useForm from '@/hooks/useForm';
import { useEffect } from 'react';
import { useMainContext } from '@/contexts/MainContext';
import { useRouter } from 'next/router';

const virtualClassID = process.env.NEXT_PUBLIC_VIRTUAL_CLASS_ID;

const SigninForm = () => {
	const { handleInputChange, handleSigninSubmit } = useForm({
		username: '',
		password: '',
	});
	const { isAuth } = useMainContext();
	const router = useRouter();

	useEffect(() => {
		if (isAuth) {
			router.push(`/classroom/${virtualClassID}`);
		}
	}, [isAuth]);

	return (
		<form className='grid g-3' onSubmit={handleSigninSubmit} noValidate>
			<h1 className='text-primary text-center mb-3'>KUEPA</h1>
			<h5 className='text-center mb-4'>Ingresa a la plataforma:</h5>
			<div className='mb-3'>
				<label htmlFor='idUsername' className='form-label'>
					Usuario
				</label>
				<input
					name='username'
					type='text'
					className='form-control bg-dark'
					id='idUsername'
					placeholder='user1'
					onChange={handleInputChange}
				/>
			</div>
			<div className='mb-4'>
				<label htmlFor='idPassword' className='form-label'>
					Contraseña
				</label>
				<input
					name='password'
					type='password'
					className='form-control bg-dark'
					id='idPassword'
					placeholder='Ingresa tu contraseña'
					onChange={handleInputChange}
				/>
			</div>
			<div className='mb-4'>
				<button className='btn btn-primary w-100'>INICIAR SESIÓN</button>
			</div>
			<div className='mb-3 text-center'>
				{' '}
				<hr />
				No tienes una cuenta?
			</div>
			<div className='mb-3'>
				<Link href='/auth/register'>
					<button className='btn btn-outline-primary w-100'>Registrate</button>
				</Link>
			</div>
		</form>
	);
};

export default SigninForm;
