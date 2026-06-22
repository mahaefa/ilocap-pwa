import Hero from "@/components/landing/Hero";
import Methodologie from "@/components/landing/Methodologie";
import Piliers from "@/components/landing/Piliers";
import Expertises from "@/components/landing/Expertises";
import References from "@/components/landing/References";
import CTAFinal from "@/components/landing/CTAFinal";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import CookieBanner from "@/components/shared/CookieBanner";
import FloatingCTA from "@/components/shared/FloatingCTA";
import SocialFloat from "@/components/shared/SocialFloat";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-[#F3F1EC]">
        <Hero />
        <Methodologie />
        <Piliers />
        <Expertises />
        <References />
        <CTAFinal />
      </main>
      <Footer />
      <FloatingCTA />
      <SocialFloat />
      <CookieBanner />
    </>
  );
}