import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";

// GrievanceForm component
const GrievanceForm = ({ onSubmit }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const grievanceData = {
      name: formData.get("name"),
      email: formData.get("email"),
      department: formData.get("department"),
      severity: formData.get("severity"),
      description: formData.get("description"),
      role: "HR", // Set role as 'HR' for manager
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/api/grievance/create",
        grievanceData
      );
      console.log(response.data);
      onSubmit(); // Trigger callback function after successful submission
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#f0f0f0",
        padding: "20px",
        borderRadius: "10px",
        width: "800px",
        margin: "auto",
      }}
    >
      {/* Input fields */}
      <input
        type="text"
        name="name"
        placeholder="Name"
        style={{
          width: "100%",
          height: "50px",
          marginBottom: "10px",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "1.5rem",
        }}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        style={{
          width: "100%",
          height: "50px",
          marginBottom: "10px",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "1.5rem",
        }}
        required
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        style={{
          width: "100%",
          height: "50px",
          marginBottom: "10px",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "1.5rem",
        }}
        required
      />
      <select
        name="severity"
        style={{
          width: "100%",
          height: "50px",
          marginBottom: "10px",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "1.5rem",
        }}
        required
      >
        <option value="">Select Severity</option>
        <option value="minor">Minor</option>
        <option value="major">Major</option>
        <option value="critical">Critical</option>
      </select>
      <textarea
        name="description"
        placeholder="Description"
        style={{
          width: "100%",
          height: "200px",
          marginBottom: "10px",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "1.5rem",
        }}
        required
      />
      <Button
        type="submit"
        variant="contained"
        style={{
          backgroundColor: "#1976d2",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          fontSize: "1.5rem",
        }}
      >
        Submit
      </Button>
    </form>
  );
};

const ManagerPage = () => {
  const [open, setOpen] = useState(false);
  const [showPersonalData, setShowPersonalData] = useState(false);
  const [showProfessionalData, setShowProfessionalData] = useState(false);
  const [totalGrievances, setTotalGrievances] = useState(0);
  const [totalGrievancesSolved, setTotalGrievancesSolved] = useState(0);
  const [recentGrievance, setRecentGrievance] = useState(null);
  const [managerGrievances, setManagerGrievances] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = () => {
    handleClose();
    setTotalGrievances(totalGrievances + 1);
  };

  const fetchTotalGrievancesSolved = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/grievance/solved"
      );
      setTotalGrievancesSolved(response.data.total);
    } catch (error) {
      console.error("Error fetching total grievances solved:", error);
    }
  };

  const fetchRecentGrievance = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/grievance/recent/manager"
      );
      setRecentGrievance(response.data);
    } catch (error) {
      console.error("Error fetching recent grievance:", error);
    }
  };

  const fetchManagerGrievances = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/grievance/manager"
      );
      setManagerGrievances(response.data || []);
    } catch (error) {
      console.error("Error fetching manager grievances:", error);
    }
  };

  const handlePersonalClick = async () => {
    setShowPersonalData(true);
    setShowProfessionalData(false);
    fetchTotalGrievancesSolved();
  };

  const handleProfessionalClick = async () => {
    setShowPersonalData(false);
    setShowProfessionalData(true);
    fetchRecentGrievance();
  };

  const handleTotalClick = async () => {
    fetchManagerGrievances();
  };

  const handleRecentClick = async () => {
    fetchRecentGrievance();
  };

  const handleSolvedClick = async () => {
    fetchTotalGrievancesSolved();
  };

  useEffect(() => {
    fetchTotalGrievancesSolved();
  }, []);

  return (
    <>
      <Typography variant="h1" sx={{ fontSize: "2rem" }}>
        WELCOME MANAGER
      </Typography>
      <div>
        <Button
          onClick={handlePersonalClick}
          sx={{ fontSize: "1.5rem", marginRight: "10px" }}
        >
          PERSONAL
        </Button>
        <Button
          onClick={handleOpen}
          sx={{ fontSize: "1.5rem", marginRight: "10px" }}
        >
          RAISE GRIEVANCE
        </Button>
        <Button onClick={handleProfessionalClick} sx={{ fontSize: "1.5rem" }}>
          PROFESSIONAL
        </Button>
      </div>

      {showPersonalData && (
        <Box sx={{ width: "80%", margin: "auto", marginTop: "20px" }}>
          <Typography variant="h3" sx={{ fontSize: "1.5rem" }}>
            HR Grievances
          </Typography>
          <Button
            onClick={handleTotalClick}
            sx={{ fontSize: "1.5rem", marginRight: "10px", marginTop: "10px" }}
          >
            TOTAL
          </Button>
          <Button
            onClick={handleRecentClick}
            sx={{ fontSize: "1.5rem", marginRight: "10px", marginTop: "10px" }}
          >
            RECENT
          </Button>
          <Button
            onClick={handleSolvedClick}
            sx={{ fontSize: "1.5rem", marginRight: "10px", marginTop: "10px" }}
          >
            SOLVED
          </Button>
          <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>
            Total grievances raised: {totalGrievances}
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontSize: "1.5rem", marginTop: "20px" }}
          >
            Recent Grievance
          </Typography>
          <Typography variant="body1">
            {recentGrievance
              ? recentGrievance.description
              : "No recent grievance"}
          </Typography>

          <Typography
            variant="h3"
            sx={{ fontSize: "1.5rem", marginTop: "20px" }}
          >
            Manager Grievances List
          </Typography>
          <ul>
            {managerGrievances.map((grievance, index) => (
              <li key={index}>{grievance.description}</li>
            ))}
          </ul>
        </Box>
      )}

      {showProfessionalData && (
        <Box sx={{ width: "80%", margin: "auto", marginTop: "20px" }}>
          <Typography variant="h3" sx={{ fontSize: "1.5rem" }}>
            Recent Manager Grievance
          </Typography>
          <Typography variant="body1">
            {recentGrievance
              ? recentGrievance.description
              : "No recent grievance"}
          </Typography>
        </Box>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: "80%",
            minWidth: "400px",
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Raise Grievance
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            <GrievanceForm onSubmit={handleFormSubmit} />
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default ManagerPage;
