import Navbar from '@/components/layout/Navbar';
import Chat from '@/components/ui/Chat';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player/youtube'), {
	ssr: false,
});

const Streaming = () => {
	return (
		<section className='container-fluid'>
			<div className='row'>
				<div className='col-12 col-lg-8 mb-2'>
					{/* Reproductor de vídeo */}
					<ReactPlayer
						url={process.env.NEXT_PUBLIC_VIDEO_URL}
						controls
						height={500}
						width={800}
					/>
				</div>
				<div className='col-12 col-lg-4'>
					{/* Componente de chat */}
					<Chat />
				</div>
			</div>
		</section>
	);
};

export default Streaming;
