'use client'

import axios from 'axios'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import * as Yup from 'yup'
import { buttonVariants } from './ui/button'

const validationSchema = Yup.object().shape({
	orderDate: Yup.date().default(new Date()),
})

export default function Order(props: { productId: number }) {
	const router = useRouter()

	const formik = useFormik({
		initialValues: {
			orderDate: new Date(),
		},
		validationSchema,
		async onSubmit(values, { setSubmitting }) {
			try {
				setSubmitting(true)

				const res = await axios.post('/api/orders', {
					...values,
					productId: props.productId,
				})

				if (res.status === 201) {
					setSubmitting(false)
					return router.push(`/checkout?id=${res.data.order?.id}`)
				}
			} catch (error) {
				setSubmitting(false)
				console.log(error)
			}
		},
	})

	return (
		<div>
			<form onSubmit={formik.handleSubmit} className="flex gap-x-2.5">
				<input
					type="submit"
					className={twMerge(buttonVariants(), 'mt-auto')}
					value={formik.isSubmitting ? 'Please wait...' : 'Continue'}
				/>
			</form>
		</div>
	)
}
