import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { 
  Download, 
  ExternalLink, 
  Mail, 
  Phone, 
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { clsx } from 'clsx';

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const token = sessionStorage.getItem('adminToken');

  // 2. Lead Fetching
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/admin/leads', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLeads(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load leads. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchLeads();
    }
  }, [token]);

  // 1. Auth Check (handled by layout as well, but added here as requested)
  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  const handleUpdateLead = async (id, updates) => {
    try {
      await axios.put(`http://localhost:3001/api/admin/leads/${id}`, updates, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update local state instead of re-fetching for better UX
      setLeads(leads.map(l => l.id === id ? { ...l, ...updates } : l));
    } catch (err) {
      alert('Failed to update lead');
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admin/leads/export', {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'followup-flow-leads.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Export failed');
    }
  };

  const statusColors = {
    'New': 'bg-blue-100 text-blue-700 border-blue-200',
    'Contacted': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Audit Scheduled': 'bg-purple-100 text-purple-700 border-purple-200',
    'Audit Sent': 'bg-indigo-100 text-indigo-700 border-indigo-200',
    'Won': 'bg-green-100 text-green-700 border-green-200',
    'Lost': 'bg-gray-100 text-gray-700 border-gray-200'
  };

  if (loading && leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-gray-500 font-medium">Loading your leads...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-500 mt-1">Manage your audit requests and track status.</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center justify-center space-x-2 bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-xl hover:bg-gray-50 transition-all font-semibold shadow-sm"
        >
          <Download size={18} />
          <span>Export CSV</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 flex items-center space-x-3">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-[2rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Name / Business</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Industry</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Date</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center text-gray-400">
                    No leads found yet.
                  </td>
                </tr>
              ) : leads.map((lead) => (
                <React.Fragment key={lead.id}>
                  <tr className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="font-bold text-gray-900">{lead.name}</div>
                      <div className="text-sm text-gray-500">{lead.business_name}</div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">
                        {lead.industry || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col space-y-1">
                        <a href={`mailto:${lead.email}`} className="text-sm text-primary hover:underline flex items-center">
                          <Mail size={14} className="mr-1.5 opacity-60" />
                          {lead.email}
                        </a>
                        <a href={`tel:${lead.phone}`} className="text-sm text-gray-500 flex items-center">
                          <Phone size={14} className="mr-1.5 opacity-60" />
                          {lead.phone}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateLead(lead.id, { status: e.target.value })}
                        className={clsx(
                          "text-xs font-bold px-3 py-1.5 rounded-full border focus:outline-none focus:ring-2 focus:ring-primary/20",
                          statusColors[lead.status] || 'bg-gray-100 text-gray-700 border-gray-200'
                        )}
                      >
                        {Object.keys(statusColors).map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="text-sm text-gray-900 font-medium">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button 
                        onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600"
                      >
                        {expandedId === lead.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </td>
                  </tr>
                  
                  {expandedId === lead.id && (
                    <tr className="bg-gray-50/30">
                      <td colSpan="6" className="px-8 py-8 border-b border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Audit Details</h4>
                              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                <div>
                                  <div className="text-xs text-gray-400">Website</div>
                                  <div className="text-sm font-semibold truncate max-w-xs">
                                    {lead.website ? (
                                      <a href={lead.website} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center">
                                        {lead.website.replace(/^https?:\/\//, '')}
                                        <ExternalLink size={12} className="ml-1" />
                                      </a>
                                    ) : 'N/A'}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-400">Monthly Inquiries</div>
                                  <div className="text-sm font-semibold">{lead.monthly_inquiries || 'N/A'}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-400">Uses CRM?</div>
                                  <div className="text-sm font-semibold">{lead.uses_crm || 'N/A'}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-400">Asks Reviews?</div>
                                  <div className="text-sm font-semibold">{lead.asks_reviews || 'N/A'}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-400">Preferred Contact</div>
                                  <div className="text-sm font-semibold">{lead.preferred_contact || 'N/A'}</div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Biggest Challenge</h4>
                              <p className="text-sm text-gray-700 bg-white p-4 rounded-xl border border-gray-100 italic">
                                "{lead.biggest_challenge || 'No challenge provided.'}"
                              </p>
                            </div>

                            <div>
                              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Usual Contact Method</h4>
                              <p className="text-sm text-gray-700 bg-white p-4 rounded-xl border border-gray-100">
                                {lead.contact_method || 'N/A'}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="h-full flex flex-col">
                              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Internal Notes</h4>
                              <textarea
                                defaultValue={lead.notes || ''}
                                onBlur={(e) => handleUpdateLead(lead.id, { notes: e.target.value })}
                                placeholder="Add notes about this lead, audit progress, etc..."
                                className="flex-grow w-full p-5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm min-h-[200px]"
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
