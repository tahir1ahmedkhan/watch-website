import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AuthTest from "./components/AuthTest";
import AdminLoginSimple from "./pages/AdminLoginSimple";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDashboardWorking from "./pages/AdminDashboardWorking";
import AdminDebug from "./pages/AdminDebug";
import Navbar from "./components/Navbar";
import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Admin Routes - These must come first and be specific */}
          <Route path="/admin/login" element={<AdminLoginSimple />} />
          <Route path="/admin/dashboard" element={<AdminDashboardWorking />} />
          <Route path="/admin/dashboard-full" element={<AdminDashboard />} />
          <Route path="/admin/test" element={<AdminDebug />} />
          
          {/* Customer Routes with Navbar */}
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
            </>
          } />
          <Route path="/products" element={
            <>
              <Navbar />
              <Products />
            </>
          } />
          <Route path="/product/:id" element={
            <>
              <Navbar />
              <ProductDetails />
            </>
          } />
          <Route path="/about" element={
            <>
              <Navbar />
              <About />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Navbar />
              <Contact />
            </>
          } />
          <Route path="/cart" element={
            <>
              <Navbar />
              <Cart />
            </>
          } />
          <Route path="/orders" element={
            <>
              <Navbar />
              <Orders />
            </>
          } />
          <Route path="/auth-test" element={
            <>
              <Navbar />
              <AuthTest />
            </>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
