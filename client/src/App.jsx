import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import ReportPage from "./pages/ReporterPage.jsx";
import TicketsPage from "./pages/TicketsPage.jsx";
import "./App.css";

function App() {
  return (
    <main className="app">
      <header className="header">
        <div>
          <p className="eyebrow">BUILDING MAINTENANCE</p>
          <h1>FacilityFix</h1>

          <p className="subtitle">
            Report issues. Track repairs. Keep facilities running.
          </p>
        </div>

        <span className="environment-label">Development</span>
      </header>

      <nav className="top-nav" aria-label="Main navigation">
        <NavLink
          to="/report"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Report an Issue
        </NavLink>

        <NavLink
          to="/tickets"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Tickets Dashboard
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/report" replace />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="*" element={<Navigate to="/report" replace />} />
      </Routes>

      <footer>FacilityFix · Building Maintenance</footer>
    </main>
  );
}

export default App;
