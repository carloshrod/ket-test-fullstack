import { useState } from 'react';
import services from '@/services/services';

const useForm = initialForm => {
	const [form, setForm] = useState(initialForm);
	const { signIn, createUser } = services();

	const handleInputChange = event => {
		const { name, value } = event.target;

		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSigninSubmit = async event => {
		event.preventDefault();
		await signIn(form);
	};

	const handleRegisterSubmit = async event => {
		event.preventDefault();
		await createUser(form);
	};

	return { form, handleInputChange, handleSigninSubmit, handleRegisterSubmit };
};

export default useForm;
