'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputField from './input-field'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { useToast } from './ui/use-toast'

const validationSchema = Yup.object().shape({
	name: Yup.string().required(),
	email: Yup.string().email().required(),
	password: Yup.string().min(8).required(),
})

export default function RegisterForm() {
	const router = useRouter()

	const { toast } = useToast()

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
		},
		validationSchema,
		async onSubmit(values, { setSubmitting }) {
			setSubmitting(true)
			try {
				const res = await axios.post('/api/auth/register', values)
				if (res.status === 201) {
					setSubmitting(false)
					return router.replace('/login')
				}
			} catch (error) {
				setSubmitting(false)
				toast({
					variant: 'destructive',
					title: (error as Error).message,
				})
			}
		},
	})

	return (
		<form onSubmit={formik.handleSubmit} className="space-y-3">
			<InputField
				label="Name"
				name="name"
				id="name"
				value={formik.values.name}
				onChange={formik.handleChange('name')}
				onBlur={formik.handleBlur('name')}
				error={
					formik.touched.name && formik.errors.name ? formik.errors.name : ''
				}
			/>
			<InputField
				label="Email"
				type="email"
				name="email"
				id="email"
				value={formik.values.email}
				onChange={formik.handleChange('email')}
				onBlur={formik.handleBlur('email')}
				error={
					formik.touched.email && formik.errors.email ? formik.errors.email : ''
				}
			/>
			<InputField
				label="Password"
				type="password"
				name="password"
				id="password"
				value={formik.values.password}
				onChange={formik.handleChange('password')}
				onBlur={formik.handleBlur('password')}
				error={
					formik.touched.password && formik.errors.password
						? formik.errors.password
						: ''
				}
			/>
			<Button type="submit" className="w-full">
				{formik.isSubmitting ? 'Please wait...' : 'Register'}
			</Button>
		</form>
	)
}
