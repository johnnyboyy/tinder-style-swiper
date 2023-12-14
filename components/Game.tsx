import { useState, useCallback, useEffect } from "react";
import type { CulturalMoment } from "@/types/CulturalMoment";

import { Deck } from "./Deck";
import { TryAgainSVG } from "./TryAgainSVG";

const LIKE_LIMIT = 3;

function Loading() {
	return <div className="h-10 w-10 animate-spin rounded-full border-4 border-l-gray-500" />;
}

function ErrorIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="h-6 w-6"
			{...props}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
			/>
		</svg>
	);
}

function useGameState({
	moments,
	onComplete,
	onReset,
}: {
	moments: CulturalMoment[];
	onComplete: (liked: CulturalMoment[]) => Promise<void>;
	onReset: () => void;
}) {
	const [liked, setLiked] = useState<CulturalMoment[]>([]);
	const [swipes, setSwipes] = useState(0);
	const [state, setState] = useState<"playing" | "loading" | "complete" | "no likes">("playing");
	const swipeLimit = moments.length;

	const dislike = useCallback(() => {
		setSwipes((prevSwipes) => {
			return Math.min(prevSwipes + 1, swipeLimit);
		});
	}, [swipeLimit]);

	const like = useCallback(
		(card: CulturalMoment) => {
			setSwipes((prevSwipes) => {
				return Math.min(prevSwipes + 1, swipeLimit);
			});

			setLiked((prevLiked) => {
				return [...prevLiked, card].slice(0, 3);
			});
		},
		[swipeLimit],
	);

	const reset = useCallback(() => {
		setState("playing");
		setLiked([]);
		setSwipes(0);

		onReset();
	}, [onReset]);

	const undo = useCallback(() => {
		setSwipes((prevSwipes) => {
			const possibleLikes = moments.slice(0, prevSwipes - 1);

			setLiked((prevLiked) => {
				return prevLiked.filter(({ uuid }) => {
					return possibleLikes.some((moment) => {
						return moment.uuid === uuid;
					});
				});
			});

			return prevSwipes - 1;
		});
	}, [moments]);

	useEffect(() => {
		async function handleComplete() {
			if (liked.length >= LIKE_LIMIT || swipes >= swipeLimit) {
				if (liked.length === 0) {
					setState("no likes");
				} else {
					setState("loading");

					await onComplete(liked);

					setState("complete");
				}
			}
		}

		handleComplete();
	}, [liked, swipes, onComplete, swipeLimit]);

	return { state, liked, swipes, like, dislike, reset, undo };
}

function Game({
	moments,
	error,
	onComplete,
	onReset,
}: {
	moments: CulturalMoment[];
	error: string;
	onComplete: (liked: CulturalMoment[]) => Promise<void>;
	onReset: () => void;
}) {
	const { state, liked, swipes, like, dislike, reset } = useGameState({
		moments,
		onComplete,
		onReset,
	});

	return (
		<div className="relative flex w-full flex-col items-center justify-center">
			{!error ? null : (
				<div className="flex flex-col gap-y-2 py-4 text-lg text-red-500">
					<p className="flex items-center justify-center gap-x-2">
						<ErrorIcon className="h-6 w-6" />
						{error}
					</p>
					<button
						className="underline"
						onClick={() => {
							reset();
						}}
					>
						Click here to reset
					</button>
				</div>
			)}
			<div
				className={`flex h-full w-full flex-col gap-y-10 transition-all duration-500 ${
					state !== "playing" ? "opacity-0" : "opacity-100"
				}`}
			>
				<Deck cards={moments} swipes={swipes} liked={liked} like={like} dislike={dislike} />
			</div>

			<div
				className={`absolute inset-0 flex flex-col items-center justify-center gap-y-4 bg-[#252525] transition-all duration-300 ${
					state !== "loading" ? "-z-30 opacity-0" : "z-30 opacity-100"
				}`}
			>
				<Loading />
			</div>

			<div
				className={`absolute inset-0 flex flex-col items-center justify-center gap-y-4 bg-[#252525] transition-all delay-200 duration-1000 ${
					state !== "complete" ? "-z-30 opacity-0" : "z-30 opacity-100"
				}`}
			/>

			<div
				className={`absolute inset-0 flex flex-col items-center justify-center gap-y-4 bg-[#252525] text-[#E8E8E8] transition-all delay-200 duration-1000 ${
					state !== "no likes" ? "-z-30 opacity-0" : "z-30 opacity-100"
				}`}
			>
				<div className="max-h-full w-32 max-w-full">
					<TryAgainSVG className="h-full w-full" />
				</div>
				<div className="desktop:mt-8 mt-6 max-w-[357px] text-center">
					<p className="desktop:hidden flex">
						Play again to discover things you might not know about these top 2022 cultural moments.
					</p>
					<p className="desktop:flex hidden">
						Sorry that we don&apos;t align on top of the 2022 cultural events. We will be running different topics in
						the future; please come back and play with us later.
					</p>
				</div>
				<div className="desktop:mt-24 mt-12">
					<button
						className="rounded-full bg-white px-14 py-4 text-lg font-black text-black"
						onClick={(event) => {
							event.stopPropagation();
							reset();
						}}
					>
						Play Again
					</button>
				</div>
			</div>
		</div>
	);
}

export { Game };
