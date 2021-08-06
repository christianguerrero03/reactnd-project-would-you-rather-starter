import { BrowserRouter as Router, Link } from 'react-router-dom';

function AppHeader() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" href="/#">
            Would You Rather
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to="/" className="nav-link active">
                Home
              </Link>
              <Link to="/question" className="nav-link">
                New Question
              </Link>
              <Link to="/leaderboard" className="nav-link">
                Leaderboard
              </Link>
              <Link to="/login" className="nav-link" tabIndex="-1">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </Router>
  );
}

export default AppHeader;
