export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">Admin Login</h2>
        <div className="space-y-4">
          <input 
            type="password" 
            placeholder="Enter Admin Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
