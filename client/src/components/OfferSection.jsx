import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const OfferSection = () => {
  const benefits = [
    'Complete response time analysis',
    'Review collection health score',
    'Database reactivation potential estimate',
    'Customized "Quick-Win" automation plan',
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-sm border border-gray-100">
          <div className="absolute top-0 right-0 p-8">
            <span className="bg-secondary text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full transform rotate-12 inline-block">
              Limited spots
            </span>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Get Your Personalized <br />
                <span className="text-primary underline decoration-secondary decoration-4">Follow-Up Audit</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Stop guessing where you're losing money. We'll manually review your current inquiry flow and show you exactly where a 5-minute automation could double your bookings.
              </p>
              <div className="space-y-4 mb-10">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center space-x-3 text-gray-700">
                    <CheckCircle2 className="text-primary flex-shrink-0" size={20} />
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/audit"
                className="inline-block bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-primary/20"
              >
                Book My Follow-Up Audit
              </Link>
            </div>
            <div className="hidden md:block">
               <div className="bg-white p-6 rounded-2xl shadow-xl transform rotate-3">
                 <div className="space-y-4">
                   <div className="flex items-center space-x-3 border-b pb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">1</div>
                      <span className="font-bold">Lead Inflow: 45/mo</span>
                   </div>
                   <div className="flex items-center space-x-3 border-b pb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">2</div>
                      <span className="font-bold">Avg Response: 4.2 hrs</span>
                   </div>
                   <div className={`flex items-center space-x-3 text-secondary font-black`}>
                      <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center text-secondary font-bold">!</div>
                      <span>Lost Revenue: ~$12,400/mo</span>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
