import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import LandingPage from './pages/LandingPage/LandingPage.tsx';
import Login from './pages/LogIn/Login.tsx';
import PageNotFound from './pages/PageNotFound/PageNotFound.tsx';
import Register from './pages/Register/Register.tsx';
import Contents from './pages/Contents/Contents.tsx';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Contents />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes
