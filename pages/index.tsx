import { Sponsors, Statistics, Model, Tournaments, Team, Faq, Community, WaitList } from '@/components'
import { MainLayout } from '@/layout'
import dynamic from 'next/dynamic'
const [
  Hero,
  // ExploreQuests,
  // OnChainResume,
  // SkillList,
  // HowItWorks,
  // TokenSummary,
  // Roadmap,
  // Community,
] = [
  dynamic(() => import('@/components/hero/Hero')),
  // dynamic(() => import("@/components/explore-quests/ExploreQuests")),
  // dynamic(() => import("@/components/onchain-resume/OnChainResume")),
  // dynamic(() => import("@/components/skill-list/SkillList")),
  // dynamic(() => import("@/components/how-it-works/HowItWorks")),
  // dynamic(() => import("@/components/token-summary/TokenSummary")),
  // dynamic(() => import("@/components/roadmap/Roadmap")),
  // dynamic(() => import("@/components/community/Community"))
]

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <Sponsors />
      <Statistics />
      <Model />
      <Tournaments />
      <Team />
      <Faq />
      <Community />
      <WaitList />
    </MainLayout>
  )
}
