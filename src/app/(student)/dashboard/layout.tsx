import { TopStatsBar, BottomNavBar } from "./components/layout/DashboardNav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-bg-light relative pb-24 md:pb-0">
      <TopStatsBar />
      <main className="w-full max-w-7xl mx-auto">
        {children}
      </main>
      <BottomNavBar />
    </div>
  )
}
