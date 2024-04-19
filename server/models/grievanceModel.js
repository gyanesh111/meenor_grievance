// Import required package
const mongoose = require("mongoose");

// Define the schema for the Grievance model
const grievanceSchema = new mongoose.Schema({
  // Description of the grievance
  grievance: {
    type: String,
    required: false, // Not required
  },
  // Name of the person raising the grievance
  name: {
    type: String,
    required: true,
  },
  // Email of the person raising the grievance
  email: {
    type: String,
    required: true,
  },
  // Department of the person raising the grievance
  department: {
    type: String,
    enum: ["r&d", "developers", "management", "intern", "hr"], // Must be one of these values
    required: true,
  },
  // Description of the grievance
  description: {
    type: String,
    required: true,
  },
  // Status of the grievance (processing or resolved)
  status: {
    type: String,
    enum: ["processing", "resolved"], // Must be one of these values
    default: "processing", // Default value is processing
  },
  // Feedback provided on the grievance
  feedback: {
    type: String,
    default: "NA", // Default value is NA
  },
  // Date when the grievance was raised
  date: {
    type: Date,
    default: Date.now, // Default value is current date/time
  },
  // Severity of the grievance (minor, major, critical)
  severity: {
    type: String,
    enum: ["minor", "major", "critical"], // Must be one of these values
    default: "minor", // Default value is minor
  },
  // Connection of grievance schema with the employee schema
  // References the Employee model
  // this is used to refer the employee id to the database
  //ref keyword is use to ref the employee to tthe grievance model
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  // Additional field to store resolved grievance details
  resolvedGrievance: {
    type: String,
  },
});

// Create a model using the defined schema and export it
module.exports = mongoose.model("Grievance", grievanceSchema);
