import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function StaffAccountManagement() {

    const [staffList, setStaffList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [selectedStaff, setSelectedStaff] = useState(null);
    const [password, setPassword] = useState("");

    const [creating, setCreating] = useState(false);

    // Fetch all staff members
    const fetchStaffAccounts = async () => {

        try {

            setLoading(true);
            setErrorMessage("");

            const response = await api.get(
                "/admin/dashboard/staff-accounts"
            );

            setStaffList(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (error) {

            console.error("Staff Account API Error:", error);

            setErrorMessage(
                "Unable to load staff accounts. Please try again."
            );

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        fetchStaffAccounts();

    }, []);

    // Open account creation form
    function openCreateForm(staff) {

        setSelectedStaff(staff);
        setPassword("");
        setErrorMessage("");
        setSuccessMessage("");

    }

    // Create staff login account
    const handleCreateAccount = async (event) => {

        event.preventDefault();

        if (!selectedStaff) {
            return;
        }

        if (password.length < 8) {

            setErrorMessage(
                "Password must contain at least 8 characters."
            );

            return;
        }

        try {

            setCreating(true);
            setErrorMessage("");
            setSuccessMessage("");

            const response = await api.post(
                "/admin/dashboard/staff-accounts",
                {
                    email: selectedStaff.email,
                    password: password
                }
            );

            setSuccessMessage(
                response.data.message ||
                "Staff account created successfully."
            );

            setSelectedStaff(null);
            setPassword("");

            await fetchStaffAccounts();

        } catch (error) {

            console.error("Create Staff Account Error:", error);

            setErrorMessage(
                error.response?.data?.message ||
                "Unable to create staff account."
            );

        } finally {

            setCreating(false);
        }
    };

    return (

        <div className="container py-5">

            {/* Page Heading */}

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

                <div>

                    <h2 className="fw-bold">
                        Staff Account Management
                    </h2>

                    <p className="text-secondary mb-0">
                        Manage staff members and their login accounts.
                    </p>

                </div>

                <button
                    className="btn btn-outline-primary"
                    onClick={fetchStaffAccounts}
                >
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Refresh
                </button>

            </div>

            {/* Success Message */}

            {successMessage && (

                <div className="alert alert-success alert-dismissible">

                    {successMessage}

                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setSuccessMessage("")}
                    ></button>

                </div>

            )}

            {/* Error Message */}

            {errorMessage && (

                <div className="alert alert-danger">

                    {errorMessage}

                </div>

            )}

            {/* Loading */}

            {loading && (

                <div className="alert alert-info">
                    Loading staff accounts...
                </div>

            )}

            {/* Staff Table */}

            {!loading && (

                <div className="card border-0 shadow-sm">

                    <div className="card-header bg-white p-4">

                        <h5 className="fw-bold mb-1">
                            Staff Members
                        </h5>

                        <p className="text-secondary small mb-0">
                            {staffList.length} staff members registered.
                        </p>

                    </div>

                    <div className="table-responsive">

                        <table className="table table-hover align-middle mb-0">

                            <thead className="table-light">

                                <tr>

                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th>Login Account</th>
                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {staffList.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="text-center py-4 text-secondary"
                                        >
                                            No staff members found.
                                        </td>

                                    </tr>

                                ) : (

                                    staffList.map((staff) => (

                                        <tr key={staff.staffId}>

                                            <td>
                                                {staff.staffId}
                                            </td>

                                            <td className="fw-semibold">
                                                {staff.name}
                                            </td>

                                            <td>
                                                {staff.email}
                                            </td>

                                            <td>

                                                <span className="badge bg-primary">
                                                    {staff.category}
                                                </span>

                                            </td>

                                            <td>

                                                {staff.active ? (

                                                    <span className="badge bg-success">
                                                        Active
                                                    </span>

                                                ) : (

                                                    <span className="badge bg-danger">
                                                        Inactive
                                                    </span>

                                                )}

                                            </td>

                                            <td>

                                                {staff.accountCreated ? (

                                                    <span className="badge bg-success">
                                                        Account Created
                                                    </span>

                                                ) : (

                                                    <span className="badge bg-warning text-dark">
                                                        Not Created
                                                    </span>

                                                )}

                                            </td>

                                            <td>

                                                {staff.accountCreated ? (

                                                    <button
                                                        className="btn btn-sm btn-outline-success"
                                                        disabled
                                                    >
                                                        <i className="bi bi-check-circle me-1"></i>
                                                        Created
                                                    </button>

                                                ) : (

                                                    <button
                                                        className="btn btn-sm btn-primary"
                                                        disabled={!staff.active}
                                                        onClick={() => openCreateForm(staff)}
                                                    >
                                                        <i className="bi bi-person-plus me-1"></i>
                                                        Create Account
                                                    </button>

                                                )}

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}

            {/* Create Account Form */}

            {selectedStaff && (

                <div className="card border-0 shadow-sm mt-4">

                    <div className="card-header bg-white p-3">

                        <h5 className="fw-bold mb-0">
                            Create Staff Login Account
                        </h5>

                    </div>

                    <div className="card-body p-4">

                        <p className="text-secondary">
                            Creating an account for:
                        </p>

                        <h6 className="fw-bold">
                            {selectedStaff.name}
                        </h6>

                        <p className="text-secondary">
                            {selectedStaff.email}
                        </p>

                        <form onSubmit={handleCreateAccount}>

                            <div className="mb-3">

                                <label className="form-label fw-semibold">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    minLength="8"
                                    required
                                />

                                <small className="text-secondary">
                                    Minimum 8 characters.
                                </small>

                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary me-2"
                                disabled={creating}
                            >

                                {creating
                                    ? "Creating..."
                                    : "Create Account"}

                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setSelectedStaff(null)}
                                disabled={creating}
                            >
                                Cancel
                            </button>

                        </form>

                    </div>

                </div>

            )}

        </div>

    );
}

export default StaffAccountManagement;