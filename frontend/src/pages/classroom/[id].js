import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player/youtube'), {
	ssr: false,
});

const Streaming = () => {
	return (
		<section>
			<h2>{process.env.NEXT_PUBLIC_VIRTUAL_CLASS_ID}</h2>
			<ReactPlayer url={process.env.NEXT_PUBLIC_VIDEO_URL} controls />
		</section>
	);
};

export default Streaming;
