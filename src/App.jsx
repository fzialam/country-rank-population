import './App.css'
import { Outlet, NavLink } from 'react-router-dom'

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            MyApp
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => 
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => 
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                  to="/articles"
                >
                  Articles
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => 
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                  to="/compare"
                >
                  Comparison
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Add padding to prevent content from overlapping */}
      <div style={{ marginTop: '56px' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default App
