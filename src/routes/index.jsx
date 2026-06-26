import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { AuthLayout, DashboardLayout, AdminLayout, PublicLayout } from '../layouts';
import { Spinner } from '../components/common';

// Public pages
const LandingPage = lazy(() => import('../pages/public/LandingPage'));
const AboutUs = lazy(() => import('../pages/public/AboutUs'));
const InvestmentOpportunities = lazy(() => import('../pages/public/InvestmentOpportunities'));
const HowItWorks = lazy(() => import('../pages/public/HowItWorks'));
const ContactUs = lazy(() => import('../pages/public/ContactUs'));
const FAQ = lazy(() => import('../pages/public/FAQ'));
const PrivacyPolicy = lazy(() => import('../pages/public/PrivacyPolicy'));

// Auth pages
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));
const VerifyEmail = lazy(() => import('../pages/auth/VerifyEmail'));
const VerifyPhone = lazy(() => import('../pages/auth/VerifyPhone'));
const TwoFactorAuth = lazy(() => import('../pages/auth/TwoFactorAuth'));

// Investor pages
const Dashboard = lazy(() => import('../pages/investor/Dashboard'));
const Marketplace = lazy(() => import('../pages/investor/Marketplace'));
const MyInvestments = lazy(() => import('../pages/investor/MyInvestments'));
const InvestDetail = lazy(() => import('../pages/investor/InvestDetail'));
const Wallet = lazy(() => import('../pages/investor/Wallet'));
const Profile = lazy(() => import('../pages/investor/Profile'));
const Calculator = lazy(() => import('../pages/investor/Calculator'));
const TermsConditions = lazy(() => import('../pages/investor/TermsConditions'));
const KycPage = lazy(() => import('../pages/investor/KycPage'));
const Properties = lazy(() => import('../pages/investor/Properties'));
const PropertyDetail = lazy(() => import('../pages/investor/PropertyDetail'));
const Portfolio = lazy(() => import('../pages/investor/Portfolio'));
const Reports = lazy(() => import('../pages/investor/Reports'));
const Notifications = lazy(() => import('../pages/investor/Notifications'));

// Admin pages
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const AdminUsers = lazy(() => import('../pages/admin/AdminUsers'));
const AdminKyc = lazy(() => import('../pages/admin/AdminKyc'));
const AdminWallets = lazy(() => import('../pages/admin/AdminWallets'));
const AdminReports = lazy(() => import('../pages/admin/AdminReports'));
const InvestmentDetail = lazy(() => import('../pages/admin/InvestmentDetail'));

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Spinner size="lg" />
    </div>
  );
}

function PublicRoute({ children }) {
  return <PublicLayout>{children}</PublicLayout>;
}

function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (requiredRole && user?.role !== requiredRole) return <Navigate to="/dashboard" replace />;
  return <DashboardLayout>{children}</DashboardLayout>;
}

function AdminRoute({ children }) {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return <AdminLayout>{children}</AdminLayout>;
}

function AppRoutes() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
        <Route path="/about" element={<PublicRoute><AboutUs /></PublicRoute>} />
        <Route path="/opportunities" element={<PublicRoute><InvestmentOpportunities /></PublicRoute>} />
        <Route path="/how-it-works" element={<PublicRoute><HowItWorks /></PublicRoute>} />
        <Route path="/contact" element={<PublicRoute><ContactUs /></PublicRoute>} />
        <Route path="/faq" element={<PublicRoute><FAQ /></PublicRoute>} />
        <Route path="/privacy" element={<PublicRoute><PrivacyPolicy /></PublicRoute>} />
        <Route path="/terms" element={<PublicRoute><TermsConditions /></PublicRoute>} />

        {/* Auth routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} replace /> : (
              <AuthLayout>
                <Login />
              </AuthLayout>
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : (
              <AuthLayout>
                <Register />
              </AuthLayout>
            )
          }
        />
        <Route
          path="/forgot-password"
          element={
            <AuthLayout>
              <ForgotPassword />
            </AuthLayout>
          }
        />
        <Route
          path="/reset-password"
          element={
            <AuthLayout>
              <ResetPassword />
            </AuthLayout>
          }
        />
        <Route
          path="/verify-email"
          element={
            <AuthLayout>
              <VerifyEmail />
            </AuthLayout>
          }
        />
        <Route
          path="/verify-phone"
          element={
            <AuthLayout>
              <VerifyPhone />
            </AuthLayout>
          }
        />
        <Route
          path="/two-factor"
          element={
            <AuthLayout>
              <TwoFactorAuth />
            </AuthLayout>
          }
        />

        {/* Investor routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
        <Route path="/investments" element={<ProtectedRoute><MyInvestments /></ProtectedRoute>} />
        <Route path="/investments/:id" element={<ProtectedRoute><InvestDetail /></ProtectedRoute>} />
        <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/calculator" element={<ProtectedRoute><Calculator /></ProtectedRoute>} />
        <Route path="/kyc" element={<ProtectedRoute><KycPage /></ProtectedRoute>} />
        <Route path="/properties" element={<ProtectedRoute><Properties /></ProtectedRoute>} />
        <Route path="/properties/:id" element={<ProtectedRoute><PropertyDetail /></ProtectedRoute>} />
        <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
        <Route path="/admin/kyc" element={<AdminRoute><AdminKyc /></AdminRoute>} />
        <Route path="/admin/wallets" element={<AdminRoute><AdminWallets /></AdminRoute>} />
        <Route path="/admin/reports" element={<AdminRoute><AdminReports /></AdminRoute>} />
        <Route path="/admin/investments/:id" element={<AdminRoute><InvestmentDetail /></AdminRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/'} replace />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
