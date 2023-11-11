'use client'

import { signOut } from 'next-auth/react'
import { DropdownMenuItem } from './ui/dropdown-menu'

export default function SignOutButton() {
	const handleSignOut = async () => await signOut()

	return (
		<DropdownMenuItem onClick={handleSignOut} className="text-red-500">
			Sign out
		</DropdownMenuItem>
	)
}
