import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoiceList from './pages/InvoiceList';
import CreateInvoice from './pages/CreateInvoice';
import { DriveProvider } from './services/DriveContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <DriveProvider>
      <Toaster position="top-center" />
      <Router>
        <Routes>
          <Route path="/" element={<InvoiceList />} />
          <Route path="/create" element={<CreateInvoice />} />
        </Routes>
        <footer className="bg-slate-50 text-center py-6 text-slate-400 text-sm font-medium">
          <a
            href="https://intinf.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-600 transition-colors"
          >
            &copy; 2026 IntInf
          </a>
        </footer>
      </Router>
    </DriveProvider>
  );
}

export default App;
