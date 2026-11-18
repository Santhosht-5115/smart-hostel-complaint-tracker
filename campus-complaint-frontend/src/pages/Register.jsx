
import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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

        if (!formData.name.trim()) {
            newErrors.name = 'Please enter your full name.';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must contain at least 2 characters.';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Please enter your email address.';
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
        ) {
            newErrors.email = 'Please enter a valid email address.';
        }

        if (!formData.password) {
            newErrors.password = 'Please enter a password.';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must contain at least 8 characters.';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password.';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }

        return newErrors;
    }

    async function handleSubmit(event) {

        event.preventDefault();

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

            // Send only the fields expected by RegisterRequest.java
            const requestData = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password
            };

            const response = await api.post(
                '/auth/register',
                requestData
            );

            setSuccessMessage(response.data);

            // Clear form after successful registration
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            });

            setShowPassword(false);

        } catch (error) {

            console.error('Registration error:', error);

            if (error.response) {

                if (typeof error.response.data === 'string') {
                    setErrorMessage(error.response.data);
                } else if (error.response.data?.message) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage(
                        'Registration failed. Please check your details.'
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

        <div className="register-page">

            <div className="container py-5">

                <div className="row justify-content-center align-items-center">

                    <div className="col-lg-5 col-md-8">

                        <div className="register-card shadow">

                            <div className="text-center mb-4">

                                <div className="register-icon">🎓</div>

                                <h2 className="fw-bold mt-3">
                                    Create Student Account
                                </h2>

                                <p className="text-secondary">
                                    Join your campus complaint management system.
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
                                        htmlFor="name"
                                        className="form-label fw-semibold"
                                    >
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        className={`form-control ${
                                            errors.name ? 'is-invalid' : ''
                                        }`}
                                        id="name"
                                        name="name"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        autoComplete="name"
                                    />

                                    {errors.name && (
                                        <div className="invalid-feedback">
                                            {errors.name}
                                        </div>
                                    )}

                                </div>

                                <div className="mb-3">

                                    <label
                                        htmlFor="email"
                                        className="form-label fw-semibold"
                                    >
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        className={`form-control ${
                                            errors.email ? 'is-invalid' : ''
                                        }`}
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                    />

                                    {errors.email && (
                                        <div className="invalid-feedback">
                                            {errors.email}
                                        </div>
                                    )}

                                </div>

                                <div className="mb-3">

                                    <label
                                        htmlFor="password"
                                        className="form-label fw-semibold"
                                    >
                                        Password
                                    </label>

                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className={`form-control ${
                                            errors.password ? 'is-invalid' : ''
                                        }`}
                                        id="password"
                                        name="password"
                                        placeholder="Minimum 8 characters"
                                        value={formData.password}
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                    />

                                    {errors.password && (
                                        <div className="invalid-feedback">
                                            {errors.password}
                                        </div>
                                    )}

                                </div>

                                <div className="mb-3">

                                    <label
                                        htmlFor="confirmPassword"
                                        className="form-label fw-semibold"
                                    >
                                        Confirm Password
                                    </label>

                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className={`form-control ${
                                            errors.confirmPassword ? 'is-invalid' : ''
                                        }`}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="Re-enter your password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                    />

                                    {errors.confirmPassword && (
                                        <div className="invalid-feedback">
                                            {errors.confirmPassword}
                                        </div>
                                    )}

                                </div>

                                <div className="form-check mb-4">

                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="showPassword"
                                        checked={showPassword}
                                        onChange={(event) =>
                                            setShowPassword(event.target.checked)
                                        }
                                    />

                                    <label
                                        className="form-check-label"
                                        htmlFor="showPassword"
                                    >
                                        Show password
                                    </label>

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 py-2"
                                    disabled={loading}
                                >

                                    {loading ? 'Creating Account...' : 'Create Account'}

                                </button>

                            </form>

                            <div className="text-center mt-4">

                                <span className="text-secondary">
                                    Already have an account?
                                </span>{' '}

                                <Link
                                    to="/login"
                                    className="fw-semibold"
                                >
                                    Login here
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Register;

