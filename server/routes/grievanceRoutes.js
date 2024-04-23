const express = require("express");
const router = express.Router();
const grievanceController = require("../controllers/grievanceController");

// Create a new grievance
router.post("/create", grievanceController.createGrievance);

// Get all grievances
router.get("/all", grievanceController.getAllGrievances);

// Get all major grievances
router.get("/major", grievanceController.getMajorGrievances);

// Get all minor grievances
router.get("/minor", grievanceController.getMinorGrievances);

// Get all critical grievances
router.get("/critical", grievanceController.getCriticalGrievances);

// Get all HR grievances
router.get("/hr", grievanceController.getAllHRGrievances);

// Get all Manager grievances
router.get("/manager", grievanceController.getAllManagerGrievances);

// Get all TL grievances
router.get("/tl", grievanceController.getAllTLGrievances);

// Get grievances raised by developers
router.get(
  "/developerhistory",
  grievanceController.getDevelopersGrievancesFromHistory
);

//tl grievances history
router.get("/tlhistory", grievanceController.getTlGrievancesFromHistory);

router.get(
  "/managerhistory",
  grievanceController.getManagerGrievancesFromHistory
);
// Get the most recently added grievance for TL
router.get("/recent/tl", grievanceController.getRecentTlGrievance);

// Get the most recently added grievance for Manager
router.get("/recent/manager", grievanceController.getRecentManagerGrievance);

// Get the most recently added grievance for HR
router.get("/recent/hr", grievanceController.getRecentHrGrievance);

// Get grievances by status for HR
router.get("/status/hr", grievanceController.getHRGrievancesByStatus);

// Get grievances by status for Manager
router.get("/status/manager", grievanceController.getManagerGrievancesByStatus);

// Get grievances by status for TL
router.get("/status/tl", grievanceController.getTLGrievancesByStatus);

// Get a single grievance by ID
router.get("/:id", grievanceController.getGrievanceById);

// Get grievances by status for Employee
router.get(
  "/status/employee",
  grievanceController.getEmployeeGrievancesByStatus
);

// Get grievances raised by managers
// router.get(
//   "/managerhistory",
//   grievanceController.getManagerGrievancesFromHistory
// );

// // Update a grievance by ID
// router.put("/:id", grievanceController.updateGrievanceById);

// Resolve a grievance by ID
router.put("/resolve/:id", grievanceController.resolveGrievanceById);

// Delete a grievance by ID
router.delete("/delete/:id", grievanceController.deleteGrievanceById);

module.exports = router;
