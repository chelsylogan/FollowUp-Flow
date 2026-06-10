import { CheckCircle2 } from 'lucide-react';

const WhoItsForSection = () => {
  const industries = [
    'Med Spas & Salons',
    'Dentists & Orthodontists',
    'General Contractors',
    'Cleaning Services',
    'Roofers & Landscapers',
    'Home Service Providers',
    'Photographers',
    'Wellness Providers',
    'Consultants',
  ];

  return (
    <section className="py-20 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-secondary font-semibold tracking-wide uppercase text-sm mb-3">Who It's For</h2>
            <p className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Built for businesses that are <span className="italic">too busy</span> to let money walk out the door.
            </p>
            <p className="text-lg text-primary-light mb-8 opacity-90">
              If you get inquiries but find yourself replying 4 hours later, or if you finish a job and "forget" to ask for the review, we built this for you.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {industries.map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <CheckCircle2 className="text-secondary flex-shrink-0" size={20} />
                  <span className="text-lg font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="bg-white/10 aspect-square rounded-full absolute -top-10 -right-10 w-64 h-64 blur-3xl"></div>
            <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <blockquote className="text-xl md:text-2xl font-medium italic mb-6 leading-relaxed">
                "The automated follow-up started booking appointments before I even saw the lead came in. It's like having a receptionist who never sleeps."
              </blockquote>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
                <div>
                  <p className="font-bold">David Chen</p>
                  <p className="text-sm opacity-70">Home Services Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoItsForSection;
