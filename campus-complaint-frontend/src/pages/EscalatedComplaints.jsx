import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';

function formatDateTime(dateTime) {
  if (!dateTime) return 'N/A';

  return new Date(dateTime).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function EscalatedComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch escalated complaints from Spring Boot
  useEffect(() => {
    fetchEscalatedComplaints();
  }, []);

  const fetchEscalatedComplaints = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await api.get('/admin/dashboard/escalated');

      setComplaints(response.data);
    } catch (err) {
      console.error('Error fetching escalated complaints:', err);

      setError(
        err.response?.data?.message ||
        'Unable to load escalated complaints. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Search and severity filtering
  const filteredComplaints = complaints.filter((complaint) => {
    const search = searchTerm.trim().toLowerCase();

   const matchesSearch =
    (complaint.title || "").toLowerCase().includes(search) ||
    (complaint.category || "").toLowerCase().includes(search) ||
    String(complaint.id || "").includes(search);

    
    const matchesSeverity =
      selectedSeverity === 'ALL' ||
      complaint.severity === selectedSeverity;

    return matchesSearch && matchesSeverity;
  });

  const criticalCount = complaints.filter(
    (complaint) => complaint.severity === 'CRITICAL'
  ).length;

  const highCount = complaints.filter(
    (complaint) => complaint.severity === 'HIGH'
  ).length;

  const mediumCount = complaints.filter(
    (complaint) => complaint.severity === 'MEDIUM'
  ).length;

  const lowCount = complaints.filter(
    (complaint) => complaint.severity === 'LOW'
  ).length;

  return (
    <div className="escalated-page">
      <div className="container py-5">

        {/* Page heading */}
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

          <div>
            <h2 className="fw-bold escalated-heading">
              Escalated Complaints
            </h2>

            <p className="text-secondary mb-0">
              Monitor complaints that require immediate attention.
            </p>
          </div>

          <Link
            to="/admin-dashboard"
            className="btn btn-outline-primary"
          >
            <i className="bi bi-arrow-left me-2"></i>
            Admin Dashboard
          </Link>

        </div>

        {/* Alert information */}
        <div className="alert alert-danger escalated-alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>

          <strong>Attention Required:</strong>

          Some complaints have exceeded their resolution time limits
          and have been automatically escalated.
        </div>

        {/* Summary cards */}
        <div className="row g-3 mb-4">

          <div className="col-6 col-md-3">
            <div className="escalated-summary-card">
              <div className="escalated-summary-icon total-escalated">
                <i className="bi bi-arrow-up-circle"></i>
              </div>

              <h3>{complaints.length}</h3>
              <p>Total Escalated</p>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="escalated-summary-card">
              <div className="escalated-summary-icon critical-escalated">
                <i className="bi bi-exclamation-octagon"></i>
              </div>

              <h3>{criticalCount}</h3>
              <p>Critical</p>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="escalated-summary-card">
              <div className="escalated-summary-icon high-escalated">
                <i className="bi bi-exclamation-circle"></i>
              </div>

              <h3>{highCount}</h3>
              <p>High Severity</p>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="escalated-summary-card">
              <div className="escalated-summary-icon medium-escalated">
                <i className="bi bi-info-circle"></i>
              </div>

              <h3>{mediumCount + lowCount}</h3>
              <p>Medium / Low</p>
            </div>
          </div>

        </div>

        {/* Complaints table */}
        <div className="card escalated-table-card border-0 shadow-sm">

          <div className="card-header bg-white border-0 p-4">

            <h5 className="fw-bold mb-1">
              Escalation Records
            </h5>

            <p className="text-secondary small mb-0">
              Review priority scores, severity and escalation dates.
            </p>

          </div>

          {/* Search and filter */}
          <div className="px-4 pb-3">

            <div className="row g-3">

              <div className="col-md-7">

                <label
                  htmlFor="escalatedSearch"
                  className="form-label fw-semibold"
                >
                  Search Complaints
                </label>

                <div className="input-group">

                  <span className="input-group-text bg-white">
                    <i className="bi bi-search"></i>
                  </span>

                  <input
                    type="text"
                    id="escalatedSearch"
                    className="form-control"
                    placeholder="Search by title, category or ID..."
                    value={searchTerm}
                    onChange={(event) =>
                      setSearchTerm(event.target.value)
                    }
                  />

                </div>

              </div>

              <div className="col-md-5">

                <label
                  htmlFor="severityFilter"
                  className="form-label fw-semibold"
                >
                  Filter by Severity
                </label>

                <select
                  id="severityFilter"
                  className="form-select"
                  value={selectedSeverity}
                  onChange={(event) =>
                    setSelectedSeverity(event.target.value)
                  }
                >
                  <option value="ALL">All Severities</option>
                  <option value="CRITICAL">Critical</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>

              </div>

            </div>

          </div>

          {/* Results count */}
          <div className="px-4 pb-3">
            <span className="text-secondary small">
              Showing {filteredComplaints.length} of {complaints.length} escalated complaints
            </span>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
              <p className="text-secondary mt-3">
                Loading escalated complaints...
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="alert alert-danger mx-4">
              {error}

              <button
                className="btn btn-sm btn-outline-danger ms-3"
                onClick={fetchEscalatedComplaints}
              >
                Retry
              </button>
            </div>
          )}

          {/* Responsive table */}
          {!loading && !error && (
            <div className="table-responsive">

              <table className="table escalated-table align-middle mb-0">

                <thead>
                  <tr>
                    <th>Complaint</th>
                    <th>Category</th>
                    <th>Severity</th>
                    <th>Priority Score</th>
                    <th>Status</th>
                    <th>Escalated At</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredComplaints.length > 0 ? (

                    filteredComplaints.map((complaint) => (

                      <tr key={complaint.id}>

                        <td>
                          <div className="escalated-complaint-title">
                            {complaint.title}
                          </div>

                          <small className="text-secondary">
                            Complaint #{complaint.id}
                          </small>
                        </td>

                        <td>
                          <span className="category-badge">
                            {complaint.category}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`severity-badge severity-${complaint.severity.toLowerCase()}`}
                          >
                            {complaint.severity}
                          </span>
                        </td>

                        <td>
                          <span className="priority-score">
                            {complaint.priorityScore}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`status-badge status-${complaint.status.toLowerCase()}`}
                          >
                            {complaint.status.replace('_', ' ')}
                          </span>
                        </td>

                        <td className="text-secondary">
                          {formatDateTime(complaint.escalatedAt)}
                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>
                      <td colSpan="6" className="text-center py-5">

                        <i className="bi bi-inbox escalated-empty-icon"></i>

                        <h6 className="fw-bold mt-3">
                          No escalated complaints found
                        </h6>

                        <p className="text-secondary mb-0">
                          Try changing your search or severity filter.
                        </p>

                      </td>
                    </tr>

                  )}

                </tbody>

              </table>

            </div>
          )}

          {/* Footer */}
          <div className="card-footer bg-white border-0 p-4">

            <Link
              to="/admin-dashboard"
              className="btn btn-outline-secondary"
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back to Admin Dashboard
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}

export default EscalatedComplaints;