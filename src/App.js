
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import Login from './components/Login';
import BlogList from './components/BlogList';
import { isAdmin } from './auth';
import AdminDashboard from './components/AdminDashboard';
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<RegisterForm />} />
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        <Route path="/admin"
         element={ isAdmin()? <AdminDashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
