const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      required: true,
      unique: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    urgency: {
      type: String,
      enum: ["Routine", "Needs attention soon", "Urgent or safety concern"],
      default: "Routine",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: null,
    },

    status: {
      type: String,
      enum: ["Submitted", "In Progress", "Work Completed", "Resolved"],
      default: "Submitted",
    },

    photoUrl: {
      type: String,
      default: "",
    },

    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    assignedRepairer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Ticket", ticketSchema);
