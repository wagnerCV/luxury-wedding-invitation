import { HeroSection } from "@/components/sections/HeroSection";
import { WhereWhenSection } from "@/components/sections/WhereWhenSection";
import { DressCodeSection } from "@/components/sections/DressCodeSection";
import { LoveQuoteSection } from "@/components/sections/LoveQuoteSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { SpotifySection } from "@/components/sections/SpotifySection";
import { RSVPSection } from "@/components/sections/RSVPSection";
import { Footer } from "@/components/sections/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WhereWhenSection />
      <DressCodeSection />
      <LoveQuoteSection />
      <GallerySection />
      <SpotifySection />
      <RSVPSection />
      <Footer />
      <FloatingCTA />
    </div>
  );
}
