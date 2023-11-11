'use client'

import { useRouter } from 'next/navigation'
import { buttonVariants } from './ui/button'

export default function CancelButton() {
	const router = useRouter()

	const handleCancelBooking = () => {
		router.refresh()
		return router.replace('/')
	}

	return (
		<button
			onClick={handleCancelBooking}
			className={buttonVariants({ variant: 'destructive' })}
		>
			Cancel
		</button>
	)
}
