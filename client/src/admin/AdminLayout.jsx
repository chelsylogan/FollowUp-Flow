import { useState, useEffect } from 'react';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { Users, LogOut, Menu, X } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = sessionStorage.getItem('adminToken');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (!token) return null;

  const navItems = [
    { name: 'Leads', path: '/admin/leads', icon: Users },
  ];

  const NavContent = () => (
    <>
      <div className="p-6">
        <Link to="/" className="text-2xl font-black tracking-tighter text-white">
          FollowUp<span className="text-secondary">Flow</span>
        </Link>
        <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mt-1">Admin Portal</p>
      </div>
      
      <nav className="flex-grow mt-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-6 py-4 transition-all ${
                isActive 
                  ? 'bg-white/10 text-white border-r-4 border-secondary' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-bold">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 text-white/40 hover:text-secondary transition-colors w-full group"
        >
          <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
          <span className="font-bold">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-primary hidden md:flex flex-col fixed inset-y-0 shadow-2xl z-20">
        <NavContent />
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-primary flex flex-col z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <NavContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col md:pl-64 min-w-0">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 md:hidden"
            >
              <Menu size={24} />
            </button>
            <h2 className="font-bold text-gray-800 md:text-xl capitalize">
              {location.pathname.split('/').pop() || 'Dashboard'}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-bold text-gray-900 leading-none">Admin User</span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-tighter mt-1">Main Account</span>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black border border-primary/20">
              A
            </div>
          </div>
        </header>
        
        <main className="p-4 md:p-10 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
