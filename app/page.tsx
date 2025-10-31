import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturesBar from "./components/FeaturesBar";
import ProductsSection from "./components/ProductsSection";
import AboutSection from "./components/AboutSection";
import CustomersSection from "./components/CustomersSection";
import ReviewsSection from "./components/ReviewsSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--background)'}}>
      <Header />
      <HeroSection />
      <FeaturesBar />
      <ProductsSection />
      <AboutSection />
      <CustomersSection />
      <ReviewsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
