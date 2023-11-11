'use client'

import {
	CardCvcElement,
	CardExpiryElement,
	CardNumberElement,
	Elements,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { buttonVariants } from './ui/button'
import { twMerge } from 'tailwind-merge'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!, {
	apiVersion: '2022-11-15',
})

function CheckoutForm(props: { orderId: number }) {
	const stripe = useStripe()
	const elements = useElements()
	const router = useRouter()
	const [processing, setProcessing] = useState<boolean>(false)

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setProcessing(true)

		if (!stripe || !elements) return

		try {
			const { paymentMethod, error } = await stripe.createPaymentMethod({
				type: 'card',
				card: elements.getElement(CardNumberElement) as any,
			})

			if (error) {
				setProcessing(false)
				return console.error('Error creating payment method:', error)
			} else {
				const res = await axios.post('/api/checkout', {
					paymentMethodId: paymentMethod.id,
					amount: 1000,
					orderId: props.orderId,
				})

				if (res.status === 200) {
					const { clientSecret, paymentId } = res.data
					const { error: confirmationError } = await stripe.confirmCardPayment(
						clientSecret,
						{ payment_method: paymentMethod.id }
					)
					if (confirmationError) {
						setProcessing(false)
						return console.error('Error confirming payment:', confirmationError)
					} else {
						const res = await axios.patch('/api/update-payment', {
							id: paymentId,
							paymentId: paymentMethod.id,
						})
						if (res.status === 200) {
							setProcessing(false)
							router.refresh()
							return router.replace('/orders')
						}
					}
				}
			}
		} catch (error) {
			setProcessing(false)
			console.error('Error processing payment:', error)
		}
	}

	return stripe ? (
		<form onSubmit={handleSubmit} className="max-w-md" id="card-el">
			<div className="[&>*]:border [&>*]:p-3 [&>*]:rounded-md space-y-2">
				<CardNumberElement />
				<CardExpiryElement />
				<CardCvcElement />
			</div>

			<button
				type="submit"
				disabled={!stripe}
				className={twMerge(buttonVariants(), 'w-full mt-2.5')}
			>
				{processing ? 'Please wait...' : 'Pay'}
			</button>
		</form>
	) : (
		<div>loading payment methods...</div>
	)
}

export default function Checkout(props: { orderId: number }) {
	return (
		stripePromise && (
			<Elements
				stripe={stripePromise}
				options={{ appearance: { theme: 'stripe' } }}
			>
				<CheckoutForm orderId={props.orderId} />
			</Elements>
		)
	)
}
