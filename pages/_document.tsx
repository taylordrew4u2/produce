import { Html, Head, Main, NextScript } from 'next/document'
import fs from 'fs'
import path from 'path'

export default function Document() {
	// Absolute site URL for social previews (set NEXT_PUBLIC_SITE_URL in env)
	const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '')

	// Choose best available social image
	const publicDir = path.join(process.cwd(), 'public')
	const candidates = ['og-image.png', 'logo.png', 'logo.jpg', 'logo.svg']
	const chosen = candidates.find((name) => fs.existsSync(path.join(publicDir, name))) || 'logo.svg'
	const ogPath = `/${chosen}`
	const ogImage = siteUrl ? `${siteUrl}${ogPath}` : ogPath

	return (
		<Html lang="en">
			<Head>
				{/* PNG favicons (preferred) */}
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
				{/* SVG fallbacks (already present) */}
				<link rel="icon" type="image/svg+xml" sizes="16x16" href="/favicon-16x16.svg" />
				<link rel="icon" type="image/svg+xml" sizes="32x32" href="/favicon-32x32.svg" />
				<link rel="icon" type="image/svg+xml" sizes="48x48" href="/favicon-48x48.svg" />
				{/* Apple touch icon */}
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				{/* Generic icon fallback to logo */}
				<link rel="icon" href="/logo.png" />

				{/* Open Graph and social meta tags */}
				<meta property="og:title" content="Pins & Needles Comedy" />
				<meta property="og:description" content="Producer dashboard for Pins & Needles Comedy. Manage shows, tasks, and lineups." />
				<meta property="og:image" content={ogImage} />
				{siteUrl && <meta property="og:url" content={siteUrl} />}
				<meta property="og:site_name" content="Pins & Needles Comedy" />
				<meta property="og:image:alt" content="Pins & Needles Comedy Logo" />
				<meta property="og:type" content="website" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Pins & Needles Comedy" />
				<meta name="twitter:description" content="Producer dashboard for Pins & Needles Comedy. Manage shows, tasks, and lineups." />
				<meta name="twitter:image" content={ogImage} />
				{/* Fallback to SVG logo if PNG missing */}
				<link rel="icon" type="image/svg+xml" href="/logo.svg" />
				<meta name="theme-color" content="#000000" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
