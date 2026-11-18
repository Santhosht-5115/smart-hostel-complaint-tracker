import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center min-vh-75">

            <div className="col-lg-7">
              <span className="badge text-bg-primary mb-3">
                SMART CAMPUS MANAGEMENT
              </span>

              <h1 className="display-4 fw-bold">
                Smart Hostel Complaint
                <span className="text-primary">
                  {' '} & Resolution Tracker
                </span>
              </h1>

              <p className="lead text-secondary mt-4">
                A smarter way to raise hostel complaints, track their
                progress, and stay informed about every resolution.
              </p>

              <div className="mt-4">
                <Link
                  to="/register"
                  className="btn btn-primary btn-lg me-3 mb-2"
                >
                  Get Started
                </Link>

                <Link
                  to="/login"
                  className="btn btn-outline-primary btn-lg mb-2"
                >
                  Student Login
                </Link>
              </div>
            </div>

            <div className="col-lg-5 mt-5 mt-lg-0">
              <div className="home-info-card shadow-sm">
                <h3 className="fw-bold mb-4">
                  Your Campus, Better Connected
                </h3>

                <div className="feature-item">
                  <span className="feature-icon">📝</span>

                  <div>
                    <h5>Easy Complaint Submission</h5>
                    <p>Report hostel problems through a simple form.</p>
                  </div>
                </div>

                <div className="feature-item">
                  <span className="feature-icon">📊</span>

                  <div>
                    <h5>Track Complaint Status</h5>
                    <p>Check the progress of your submitted complaints.</p>
                  </div>
                </div>

                <div className="feature-item">
                  <span className="feature-icon">⚡</span>

                  <div>
                    <h5>Priority-Based Resolution</h5>
                    <p>Help ensure important issues receive attention.</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;