import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GoogleAnalytics from './components/analytics/GoogleAnalytics';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import QuotePage from './pages/QuotePage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import MarketingApparelPage from './pages/MarketingApparelPage';

// Admin panel (internal staff tool, mounted at /admin)
import { AuthProvider } from './admin/AuthProvider';
import { ProtectedRoute } from './admin/ProtectedRoute';
import { AdminLayout } from './admin/layout/AdminLayout';
import { LoginPage } from './admin/pages/LoginPage';
import { DashboardPage } from './admin/pages/DashboardPage';
import { TasksPage } from './admin/pages/TasksPage';
import { TeamPage } from './admin/pages/TeamPage';
import { AccountPage } from './admin/pages/AccountPage';

export default function App() {
  return (
    <BrowserRouter>
      <GoogleAnalytics />
      <AuthProvider>
        <Routes>
          {/* Public marketing site */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/quote" element={<QuotePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/marketing-apparel-winnipeg" element={<MarketingApparelPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>

          {/* Admin panel — separate shell, gated by auth */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="team" element={<ProtectedRoute role="admin"><TeamPage /></ProtectedRoute>} />
            <Route path="account" element={<AccountPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
