import './globals.css'

export const metadata = {
  title: 'React Canvas Next',
  description: 'A lightweight canvas lib based on react',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
