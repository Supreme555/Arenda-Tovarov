import Navbar from './components/common/Navbar';
import { AuthProvider } from './context/AuthContext.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Products from './pages/Products.jsx';
import Admin from './pages/Admin.jsx';
import Register from './pages/Register.jsx';
import Rentals from './pages/Rentals.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Маршруты */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <Admin />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/rentals" 
            element={
              <ProtectedRoute>
                <Rentals />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
