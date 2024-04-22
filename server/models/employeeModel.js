// Import required packages
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Define the schema for the Employee model
const employeeSchema = new mongoose.Schema({
  // Name of the employee
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  // Email of the employee
  email: {
    type: String,
    required: true,
    unique: [true, "Email ID already exists"],
  },
  // Password of the employee
  password: {
    type: String,
    required: true,
  },
  // Confirm password of the employee
  cpassword: {
    type: String,
    required: true,
  },
  // Phone number of the employee
  phone: {
    type: Number,
    minlength: 10,
    maxlength: 10,
    // required: true,  // Uncomment if phone number is required
    // unique: true     // Uncomment if phone number must be unique
  },
  // Department of the employee
  department: {
    type: String,
    enum: ["r&d", "development", "management", "intern", "hr"], // Department values must be one of these
    required: true,
  },
  // Address of the employee
  address: {
    type: String,
    required: true,
  },
  // Role of the employee
  role: {
    type: String,
    enum: ["developer", "tl", "hr", "manager"], // Role values must be one of these
    default: "developer", // Default role is 'developer'
  },
  // Connection of employee schema with the grievance schema
  grievanceHistory: [
    {
      grievanceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grievance", // References the Grievance model
      },
      name: String,
      grievanceName: String,
      grievanceStatus: String,
    },
  ],
});

// Create a collection using the defined schema and export it
module.exports = mongoose.model("Employee", employeeSchema);
