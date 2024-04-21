import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";

const Header = () => (
  <Box
    sx={{
      position: "sticky",
      top: 0,
      zIndex: 1,
      backgroundColor: "#1976d2",
      padding: "10px 0",
      textAlign: "center",
    }}
  >
    <Typography variant="h1" sx={{ color: "#fff", fontSize: "2rem" }}>
      WELCOME MANAGER
    </Typography>
  </Box>
);

const Footer = () => (
  <Box
    sx={{
      position: "sticky",
      bottom: 0,
      zIndex: 1,
      backgroundColor: "#000",
      padding: "10px 0",
      textAlign: "center",
    }}
  >
    <Typography variant="body1" sx={{ color: "#fff" }}>
      © 2024 Grievance Portal. All Rights Reserved.
    </Typography>
  </Box>
);

// GrievanceForm component...
// ManagerPage component...

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
        // "http://localhost:8080/api/grievance/create",
        "http://localhost:8000/api/grievance/create",
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
  // const [totalGrievancesSolved, setTotalGrievancesSolved] = useState(0);
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
        // "http://localhost:8080/api/grievance/solved"
        "http://localhost:8000/api/grievance/solved"
      );
      setTotalGrievancesSolved(response.data.total);
    } catch (error) {
      console.error("Error fetching total grievances solved:", error);
    }
  };

  const fetchRecentGrievance = async () => {
    try {
      const response = await axios.get(
        // "http://localhost:8080/api/grievance/recent/manager"
        "http://localhost:8000/api/grievance/recent/manager"
      );
      setRecentGrievance(response.data);
    } catch (error) {
      console.error("Error fetching recent grievance:", error);
    }
  };

  const fetchManagerGrievances = async () => {
    try {
      const response = await axios.get(
        // "http://localhost:8080/api/grievance/manager"
        "http://localhost:8000/api/grievance/manager"
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
      <Header />
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button
          onClick={handlePersonalClick}
          variant={showPersonalData ? "contained" : "outlined"}
          sx={{ fontSize: "1.2rem", marginRight: "10px" }}
        >
          PERSONAL
        </Button>
        <Button
          onClick={handleOpen}
          variant="contained"
          color="primary"
          sx={{ fontSize: "1.2rem", marginRight: "10px" }}
        >
          RAISE GRIEVANCE
        </Button>
        <Button
          onClick={handleProfessionalClick}
          variant={showProfessionalData ? "contained" : "outlined"}
          sx={{ fontSize: "1.2rem" }}
        >
          PROFESSIONAL
        </Button>
      </Box>

      {showPersonalData && (
        <Box sx={{ width: "80%", margin: "auto", marginTop: "20px" }}>
          {/* HR Grievances Section */}
          <Typography
            variant="h3"
            sx={{ fontSize: "1.5rem", marginTop: "20px" }}
          >
            HR Grievances
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <Button
              onClick={handleTotalClick}
              variant="outlined"
              sx={{ fontSize: "1.2rem" }}
            >
              TOTAL
            </Button>
            <Button
              onClick={handleRecentClick}
              variant="outlined"
              sx={{ fontSize: "1.2rem" }}
            >
              RECENT
            </Button>
            <Button
              onClick={handleSolvedClick}
              variant="outlined"
              sx={{ fontSize: "1.2rem" }}
            >
              SOLVED
            </Button>
          </Box>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.2rem", marginTop: "10px" }}
          >
            Total grievances raised: {totalGrievances}
          </Typography>
          <Box sx={{ marginTop: "20px" }}>
            <Typography variant="h4" sx={{ fontSize: "1.3rem" }}>
              Manager Grievances List
            </Typography>
            <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
              {managerGrievances.map((grievance, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                  }}
                >
                  {grievance.description}
                </li>
              ))}
            </ul>
          </Box>
        </Box>
      )}

      {showProfessionalData && (
        <Box sx={{ width: "80%", margin: "auto", marginTop: "20px" }}>
          {/* Recent Manager Grievance Section */}
          <Typography
            variant="h3"
            sx={{ fontSize: "1.5rem", marginTop: "20px" }}
          >
            Recent Manager Grievance
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.2rem", marginTop: "10px" }}
          >
            {recentGrievance
              ? recentGrievance.description
              : "No recent grievance"}
          </Typography>
        </Box>
      )}

      {/* Modal for Grievance Form */}
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
      <Footer />
    </>
  );
};

export default ManagerPage;
