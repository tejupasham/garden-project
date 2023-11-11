import CancelButton from '@/components/cancel-button'
import Checkout from '@/components/checkout'
import prisma from '@/lib/prisma'
import { format } from 'date-fns'

export default async function Page({
	searchParams,
}: {
	searchParams?: { [key: string]: string | string[] | undefined }
}) {
	const order = await prisma.order.findUnique({
		where: { id: parseInt(searchParams?.id as string) },
		select: {
			orderDate: true,
			product: {
				select: {
					title: true,
					price: true,
				},
			},
		},
	})

	return (
		<div>
			<h1 className="text-xl font-bold mb-5">Checkout</h1>

			<section className="flex flex-col gap-y-2">
				<strong>{order?.product.title}</strong>
				<h2 className="text-lg font-bold">${order?.product.price}</h2>
				<time>{format(order?.orderDate as Date, 'PPP')}</time>
			</section>

			<div className="mt-3.5">
				<CancelButton />
			</div>

			<div className="mt-8">
				<h2 className="text-lg font-bold mb-2.5">Payment information</h2>
				<Checkout orderId={parseInt(searchParams?.id as string)} />
			</div>
		</div>
	)
}
