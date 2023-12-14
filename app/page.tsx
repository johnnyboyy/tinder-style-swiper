import Head from "next/head";
import { Homepage } from "@/components/Homepage";

export default function Home() {
	return (
		<>
			<Head>
				<title>Tinder Style Swiper</title>
			</Head>
			<Homepage />
		</>
	);
}
