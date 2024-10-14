import { v4 as uuidv4 } from 'uuid';

export type Card = {
	id: string;
	url: string;
	flipped?: boolean;
};

const cardImages: string[] = [
	'3cXWfyH.jpeg',
	'AoiO4Fg.jpeg',
	'Wl73qfb.jpeg',
	'XFxrAZp.jpeg',
	'Z7wzg0D.jpeg',
	'tPG6xan.jpeg',
	'tnpv6U2.jpeg',
	'uXfJyTl.jpeg',
	'wzOKKAU.jpeg',
	'xZwDwLo.jpeg',
	'xkKQfgS.jpeg',
	'xplQcoy.jpeg',
];

export const createCards = (): Card[] => {
	const cards: Card[] = cardImages.flatMap((image) => [
		{ id: uuidv4(), url: `/front_v2/${image}` },
		{ id: uuidv4(), url: `/front_v2/${image}` },
	]);
	return cards.sort(() => Math.random() - 0.5);
};
