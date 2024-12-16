import './App.css'
import { Outlet, NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


function App() {
  return (
    <div className='container-fluid'>
      <nav className="navbar navbar-expand-lg fixed-top shadow nav-bg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <span className='fw-bold'>
              MyApp
            </span>
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
                    isActive ? 'nav-link active fw-medium' : 'nav-link'
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'nav-link active fw-medium' : 'nav-link'
                  }
                  to="/articles"
                >
                  Articles
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'nav-link active fw-medium' : 'nav-link'
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
      <div className=' w-100' style={{ marginTop: '56px' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default App
