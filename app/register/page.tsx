import RegisterForm from '@/components/register-form'
import Link from 'next/link'

export default function Register() {
	return (
		<div className="max-w-sm w-full mx-auto">
			<h1 className="text-xl font-bold mb-5 text-center">Create new account</h1>

			<RegisterForm />

			<div className="text-center mt-5">
				Already registered?{' '}
				<Link href="/login" className="underline">
					Login
				</Link>
			</div>
		</div>
	)
}
