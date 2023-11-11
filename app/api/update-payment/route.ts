import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PATCH(req: Request) {
	try {
		const { id, paymentId } = await req.json()

		await prisma.payment.update({
			where: { id },
			data: { paymentId, paid: true },
		})

		return NextResponse.json({}, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{ error: 'Payment updation failed' },
			{ status: 500 }
		)
	}
}
