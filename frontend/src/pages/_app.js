import '@/scss/globals.scss';
import '@/scss/custom.scss';
import Container from '@/components/layout/Container';
import MainProvider from '@/contexts/MainContext';
import Navbar from '@/components/layout/Navbar';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
	return (
		<MainProvider>
			<Navbar />
			<Container>
				<Component {...pageProps} />
			</Container>
			<Toaster
				position='bottom-right'
				toastOptions={{ className: 'myToast' }}
			/>
		</MainProvider>
	);
}
