import { ComponentProps, PropsWithChildren, useEffect, useState } from "react";
import { animated, to, useSprings, type SpringValue } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

import type { CulturalMoment } from "@/types/CulturalMoment";

import { Card } from "./Card";
import { LikeButton } from "./LikeButton";
import { DislikeButton } from "./DislikeButton";

const ROTATIONS = Object.freeze([0, 6, -8, 3, -12, 11, 2, -12, 6, -11]);

function getRotation(springIndex: number) {
	const choice = springIndex % ROTATIONS.length;

	return ROTATIONS[choice];
}

function swipeAnimation({ xPosition, direction }: { xPosition: SpringValue<number>; direction: "left" | "right" }) {
	const directionModifier = direction === "left" ? -1 : 1;

	xPosition.start(directionModifier * (window.innerWidth + 251), { config: { friction: 50, tension: 200 } });
}

function useRotations({ amount, currentIndex }: { amount: number; currentIndex: number }) {
	const [rotations, api] = useSprings(amount, (springIndex) => {
		return { rotation: getRotation(springIndex), config: { friction: 50, tension: 500 } };
	});

	useEffect(() => {
		api.start((springIndex) => {
			const alreadySwiped = springIndex < currentIndex;
			const currentCard = springIndex === currentIndex;

			if (alreadySwiped) {
				return undefined;
			} else {
				const changes = {
					rotation: currentCard ? 0 : getRotation(springIndex),
					config: { friction: 50, tension: 200 },
				};

				return changes;
			}
		});
	}, [api, currentIndex]);

	return { rotations, api };
}

function usePositions({ amount, currentIndex }: { amount: number; currentIndex: number }) {
	const [positions, api] = useSprings(amount, () => {
		return { xPosition: 0, config: { friction: 50, tension: 500 } };
	});

	useEffect(() => {
		api.start((springIndex) => {
			if (springIndex < currentIndex) {
				return undefined;
			} else {
				return { xPosition: 0, config: { friction: 50, tension: 800 } };
			}
		});
	}, [api, currentIndex]);

	return { positions, api };
}

function useSwiping() {
	return useState<undefined | "left" | "right">();
}

function Rotatable({
	style,
	rotation,
	children,
	...rest
}: { rotation: SpringValue<number> } & PropsWithChildren<ComponentProps<typeof animated.div>>) {
	return (
		<animated.div
			{...rest}
			style={{
				...style,
				rotate: to([rotation], (newRotation) => {
					return `${newRotation}deg`;
				}),
			}}
		>
			{children}
		</animated.div>
	);
}

function Swipeable({
	xPosition,
	onSwiping,
	onSwiped,
	style,
	children,
	...rest
}: {
	xPosition: SpringValue<number>;
	onSwiping: (direction: "left" | "right" | undefined, xMovement: number) => void;
	onSwiped: (direction: "left" | "right") => void;
} & PropsWithChildren<ComponentProps<typeof animated.div>>) {
	const gestureProps = useDrag(
		({ down: isHeld, movement: [xMovement], direction: [xDirection], velocity: [xVelocity] }) => {
			const swipedHardEnough = xVelocity > 0.2;
			const direction = xDirection < 0 ? "left" : "right";
			const swiped = !isHeld && swipedHardEnough;

			if (isHeld) {
				onSwiping(direction, xMovement);
			} else if (swiped) {
				onSwiped(direction);
			} else {
				onSwiping(undefined, xMovement);
			}
		},
	);

	return (
		<animated.div
			{...rest}
			style={{
				...style,
				transform: to([xPosition], (newX) => {
					return `translate3d(${newX}px, 0px ,0)`;
				}),
			}}
		>
			<div className="flex touch-none select-none items-center justify-center" {...gestureProps()}>
				<div className="max-w-[250px]">{children}</div>
			</div>
		</animated.div>
	);
}

export function Deck({
	cards,
	swipes,
	liked,
	like,
	dislike,
}: {
	cards: CulturalMoment[];
	swipes: number;
	liked: CulturalMoment[];
	like: (card: CulturalMoment) => void;
	dislike: () => void;
}) {
	const [swiping, setSwiping] = useSwiping();
	const { rotations } = useRotations({ amount: cards.length, currentIndex: swipes });
	const { positions } = usePositions({ amount: cards.length, currentIndex: swipes });

	return (
		<div className="flex h-full w-full flex-col">
			<div className="relative flex min-h-[500px] w-full items-center justify-center">
				{cards.map((card, index) => {
					const { xPosition } = positions[index];
					const { rotation } = rotations[index];

					return (
						<Swipeable
							xPosition={xPosition}
							key={`card_${index}`}
							className="absolute flex w-full justify-center"
							onSwiping={(direction, xMovement) => {
								setSwiping(direction);

								if (direction !== undefined) {
									xPosition.start(xMovement, { config: { friction: 50, tension: 800 } });
								} else {
									xPosition.start(0, { config: { friction: 50, tension: 200 } });
								}
							}}
							onSwiped={(direction) => {
								swipeAnimation({ xPosition, direction });

								if (direction === "right") {
									like(card);
								} else {
									dislike();
								}
							}}
							style={{ zIndex: `${500 - index}` }}
						>
							<Rotatable rotation={rotation}>
								{cards[index] === undefined ? null : (
									<Card
										title={card.title}
										subtitle={card.subtitle}
										image={card.mainImage}
										description={null}
										height={274}
										width={218}
									/>
								)}
							</Rotatable>
						</Swipeable>
					);
				})}
			</div>
			<div className="flex justify-center gap-x-4 pb-6">
				<button
					className="flex h-16 w-16"
					onClick={(event) => {
						event.preventDefault();
						event.stopPropagation();

						if (positions[swipes] !== undefined) {
							const { xPosition } = positions[swipes];

							dislike();

							swipeAnimation({ xPosition, direction: "left" });
						}
					}}
				>
					<DislikeButton active={swiping === "left"} />
				</button>
				<button
					className="relative flex h-16 w-16"
					onClick={(event) => {
						event.preventDefault();
						event.stopPropagation();

						if (positions[swipes] !== undefined) {
							const { xPosition } = positions[swipes];

							like(cards[swipes]);

							swipeAnimation({ xPosition, direction: "right" });
						}
					}}
				>
					<LikeButton active={swiping === "right"} />
					<div className="absolute inset-x-0 -bottom-5 z-10">
						<p className="text-center text-xs font-bold text-white">{liked.length}/3</p>
					</div>
				</button>
			</div>
		</div>
	);
}

const exports = { Deck };

export default exports;
