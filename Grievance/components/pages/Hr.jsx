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
      role: formData.get("role"),
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
      <input
        type="text"
        name="role"
        placeholder="Role"
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

const HrPage = () => {
  const [open, setOpen] = useState(false);
  const [showPersonalData, setShowPersonalData] = useState(false);
  const [showProfessionalData, setShowProfessionalData] = useState(false);
  const [totalGrievances, setTotalGrievances] = useState(0);
  const [totalGrievancesSolved, setTotalGrievancesSolved] = useState(0);
  const [recentGrievance, setRecentGrievance] = useState(null);
  const [hrGrievances, setHrGrievances] = useState([]); // State to store HR grievances

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
    // Fetch total grievances solved data
    try {
      // Placeholder axios call
      const response = await axios.get(
        "http://localhost:8080/api/grievance/solved"
      );
      setTotalGrievancesSolved(response.data.total);
    } catch (error) {
      console.error("Error fetching total grievances solved:", error);
    }
  };

  const fetchRecentGrievance = async () => {
    // Fetch recent grievance data
    try {
      const response = await axios.get(
        "http://localhost:8080/api/grievance/recent/hr"
      );
      setRecentGrievance(response.data);
    } catch (error) {
      console.error("Error fetching recent grievance:", error);
    }
  };

  const fetchHrGrievances = async () => {
    // Fetch all HR grievances
    try {
      const response = await axios.get(
        "http://localhost:8080/api/grievance/hr"
      );
      setHrGrievances(response.data); // Update state with HR grievances
    } catch (error) {
      console.error("Error fetching HR grievances:", error);
    }
  };

  const handlePersonalClick = async () => {
    setShowPersonalData(true);
    setShowProfessionalData(false);
    fetchTotalGrievancesSolved(); // Fetch total grievances solved data
    fetchHrGrievances(); // Fetch all HR grievances
  };

  const handleProfessionalClick = async () => {
    setShowPersonalData(false);
    setShowProfessionalData(true);
    fetchRecentGrievance(); // Fetch recent grievance data
  };

  useEffect(() => {
    // Fetch initial data
    fetchTotalGrievancesSolved();
  }, []);

  return (
    <>
      <Typography variant="h1" sx={{ fontSize: "2rem" }}>
        WELCOME HR
      </Typography>
      <div>
        <Button
          onClick={handleOpen}
          sx={{ fontSize: "1.5rem", marginRight: "10px" }}
        >
          RAISE GRIEVANCE
        </Button>
        <Button
          onClick={handlePersonalClick}
          sx={{ fontSize: "1.5rem", marginRight: "10px" }}
        >
          PERSONAL
        </Button>
        <Button
          onClick={handleProfessionalClick}
          sx={{ fontSize: "1.5rem", marginRight: "10px" }}
        >
          PROFESSIONAL
        </Button>
        {showPersonalData && (
          <Button onClick={fetchHrGrievances} sx={{ fontSize: "1.5rem" }}>
            TOTAL
          </Button>
        )}
      </div>

      {showPersonalData && (
        <Box sx={{ width: "80%", margin: "auto", marginTop: "20px" }}>
          <Typography variant="h3" sx={{ fontSize: "1.5rem" }}>
            Total Grievances
          </Typography>
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
            Total Grievances Solved
          </Typography>
          <Typography variant="body1">{totalGrievancesSolved}</Typography>
        </Box>
      )}

      {showProfessionalData && (
        <Box sx={{ width: "80%", margin: "auto", marginTop: "20px" }}>
          <Typography variant="h3" sx={{ fontSize: "1.5rem" }}>
            Recent Hr Grievance
          </Typography>
          <Typography variant="body1">
            {recentGrievance
              ? recentGrievance.description
              : "No recent grievance"}
          </Typography>
        </Box>
      )}

      {/* Display HR grievances in a list */}
      {hrGrievances.length > 0 && (
        <Box sx={{ width: "80%", margin: "auto", marginTop: "20px" }}>
          <Typography variant="h3" sx={{ fontSize: "1.5rem" }}>
            All HR Grievances
          </Typography>
          <ul>
            {hrGrievances.map((grievance) => (
              <li key={grievance._id}>{grievance.description}</li>
            ))}
          </ul>
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

export default HrPage;
