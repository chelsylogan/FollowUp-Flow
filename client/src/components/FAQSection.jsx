import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection = () => {
  const faqs = [
    {
      question: "Will this replace my current CRM?",
      answer: "No, we actually help you use your CRM better. We sit on top of your current setup to ensure the 'last mile' of follow-up actually happens automatically, and we push all that data back into your CRM.",
    },
    {
      question: "Do I need special software for this to work?",
      answer: "We primarily work with systems like GoHighLevel or custom API integrations. During the audit, we'll look at your current stack and recommend the most cost-effective way to get these automations running.",
    },
    {
      question: "What if I only get a few leads per month?",
      answer: "If your leads are high-value (like a roof replacement or a $5k med spa package), even saving ONE lead a month from disappearing pays for the entire system for a year.",
    },
    {
      question: "How long does it take to set up?",
      answer: "A typical 'Starter' or 'Growth' system is fully operational within 7-14 days after we complete the initial audit.",
    },
    {
      question: "Do the messages sound like a robot?",
      answer: "Absolutely not. We specialize in 'human-first' automation. We use your brand's voice, slang, and typical reply style so that your customers feel like they're talking to a real member of your team.",
    },
    {
      question: "Can I cancel the monthly optimization later?",
      answer: "Yes, our optimization is month-to-month. The systems we build for you (Starter/Growth) are yours to keep—the optimization just ensures they stay updated and high-performing.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Questions?</h2>
          <p className="text-3xl md:text-4xl font-bold text-gray-900">
            Frequently Asked <span className="text-primary">Questions.</span>
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-100 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-bold text-gray-900">{faq.question}</span>
                {openIndex === index ? <ChevronUp size={20} className="text-primary" /> : <ChevronDown size={20} className="text-gray-400" />}
              </button>
              {openIndex === index && (
                <div className="p-6 pt-0 text-gray-600 leading-relaxed bg-gray-50/50">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
