import { useEffect } from 'react';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { Users, LogOut, LayoutDashboard } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = sessionStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    navigate('/admin');
  };

  if (!token) return null;

  const navItems = [
    { name: 'Leads', path: '/admin/leads', icon: Users },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white hidden md:flex flex-col">
        <div className="p-6">
          <Link to="/" className="text-xl font-bold">FollowUp Flow</Link>
          <p className="text-primary-foreground/60 text-xs mt-1 opacity-60">Admin Portal</p>
        </div>
        
        <nav className="flex-grow mt-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-6 py-4 transition-colors ${
                  isActive ? 'bg-white/10 border-r-4 border-secondary' : 'hover:bg-white/5'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors w-full"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 md:hidden">
          <span className="font-bold text-primary text-lg">FollowUp Flow</span>
          <button onClick={handleLogout} className="text-gray-500 hover:text-primary">
            <LogOut size={20} />
          </button>
        </header>
        
        <main className="p-4 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
