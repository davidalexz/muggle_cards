type NewGame = {
	onNewGame: () => void;
};

const StartNewGame: React.FC<NewGame> = ({ onNewGame }) => {
	return (
		<button
			onClick={onNewGame}
			className="w-25 mt-4 px-4 py-2 bg-emerald-800 text-white rounded transition hover:scale-95"
		>
			New Game
		</button>
	);
};

export default StartNewGame;
