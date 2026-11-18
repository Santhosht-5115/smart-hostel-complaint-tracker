import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../api/axiosConfig';
import logo from "../assets/ResolveX.jpg";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const userRole = localStorage.getItem('userRole');
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = async () => {

    try {

      setLoading(true);

      await api.post('/auth/logout');

      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');

      alert('Logout successful!');

      navigate('/login', { replace: true });

    } catch (error) {

      console.error('Logout error:', error);

      alert('Unable to logout. Please try again.');

    } finally {

      setLoading(false);

    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">

      <div className="container">

        <img src={logo} className="navbar-brand" />


        <Link className="navbar-brand fw-bold" to="/">
          ResolveX
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">

          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            {!userRole && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>

                <li className="nav-item">
                  <Link className="btn btn-outline-light ms-lg-2" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}

            {userRole === 'STUDENT' && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/submit-complaint">
                    Submit Complaint
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/my-complaints">
                    My Complaints
                  </NavLink>
                </li>
              </>
            )}

            {userRole === 'ADMIN' && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin-dashboard">
                    Admin Dashboard
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/escalated-complaints">
                    Escalated Complaints
                  </NavLink>
                </li>
              </>
            )}

            {userRole === 'STAFF' && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/staff-dashboard">
                  Staff Dashboard
                </NavLink>
              </li>
            )}

            {userRole && (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white">
                    {userEmail}
                  </span>
                </li>

                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">

                  <button
                    className="btn btn-outline-light"
                    onClick={handleLogout}
                    disabled={loading}
                  >
                    {loading ? 'Logging out...' : 'Logout'}
                  </button>

                </li>
              </>
            )}

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
