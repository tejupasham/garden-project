import LoginForm from '@/components/login-form'
import Link from 'next/link'

export default function Login() {
	return (
		<div className="max-w-sm w-full mx-auto">
			<h1 className="text-xl font-bold mb-5 text-center">Login</h1>

			<LoginForm />

			<div className="mt-5 text-center">
				Don&apos;t have an account?{' '}
				<Link href="/register" className="underline">
					Register
				</Link>
			</div>
		</div>
	)
}
