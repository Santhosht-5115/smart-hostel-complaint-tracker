import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    function handleChange(event) {

        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));

        setErrors((previousErrors) => ({
            ...previousErrors,
            [name]: ''
        }));

        setSuccessMessage('');
        setErrorMessage('');
    }

    function validateForm() {

        const newErrors = {};

        if (!formData.email.trim()) {

            newErrors.email = 'Please enter your email address.';

        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                formData.email.trim()
            )
        ) {

            newErrors.email = 'Please enter a valid email address.';
        }

        if (!formData.password) {

            newErrors.password = 'Please enter your password.';
        }

        return newErrors;
    }

    async function handleSubmit(event) {

        event.preventDefault();

        if (loading) {
            return;
        }

        setSuccessMessage('');
        setErrorMessage('');

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {

            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setLoading(true);

        try {

            const requestData = {
                email: formData.email.trim(),
                password: formData.password
            };

            const response = await api.post(
                '/auth/login',
                requestData
            );

            const role = response.data?.role;
            const email = response.data?.email;

            if (role !== 'ADMIN' && role !== 'STUDENT' && role !== 'STAFF') {
    setErrorMessage('Unable to identify your account role.');
    return;
}

            

            // Store authenticated user details
            localStorage.setItem('userRole', role);
            localStorage.setItem('userEmail', email);

            setSuccessMessage('Login successful!');

            // Navigate based on role
            if (response.data.role === "ADMIN") {

    navigate("/admin-dashboard");

} else if (response.data.role === "STUDENT") {

    navigate("/my-complaints");

} else if (response.data.role === "STAFF") {

    navigate("/staff-dashboard");

}

        } catch (error) {

            console.error('Login error:', error);

            if (error.response) {

                if (typeof error.response.data === 'string') {

                    setErrorMessage(error.response.data);

                } else if (error.response.data?.message) {

                    setErrorMessage(error.response.data.message);

                } else {

                    setErrorMessage(
                        'Login failed. Please check your email and password.'
                    );
                }

            } else if (error.request) {

                setErrorMessage(
                    'Cannot connect to the server. Please make sure Spring Boot is running.'
                );

            } else {

                setErrorMessage(
                    'Something went wrong. Please try again.'
                );
            }

        } finally {

            setLoading(false);
        }
    }

    return (

        <div className="login-page">

            <div className="container py-5">

                <div className="row justify-content-center align-items-center">

                    <div className="col-lg-5 col-md-7">

                        <div className="login-card shadow">

                            <div className="text-center mb-4">

                                <div className="login-icon">
                                    🔐
                                </div>

                                <h2 className="fw-bold mt-3">
                                    Welcome Back
                                </h2>

                                <p className="text-secondary">
                                    Log in to manage your campus complaints.
                                </p>

                            </div>

                            {successMessage && (

                                <div
                                    className="alert alert-success"
                                    role="alert"
                                >
                                    {successMessage}
                                </div>

                            )}

                            {errorMessage && (

                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                >
                                    {errorMessage}
                                </div>

                            )}

                            <form onSubmit={handleSubmit} noValidate>

                                <div className="mb-3">

                                    <label
                                        htmlFor="loginEmail"
                                        className="form-label fw-semibold"
                                    >
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        className={`form-control ${
                                            errors.email ? 'is-invalid' : ''
                                        }`}
                                        id="loginEmail"
                                        name="email"
                                        placeholder="Enter your email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                        disabled={loading}
                                    />

                                    {errors.email && (

                                        <div className="invalid-feedback">
                                            {errors.email}
                                        </div>

                                    )}

                                </div>

                                <div className="mb-3">

                                    <label
                                        htmlFor="loginPassword"
                                        className="form-label fw-semibold"
                                    >
                                        Password
                                    </label>

                                    <input
                                        type={
                                            showPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        className={`form-control ${
                                            errors.password
                                                ? 'is-invalid'
                                                : ''
                                        }`}
                                        id="loginPassword"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        autoComplete="current-password"
                                        disabled={loading}
                                    />

                                    {errors.password && (

                                        <div className="invalid-feedback">
                                            {errors.password}
                                        </div>

                                    )}

                                </div>

                                <div className="form-check mb-4">

                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="showLoginPassword"
                                        checked={showPassword}
                                        onChange={(event) =>
                                            setShowPassword(
                                                event.target.checked
                                            )
                                        }
                                        disabled={loading}
                                    />

                                    <label
                                        className="form-check-label"
                                        htmlFor="showLoginPassword"
                                    >
                                        Show password
                                    </label>

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 py-2"
                                    disabled={loading}
                                >

                                    {loading
                                        ? 'Logging in...'
                                        : 'Login'}

                                </button>

                            </form>

                            <div className="text-center mt-4">

                                <span className="text-secondary">
                                    Don't have an account?
                                </span>{' '}

                                <Link
                                    to="/register"
                                    className="fw-semibold"
                                >
                                    Register here
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;

