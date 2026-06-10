import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import ServicesSection from '../components/ServicesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import WhoItsForSection from '../components/WhoItsForSection';
import OfferSection from '../components/OfferSection';
import PricingSection from '../components/PricingSection';
import FAQSection from '../components/FAQSection';
import { ContactSection, Footer } from '../components/ContactSection';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <ServicesSection />
        <HowItWorksSection />
        <WhoItsForSection />
        <OfferSection />
        <PricingSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
