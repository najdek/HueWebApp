import { ResponsiveAppBar } from "@/components/AppBar"

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <ResponsiveAppBar/>
      {children}
    </section>
  )
}