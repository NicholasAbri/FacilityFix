import { useCallback, useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/tickets";

function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTickets = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Could not load tickets.");
      }

      const data = await response.json();
      setTickets(data);
    } catch (error) {
      setError(error.message || "Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  return (
    <section className="dashboard">
      <div className="dashboard-heading">
        <div>
          <h2>Tickets Dashboard</h2>
          <p className="section-description">
            View maintenance reports submitted to FacilityFix.
          </p>
        </div>

        <button
          className="refresh-button"
          onClick={loadTickets}
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p>Loading tickets...</p>
      ) : tickets.length === 0 ? (
        <p className="empty-state">No tickets submitted yet.</p>
      ) : (
        <div className="ticket-list">
          {tickets.map((ticket) => (
            <article className="ticket-card" key={ticket._id}>
              <div className="ticket-heading">
                <strong>{ticket.ticketNumber}</strong>
                <span className="status">{ticket.status}</span>
              </div>

              <h3>{ticket.location}</h3>

              <p>{ticket.description}</p>

              <div className="ticket-details">
                <span>Urgency: {ticket.urgency}</span>

                <span>Priority: {ticket.priority || "Not assigned"}</span>
              </div>

              <small>
                Created: {new Date(ticket.createdAt).toLocaleString()}
              </small>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default TicketsPage;
