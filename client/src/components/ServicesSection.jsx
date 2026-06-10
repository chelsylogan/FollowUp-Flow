import { Bot, Mail, MessageSquareText, Repeat, Settings2 } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      title: 'Lead Follow-Up System',
      description: 'Instant multi-channel responses (SMS/Email) that qualify leads and drive them to your booking link.',
      icon: <Bot className="text-white" size={28} />,
    },
    {
      title: 'Review Request System',
      description: 'Automated review requests sent immediately after job completion to boost your Google rating.',
      icon: <MessageSquareText className="text-white" size={28} />,
    },
    {
      title: 'Reactivation Campaign',
      description: 'Turn your old contact list into new money by automatically reaching out to past customers with an offer.',
      icon: <Repeat className="text-white" size={28} />,
    },
    {
      title: 'Messaging Templates',
      description: 'Professionally crafted scripts for every scenario—from initial inquiry to appointment reminders.',
      icon: <Mail className="text-white" size={28} />,
    },
    {
      title: 'Monthly Optimization',
      description: 'We monitor your workflows, tweak the timing, and update the messaging based on real performance data.',
      icon: <Settings2 className="text-white" size={28} />,
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 space-y-6 lg:space-y-0">
          <div className="max-w-2xl">
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Our Services</h2>
            <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to automate your <span className="text-primary">growth.</span>
            </p>
            <p className="text-lg text-gray-600">
              We don't just give you tools—we build the systems that work while you're busy running your business.
            </p>
          </div>
          <div>
            <a href="#pricing" className="text-primary font-bold hover:underline flex items-center">
              View pricing details <span className="ml-2">→</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title} 
              className={`p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 ${index === 0 || index === 2 ? 'bg-primary text-white' : 'bg-white text-gray-900'}`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg ${index === 0 || index === 2 ? 'bg-white/20' : 'bg-primary'}`}>
                {service.icon}
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${index === 0 || index === 2 ? 'text-white' : 'text-gray-900'}`}>{service.title}</h3>
              <p className={`leading-relaxed ${index === 0 || index === 2 ? 'text-gray-100' : 'text-gray-600'}`}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
