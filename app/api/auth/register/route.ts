import prisma from '@/lib/prisma'
import { genSalt, hash } from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const { name, email, password } = await req.json()

		const exists = await prisma.user.findUnique({ where: { email } })

		if (exists) {
			return NextResponse.json(
				{ error: 'User already exists' },
				{ status: 400 }
			)
		} else {
			const user = await prisma.user.create({
				data: {
					name,
					email,
					password: await hash(password, await genSalt()),
				},
			})
			return NextResponse.json(user, { status: 201 })
		}
	} catch (error) {
		return NextResponse.json(
			{ error: (error as Error)?.message },
			{ status: 500 }
		)
	}
}
