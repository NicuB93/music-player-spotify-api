import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest } from 'next';

type NextRequestCustom = NextRequest & NextApiRequest;

export const middleware = async (req: NextRequestCustom) => {
  // Token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET ?? '' });
  const { pathname } = req.nextUrl;
  // Allow the requests if the following is true...
  // 1.  the token exists
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  // Redirect to login if they dont have token
  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login');
  }
};
