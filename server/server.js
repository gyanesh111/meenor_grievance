const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const employeeRoutes = require("./routes/employeeRoutes");
const grievanceRoutes = require("./routes/grievanceRoutes");

const cors = require("cors");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const app = express();
app.use(cors());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/employee", employeeRoutes); // Changed route to lowercase
app.use("/api/grievance", grievanceRoutes); //grievance routes

// Define the port
const port = process.env.PORT || 8080;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
