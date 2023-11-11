import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
	const session = await getToken({
		req,
		secret: process.env.NEXTAUTH_SECRET,
	})

	const path = req.nextUrl.pathname

	if (
		!session &&
		(new RegExp('/checkout?id=[0-9]*').test(path) ||
			path === '/orders' ||
			path === '/api/checkout' ||
			path === '/api/orders' ||
			path === '/api/update-payment')
	)
		return NextResponse.redirect(new URL('/login', req.url))
	else if (session && (path === '/login' || path === '/register'))
		return NextResponse.redirect(new URL('/', req.url))

	return NextResponse.next()
}
