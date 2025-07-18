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
          © 2025 Vet Sync App - Proyecto de Portafolio
          <br />
          Imágenes para demostración únicamente
        </p>
      </footer>
    </div>
  )
}
