"use client";

import { useCallback, useState } from "react";
import { Game } from "@/components/Game";

import moments from "@/data/moments.json";

// import type { CulturalMoment } from "@/types/CulturalMoment";

function useGameStuff() {
	const [error, setError] = useState<string>("");

	// const onComplete = useCallback(async (liked: CulturalMoment[]) => {
	const onComplete = useCallback(async () => {
		try {
			setError("");
		} catch (fetchError) {
			console.error(fetchError);
			setError("Unknown error occurred. Please try again later.");
		}
	}, []);

	const onReset = useCallback(() => {
		setError("");
	}, []);

	return { error, onComplete, onReset };
}

function Homepage() {
	const { error, onComplete, onReset } = useGameStuff();

	return (
		<div className="fixed inset-0 h-full w-full overflow-x-hidden overflow-y-scroll bg-[#252525]">
			<div className="mt-4 flex w-full flex-col gap-y-2 px-6 desktop:gap-y-4">
				<h1 className="hidden text-center text-xl font-bold leading-tight text-white desktop:text-[28px] desktop:leading-tight sm:block">
					What&apos;s your top cultural moments of 2022?
				</h1>
				<p className="text-center text-sm text-white desktop:text-base">
					Swipe the event you like to the right. You can choose up to 3 out of the 10 events.
				</p>
			</div>
			<Game moments={moments} onComplete={onComplete} onReset={onReset} error={error} />
		</div>
	);
}

export { Homepage };
