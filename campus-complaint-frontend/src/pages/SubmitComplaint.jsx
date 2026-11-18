import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';

function SubmitComplaint() {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        severity: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);


    // Handle form field changes
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


    // Validate form
    function validateForm() {

        const newErrors = {};

        if (!formData.title.trim()) {

            newErrors.title = 'Please enter a complaint title.';

        } else if (formData.title.trim().length < 5) {

            newErrors.title =
                'Complaint title must contain at least 5 characters.';
        }


        if (!formData.description.trim()) {

            newErrors.description =
                'Please describe the problem.';

        } else if (formData.description.trim().length < 10) {

            newErrors.description =
                'Description must contain at least 10 characters.';
        }


        if (!formData.category) {

            newErrors.category =
                'Please select a complaint category.';
        }


        if (!formData.severity) {

            newErrors.severity =
                'Please select the complaint severity.';
        }

        return newErrors;
    }


    // Submit complaint to Spring Boot REST API
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

            const response = await api.post('/complaints', {

                title: formData.title.trim(),

                description: formData.description.trim(),

                category: formData.category,

                severity: formData.severity

            });

            // Display backend success response
            setSuccessMessage(response.data);

            // Clear form after successful submission
            setFormData({
                title: '',
                description: '',
                category: '',
                severity: ''
            });

        } catch (error) {

            if (error.response) {

                setErrorMessage(
                    typeof error.response.data === 'string'
                        ? error.response.data
                        : 'Unable to submit complaint. Please check your details.'
                );

            } else if (error.request) {

                setErrorMessage(
                    'Unable to connect to the server. Please check whether the backend is running.'
                );

            } else {

                setErrorMessage(
                    'An unexpected error occurred. Please try again.'
                );
            }

        } finally {

            setLoading(false);
        }
    }


    // Clear form
    function handleClearForm() {

        setFormData({
            title: '',
            description: '',
            category: '',
            severity: ''
        });

        setErrors({});
        setSuccessMessage('');
        setErrorMessage('');
    }


    return (

        <div className="submit-complaint-page">

            <div className="container py-5">


                {/* Page heading */}

                <div className="mb-4">

                    <h2 className="fw-bold">
                        Submit a Complaint
                    </h2>

                    <p className="text-secondary">
                        Report a hostel or campus problem so it can be tracked
                        and addressed.
                    </p>

                </div>


                <div className="row g-4">


                    {/* Complaint form */}

                    <div className="col-lg-8">

                        <div className="complaint-form-card shadow-sm">


                            {/* Form heading */}

                            <div className="d-flex align-items-center gap-3 mb-4">

                                <div className="complaint-form-icon">
                                    📝
                                </div>

                                <div>

                                    <h4 className="fw-bold mb-1">
                                        Complaint Details
                                    </h4>

                                    <p className="text-secondary mb-0">
                                        Enter the details of the issue you are facing.
                                    </p>

                                </div>

                            </div>


                            {/* Success message */}

                            {successMessage && (

                                <div
                                    className="alert alert-success"
                                    role="alert"
                                >

                                    {successMessage}

                                </div>

                            )}


                            {/* Error message */}

                            {errorMessage && (

                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                >

                                    {errorMessage}

                                </div>

                            )}


                            {/* Complaint form */}

                            <form onSubmit={handleSubmit} noValidate>


                                {/* Complaint title */}

                                <div className="mb-4">

                                    <label
                                        htmlFor="title"
                                        className="form-label fw-semibold"
                                    >

                                        Complaint Title

                                        <span className="text-danger">
                                            {' '}*
                                        </span>

                                    </label>


                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className={`form-control ${
                                            errors.title ? 'is-invalid' : ''
                                        }`}
                                        placeholder="Example: Wi-Fi not working in hostel"
                                        value={formData.title}
                                        onChange={handleChange}
                                        maxLength={150}
                                    />


                                    {errors.title && (

                                        <div className="invalid-feedback">

                                            {errors.title}

                                        </div>

                                    )}

                                </div>



                                {/* Description */}

                                <div className="mb-4">

                                    <label
                                        htmlFor="description"
                                        className="form-label fw-semibold"
                                    >

                                        Description

                                        <span className="text-danger">
                                            {' '}*
                                        </span>

                                    </label>


                                    <textarea
                                        id="description"
                                        name="description"
                                        className={`form-control ${
                                            errors.description ? 'is-invalid' : ''
                                        }`}
                                        rows="5"
                                        placeholder="Explain the problem, its location, and any relevant details."
                                        value={formData.description}
                                        onChange={handleChange}
                                        maxLength={2000}
                                    />


                                    {errors.description && (

                                        <div className="invalid-feedback">

                                            {errors.description}

                                        </div>

                                    )}


                                    {/* Character counter */}

                                    <div className="text-end text-secondary small mt-1">

                                        {formData.description.length}/2000 characters

                                    </div>

                                </div>



                                {/* Category */}

                                <div className="mb-4">

                                    <label
                                        htmlFor="category"
                                        className="form-label fw-semibold"
                                    >

                                        Complaint Category

                                        <span className="text-danger">
                                            {' '}*
                                        </span>

                                    </label>


                                    <select
                                        id="category"
                                        name="category"
                                        className={`form-select ${
                                            errors.category ? 'is-invalid' : ''
                                        }`}
                                        value={formData.category}
                                        onChange={handleChange}
                                    >

                                        <option value="">
                                            Select a category
                                        </option>

                                        <option value="WATER">
                                            Water Supply
                                        </option>

                                        <option value="ELECTRICITY">
                                            Electricity
                                        </option>

                                        <option value="WIFI">
                                            Wi-Fi / Internet
                                        </option>

                                        <option value="PLUMBING">
                                            Plumbing
                                        </option>

                                        <option value="CLEANING">
                                            Cleaning
                                        </option>

                                        <option value="OTHER">
                                            Other
                                        </option>

                                    </select>


                                    {errors.category && (

                                        <div className="invalid-feedback">

                                            {errors.category}

                                        </div>

                                    )}

                                </div>



                                {/* Severity */}

                                <div className="mb-4">

                                    <label
                                        htmlFor="severity"
                                        className="form-label fw-semibold"
                                    >

                                        Severity

                                        <span className="text-danger">
                                            {' '}*
                                        </span>

                                    </label>


                                    <select
                                        id="severity"
                                        name="severity"
                                        className={`form-select ${
                                            errors.severity ? 'is-invalid' : ''
                                        }`}
                                        value={formData.severity}
                                        onChange={handleChange}
                                    >

                                        <option value="">
                                            Select severity
                                        </option>

                                        <option value="LOW">
                                            Low
                                        </option>

                                        <option value="MEDIUM">
                                            Medium
                                        </option>

                                        <option value="HIGH">
                                            High
                                        </option>

                                        <option value="CRITICAL">
                                            Critical
                                        </option>

                                    </select>


                                    {errors.severity && (

                                        <div className="invalid-feedback">

                                            {errors.severity}

                                        </div>

                                    )}


                                    <div className="form-text">

                                        Select the severity that best describes the problem.

                                    </div>

                                </div>



                                {/* Buttons */}

                                <div className="d-flex flex-wrap gap-3 mt-4">


                                    {/* Submit button */}

                                    <button
                                        type="submit"
                                        className="btn btn-primary px-4 py-2"
                                        disabled={loading}
                                    >

                                        {loading
                                            ? 'Submitting...'
                                            : 'Submit Complaint'
                                        }

                                    </button>



                                    {/* Clear button */}

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary px-4 py-2"
                                        onClick={handleClearForm}
                                        disabled={loading}
                                    >

                                        Clear Form

                                    </button>

                                </div>


                            </form>

                        </div>

                    </div>



                    {/* Information panel */}

                    <div className="col-lg-4">

                        <div className="complaint-guidelines-card shadow-sm">


                            <h5 className="fw-bold mb-3">

                                📌 Before You Submit

                            </h5>


                            <ul className="guidelines-list">

                                <li>
                                    Provide a clear and descriptive title.
                                </li>

                                <li>
                                    Explain the issue in sufficient detail.
                                </li>

                                <li>
                                    Choose the correct complaint category.
                                </li>

                                <li>
                                    Select the severity that best reflects the issue.
                                </li>

                            </ul>


                            <hr />


                            <h6 className="fw-bold">

                                What happens next?

                            </h6>


                            <p className="text-secondary small">

                                Your complaint will be recorded, assigned a priority
                                score, and routed to an appropriate staff member
                                according to the backend's assignment rules.

                            </p>


                            <Link
                                to="/my-complaints"
                                className="btn btn-outline-primary w-100 mt-2"
                            >

                                Track My Complaints

                            </Link>


                        </div>

                    </div>


                </div>

            </div>

        </div>

    );

}

export default SubmitComplaint;