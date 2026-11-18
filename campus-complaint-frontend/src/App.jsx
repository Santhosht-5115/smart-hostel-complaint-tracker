import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';


import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import SubmitComplaint from './pages/SubmitComplaint';
import MyComplaints from './pages/MyComplaints';
import AdminDashboard from './pages/AdminDashboard';
import EscalatedComplaints from './pages/EscalatedComplaints';
import StaffDashboard from './pages/StaffDashboard';
import StaffAccountManagement from './pages/StaffAccountManagement';

import './App.css';

// Temporary page used until we build each real page.
function PlaceholderPage({ title, description }) {

    return (

        <div className="container py-5">

            <div className="placeholder-card shadow-sm">

                <h2 className="fw-bold">
                    {title}
                </h2>

                <p className="text-secondary mt-3">
                    {description}
                </p>

                <p className="text-primary mb-0">
                    Please check the URL or return to the home page.
                </p>

            </div>

        </div>
    );
}

function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* Public Pages */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* Student Protected Pages */}

                <Route
                    path="/submit-complaint"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">
                            <SubmitComplaint />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-complaints"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">
                            <MyComplaints />
                        </ProtectedRoute>
                    }
                />


                {/* Admin Protected Pages */}

                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/escalated-complaints"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <EscalatedComplaints />
                        </ProtectedRoute>
                    }
                />

                <Route
    path="/staff-dashboard"
    element={
        <ProtectedRoute allowedRole="STAFF">
            <StaffDashboard />
        </ProtectedRoute>
    }
/>

<Route
    path="/staff-account-management"
    element={
        <ProtectedRoute allowedRole="ADMIN">
            <StaffAccountManagement />
        </ProtectedRoute>
    }
/>

                {/* 404 Page */}

                <Route
                    path="*"
                    element={
                        <PlaceholderPage
                            title="404 - Page Not Found"
                            description="The page you requested does not exist."
                        />
                    }
                />

            </Routes>

            

            {/* Footer */}

            <footer className="app-footer">

                <p>
                    Smart Hostel / Campus Complaint & Resolution Tracker
                </p>

                <small>
                    Making campus complaint management simpler.
                </small>

            </footer>

        </BrowserRouter>
    );
}

export default App;
