import ContactSection from "@/components/contactSection";
import FooterContact from "@/components/footerContact";
import HeroSection from "@/components/heroSection";
import OurGroup from "@/components/ourGroups";
import OurPassion from "@/components/ourPassion";
import ScrollToTopButton from "@/components/scrollToTopButton";
import WhyOneLinkSection from "@/components/whyOneLink";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden relative">
      <HeroSection />
      <OurPassion />
      <OurGroup />
      <WhyOneLinkSection />
      <ContactSection />
      <FooterContact />
      <ScrollToTopButton />
    </main>
  );
}
