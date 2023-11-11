import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'

export default async function Bookings() {
	const session = await getServerSession()

	const user = await prisma.user.findUnique({
		where: { email: session?.user?.email as string },
	})

	const orders = await prisma.order?.findMany({
		where: { userId: user?.id },
		select: {
			id: true,
			product: {
				select: {
					title: true,
					price: true,
				},
			},
			payment: {
				select: {
					orderId: true,
					paid: true,
				},
			},
		},
	})

	return (
		<div>
			<h1 className="text-xl font-bold mb-5 text-center">Your orders</h1>
			{orders?.length > 0 ? (
				<Table>
					<TableCaption>A list of all your orders.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>Package</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Payment status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{orders?.map((order) => (
							<TableRow key={order?.id}>
								<TableCell>{order?.id}</TableCell>
								<TableCell>{order?.product.title}</TableCell>
								<TableCell>
									${order?.product.price.toLocaleString('en-US')}
								</TableCell>
								<TableCell>
									{order?.payment.find((p) => p?.orderId === order?.id)
										?.paid ? (
										<span className="text-green-500">Successful</span>
									) : (
										<span className="text-red-500">Failed</span>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			) : (
				<div>No orders have been made.</div>
			)}
		</div>
	)
}
