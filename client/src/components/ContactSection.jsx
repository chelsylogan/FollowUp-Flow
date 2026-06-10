import { Link } from 'react-router-dom';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-primary p-12 md:p-20 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-secondary rounded-full opacity-10"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-white rounded-full opacity-5"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to plug the leaks?</h2>
            <p className="max-w-2xl mx-auto text-lg md:text-xl opacity-90 mb-12 leading-relaxed">
              Every day you wait is another handful of leads going to your competitors. Let's see what we can fix in your business this week.
            </p>
            <Link
              to="/audit"
              className="inline-block bg-white text-primary px-12 py-5 rounded-2xl font-black text-xl hover:bg-gray-100 transition-all shadow-xl"
            >
              Get Your Free Audit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-bold text-primary mb-6 block">
              FollowUp Flow
            </Link>
            <p className="text-gray-500 max-w-sm mb-6">
              Turn more inquiries into booked appointments and more completed jobs into public reviews—using simple AI-supported follow-up and review workflows.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#services" className="hover:text-primary">Services</a></li>
              <li><a href="#how-it-works" className="hover:text-primary">How It Works</a></li>
              <li><a href="#pricing" className="hover:text-primary">Pricing</a></li>
              <li><a href="#faq" className="hover:text-primary">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-500">
              <li><Link to="/audit" className="hover:text-primary">Get an Audit</Link></li>
              <li><Link to="/admin" className="hover:text-primary">Admin Login</Link></li>
              <li>hello@followupflow.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2024 FollowUp Flow. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-6">
            <a href="#" className="hover:text-gray-600">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { ContactSection, Footer };
