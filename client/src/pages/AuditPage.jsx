export default function AuditPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-sm">
        <h1 className="text-3xl font-bold text-primary mb-6">Get Your Follow-Up Audit</h1>
        <p className="text-gray-600 mb-8">Fill out the form below and we'll analyze your current follow-up process.</p>
        <div className="space-y-4">
          {/* Placeholder for form */}
          <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
          <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold">
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
}
