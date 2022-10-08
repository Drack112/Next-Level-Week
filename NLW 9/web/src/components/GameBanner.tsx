interface GameBannerProps {
	bannerUrl: string;
	title: string;
	adsCount: number;
}

export default function GameBanner({
	bannerUrl,
	title,
	adsCount,
}: GameBannerProps) {
	return (
		<a
			href=''
			className='relative rounded-lg overflow-hidden transform transition duration-500 hover:scale-105'>
			<img src={bannerUrl} alt='' />

			<div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
				<strong className='font-bold text-white block'>{title}</strong>
				<span className='text-zinc-300 block'>{adsCount} anúncio(s)</span>
			</div>
		</a>
	);
}
