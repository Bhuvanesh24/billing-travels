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
      </Router>
    </DriveProvider>
  );
}

export default App;
