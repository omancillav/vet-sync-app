import { FeaturesSection } from '@/components/home/FeaturesSection'
import { HeroSection } from '@/components/home/HeroSection'
import { ServicesSection } from '@/components/home/ServicesSection'

export function Home() {
  return (
    <div className="flex flex-col min-h-screen pt-0.5">
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
    </div>
  )
}
