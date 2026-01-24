import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Loader2 } from 'lucide-react';
import { type DriveFile, listInvoices } from '../lib/invoice-service';

export default function InvoiceList() {
  const [invoices, setInvoices] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await listInvoices();
      setInvoices(data);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Invoices</h1>
            <p className="text-slate-500 mt-1">Manage your travel invoices</p>
          </div>
          <Link
            to="/create"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
          >
            <Plus size={20} />
            New Invoice
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-blue-600" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {invoices.map((file) => (
              <div
                key={file.id}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-red-50 text-red-600 rounded-lg">
                    <FileText size={24} />
                  </div>
                  <span className="text-xs font-medium text-slate-400">
                    {new Date(file.createdTime).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="mt-4 font-semibold text-slate-900 truncate" title={file.name}>
                  {file.name}
                </h3>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                    View
                  </button>
                  <button className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
