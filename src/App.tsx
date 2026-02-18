import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import InvoiceList from './pages/InvoiceList';
import CreateInvoice from './pages/CreateInvoice';
import LoginPage from './pages/LoginPage';
import { DriveProvider } from './services/DriveContext';
import { AuthProvider, useAuth } from './services/AuthContext';
import { Toaster } from 'react-hot-toast';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <InvoiceList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateInvoice />
            </ProtectedRoute>
          }
        />
      </Routes>
      <footer className="bg-slate-50 text-center py-6 text-slate-400 text-sm font-medium">
        Copyright &copy; 2026 Gokilam Travels. All rights reserved. Developed by{' '}
        <a
          href="https://intinf.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-600 hover:text-blue-600 font-bold transition-colors"
        >
          IntInf
        </a>
      </footer>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <DriveProvider>
        <Toaster position="top-center" />
        <AppRoutes />
      </DriveProvider>
    </AuthProvider>
  );
}

export default App;
