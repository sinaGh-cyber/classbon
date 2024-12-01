import './globals.css';

import { Figtree } from 'next/font/google';
import localFont from 'next/font/local';
import { Header } from './_components/header';
import { Footer } from './_components/footer';
import QueryProvider from '@/providers/react-query-provider';
import NextTopLoader from 'nextjs-toploader';
import classNames from 'classnames';
import { Notifications } from './_components/notification/notification';

const figtree = Figtree({
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-figtree',
	weight: ['300', '400', '500', '600', '700', '700', '800', '900'],
});

const yekanbakh = localFont({
	src: [
		{
			path: '../../public/fonts/yekanbakh/YekanBakhFaNum-Thin.woff2',
			weight: '100',
			style: 'normal',
		},
		{
			path: '../../public/fonts/yekanbakh/YekanBakhFaNum-Light.woff2',
			weight: '300',
			style: 'normal',
		},
		{
			path: '../../public/fonts/yekanbakh/YekanBakhFaNum-Regular.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/fonts/yekanbakh/YekanBakhFaNum-SemiBold.woff2',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../../public/fonts/yekanbakh/YekanBakhFaNum-Bold.woff2',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../../public/fonts/yekanbakh/YekanBakhFaNum-Black.woff2',
			weight: '900',
			style: 'normal',
		},
	],
	variable: '--font-yekanbakh',
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	console.log(yekanbakh.variable);

	return (
		<html
			dir="rtl"
			className={`${yekanbakh.variable} ${figtree.variable} dark`}
		>
			<body className="min-h-screen grid grid-rows-[80px_1fr_auto] dark:bg-base-100 dark:text-base-content">
			<NextTopLoader showSpinner={false} color='var(--color-error)' />
				<QueryProvider>
				<Notifications/>
					<Header />
					<main>{children}</main>
					<Footer />
				</QueryProvider>
			</body>
		</html>
	);
}
