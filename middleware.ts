import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'hi', 'te', 'ta', 'ml', 'kn', 'mr', 'gu', 'bn', 'or', 'pa'],
  defaultLocale: 'en',
});

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*|monitoring).*)',
    '/([\\w-]+)?/users/(.+)',
  ],
};
