import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosConfig";

function AdminDashboard() {
const [dashboardStats, setDashboardStats] = useState([]);
const [allComplaints, setAllComplaints] = useState([]);
const [loading, setLoading] = useState(true);
const [errorMessage, setErrorMessage] = useState("");

useEffect(() => {
    const fetchAdminDashboard = async () => {
        try {
            // Fetch dashboard statistics
            const statsResponse = await api.get(
                "/admin/dashboard/stats"
            );

            const stats = statsResponse.data || {};

            setDashboardStats([
                {
                    title: "Total Complaints",
                    count: stats.totalComplaints ?? 0,
                    icon: "bi-clipboard-data",
                    color: "admin-total",
                },
                {
                    title: "Raised Complaints",
                    count: stats.raisedComplaints ?? 0,
                    icon: "bi-exclamation-circle",
                    color: "admin-raised",
                },
                {
                    title: "In Progress",
                    count: stats.inProgressComplaints ?? 0,
                    icon: "bi-hourglass-split",
                    color: "admin-progress",
                },
                {
                    title: "Resolved Complaints",
                    count: stats.resolvedComplaints ?? 0,
                    icon: "bi-check-circle",
                    color: "admin-resolved",
                },
                {
                    title: "Escalated Complaints",
                    count: stats.escalatedComplaints ?? 0,
                    icon: "bi-arrow-up-circle",
                    color: "admin-escalated",
                },
            ]);

            // Fetch complaints for all statuses
            const [
                raisedResponse,
                progressResponse,
                resolvedResponse,
            ] = await Promise.all([
                api.get(
                    "/admin/dashboard/complaints?status=RAISED"
                ),
                api.get(
                    "/admin/dashboard/complaints?status=IN_PROGRESS"
                ),
                api.get(
                    "/admin/dashboard/complaints?status=RESOLVED"
                ),
            ]);

            const raisedComplaints =
                Array.isArray(raisedResponse.data)
                    ? raisedResponse.data
                    : [];

            const progressComplaints =
                Array.isArray(progressResponse.data)
                    ? progressResponse.data
                    : [];

            const resolvedComplaints =
                Array.isArray(resolvedResponse.data)
                    ? resolvedResponse.data
                    : [];

            // Combine all complaints
            const complaints = [
                ...raisedComplaints,
                ...progressComplaints,
                ...resolvedComplaints,
            ];

            // Sort complaints by latest creation date
            complaints.sort((a, b) => {
                return (
                    new Date(b.createdAt || 0) -
                    new Date(a.createdAt || 0)
                );
            });

            // Display every complaint
            setAllComplaints(complaints);

        } catch (error) {
            console.error(
                "Admin Dashboard API Error:",
                error
            );

            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {
                setErrorMessage(
                    "Please sign in with your administrator credentials."
                );
            } else {
                setErrorMessage(
                    "Unable to load Admin Dashboard. Please try again."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    fetchAdminDashboard();
}, []);


function formatDate(dateValue) {
    if (!dateValue) {
        return "Not available";
    }

    return new Date(dateValue).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

return (
    <div className="admin-dashboard-page">
        <div className="container py-5">

            {/* Dashboard Heading */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <div>
                    <h2 className="fw-bold admin-heading">
                        Admin Dashboard
                    </h2>

                    <p className="text-secondary mb-0">
                        Monitor and manage campus complaints.
                    </p>
                </div>

                <div className="admin-welcome">
                    <i className="bi bi-person-circle me-2"></i>
                    Administrator
                </div>
            </div>

            {/* Loading */}
            {loading && (
                <div className="alert alert-info">
                    Loading Admin Dashboard...
                </div>
            )}

            {/* Error */}
            {!loading && errorMessage && (
                <div className="alert alert-danger">
                    {errorMessage}
                </div>
            )}

            {/* Dashboard Content */}
            {!loading && !errorMessage && (
                <>
                    {/* Statistics Heading */}
                    <div className="mb-3">
                        <h5 className="fw-bold">
                            Complaint Overview
                        </h5>

                        <p className="text-secondary small">
                            Summary of complaint activities across the campus.
                        </p>
                    </div>

                    {/* Statistics Cards */}
                    <div className="row g-3 mb-5">
                        {dashboardStats.map((stat) => (
                            <div
                                className="col-6 col-md-4 col-lg"
                                key={stat.title}
                            >
                                <div className="admin-stat-card">
                                    <div
                                        className={`admin-stat-icon ${stat.color}`}
                                    >
                                        <i className={`bi ${stat.icon}`}></i>
                                    </div>

                                    <h3>{stat.count}</h3>

                                    <p>{stat.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>

{/* Quick Navigation */}
<div className="row g-3 mb-5">

    {/* Escalated Complaints - Left */}
    <div className="col-md-6">

        <Link
            to="/escalated-complaints"
            className="admin-quick-card"
        >

            <div className="admin-quick-icon escalated-quick-icon">
                <i className="bi bi-exclamation-triangle"></i>
            </div>

            <div>
                <h6>Escalated Complaints</h6>

                <p>
                    Review complaints requiring attention.
                </p>
            </div>

            <i className="bi bi-arrow-right ms-auto"></i>

        </Link>

    </div>


    {/* Staff Account Management - Right */}
    <div className="col-md-6">

        <Link
            to="/staff-account-management"
            className="admin-quick-card"
        >

            <div className="admin-quick-icon">
                <i className="bi bi-people"></i>
            </div>

            <div>
                <h6>Staff Account Management</h6>

                <p>
                    View staff members and create their login accounts.
                </p>
            </div>

            <i className="bi bi-arrow-right ms-auto"></i>

        </Link>

    </div>

</div>

                    {/* All Complaints */}
                    <div
                        className="card admin-recent-card border-0 shadow-sm"
                        id="all-complaints"
                    >
                        {/* Table Heading */}
                        <div className="card-header bg-white border-0 p-4">
                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

                                <div>
                                    <h5 className="fw-bold mb-1">
                                        All Complaints
                                    </h5>

                                    <p className="text-secondary small mb-0">
                                        Complete complaint records with assigned staff members.
                                    </p>
                                </div>

                                <span className="admin-record-count">
                                    {allComplaints.length} Records
                                </span>
                            </div>
                        </div>

                        {/* Complaints Table */}
                        <div className="table-responsive">
                            <table className="table admin-table align-middle mb-0">

                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Complaint</th>
                                        <th>Student</th>
                                        <th>Category</th>
                                        <th>Severity</th>
                                        <th>Priority</th>
                                        <th>Assigned Staff</th>
                                        <th>Status</th>
                                        <th>Escalation</th>
                                        <th>Created Date</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {allComplaints.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="10"
                                                className="text-center py-4 text-secondary"
                                            >
                                                No complaints found.
                                            </td>
                                        </tr>
                                    ) : (
                                        allComplaints.map((complaint) => {
                                            const severity =
                                                complaint.severity || "LOW";

                                            const status =
                                                complaint.status || "RAISED";

                                            const studentName =
                                                complaint.studentName ||
                                                "Not provided";

                                            const staffName =
                                                complaint.assignedStaffName ||
                                                "Not Assigned";

                                            const staffEmail =
                                                complaint.assignedStaffEmail ||
                                                "";

                                            const isEscalated =
                                                complaint.escalatedAt != null;

                                            return (
                                                <tr key={complaint.id}>

                                                    {/* ID */}
                                                    <td>
                                                        #{complaint.id}
                                                    </td>

                                                    {/* Complaint */}
                                                    <td>
                                                        <div className="admin-complaint-title">
                                                            {complaint.title || "Untitled"}
                                                        </div>

                                                        <small className="text-secondary">
                                                            {complaint.description || ""}
                                                        </small>
                                                    </td>

                                                    {/* Student */}
                                                    <td>
                                                        {studentName}
                                                    </td>

                                                    {/* Category */}
                                                    <td>
                                                        <span className="category-badge">
                                                            {complaint.category || "OTHER"}
                                                        </span>
                                                    </td>

                                                    {/* Severity */}
                                                    <td>
                                                        <span
                                                            className={`severity-badge severity-${severity.toLowerCase()}`}
                                                        >
                                                            {severity}
                                                        </span>
                                                    </td>

                                                    {/* Priority */}
                                                    <td>
                                                        <span className="badge bg-primary">
                                                            {complaint.priorityScore ?? 0}
                                                        </span>
                                                    </td>

                                                    {/* Assigned Staff */}
                                                    <td>
                                                        <div className="fw-semibold">
                                                            {staffName}
                                                        </div>

                                                        {staffEmail && (
                                                            <small className="text-secondary">
                                                                {staffEmail}
                                                            </small>
                                                        )}
                                                    </td>

                                                    {/* Status */}
                                                    <td>
                                                        <span
                                                            className={`status-badge status-${status.toLowerCase()}`}
                                                        >
                                                            {status.replace("_", " ")}
                                                        </span>
                                                    </td>

                                                    {/* Escalation */}
                                                    <td>
                                                        {isEscalated ? (
                                                            <div>
                                                                <span className="badge bg-danger">
                                                                    Escalated
                                                                </span>

                                                                <small className="d-block text-secondary mt-1">
                                                                    {formatDate(
                                                                        complaint.escalatedAt
                                                                    )}
                                                                </small>
                                                            </div>
                                                        ) : (
                                                            <span className="badge bg-success">
                                                                No
                                                            </span>
                                                        )}
                                                    </td>

                                                    {/* Created Date */}
                                                    <td>
                                                        <small>
                                                            {formatDate(
                                                                complaint.createdAt
                                                            )}
                                                        </small>
                                                    </td>

                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer */}
                        <div className="card-footer bg-white border-0 p-4">
                            <Link
                                to="/escalated-complaints"
                                className="btn btn-outline-primary"
                            >
                                View Escalated Complaints
                                <i className="bi bi-arrow-right ms-2"></i>
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    </div>
);


}

export default AdminDashboard;
