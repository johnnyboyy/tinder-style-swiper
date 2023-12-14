function Sparkle() {
	return (
		<svg viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M1.09998 8C3.54015 8 5.51831 4.41828 5.51831 0C5.51831 4.41828 7.49646 8 9.93664 8C7.49646 8 5.51831 11.5817 5.51831 16C5.51831 11.5817 3.54015 8 1.09998 8Z"
				fill="#F444E9"
			/>
		</svg>
	);
}

function PinkCircle() {
	return (
		<svg
			className="rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
			width="64"
			height="64"
			viewBox="0 0 64 64"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect width="64" height="64" rx="32" fill="#F444E9" />
			<path
				d="M31.1033 17.15C31.4702 16.4068 32.5299 16.4068 32.8967 17.15L36.9176 25.2958C37.0631 25.5906 37.3443 25.7951 37.6697 25.8426L46.6629 27.1571C47.4828 27.277 47.8096 28.2848 47.216 28.863L40.7102 35.1997C40.4743 35.4294 40.3666 35.7606 40.4223 36.0851L41.9575 45.036C42.0976 45.8529 41.24 46.4759 40.5064 46.0901L32.4655 41.8615C32.1741 41.7082 31.826 41.7082 31.5346 41.8615L23.4937 46.0901C22.76 46.4759 21.9025 45.8529 22.0426 45.036L23.5778 36.0851C23.6335 35.7606 23.5258 35.4294 23.2899 35.1997L16.7841 28.863C16.1905 28.2848 16.5172 27.277 17.3372 27.1571L26.3304 25.8426C26.6558 25.7951 26.9369 25.5906 27.0825 25.2958L31.1033 17.15Z"
				fill="white"
			/>
		</svg>
	);
}

function LikeButton({ active = false }: { active?: boolean }) {
	return (
		<div className="group relative flex h-full w-full grow items-center justify-center">
			<div className={`${active ? "scale-100" : "scale-90"} flex transition-all duration-500 group-hover:scale-100`}>
				<PinkCircle />
			</div>
			<div className="absolute -right-2 top-0 z-10 w-2">
				<div
					className={`transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:delay-200 ${
						active ? "opacity-100 delay-200" : "opacity-0 delay-75"
					}`}
				>
					<Sparkle />
				</div>
			</div>
			<div className="absolute -right-5 top-3 z-10 w-4">
				<div
					className={`transition-all delay-75 duration-200 ease-in-out group-hover:opacity-100 group-hover:delay-500 ${
						active ? "opacity-100 delay-500" : "opacity-0 delay-75"
					}`}
				>
					<Sparkle />
				</div>
			</div>
		</div>
	);
}

export { LikeButton };
