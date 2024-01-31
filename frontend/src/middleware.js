import { NextResponse } from 'next/server';

export default async function middleware(req) {
	const authToken = req.cookies.get('authToken');
	const publicRoutes = ['/', '/auth/signin', '/auth/register'];
	const requestedPage = req.nextUrl.pathname;

	if (!authToken && !publicRoutes.includes(requestedPage)) {
		return NextResponse.redirect(new URL('/auth/signin', req.url));
	}

	if (authToken && publicRoutes.includes(requestedPage)) {
		try {
			return NextResponse.redirect(
				new URL(
					`/classroom/${process.env.NEXT_PUBLIC_VIRTUAL_CLASS_ID}`,
					req.url,
				),
			);
		} catch (error) {
			return NextResponse.next();
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/', '/auth/:path*', '/classroom/:path*'],
};
