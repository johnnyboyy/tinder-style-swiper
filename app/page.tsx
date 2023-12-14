import Head from "next/head";
import { useCallback, useState } from "react";
import { Game } from "@/components/Game";

import moments from "@/data/moments.json";

function useGameStuff() {
	const [error, setError] = useState<string>("");

	const onComplete = useCallback(async (liked: CulturalMoment[]) => {
		try {
			setError("");
			console.log({ liked });
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

export default function Home() {
	const { error, onComplete, onReset } = useGameStuff();

	return (
		<>
			<Head>
				<title>Game</title>
			</Head>
			<div className="fixed inset-0 h-full w-full overflow-x-hidden overflow-y-scroll bg-[#252525]">
				<div className="desktop:gap-y-4 mt-4 flex w-full flex-col gap-y-2 px-6">
					<h1 className="desktop:text-[28px] desktop:leading-tight hidden text-center text-xl font-bold leading-tight text-white sm:block">
						What&apos;s your top cultural moments of 2022?
					</h1>
					<p className="desktop:text-base text-center text-sm text-white">
						Swipe the event you like to the right. You can choose up to 3 out of the 10 events.
					</p>
				</div>
				<Game moments={moments} onComplete={onComplete} onReset={onReset} error={error} />
			</div>
		</>
	);
}
