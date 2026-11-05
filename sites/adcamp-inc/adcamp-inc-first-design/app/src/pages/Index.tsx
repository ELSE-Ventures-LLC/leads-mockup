import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import ServicesCards from "@/components/ServicesCards";
import Sectors from "@/components/Sectors";
import ClientLogos from "@/components/ClientLogos";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Mission />
      <ServicesCards />
      <Sectors />
      <ClientLogos />
      <Footer />
    </div>
  );
};

export default Index;
