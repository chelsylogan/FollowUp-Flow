import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Lock, AlertCircle, Loader2 } from 'lucide-react';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, error
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await axios.post('http://localhost:3001/api/admin/login', { password });
      if (response.data.success) {
        sessionStorage.setItem('adminToken', response.data.token);
        navigate('/admin/leads');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-xl p-8 md:p-12 border border-gray-200">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <Lock size={32} className="text-primary" />
        </div>
        
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Admin Login</h2>
        <p className="text-center text-gray-500 mb-10">Enter your password to manage leads.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {status === 'error' && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 flex items-center space-x-3 text-sm">
              <AlertCircle size={18} />
              <span>Invalid password. Please try again.</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center shadow-lg shadow-primary/20"
          >
            {status === 'loading' ? <Loader2 className="animate-spin" size={24} /> : 'Login to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
