import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Stop letting good <span className="text-primary">leads disappear.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
          You spend money on marketing, but potential customers are slipping through the cracks. 
          We build the automated follow-up systems that turn more inquiries into booked appointments.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            to="/audit"
            className="w-full sm:w-auto bg-secondary text-white px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center shadow-lg shadow-secondary/20"
          >
            Get a Follow-Up Audit
            <ArrowRight className="ml-2" size={20} />
          </Link>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto bg-white text-primary border-2 border-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all"
          >
            See How It Works
          </a>
        </div>
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-primary/5 rounded-3xl -rotate-1 scale-105"></div>
          <div className="relative bg-white border border-gray-100 rounded-3xl shadow-2xl p-4 md:p-8 overflow-hidden">
             <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 italic">
               [Visual: Appointment booking dashboard or automated follow-up flow diagram]
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
