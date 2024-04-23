const Grievance = require("../models/grievanceModel"); // Import Grievance model
const Employee = require("../models/employeeModel"); // Import Employee model
const hrgrievances = require("../models/hrGrievancesModel"); // Import HR grievances model
const managergrievances = require("../models/managerGrievancesModel"); // Import Manager grievances model
const tlgrievances = require("../models/tlGrievancesModel"); // Import TL grievances model
const nodemailer = require("nodemailer"); // Import nodemailer for sending emails
const employeeModel = require("../models/employeeModel");
const { ObjectId } = require("mongoose").Types;
// Create nodemailer transporter to send emails via Gmail

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gyaneshverma999@gmail.com",
    pass: "peor clum zmnv pteo", // Replace with your Gmail password
  },
});

// Function to notify HR about a new grievance
async function notifyHR(grievance) {
  try {
    // Find all HR employees
    const hrEmployees = await Employee.find({ role: "hr" });
    // Iterate over each HR employee
    hrEmployees.forEach(async (hr) => {
      // Compose email options
      const mailOptions = {
        from: hr.email,
        to: hr.email,
        subject: "New Grievance Raised",
        text: `A new grievance has been raised:\n\n${grievance.description}`,
      };
      // Send email
      await transporter.sendMail(mailOptions);
      console.log(
        `Notification sent to HR ${hr.email} for grievance: ${grievance._id}`
      );
    });
    console.log("Notifications sent to HR for grievance");
  } catch (error) {
    console.error("Error sending notifications to HR:", error);
  }
}

// Function to notify TL about a new grievance
async function notifyTL(grievance) {
  try {
    // Find all TL employees
    const tlEmployees = await Employee.find({ role: "tl" });
    // Iterate over each TL employee
    tlEmployees.forEach(async (tl) => {
      // Compose email options
      const mailOptions = {
        from: tl.email,
        to: tl.email,
        subject: "New Grievance Raised",
        text: `A new grievance has been raised:\n\n${grievance.description}`,
      };
      // Send email
      await transporter.sendMail(mailOptions);
      console.log(
        `Notification sent to TL ${tl.email} for grievance: ${grievance._id}`
      );
    });
    console.log("Notifications sent to TL for grievance");
  } catch (error) {
    console.error("Error sending notifications to TL:", error);
  }
}

// Function to notify Manager about a new grievance
async function notifyManager(grievance) {
  try {
    // Find all Manager employees
    const managerEmployees = await Employee.find({ role: "manager" });
    // Iterate over each Manager employee
    managerEmployees.forEach(async (manager) => {
      // Compose email options
      const mailOptions = {
        from: manager.email,
        to: manager.email,
        subject: "New Grievance Raised",
        text: `A new grievance has been raised:\n\n${grievance.description}`,
      };
      // Send email
      await transporter.sendMail(mailOptions);
      console.log(
        `Notification sent to Manager ${manager.email} for grievance: ${grievance._id}`
      );
    });
    console.log("Notifications sent to Manager for grievance");
  } catch (error) {
    console.error("Error sending notifications to Manager:", error);
  }
}

// Define grievanceController object to hold controller functions
const grievanceController = {
  // Controller function to create a new grievance
  createGrievance: async (req, res) => {
    try {
      const {
        employeeId,
        department,
        severity,
        role,
        name,
        email,
        description,
      } = req.body;

      console.log(req.body);

      let existingEmployee = await Employee.findOne({ email });

      //   // Check if employeeId is provided, if not, find employee by email
      //     if (employeeId && ObjectId.isValid(employeeId)) {
      //   existingEmployee = await Employee.findById(employeeId);
      // } else if (email) {
      //   existingEmployee = await Employee.findOne({ email });
      // }

      // // Check if employee exists
      if (!existingEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      // if (employeeId && ObjectId.isValid(employeeId)) {
      //   existingEmployee = await Employee.findById(employeeId);

      // } else if (email) {
      // }

      // Check if employee exists
      // if (!existingEmployee) {
      //   return res.status(404).json({ message: "Employee not found" });
      // }

      // Set status of grievance to "processing"
      const status = "processing";

      // Based on employee's role and severity of grievance, notify appropriate authority
      if (existingEmployee.role === "developer") {
        if (severity === "minor") {
          await notifyTL(description);
          await tlgrievances.create({
            employeeId: existingEmployee._id,
            role,
            severity,
            name,
            email,
            role,
            description,
            department,
          });
        } else if (severity === "major") {
          await notifyManager(description);
          await managergrievances.create({
            employeeId: existingEmployee._id,
            role,
            severity,
            name,
            email,
            description,
            department,
          });
        } else if (severity === "critical") {
          await notifyHR(description);
          await hrgrievances.create({
            employeeId: existingEmployee._id,
            severity,
            role,
            name,
            email,
            description,
            department,
          });
        }
      } else if (existingEmployee.role === "tl") {
        if (severity === "minor") {
          await notifyManager(description);
          await tlgrievances.create({
            employeeId: existingEmployee._id,
            role,
            severity,
            name,
            email,
            description,
            department,
          });
        } else if (severity === "major" || severity === "critical") {
          await notifyHR(description);
          await hrgrievances.create({
            employeeId: existingEmployee._id,
            role,
            severity,
            name,
            email,
            description,
            department,
          });
        }
      } else if (existingEmployee.role === "manager") {
        await notifyHR(description);
        await hrgrievances.create({
          employeeId: existingEmployee._id,
          role,
          severity,
          name,
          email,
          description,
          department,
        });
      }

      // Create new grievance with status set to "underprocess"
      const newGrievance = await Grievance.create({
        employeeId: existingEmployee._id,
        severity,
        status,
        name,
        role,
        email,
        description,
        department,
      });

      // Add grievance to the employee's grievance history
      existingEmployee.grievanceHistory.push({
        grievanceId: newGrievance._id,
        grievanceName: description,
      });
      await existingEmployee.save();

      // Send response
      res.status(201).json({
        message: "Grievance added successfully",
        grievance: newGrievance,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Controller function to get HR grievances by status
  getHRGrievancesByStatus: async (req, res) => {
    try {
      const { status } = req.query;
      const hrGrievances = await hrgrievances.find({ status });
      res.json(hrGrievances);
    } catch (error) {
      console.error("Error fetching HR grievances by status:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Controller function to get Manager grievances by status
  getManagerGrievancesByStatus: async (req, res) => {
    try {
      const { status } = req.query;
      const managerGrievances = await managergrievances.find({ status });
      res.json(managerGrievances);
    } catch (error) {
      console.error("Error fetching Manager grievances by status:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Controller function to get TL grievances by status
  getTLGrievancesByStatus: async (req, res) => {
    try {
      const { status } = req.query;
      const tlGrievances = await tlgrievances.find({ status });
      res.json(tlGrievances);
    } catch (error) {
      console.error("Error fetching TL grievances by status:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Controller function to get Employee grievances by status
  getEmployeeGrievancesByStatus: async (req, res) => {
    try {
      const { status } = req.query;
      const employeeGrievances = await Grievance.find({ status });
      res.json(employeeGrievances);
    } catch (error) {
      console.error("Error fetching Employee grievances by status:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Controller function to get the most recent TL grievance
  getRecentTlGrievance: async (req, res) => {
    try {
      // Find all grievances and sort them by their default order in the database
      const allGrievances = await tlgrievances
        .find()
        .sort({ $natural: -1 })
        .limit(1);

      // Check if any grievances exist
      if (allGrievances.length === 0) {
        return res.status(404).json({ message: "No grievances found" });
      }

      // Retrieve the last grievance from the sorted list
      const lastAddedGrievance = allGrievances[0];

      // Send the last added grievance as a response
      res.json(lastAddedGrievance);
    } catch (error) {
      // Handle any errors that occur during the retrieval process
      console.error("Error fetching last added grievance:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // // Controller function to get the most recent Manager grievance
  // getRecentManagerGrievance: async (req, res) => {
  //   try {
  //     const recentManagerGrievance = await managergrievances
  //       .findOne()
  //       .sort({ createdAt: -1 });
  //     res.json(recentManagerGrievance);
  //   } catch (error) {
  //     console.error("Error fetching recent Manager grievance:", error);
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // },

  getRecentManagerGrievance: async (req, res) => {
    try {
      // Find all grievances and sort them by their default order in the database
      const allGrievances = await managergrievances
        .find()
        .sort({ $natural: -1 })
        .limit(1);

      // Check if any grievances exist
      if (allGrievances.length === 0) {
        return res.status(404).json({ message: "No grievances found" });
      }

      // Retrieve the last grievance from the sorted list
      const lastAddedGrievance = allGrievances[0];

      // Send the last added grievance as a response
      res.json(lastAddedGrievance);
    } catch (error) {
      // Handle any errors that occur during the retrieval process
      console.error("Error fetching last added grievance:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Controller function to get the most recent HR grievance
  getRecentHrGrievance: async (req, res) => {
    try {
      // Find all grievances and sort them by their default order in the database
      const allGrievances = await hrgrievances
        .find()
        .sort({ $natural: -1 })
        .limit(1);

      // Check if any grievances exist
      if (allGrievances.length === 0) {
        return res.status(404).json({ message: "No grievances found" });
      }

      // Retrieve the last grievance from the sorted list
      const lastAddedGrievance = allGrievances[0];

      // Send the last added grievance as a response
      res.json(lastAddedGrievance);
    } catch (error) {
      // Handle any errors that occur during the retrieval process
      console.error("Error fetching last added grievance:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Controller function to retrieve grievances with severity as major
  getMajorGrievances: async (req, res) => {
    try {
      const majorGrievances = await Grievance.find({ severity: "major" });

      res.json(majorGrievances);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Controller function to retrieve the most recently added grievance
  getRecentGrievance: async (req, res) => {
    try {
      // Find the most recently added grievance by sorting in descending order based on the creation date
      const recentGrievance = await Grievance.findOne().sort({ createdAt: -1 });

      if (!recentGrievance) {
        return res.status(404).json({ error: "No recent grievance found" });
      }

      res.json(recentGrievance);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Controller function to retrieve grievances with severity as minor
  getMinorGrievances: async (req, res) => {
    try {
      const minorGrievances = await Grievance.find({ severity: "minor" });
      res.json(minorGrievances);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Controller function to retrieve grievances with severity as critical
  getCriticalGrievances: async (req, res) => {
    try {
      const criticalGrievances = await Grievance.find({ severity: "critical" });
      res.json(criticalGrievances);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Controller function to get all HR grievances
  getAllHRGrievances: async (req, res) => {
    try {
      const hrGrievances = await hrgrievances.find();
      res.json(hrGrievances);
    } catch (error) {
      console.error("Error fetching HR grievances:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Controller function to get all Manager grievances
  getAllManagerGrievances: async (req, res) => {
    try {
      const managerGrievances = await managergrievances.find();

      res.json(managerGrievances);
    } catch (error) {
      console.error("Error fetching Manager grievances:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Controller function to get all TL grievances
  getAllTLGrievances: async (req, res) => {
    try {
      const tlGrievances = await tlgrievances.find();
      console.log(tlGrievances);
      res.json(tlGrievances);
    } catch (error) {
      console.error("Error fetching TL grievances:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // developer grievance history
  getDevelopersGrievancesFromHistory: async (req, res) => {
    try {
      // Find all developer employees
      const developer = await Employee.find({ role: "developer" });

      // Initialize an array to store developer grievances based on grievance name
      let developerGrievances = [];

      // Loop through each developer
      developer.forEach((val) => {
        // Extract relevant information (name and grievance history) from each developer
        let devVal = {
          name: val.name,
          grievanceHistory: val.grievanceHistory,
        };

        // Push the extracted data into the array
        developerGrievances.push(devVal);
      });

      // Send the developer grievances as response
      res.status(200).json({
        grievanceHistory: developerGrievances,
        // Just a placeholder for additional data
      });
    } catch (error) {
      console.log(error);
      // If an error occurs, send an error response
      res.status(400).json({
        message: "something went wrong",
        status: "failed",
      });
    }
  },

  // tl grievance history
  getTlGrievancesFromHistory: async (req, res) => {
    try {
      // Find all team lead employees
      const teamLeads = await Employee.find({ role: "tl" });

      // Initialize an array to store TL grievances based on grievance name
      let tlGrievances = [];

      // Loop through each TL
      teamLeads.forEach((val) => {
        // Extract relevant information (name and grievance history) from each TL
        let tlData = {
          name: val.name,
          grievanceHistory: val.grievanceHistory,
        };

        // Push the extracted data into the array
        tlGrievances.push(tlData);
      });

      // Send the TL grievances as response
      res.status(200).json({
        grievanceHistory: tlGrievances,
        // Just a placeholder for additional data
      });
      console.log("");
    } catch (error) {
      console.log(error);
      // If an error occurs, send an error response
      res.status(400).json({
        message: "Something went wrong",
        status: "failed",
      });
    }
  },
  //manager grievance history
  getManagerGrievancesFromHistory: async (req, res) => {
    try {
      // Find all manager employees
      const managers = await Employee.find({ role: "manager" });

      // Initialize an array to store manager grievances based on grievance name
      let managerGrievances = [];

      // Loop through each manager
      managers.forEach((val) => {
        // Extract relevant information (name and grievance history) from each manager
        let managerData = {
          name: val.name,
          grievanceHistory: val.grievanceHistory,
        };

        // Push the extracted data into the array
        managerGrievances.push(managerData);
      });

      // Send the manager grievances as response
      res.status(200).json({
        grievanceHistory: managerGrievances,
        // Just a placeholder for additional data
      });
    } catch (error) {
      console.log(error);
      // If an error occurs, send an error response
      res.status(400).json({
        message: "Something went wrong",
        status: "failed",
      });
    }
  },

  // Controller function to retrieve all grievances
  getAllGrievances: async (req, res) => {
    try {
      const grievances = await Grievance.find();
      res.json(grievances);
    } catch (err) {
      res.status(500).json({
        error: "Internal server error",
      });
    }
  },

  // Controller function to retrieve a specific grievance by ID
  getGrievanceById: async (req, res) => {
    try {
      const { id } = req.params;
      const grievance = await Grievance.findById(id).populate("employeeId");
      if (!grievance) {
        return res.status(404).json({ error: "Grievance not found" });
      }
      res.json(grievance);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Controller function to update a grievance by ID
  updateGrievanceById: async (req, res) => {
    try {
      const { id } = req.params;
      const updateFields = req.body;
      const updatedGrievance = await Grievance.findByIdAndUpdate(
        id,
        updateFields,
        { new: true }
      );
      if (!updatedGrievance) {
        return res.status(404).json({ error: "Grievance not found" });
      }
      res.json({
        message: "Grievance updated successfully",
        grievance: updatedGrievance,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Controller function to delete a grievance by ID
  deleteGrievanceById: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedGrievance = await Grievance.findByIdAndDelete(id);
      if (!deletedGrievance) {
        return res.status(404).json({ error: "Grievance not found" });
      }
      res.json({ message: "Grievance deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // // Controller function to resolve a grievance by ID and notify the employee
  // resolveGrievanceById: async (req, res) => {
  //   try {
  //     const { id } = req.params;

  //     // Find and update the grievance status to 'Completed'
  //     const resolvedGrievance = await Grievance.findByIdAndUpdate(
  //       id,
  //       { status: "Completed" },
  //       { new: true }
  //     );
  //     if (!resolvedGrievance) {
  //       return res.status(404).json({ error: "Grievance not found" });
  //     }

  //     // Find the employee by ID
  //     const employee = await Employee.findById(resolvedGrievance.employeeId);
  //     if (!employee) {
  //       return res.status(404).json({ error: "Employee not found" });
  //     }

  //     // Update the employee's grievance history
  //     employee.grievanceHistory.push({
  //       grievanceId: resolvedGrievance._id,
  //       grievanceName: resolvedGrievance.description,
  //     });
  //     await employee.save();

  //     // Send notification email to the employee
  //     const mailOptions = {
  //       from: "gyaneshverma999@gmail.com",
  //       to: employee.email,
  //       subject: "Grievance Resolved",
  //       text: `Your grievance has been resolved:\n\n${resolvedGrievance.description}`,
  //     };
  //     await transporter.sendMail(mailOptions);
  //     console.log(
  //       `Notification sent to employee ${employee.email} for resolved grievance: ${resolvedGrievance._id}`
  //     );

  //     // Send response with updated grievance information
  //     res.json({
  //       message: "Grievance resolved successfully",
  //       grievance: resolvedGrievance,
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // },

  resolveGrievanceById: async (req, res) => {
    try {
      const { id } = req.params;
      // Define an array of database collections to search for the grievance
      const collections = [
        Grievance,
        hrgrievances,
        managergrievances,
        tlgrievances,
      ];

      let resolvedGrievance = null;
      // Iterate over each collection and attempt to update the grievance
      for (const collection of collections) {
        resolvedGrievance = await collection.findByIdAndUpdate(
          id,
          { status: "Completed" },
          { new: true }
        );
        if (resolvedGrievance) {
          break; // Break out of the loop if grievance is found in any collection
        }
      }

      // If grievance is not found in any collection, return 404
      if (!resolvedGrievance) {
        return res.status(404).json({ error: "Grievance not found" });
      }

      // Find the employee by ID
      const employee = await Employee.findById(resolvedGrievance.employeeId);
      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }

      // Update the employee's grievance history
      employee.grievanceHistory.push({
        grievanceId: resolvedGrievance._id,
        grievanceName: resolvedGrievance.description,
      });
      await employee.save();

      // Send notification email to the employee
      const mailOptions = {
        from: "gyaneshverma999@gmail.com",
        to: employee.email,
        subject: "Grievance Resolved",
        text: `Your grievance has been resolved:\n\n${resolvedGrievance.description}`,
      };
      await transporter.sendMail(mailOptions);
      console.log(
        `Notification sent to employee ${employee.email} for resolved grievance: ${resolvedGrievance._id}`
      );

      // Send response with updated grievance information
      res.json({
        message: "Grievance resolved successfully",
        grievance: resolvedGrievance,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = grievanceController; // Export grievanceController
