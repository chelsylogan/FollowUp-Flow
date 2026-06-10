import { useState } from 'react';
import axios from 'axios';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import { Footer } from '../components/ContactSection';

const industries = [
  'Med Spa', 'Salon', 'Dental', 'Contractor', 'Cleaning', 
  'Roofer', 'Landscaper', 'Home Service', 'Photographer', 
  'Wellness', 'Consultant', 'Other'
];

const AuditPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    business_name: '',
    website: '',
    industry: '',
    email: '',
    phone: '',
    contact_method: '',
    uses_crm: '',
    asks_reviews: '',
    biggest_challenge: '',
    monthly_inquiries: '',
    preferred_contact: ''
  });

  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.business_name) newErrors.business_name = 'Business name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    try {
      await axios.post('/api/submissions', formData);
      setStatus('success');
      window.scrollTo(0, 0);
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-4 py-20">
          <div className="max-w-md w-full bg-white p-12 rounded-[2.5rem] shadow-xl text-center border border-gray-100">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={40} className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Audit Requested!</h1>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Thank you! We'll review your audit and be in touch within 1-2 business days.
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all"
            >
              Back to Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Get Your Follow-Up Audit</h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Fill out the details below and our team will manually analyze your current follow-up process to find hidden revenue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100">
            {status === 'error' && (
              <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 flex items-center space-x-3">
                <AlertCircle size={20} />
                <span>Something went wrong. Please try again or email hello@followupflow.com</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 ml-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-5 py-3 rounded-xl border ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-xs text-red-500 ml-1 font-medium">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 ml-1">Business Name *</label>
                <input
                  type="text"
                  name="business_name"
                  value={formData.business_name}
                  onChange={handleChange}
                  className={`w-full px-5 py-3 rounded-xl border ${errors.business_name ? 'border-red-500 bg-red-50' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
                  placeholder="Your business name"
                />
                {errors.business_name && <p className="text-xs text-red-500 ml-1 font-medium">{errors.business_name}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 ml-1">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 ml-1">Industry</label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white appearance-none"
                >
                  <option value="">Select industry</option>
                  {industries.map(i => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 ml-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-5 py-3 rounded-xl border ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
                  placeholder="email@example.com"
                />
                {errors.email && <p className="text-xs text-red-500 ml-1 font-medium">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 ml-1">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-5 py-3 rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
                  placeholder="(555) 000-0000"
                />
                {errors.phone && <p className="text-xs text-red-500 ml-1 font-medium">{errors.phone}</p>}
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700 ml-1">How do new leads usually contact you?</label>
                <textarea
                  name="contact_method"
                  value={formData.contact_method}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="e.g. Website form, Phone calls, Instagram DM..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700 ml-1">Do you currently use a CRM?</label>
                  <div className="flex flex-wrap gap-4">
                    {['Yes', 'No', 'Not Sure'].map(val => (
                      <label key={val} className="flex items-center space-x-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="uses_crm"
                          value={val}
                          checked={formData.uses_crm === val}
                          onChange={handleChange}
                          className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                        />
                        <span className="text-gray-600 group-hover:text-gray-900">{val}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700 ml-1">Do you currently ask for reviews?</label>
                  <div className="flex flex-wrap gap-4">
                    {['Yes', 'No', 'Sometimes'].map(val => (
                      <label key={val} className="flex items-center space-x-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="asks_reviews"
                          value={val}
                          checked={formData.asks_reviews === val}
                          onChange={handleChange}
                          className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                        />
                        <span className="text-gray-600 group-hover:text-gray-900">{val}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700 ml-1">Biggest follow-up challenge</label>
                <textarea
                  name="biggest_challenge"
                  value={formData.biggest_challenge}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="What is the hardest part about following up with leads?"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700 ml-1">Approx. new inquiries / mo</label>
                  <select
                    name="monthly_inquiries"
                    value={formData.monthly_inquiries}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                  >
                    <option value="">Select range</option>
                    {['<10', '10-25', '26-50', '51-100', '100+'].map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700 ml-1">Preferred contact method</label>
                  <div className="flex flex-wrap gap-4">
                    {['Email', 'Phone', 'Text'].map(val => (
                      <label key={val} className="flex items-center space-x-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="preferred_contact"
                          value={val}
                          checked={formData.preferred_contact === val}
                          onChange={handleChange}
                          className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                        />
                        <span className="text-gray-600 group-hover:text-gray-900">{val}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-secondary text-white py-4 rounded-xl font-black text-xl hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center shadow-lg shadow-secondary/20"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={24} className="animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Request My Audit'
                )}
              </button>
              <p className="text-center text-gray-400 text-xs mt-6">
                By clicking "Request My Audit", you agree to receive follow-up communication from FollowUp Flow.
              </p>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuditPage;
