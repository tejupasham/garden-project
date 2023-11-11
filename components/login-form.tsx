'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputField from './input-field'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { useToast } from './ui/use-toast'

const validationSchema = Yup.object().shape({
	email: Yup.string().email().required(),
	password: Yup.string().min(8).required(),
})

export default function LoginForm() {
	const router = useRouter()

	const { toast } = useToast()

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema,
		async onSubmit(values, { setSubmitting }) {
			setSubmitting(true)
			const res = await signIn('credentials', { redirect: false, ...values })

			if (res?.error) {
				setSubmitting(false)
				return toast({ variant: 'destructive', title: res.error })
			}

			router.refresh()
			router.replace('/')
		},
	})

	return (
		<form onSubmit={formik.handleSubmit} className="space-y-3">
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
				{formik.isSubmitting ? 'Please wait...' : 'Login'}
			</Button>
		</form>
	)
}
