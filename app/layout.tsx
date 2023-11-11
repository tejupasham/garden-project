import Header from '@/components/header'
import { Inter } from 'next/font/google'
import './globals.css'
import { twMerge } from 'tailwind-merge'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={twMerge(inter.className, 'text-sm')}>
				<div className="min-h-screen flex flex-col">
					<Header />
					<main className="container flex-grow py-8">{children}</main>
					<footer className="py-5 border-t">
						<div className="container">&copy; {new Date().getFullYear()}</div>
					</footer>

					<Toaster />
				</div>
			</body>
		</html>
	)
}
