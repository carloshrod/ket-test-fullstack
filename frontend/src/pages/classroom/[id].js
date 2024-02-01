import Chat from '@/components/ui/Chat';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player/youtube'), {
	ssr: false,
});

const Streaming = () => {
	return (
		<section className='container-fluid'>
			<div className='row'>
				<h1>{process.env.NEXT_PUBLIC_VIRTUAL_CLASS_ID}</h1>
				<div className='col-12 col-lg-8 mb-2 mb-lg-0 playerContainer'>
					<ReactPlayer
						url={process.env.NEXT_PUBLIC_VIDEO_URL}
						controls
						height='100%'
						width='100%'
					/>
				</div>
				<div className='col-12 col-lg-4'>
					<Chat />
				</div>
			</div>
		</section>
	);
};

export default Streaming;
