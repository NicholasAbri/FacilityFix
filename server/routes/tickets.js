const express = require("express");
const Ticket = require("../models/Ticket");
const Counter = require("../models/Counter");

const router = express.Router();

const validUrgencies = [
  "Routine",
  "Needs attention soon",
  "Urgent or safety concern",
];

// Create a ticket
router.post("/", async (req, res) => {
  try {
    const { location, description, urgency } = req.body;

    if (
      typeof location !== "string" ||
      !location.trim() ||
      typeof description !== "string" ||
      !description.trim()
    ) {
      return res.status(400).json({
        message: "Location and description are required.",
      });
    }

    if (urgency !== undefined && !validUrgencies.includes(urgency)) {
      return res.status(400).json({
        message: "Invalid urgency value.",
      });
    }

    const counter = await Counter.findOneAndUpdate(
      { _id: "ticketSequence" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );

    const year = String(new Date().getFullYear()).slice(-2);
    const ticketNumber = `#FFX-${year}-${String(counter.seq).padStart(6, "0")}`;

    const ticket = await Ticket.create({
      ticketNumber,
      location: location.trim(),
      description: description.trim(),
      urgency: urgency || "Routine",
    });

    res.status(201).json({
      message: "Ticket submitted successfully.",
      ticket,
    });
  } catch (error) {
    console.error("Ticket creation failed:", error.message);

    res.status(500).json({
      message: "Unable to create ticket.",
    });
  }
});

// Retrieve all tickets
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    console.error("Fetching tickets failed:", error.message);

    res.status(500).json({
      message: "Unable to retrieve tickets.",
    });
  }
});

module.exports = router;
