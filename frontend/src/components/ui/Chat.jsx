import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useMainContext } from '@/hooks/useMainContext';

const socket = io('http://localhost:5000', {
	transports: ['websocket'],
});
const Chat = () => {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [storedMessages, setStoredMessages] = useState([]);
	const [firstTime, setfirstTime] = useState(false);
	const { userLogged } = useMainContext();

	useEffect(() => {
		const receivedMessage = message => setMessages([...messages, message]);
		socket.on('chat_message', receivedMessage);

		return () => {
			socket.off('chat_message', receivedMessage);
		};
	}, [messages]);

	if (!firstTime) {
		axios
			.get(`${process.env.NEXT_PUBLIC_API_URL}/messages`)
			.then(res => {
				setStoredMessages(res.data);
				setfirstTime(true);
			})
			.catch(error => console.error(error));
	}

	const handleSubmit = event => {
		event.preventDefault();
		const newMessage = {
			body: message,
			from: userLogged?.username,
			role: userLogged?.role,
		};
		socket.emit('chat_message', newMessage);
		setMessages([...messages, newMessage]);
		setMessage('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='card bg-dark text-light chatContainer'>
				<div className='card-header bg-primary text-white'>
					Chat <span className='onlineCircle ms-1'></span>
				</div>
				<div
					className='card-body chatContent'
					style={{ maxHeight: '600px', overflowY: 'auto' }}
				>
					{storedMessages.length === 0 && messages.length === 0 ? (
						<h4 className='text-center py-5'>
							Aún no hay mensajes para mostrar!
						</h4>
					) : null}
					{storedMessages.length > 0 &&
						storedMessages.map((msg, index) => (
							<div key={index} className='mb-3'>
								{msg?.role === 'moderador' ? (
									<i className='bi bi-person-badge me-1'></i>
								) : (
									<i className='bi bi-person me-1'></i>
								)}
								<b
									className={`me-2 text-${msg?.role === 'moderador' ? 'primary' : ''}`}
								>
									{msg.from}{' '}
									<small>
										{' '}
										{msg?.role === 'moderador' ? `[${msg?.role}]` : null}:
									</small>
								</b>
								{msg.body}
							</div>
						))}
					{messages.length > 0 &&
						messages.map((msg, index) => (
							<div key={index} className='mb-3'>
								{msg?.role === 'moderador' ? (
									<i className='bi bi-person-badge me-1'></i>
								) : (
									<i className='bi bi-person me-1'></i>
								)}
								<b
									className={`me-2 text-${msg?.role === 'moderador' ? 'primary' : ''}`}
								>
									{msg.from}{' '}
									<small>
										{msg?.role === 'moderador' ? `[${msg?.role}]` : null}:
									</small>
								</b>
								{msg.body}
							</div>
						))}
				</div>
				<div className='card-footer chatFooter'>
					<div className='input-group'>
						<input
							name='message'
							type='text'
							className='form-control'
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
