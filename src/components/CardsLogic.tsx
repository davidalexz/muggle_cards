import Image from 'next/image';
import { useState, useEffect } from 'react';
import StartNewGame from '@/components/NewGame';
import { createCards, Card } from '@/components/Cards';
import useSound from 'use-sound';

const CardGrid = () => {
	const [shuffledCards, setShuffledCards] = useState<Card[]>([]);
	const [flippedCards, setFlippedCards] = useState<Card[]>([]);
	const [matchedCards, setMatchedCards] = useState<Set<string>>(new Set());
	const [playSound] = useSound('/ding.mp3');

	const startNewGame = () => {
		setShuffledCards(createCards());
		setFlippedCards([]);
		setMatchedCards(new Set());
	};

	useEffect(() => {
		startNewGame();
	}, []);

	// Handle card click
	const handleCardClick = (card: Card) => {
		if (flippedCards.length === 2) return;
		if (flippedCards.some((flippedCard) => flippedCard.id === card.id)) return; // Prevent double flipping the same card

		// Add previously flipped cards & the current clicked card
		const newFlippedCards = [...flippedCards, card];
		setFlippedCards(newFlippedCards);

		if (newFlippedCards.length === 2) {
			// Check if they match
			if (newFlippedCards[0].url === newFlippedCards[1].url) {
				setMatchedCards((prev) => {
					const updatedMatchedCards = new Set([
						...prev,
						newFlippedCards[0].id,
						newFlippedCards[1].id,
					]);

					// Log the matched cards set
					console.log('Matched Cards:', Array.from(updatedMatchedCards));

					return updatedMatchedCards;
				});
				playSound();
			}

			setTimeout(() => setFlippedCards([]), 700);
		}
	};

	return (
		<div className="flex flex-col items-center">
			<h1 className="xl:text-2xl lg:text-2xl md:text-xl mt-2 ">
				Memory Game for Muggles
			</h1>
			<StartNewGame onNewGame={startNewGame} />

			{Array.from(matchedCards).length === 24 ? (
				<h2 className="text-4xl font-semibold mt-14">Winner!</h2>
			) : (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-10 mb-6 shadow-xl cursor-pointer">
					{shuffledCards.map((card) => (
						<div
							key={card.id}
							className={`flex w-full max-w-[150px] h-[150px] rounded ${
								matchedCards.has(card.id)
									? 'opacity-35 animate-pulse pointer-events-none'
									: ''
							}`}
							onClick={() => handleCardClick(card)}
						>
							<Image
								src={
									matchedCards.has(card.id) ||
									flippedCards.some((c) => c.id === card.id)
										? card.url
										: '/back/back_v2.jpg'
								}
								className="object-cover rounded"
								alt="card"
								width={150}
								height={150}
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default CardGrid;
