import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Hero from "@/components/landing/Hero";
import Piliers from "@/components/landing/Piliers";
import Expertises from "@/components/landing/Expertises";
import Methodologie from "@/components/landing/Methodologie";
import ImageSection from "@/components/landing/ImageSection";
import References from "@/components/landing/References";
import CTAFinal from "@/components/landing/CTAFinal";

export default function Home() {
  return (
    <main className="bg-ivory text-petrol">
      <Header />
      <Hero />
      <Piliers />
      <Expertises />
      <Methodologie />
      <ImageSection />
      <References />
      <CTAFinal />
      <Footer />
    </main>
  );
}