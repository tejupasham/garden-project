import { buttonVariants } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import { Product } from '@prisma/client'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
	const session = await getServerSession()

	const products = await prisma.product.findMany()

	return (
		<div>
			<h1 className="text-xl font-bold">
				{session ? `Hello, ${session.user?.name}` : 'Hi, there'} 👋
			</h1>

			{products?.length > 0 && (
				<div
					id="products-grid"
					className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-8"
				>
					{products.map((product: Product) => (
						<section
							key={product.id}
							className="border p-5 rounded-md space-y-3"
						>
							{product.imageUrl ? (
								<div className="relative h-56 mb-5">
									<Image
										src={product.imageUrl}
										fill
										alt={product.title}
										className="object-cover rounded-md bg-gradient-to-tr from-gray-100 to-gray-300"
									/>
								</div>
							) : (
								<div className="h-56 mb-5 bg-gradient-to-tr from-gray-100 to-gray-300 rounded-md" />
							)}
							<strong>{product.title}</strong>
							<h6 className="text-lg font-bold">
								${product.price.toLocaleString('en-US')}
							</h6>
							<p className="line-clamp-3 leading-relaxed">
								{product.description}
							</p>
							<Link
								href={`/products/${product.id}`}
								className={buttonVariants({ class: 'w-full' })}
							>
								View
							</Link>
						</section>
					))}
				</div>
			)}
		</div>
	)
}
