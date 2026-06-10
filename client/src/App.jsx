import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuditPage from './pages/AuditPage';
import AdminLogin from './admin/AdminLogin';
import AdminLeads from './admin/AdminLeads';
import AdminLayout from './admin/AdminLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/audit" element={<AuditPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin/leads" element={<AdminLeads />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
