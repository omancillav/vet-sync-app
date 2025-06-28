import { FeaturesSection } from '@/components/home/FeaturesSection'
import { HeroSection } from '@/components/home/HeroSection'
import { ServicesSection } from '@/components/home/ServicesSection'

export function Home() {
  return (
    <div className="flex flex-col min-h-screen pt-0.5">
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <footer className="flex items-center justify-center pb-10 px-4">
        <p className="text-foreground/50 text-center text-sm md:text-base">
          © 2025 Vet-Sync App. Las imágenes son para fines ilustrativos y pueden estar sujetas a derechos de autor.
        </p>
      </footer>
    </div>
  )
}
