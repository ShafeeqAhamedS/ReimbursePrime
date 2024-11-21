import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Home, PieChart, BarChart, CreditCard, Clock, FileText, Plane } from "lucide-react";

// Import your components
import ClaimsDashboard from "./components/DashboardComponent/DashboardComponent";
import SettlePage from "./components/ClaimsComponent/ClaimsComponent";
import EnhancedCategoriesPage from "./components/CategoriesComponent";
import PaymentVouchersPage from "./components/PaymentVoucherComponent";
import HistoryPage from "./components/historyComponent";
import PolicyPage from "./components/PolicyComponent";
import TravelPage from "./components/travelComponent";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const navItems = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Settle", path: "/settle", icon: PieChart },
    { name: "Categories", path: "/categories", icon: BarChart },
    { name: "Payment Vouchers", path: "/payment-vouchers", icon: CreditCard },
    { name: "History", path: "/history", icon: Clock },
    { name: "Policies", path: "/policies", icon: FileText },
    { name: "Travel", path: "/travel", icon: Plane },
  ];

  const validPaths = navItems.map(item => item.path);
  const [activeTab, setActiveTab] = useState(validPaths.includes(location.pathname) ? location.pathname : "/");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white">
        <div className="p-4 text-2xl font-bold mt-4">
            <span className="text-[#E3194B]" >Reimburse</span>
            <span>Prime</span>
        </div>
        <nav className="mt-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-2 m-4 rounded-sm text-sm ${
                activeTab === item.path
                  ? "bg-[#E3194B]"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab(item.path)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      
      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div>
          <Routes>
            <Route path="/" element={<ClaimsDashboard />} />
            <Route path="/settle" element={<SettlePage />} />
            <Route path="/categories" element={<EnhancedCategoriesPage />} />
            <Route path="/payment-vouchers" element={<PaymentVouchersPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/policies" element={<PolicyPage />} />
            <Route path="*" element={<ClaimsDashboard />} />
            <Route path="/travel" element={<TravelPage/>} />
            {/* Add routes for additional components if needed */}
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;