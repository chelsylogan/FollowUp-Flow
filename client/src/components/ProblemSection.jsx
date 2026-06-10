import { Clock, MessageSquare, PhoneMissed, Star } from 'lucide-react';

const ProblemSection = () => {
  const problems = [
    {
      title: 'Slow Response Times',
      description: 'The average lead goes cold in 5 minutes. If you are busy working, you are losing money.',
      icon: <Clock className="text-secondary" size={24} />,
    },
    {
      title: 'Missed Calls & Voicemails',
      description: 'Half of callers will not leave a voicemail—they just call your competitor instead.',
      icon: <PhoneMissed className="text-secondary" size={24} />,
    },
    {
      title: 'Forgotten Leads',
      description: 'Without a system, following up with a lead twice (let alone five times) rarely happens.',
      icon: <MessageSquare className="text-secondary" size={24} />,
    },
    {
      title: 'Inconsistent Reviews',
      description: 'You do great work, but forgetting to ask for the review means your reputation stays invisible.',
      icon: <Star className="text-secondary" size={24} />,
    },
  ];

  return (
    <section id="problem" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">The Real Problem</h2>
          <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            You don't have a lead problem.<br className="hidden md:block" /> You have a <span className="text-secondary underline decoration-2 underline-offset-4">follow-up problem.</span>
          </p>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Most local businesses are great at their craft, but struggle with the "in-between" moments that make or break a sale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem) => (
            <div key={problem.title} className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100 group">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {problem.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{problem.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
