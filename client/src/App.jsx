import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Auth/Register.jsx';
import Login from './pages/Auth/Login.jsx';
import LoginWithGoogle from './components/Auth/LoginWithGoogle.jsx';
import Profile from './pages/User/Profile.jsx';

export default function App() {
  return (
    <Router>
      App
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/google" element={<LoginWithGoogle />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  )
}
