import { useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api/tickets";

function ReportPage() {
  const [form, setForm] = useState({
    location: "",
    description: "",
    urgency: "Routine",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Ticket submission failed.");
      }

      setSuccess(`Ticket ${data.ticket.ticketNumber} submitted successfully.`);

      setForm({
        location: "",
        description: "",
        urgency: "Routine",
      });
    } catch (error) {
      setError(error.message || "Could not connect to the server.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="form-section">
      <h2>Report a maintenance issue</h2>

      <p className="section-description">
        Tell us what needs fixing and where the issue occurred.
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="location">Location</label>

        <input
          id="location"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="e.g. Main Office, Room 2"
          required
        />

        <label htmlFor="description">Issue description</label>

        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe the maintenance issue..."
          rows={4}
          required
        />

        <label htmlFor="urgency">Urgency</label>

        <select
          id="urgency"
          name="urgency"
          value={form.urgency}
          onChange={handleChange}
        >
          <option value="Routine">Routine</option>
          <option value="Needs attention soon">Needs attention soon</option>
          <option value="Urgent or safety concern">
            Urgent or safety concern
          </option>
        </select>

        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit ticket"}
        </button>
      </form>

      {success && (
        <div className="success-message">
          <p>{success}</p>
          <Link className="text-link" to="/tickets">
            View tickets →
          </Link>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </section>
  );
}

export default ReportPage;
