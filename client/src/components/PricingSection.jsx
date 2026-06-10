import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  const tiers = [
    {
      name: 'Starter System',
      price: '$497',
      setup: 'setup',
      description: 'Perfect for small businesses starting with automation.',
      features: [
        'Lead Response Automation',
        '3 Messaging Templates',
        'Basic Workflow Map',
        'Email Support',
      ],
      cta: 'Get Starter',
      featured: false,
    },
    {
      name: 'Growth System',
      price: '$997',
      setup: 'setup',
      description: 'The complete engine for businesses ready to scale.',
      features: [
        'Everything in Starter',
        'Full Review Request System',
        'Reactivation Campaign',
        'CRM Integration',
        '30-Day Check-in',
      ],
      cta: 'Get Growth',
      featured: true,
    },
    {
      name: 'Monthly Optimization',
      price: '$297',
      setup: '/mo',
      description: 'Ongoing maintenance and proactive optimization.',
      features: [
        'Ongoing A/B Testing',
        'Monthly Performance Audit',
        'Seasonal Campaign Setup',
        'Priority Technical Support',
      ],
      cta: 'Start Optimization',
      featured: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Simple Pricing</h2>
          <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Invest in a system that <span className="text-primary">pays for itself.</span>
          </p>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            No long-term contracts. Just high-performing systems designed to capture every lead.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className={`relative bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm transition-all duration-300 hover:shadow-xl border-2 ${tier.featured ? 'border-primary scale-105 z-10' : 'border-transparent'}`}
            >
              {tier.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-black text-gray-900">{tier.price}</span>
                  <span className="text-gray-500 ml-1 font-medium">{tier.setup}</span>
                </div>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <div className="space-y-4 mb-10">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start space-x-3 text-sm">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-primary" strokeWidth={3} />
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/audit"
                className={`w-full block text-center py-4 rounded-xl font-bold transition-all ${tier.featured ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
