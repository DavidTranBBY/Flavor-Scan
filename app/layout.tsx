import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/ui/header"
import { inter } from "@/lib/fonts"
export const metadata: Metadata = {
  title: "FlavorScan",
  description: "A platform to scan and analyze flavors.",
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('flavorscan-theme');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = stored || (systemDark ? 'dark' : 'light');
                  document.documentElement.classList.toggle('dark', theme === 'dark');
                  document.documentElement.dataset.theme = theme;
                } catch (_) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.dataset.theme = 'dark';
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-[var(--fs-bg)] text-[var(--fs-text)]`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
