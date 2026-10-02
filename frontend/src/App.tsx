import { Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { AdminAuthProvider } from '@/context/AdminAuthContext';
import { LandingPage } from '@/pages/LandingPage';
import { AuthPage } from '@/pages/AuthPage';
import { OTPVerifyPage } from '@/pages/OTPVerifyPage';
import { ResetPasswordPage } from '@/pages/ResetPasswordPage';
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminShell } from '@/pages/admin/AdminPage';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { AppShell } from '@/layouts/AppShell';
import { AccountsPage } from '@/pages/accounts/AccountsPage';
import { TransferPage } from '@/pages/accounts/TransferPage';
import { TransactionsPage } from '@/pages/transactions/TransactionsPage';
import { TransactionFormPage } from '@/pages/transactions/TransactionFormPage';
import { ReportsPage } from '@/pages/reports/ReportsPage';
import { ChartsPage } from '@/pages/charts/ChartsPage';
import { SettingsPage } from '@/pages/settings/SettingsPage';

function Gate() {
  const { isAuthenticated, isLoading, pendingVerification } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0a0a]">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#00d4aa] border-t-transparent" />
      </div>
    );
  }

  // Unauthenticated routing
  if (!isAuthenticated) {
    if (location.pathname === '/auth' || location.pathname === '/login') {
      return <AuthPage />;
    }
    return (
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    );
  }

  if (pendingVerification) return <OTPVerifyPage />;

  return (
    <Routes>
      {/* Landing page is default for route / for everyone */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/landing" element={<LandingPage />} />

      {/* Main App Routes wrapped in Charter-styled AppShell */}
      <Route element={<AppShell />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/accounts" element={<AccountsPage />} />
        <Route path="/accounts/transfer" element={<TransferPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/transactions/new" element={<TransactionFormPage />} />
        <Route path="/transactions/:id/edit" element={<TransactionFormPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/charts" element={<ChartsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <Routes>
      {/* ── Admin routes — separate auth ── */}
      <Route
        path="/admin-login"
        element={
          <AdminAuthProvider>
            <AdminLoginPage />
          </AdminAuthProvider>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminAuthProvider>
            <AdminShell />
          </AdminAuthProvider>
        }
      />

      {/* ── Public user password reset ── */}
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* ── Main app & landing ── */}
      <Route
        path="/*"
        element={
          <AuthProvider>
            <Gate />
          </AuthProvider>
        }
      />
    </Routes>
  );
}
