import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {

    const userRole = localStorage.getItem("userRole");

    if (!userRole) {
        return <Navigate to="/login" replace />;
    }

    if (userRole !== allowedRole) {

        if (userRole === "ADMIN") {
            return <Navigate to="/admin-dashboard" replace />;
        }

        if (userRole === "STUDENT") {
            return <Navigate to="/my-complaints" replace />;
        }

        if (userRole === "STAFF") {
            return <Navigate to="/staff-dashboard" replace />;
        }

        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
