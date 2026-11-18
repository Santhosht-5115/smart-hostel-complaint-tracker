import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '/src/api/axiosConfig';

function formatStatus(status) {
  return status.replace('_', ' ');
}

function formatDate(date) {
  if (!date) {
    return 'N/A';
  }

  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch complaints from Spring Boot API
  useEffect(() => {
    let isMounted = true;

    async function fetchMyComplaints() {
      try {
        setLoading(true);
        setErrorMessage('');

        const response = await api.get('/complaints/my');

        if (isMounted) {
          setComplaints(response.data);
        }
      } catch (error) {
        if (isMounted) {
          if (error.response) {
            setErrorMessage(
              error.response.data?.message ||
              'Unable to load your complaints. Please try again.'
            );
          } else {
            setErrorMessage(
              'Unable to connect to the server. Please check whether the backend is running.'
            );
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchMyComplaints();

    return () => {
      isMounted = false;
    };
  }, []);

  // Search and status filtering
  const filteredComplaints = complaints.filter((complaint) => {
    const search = searchTerm.trim().toLowerCase();

    const matchesSearch =
      complaint.title.toLowerCase().includes(search) ||
      complaint.category.toLowerCase().includes(search) ||
      String(complaint.id).includes(search);

    const matchesStatus =
      selectedStatus === 'ALL' ||
      complaint.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  // Summary counts
  const totalComplaints = complaints.length;

  const raisedCount = complaints.filter(
    (complaint) => complaint.status === 'RAISED'
  ).length;

  const inProgressCount = complaints.filter(
    (complaint) => complaint.status === 'IN_PROGRESS'
  ).length;

  const resolvedCount = complaints.filter(
    (complaint) => complaint.status === 'RESOLVED'
  ).length;

  return (
    <div className="my-complaints-page">
      <div className="container py-5">

        {/* Page heading */}
        <div className="my-complaints-heading d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
          <div>
            <h2 className="fw-bold mb-2">My Complaints</h2>

            <p className="text-secondary mb-0">
              View your complaints and track their resolution status.
            </p>
          </div>

          <Link
            to="/submit-complaint"
            className="btn btn-primary"
          >
            <i className="bi bi-plus-circle me-2"></i>
            Submit New Complaint
          </Link>
        </div>

        {/* Summary cards */}
        <div className="row g-3 mb-4">

          <div className="col-6 col-lg-3">
            <div className="complaint-summary-card">
              <div className="summary-icon total-icon">
                <i className="bi bi-clipboard-data"></i>
              </div>

              <h3>{totalComplaints}</h3>
              <p>Total Complaints</p>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="complaint-summary-card">
              <div className="summary-icon raised-icon">
                <i className="bi bi-exclamation-circle"></i>
              </div>

              <h3>{raisedCount}</h3>
              <p>Raised</p>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="complaint-summary-card">
              <div className="summary-icon progress-icon">
                <i className="bi bi-hourglass-split"></i>
              </div>

              <h3>{inProgressCount}</h3>
              <p>In Progress</p>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="complaint-summary-card">
              <div className="summary-icon resolved-icon">
                <i className="bi bi-check-circle"></i>
              </div>

              <h3>{resolvedCount}</h3>
              <p>Resolved</p>
            </div>
          </div>

        </div>

        {/* Complaints table card */}
        <div className="card my-complaints-card border-0 shadow-sm">

          <div className="card-header bg-white border-0 p-4">
            <h5 className="fw-bold mb-1">Complaint History</h5>

            <p className="text-secondary small mb-0">
              Search and filter your submitted complaints.
            </p>
          </div>

          {/* API error message */}
          {errorMessage && (
            <div className="alert alert-danger mx-4 mt-2">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {errorMessage}
            </div>
          )}

          {/* Search and filter */}
          <div className="complaints-toolbar px-4 pb-3">
            <div className="row g-3">

              <div className="col-md-7">
                <label
                  htmlFor="complaintSearch"
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
                    id="complaintSearch"
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
                  htmlFor="statusFilter"
                  className="form-label fw-semibold"
                >
                  Filter by Status
                </label>

                <select
                  id="statusFilter"
                  className="form-select"
                  value={selectedStatus}
                  onChange={(event) =>
                    setSelectedStatus(event.target.value)
                  }
                >
                  <option value="ALL">All Complaints</option>
                  <option value="RAISED">Raised</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                </select>
              </div>

            </div>
          </div>

          {/* Results count */}
          <div className="px-4 pb-3">
            <span className="text-secondary small">
              Showing {filteredComplaints.length} of {totalComplaints} complaints
            </span>
          </div>

          {/* Responsive table */}
          <div className="table-responsive">
            <table className="table align-middle mb-0 complaints-table">

              <thead>
                <tr>
                  <th>Complaint</th>
                  <th>Category</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th>Date Submitted</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">
                          Loading...
                        </span>
                      </div>

                      <p className="text-secondary mt-3 mb-0">
                        Loading your complaints...
                      </p>
                    </td>
                  </tr>
                ) : filteredComplaints.length > 0 ? (
                  filteredComplaints.map((complaint) => (
                    <tr key={complaint.id}>

                      <td>
                        <div className="complaint-title">
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
                        <span
                          className={`status-badge status-${complaint.status.toLowerCase()}`}
                        >
                          {formatStatus(complaint.status)}
                        </span>
                      </td>

                      <td className="text-secondary">
                        {formatDate(complaint.createdAt)}
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5">

                      <i className="bi bi-inbox empty-complaints-icon"></i>

                      <h6 className="fw-bold mt-3">
                        {complaints.length === 0
                          ? 'No complaints submitted yet'
                          : 'No complaints found'}
                      </h6>

                      <p className="text-secondary mb-0">
                        {complaints.length === 0
                          ? 'Submit your first complaint to see it here.'
                          : 'Try another search term or status filter.'}
                      </p>

                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

          {/* Table footer */}
          <div className="card-footer bg-white border-0 p-4">
            <Link
    to="/"
    className="btn btn-outline-secondary"
>
    <i className="bi bi-arrow-left me-2"></i>
    Back to Home
</Link>
          </div>

        </div>

        {/* Information note */}
        <div className="alert alert-info mt-4 mb-0">
          <i className="bi bi-info-circle me-2"></i>

          Your complaints are retrieved directly from the
          Campus Complaint Tracker database.
        </div>

      </div>
    </div>
  );
}

export default MyComplaints;

