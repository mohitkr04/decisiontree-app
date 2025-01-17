import { useNavigate } from 'react-router-dom';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Testimonials from '../components/landing/Testimonials';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <Testimonials />
    </div>
  );
}