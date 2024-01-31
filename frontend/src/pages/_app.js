import '@/scss/globals.scss';
import '@/scss/custom.scss';
import Container from '@/components/layout/Container';
import MainProvider from '@/contexts/MainContext';

export default function App({ Component, pageProps }) {
	return (
		<MainProvider>
			<Container>
				<Component {...pageProps} />
			</Container>
		</MainProvider>
	);
}
