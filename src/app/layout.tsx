import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Memory Card Game',
	description: 'Guess pair cards',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="bg-[url('/cool-background.png')] bg-cover bg-center min-h-screen">
					{children}
				</div>
			</body>
		</html>
	);
}
