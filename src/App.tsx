import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoiceList from './pages/InvoiceList';
import CreateInvoice from './pages/CreateInvoice';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvoiceList />} />
        <Route path="/create" element={<CreateInvoice />} />
      </Routes>
    </Router>
  );
}

export default App;
