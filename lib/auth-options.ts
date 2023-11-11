import prisma from '@/lib/prisma'
import { compare } from 'bcrypt'
import { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			credentials: {
				email: { type: 'email' },
				password: { type: 'password' },
			},

			async authorize(credentials): Promise<any> {
				const { email, password } = credentials ?? {}

				if (!email || !password) throw new Error('Missing username or password')

				const user = await prisma.user.findUnique({ where: { email } })

				if (!user || !(await compare(password, user.password)))
					throw new Error('Invalid username or password')

				return user
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
}
