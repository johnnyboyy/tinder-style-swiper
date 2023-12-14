export function DislikeButton({ active = false }: { active?: boolean }) {
	return (
		<div className="group relative flex h-full w-full grow items-center justify-center">
			<div className={`${active ? "scale-100" : "scale-90"} transition-all duration-500 group-hover:scale-100`}>
				<svg
					className="h-full w-full rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
					viewBox="0 0 64 64"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect x="0.5" y="0.5" width="63" height="63" rx="31.5" fill="white" />
					<path
						d="M41.25 21.75L21.75 41.25"
						stroke="black"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M21.75 21.75L41.25 41.25"
						stroke="black"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<rect x="0.5" y="0.5" width="63" height="63" rx="31.5" stroke="black" />
				</svg>
			</div>
		</div>
	);
}
