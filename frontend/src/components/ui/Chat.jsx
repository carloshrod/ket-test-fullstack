import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useMainContext } from '@/contexts/MainContext';

const socket = io('http://localhost:5000', {
	transports: ['websocket'],
	auth: {
		serverOffset: 0,
	},
});

const Chat = () => {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const { userLogged } = useMainContext();

	useEffect(() => {
		socket.on('chat_message', receiveMessage);

		return () => {
			socket.off('chat_message', receiveMessage);
		};
	}, []);

	const receiveMessage = message => setMessages(state => [...state, message]);

	const handleSubmit = event => {
		event.preventDefault();
		const newMessage = {
			body: message,
			from: userLogged?.username,
			role: userLogged?.role,
		};
		setMessages(state => [...state, newMessage]);
		setMessage('');
		socket.emit('chat_message', newMessage);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='card bg-dark text-light chatContainer'>
				<div className='card-header bg-primary text-white'>Chat </div>
				<div
					className='card-body chatContent'
					style={{ maxHeight: '600px', overflowY: 'auto' }}
				>
					{messages.map((message, index) => (
						<div key={index} className='mb-2'>
							{message?.role === 'moderador' ? (
								<i className='bi bi-person-badge me-1'></i>
							) : (
								<i className='bi bi-person me-1'></i>
							)}
							<b
								className={`me-2 text-${message?.role === 'moderador' ? 'primary' : ''}`}
							>
								{message.from}{' '}
								<small>
									| {message?.role === 'moderador' ? message?.role : null}:
								</small>
							</b>
							{message.body}
						</div>
					))}
				</div>
				<div className='card-footer'>
					<div className='input-group'>
						<input
							name='message'
							type='text'
							className='form-control bg-dark'
							placeholder='Escribe tu mensaje...'
							onChange={e => setMessage(e.target.value)}
							value={message}
							autoFocus
						/>
						<button className='btn btn-primary'>Enviar</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default Chat;
