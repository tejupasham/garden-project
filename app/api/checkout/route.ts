import { stripe } from '@/lib/stripe'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
	try {
		const session = await getServerSession()

		if (!session)
			return NextResponse.json({ error: 'Unauthorized' }, { status: 400 })

		const user = await prisma.user.findUnique({
			where: { email: session.user?.email as string },
		})

		const { paymentMethodId, amount, orderId } = await req.json()

		const paymentIntent = await stripe.paymentIntents.create({
			payment_method: paymentMethodId,
			amount,
			currency: 'inr',
			confirmation_method: 'automatic',
			confirm: true,
			metadata: {
				userId: user?.id as number,
				orderId,
			},
		})

		const payment = await prisma.payment.create({
			data: { order: { connect: { id: orderId } } },
		})

		return NextResponse.json(
			{ clientSecret: paymentIntent.client_secret, paymentId: payment.id },
			{ status: 200 }
		)
	} catch (error) {
		console.log(error)
		return NextResponse.json(
			{ error: 'Payment processing failed' },
			{ status: 500 }
		)
	}
}
