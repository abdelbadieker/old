export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#0A0A0F' }}>
        {children}
      </body>
    </html>
  )
}
