import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection.jsx";
import PricingSection from "../components/landing/PricingSection.jsx";
import TestimonialsSection from "../components/landing/TestimonialsSection.jsx";
import CTASection from "../components/landing/CTASection.jsx";
import Footer from "../components/landing/Footer.jsx";
import {features, pricingPlans, testimonials} from "../assets/data.js";
const Landing=()=>{
    return(
        <div className="Landing-page bg-gradient-to-b from-gray-50 to-gray-100 ">
            {/*Hero section */}
            <HeroSection/>


             {/*Feature SEction */}

            <FeaturesSection features={features}/>


             {/*Pricing Section*/}
            <PricingSection pricingPlans={pricingPlans}/>




             {/*Testimonial section */}
            <TestimonialsSection/>



             {/*cta sction */}
             <CTASection/>

             <Footer/>

        </div>
    )
}

export default Landing;