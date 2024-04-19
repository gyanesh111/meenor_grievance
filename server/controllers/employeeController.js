const Employee = require("../models/employeeModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login function
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if employee with the provided email exists
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the password in the database
    if (password !== employee.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If credentials are valid, generate a token
    const token = jwt.sign({ userId: employee._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Check the role of the employee
    let redirectPage = "";
    if (employee.role === "hr") {
      redirectPage = "/hr_dashboard"; // Redirect to HR dashboard
    } else if (employee.role === "developer") {
      redirectPage = "/developer_dashboard"; // Redirect to Developer dashboard
    } else if (employee.role === "manager") {
      redirectPage = "/manager_dashboard"; // Redirect to Manager dashboard
    }

    return res.status(200).json({ token, redirectPage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Function to find an employee by id and role
exports.findEmployeeByIdAndRole = async (req, res) => {
  const { id, role } = req.params; // Assuming id and role are passed as parameters in the URL

  try {
    // Find the employee with the provided id and role
    const employee = await Employee.findOne({ _id: id, role });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // If employee is found, return it in the response
    return res.status(200).json({ employee });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
