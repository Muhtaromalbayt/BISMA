import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Reader from './pages/Reader';
import Rules from './pages/Rules';
import Developer from './pages/Developer';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
    return (
        <Router>
            <Routes>
                {/* Admin routes without Layout */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />

                {/* Public routes with Layout */}
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/reader" element={<Layout><Reader /></Layout>} />
                <Route path="/rules" element={<Layout><Rules /></Layout>} />
                <Route path="/developer" element={<Layout><Developer /></Layout>} />
            </Routes>
        </Router>
    );
}

export default App;
