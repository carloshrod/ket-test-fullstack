import { useState } from 'react';
import services from '@/services/services';

const useForm = initialForm => {
	const [form, setForm] = useState(initialForm);
	const { signIn, createUser } = services();
	const [isStudent, setIsStudent] = useState(false);

	const handleInputChange = event => {
		const { name, value } = event.target;

		setForm({
			...form,
			[name]: value,
		});
	};

	const handleCheckboxChange = () => {
		setIsStudent(!isStudent);
	};

	const handleSigninSubmit = async event => {
		event.preventDefault();
		await signIn(form);
	};

	const handleRegisterSubmit = async event => {
		event.preventDefault();
		const role = isStudent ? 'estudiante' : 'moderador';
		await createUser({ ...form, role });
	};

	return {
		form,
		isStudent,
		handleInputChange,
		handleCheckboxChange,
		handleSigninSubmit,
		handleRegisterSubmit,
	};
};

export default useForm;
