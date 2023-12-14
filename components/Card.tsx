import parse from "html-react-parser";

import type { CulturalMoment } from "@/types/CulturalMoment";

type Picked = Pick<CulturalMoment, "title" | "subtitle" | "description">;

type CardProps = Picked & { image: string | null; width: number; height: number };

export function Card({ title, subtitle, description, image, ...rest }: CardProps) {
	return (
		<div
			className="flex max-w-full shrink grow-0 rounded bg-white p-4 shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
			style={{ flexBasis: `${rest.width + 32}px` }}
		>
			<div className="flex shrink grow-0 flex-col gap-y-4">
				<div
					className="flex aspect-[11/16] h-full rounded-lg bg-cover bg-no-repeat"
					style={{
						backgroundColor: image === null ? "#686868" : undefined,
						backgroundImage: image === null ? undefined : `url(${image})`,
						maxWidth: rest.width,
						maxHeight: rest.height,
					}}
				/>
				<div className="flex flex-col gap-y-1">
					{title === null ? title : <p className="text-sm font-medium">{title}</p>}
					{subtitle === null ? subtitle : <p className="text-sm text-[#535353]">{subtitle}</p>}
					{description === null ? description : parse(description)}
				</div>
			</div>
		</div>
	);
}

const exports = { Card };

export default exports;
