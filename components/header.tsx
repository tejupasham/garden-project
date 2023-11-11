import { getServerSession } from 'next-auth'
import Link from 'next/link'
import SignOutButton from './signout-button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'

export default async function Header() {
	const session = await getServerSession()

	return (
		<header className="py-5 border-b">
			<div className="container flex items-center justify-between">
				<Link href="/" className="font-medium">
					Botanico.
				</Link>

				{session ? (
					<DropdownMenu>
						<DropdownMenuTrigger className="underline decoration-dotted">
							{session.user?.email}
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href="/orders">Orders</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<SignOutButton />
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<Link href="/login">Login</Link>
				)}
			</div>
		</header>
	)
}
