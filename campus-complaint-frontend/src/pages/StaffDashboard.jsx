import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";


function StaffDashboard() {

    const [complaints, setComplaints] = useState([]);
    const [workload, setWorkload] = useState({
        totalAssigned: 0,
        raised: 0,
        inProgress: 0,
        resolved: 0,
        escalated: 0
    });

    const [selectedStatus, setSelectedStatus] = useState("ALL");
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const staffEmail = localStorage.getItem("userEmail");

    // Fetch assigned complaints

    const fetchComplaints = async (status = "ALL") => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get("/staff/complaints", {
                params: status === "ALL" ? {} : { status }
            });

            setComplaints(response.data);

        } catch (err) {

            console.error("Complaint loading error:", err);

            setError(
                err.response?.data?.message ||
                "Unable to load assigned complaints."
            );

        } finally {

            setLoading(false);
        }
    };

    // Fetch workload

    const fetchWorkload = async () => {

        try {

            const response = await api.get("/staff/workload");

            setWorkload(response.data);

        } catch (err) {

            console.error("Workload loading error:", err);

        }
    };

    useEffect(() => {

        fetchComplaints(selectedStatus);
        fetchWorkload();

    }, [selectedStatus]);

    // Update complaint status

    const updateStatus = async (complaintId, newStatus) => {

        try {

            setMessage("");
            setError("");

            await api.patch(
                `/staff/complaints/${complaintId}/status`,
                {
                    status: newStatus
                }
            );

            setMessage(
                `Complaint #${complaintId} updated successfully.`
            );

            setSelectedComplaint(null);

            await fetchComplaints(selectedStatus);
            await fetchWorkload();

        } catch (err) {

            console.error("Status update error:", err);

            setError(
                err.response?.data?.error ||
                "Unable to update complaint status."
            );
        }
    };

    // Status badge

    const getStatusClass = (status) => {

        switch (status) {

            case "RAISED":
                return "status-raised";

            case "IN_PROGRESS":
                return "status-progress";

            case "RESOLVED":
                return "status-resolved";

            default:
                return "";
        }
    };

    return (

        <div className="staff-dashboard">

            <div className="staff-dashboard-header">

                <div>
                    <h2>Staff Dashboard</h2>

                    <p>
                        Welcome, {staffEmail}
                    </p>
                </div>

                <span className="staff-role-badge">
                    STAFF
                </span>

            </div>

            {/* Messages */}

            {message && (
                <div className="staff-success-message">
                    {message}
                </div>
            )}

            {error && (
                <div className="staff-error-message">
                    {error}
                </div>
            )}

            {/* Workload cards */}

            <div className="staff-stats-grid">

                <div className="staff-stat-card">
                    <h4>Total Assigned</h4>
                    <h2>{workload.totalAssigned}</h2>
                </div>

                <div className="staff-stat-card">
                    <h4>Raised</h4>
                    <h2>{workload.raised}</h2>
                </div>

                <div className="staff-stat-card">
                    <h4>In Progress</h4>
                    <h2>{workload.inProgress}</h2>
                </div>

                <div className="staff-stat-card">
                    <h4>Resolved</h4>
                    <h2>{workload.resolved}</h2>
                </div>

                <div className="staff-stat-card">
                    <h4>Escalated</h4>
                    <h2>{workload.escalated}</h2>
                </div>

            </div>

            {/* Complaints section */}

            <div className="staff-complaints-section">

                <div className="staff-section-header">

                    <h3>My Assigned Complaints</h3>

                    <select
                        value={selectedStatus}
                        onChange={(e) =>
                            setSelectedStatus(e.target.value)
                        }
                    >

                        <option value="ALL">All Complaints</option>
                        <option value="RAISED">Raised</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="RESOLVED">Resolved</option>

                    </select>

                </div>

                {loading ? (

                    <p className="staff-loading">
                        Loading complaints...
                    </p>

                ) : complaints.length === 0 ? (

                    <p className="staff-empty">
                        No complaints found.
                    </p>

                ) : (

                    <div className="staff-table-container">

                        <table className="staff-table">

                            <thead>

                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Severity</th>
                                    <th>Priority</th>
                                    <th>Status</th>
                                    <th>Escalation</th>
                                    <th>Action</th>
                                </tr>

                            </thead>

                            <tbody>

                                {complaints.map((complaint) => (

                                    <tr key={complaint.id}>

                                        <td>{complaint.id}</td>

                                        <td>{complaint.title}</td>

                                        <td>{complaint.category}</td>

                                        <td>
                                            {complaint.severity}
                                        </td>

                                        <td>
                                            {complaint.priorityScore}
                                        </td>

                                        <td>
                                            <span
                                                className={`staff-status ${getStatusClass(complaint.status)}`}
                                            >
                                                {complaint.status}
                                            </span>
                                        </td>

                                        <td>
                                            {complaint.escalatedAt
                                                ? "Yes"
                                                : "No"}
                                        </td>

                                        <td>

                                            <button
                                                className="staff-view-button"
                                                onClick={() =>
                                                    setSelectedComplaint(complaint)
                                                }
                                            >
                                                View
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

            {/* Complaint details */}

            {selectedComplaint && (

                <div className="staff-modal-overlay">

                    <div className="staff-modal">

                        <div className="staff-modal-header">

                            <h3>
                                Complaint #{selectedComplaint.id}
                            </h3>

                            <button
                                onClick={() =>
                                    setSelectedComplaint(null)
                                }
                            >
                                ×
                            </button>

                        </div>

                        <div className="staff-modal-body">

                            <p>
                                <strong>Title:</strong>{" "}
                                {selectedComplaint.title}
                            </p>

                            <p>
                                <strong>Description:</strong>{" "}
                                {selectedComplaint.description}
                            </p>

                            <p>
                                <strong>Category:</strong>{" "}
                                {selectedComplaint.category}
                            </p>

                            <p>
                                <strong>Severity:</strong>{" "}
                                {selectedComplaint.severity}
                            </p>

                            <p>
                                <strong>Priority Score:</strong>{" "}
                                {selectedComplaint.priorityScore}
                            </p>

                            <p>
                                <strong>Student:</strong>{" "}
                                {selectedComplaint.studentName}
                            </p>

                            <p>
                                <strong>Student Email:</strong>{" "}
                                {selectedComplaint.studentEmail}
                            </p>

                            <p>
                                <strong>Created At:</strong>{" "}
                                {selectedComplaint.createdAt
                                    ? new Date(
                                        selectedComplaint.createdAt
                                    ).toLocaleString()
                                    : "-"}
                            </p>

                            <p>
                                <strong>Assigned At:</strong>{" "}
                                {selectedComplaint.assignedAt
                                    ? new Date(
                                        selectedComplaint.assignedAt
                                    ).toLocaleString()
                                    : "-"}
                            </p>

                            <p>
                                <strong>Current Status:</strong>{" "}
                                {selectedComplaint.status}
                            </p>

                            <p>
                                <strong>Escalated:</strong>{" "}
                                {selectedComplaint.escalatedAt
                                    ? "Yes"
                                    : "No"}
                            </p>

                            <hr />

                            <h4>Update Complaint Status</h4>

                            <div className="staff-status-buttons">

                                {selectedComplaint.status !== "IN_PROGRESS" &&
                                    selectedComplaint.status !== "RESOLVED" && (

                                    <button
                                        className="staff-progress-button"
                                        onClick={() =>
                                            updateStatus(
                                                selectedComplaint.id,
                                                "IN_PROGRESS"
                                            )
                                        }
                                    >
                                        Mark In Progress
                                    </button>

                                )}

                                {selectedComplaint.status !== "RESOLVED" && (

                                    <button
                                        className="staff-resolve-button"
                                        onClick={() =>
                                            updateStatus(
                                                selectedComplaint.id,
                                                "RESOLVED"
                                            )
                                        }
                                    >
                                        Resolve Complaint
                                    </button>

                                )}

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default StaffDashboard;