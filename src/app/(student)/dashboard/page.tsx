import { WelcomeBanner } from "./components/widgets/WelcomeBanner"
import { ContinueLearning } from "./components/widgets/ContinueLearning"
import { LearningWorlds } from "./components/widgets/LearningWorlds"
import { DailyGoals } from "./components/widgets/DailyGoals"
import { TreasureChest } from "./components/widgets/TreasureChest"

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-8">
      {/* CSS Grid for Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Full Width Banner */}
        <WelcomeBanner className="col-span-1 md:col-span-2 lg:col-span-4" />
        
        {/* Main Content Area */}
        <ContinueLearning className="col-span-1 md:col-span-2 lg:col-span-3" />
        
        {/* Side Widgets */}
        <div className="col-span-1 flex flex-col gap-6">
          <DailyGoals />
          <TreasureChest />
        </div>

        {/* Worlds Grid */}
        <LearningWorlds className="col-span-1 md:col-span-2 lg:col-span-4 mt-4" />
        
      </div>
    </div>
  )
}
