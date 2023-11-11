import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'

export async function POST(req: Request) {
	try {
		const session = await getServerSession()

		if (!session)
			return NextResponse.json({ error: 'Unauthorized' }, { status: 400 })

		const user = await prisma?.user.findUnique({
			where: { email: session.user?.email as string },
		})

		const { productId, orderDate } = await req.json()

		const order = await prisma.order.create({
			data: {
				orderDate,
				user: { connect: { id: user?.id as number } },
				product: { connect: { id: productId } },
			},
		})

		return NextResponse.json({ order }, { status: 201 })
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ error: 'Order creation failed' },
			{ status: 500 }
		)
	}
}
