const HowItWorksSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Audit',
      description: 'We analyze your current response time, review collection process, and list health to find the leaks.',
    },
    {
      number: '02',
      title: 'Build',
      description: 'We set up your custom messaging workflows, appointment triggers, and review automation.',
    },
    {
      number: '03',
      title: 'Optimize',
      description: 'We monitor the results, refine the messaging, and ensure your system stays ahead of the competition.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Background decorative line */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>

        <div className="text-center mb-20 relative z-10">
          <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Our Process</h2>
          <p className="text-3xl md:text-4xl font-bold text-gray-900">
            Three steps to a <span className="text-primary">seamless flow.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-white border-8 border-gray-50 flex items-center justify-center text-2xl font-black text-primary shadow-xl mb-8">
                {step.number}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600 max-w-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
