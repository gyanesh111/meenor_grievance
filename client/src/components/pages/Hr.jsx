import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

const HrPage = () => {
  const [open, setOpen] = useState(false);
  const [showPersonalData, setShowPersonalData] = useState(false);
  const [showProfessionalData, setShowProfessionalData] = useState(false);
  const [totalGrievances, setTotalGrievances] = useState(0);
  const [totalGrievancesSolved, setTotalGrievancesSolved] = useState(0);
  const [recentGrievance, setRecentGrievance] = useState(null);
  const [hrGrievances, setHrGrievances] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const fetchTotalGrievancesSolved = async () => {
    try {
      const response = await axios.get(
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
        "http://localhost:8000/api/grievance/recent/hr"
      );
      setRecentGrievance(response.data);
    } catch (error) {
      console.error("Error fetching recent grievance:", error);
    }
  };

  const fetchHrGrievances = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/grievance/hr"
      );
      setHrGrievances(response.data);
    } catch (error) {
      console.error("Error fetching HR grievances:", error);
    }
  };

  const handlePersonalClick = async () => {
    setShowPersonalData(true);
    setShowProfessionalData(false);
    // Resetting the state to hide the data
    setTotalGrievances(0);
    setHrGrievances([]);
  };

  const handleProfessionalClick = async () => {
    setShowPersonalData(false);
    setShowProfessionalData(true);
    fetchRecentGrievance();
  };

  useEffect(() => {
    fetchTotalGrievancesSolved();
  }, []);

  const handleResolve = async () => {
    try {
      if (recentGrievance) {
        // Make a PUT request to update the grievance status to 'Completed'
        const response = await axios.put(
          `http://localhost:8000/api/grievance/${recentGrievance._id}/resolve`
        );
        console.log("Grievance resolved:", response.data);
        // Update the recent grievance status locally
        setRecentGrievance({ ...recentGrievance, status: "Completed" });
      }
    } catch (error) {
      console.error("Error resolving grievance:", error);
    }
  };

  const handleFetchTotalHRGrievances = async () => {
    try {
      fetchHrGrievances();
    } catch (error) {
      console.error("Error fetching total HR grievances:", error);
    }
  };

  const handleFetchTotalGrievances = async () => {
    try {
      await fetchHrGrievances();
      setTotalGrievances(hrGrievances.length);
    } catch (error) {
      console.error("Error fetching total grievances:", error);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <RouterLink
                to="/"
                style={{ textDecoration: "none", color: "white" }}
              >
                Grievance Portal
              </RouterLink>
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              Your Nicely Written Logo
            </Typography>
            <nav>
              <RouterLink
                to="/login"
                color="inherit"
                style={{ marginRight: 20 }}
              >
                Login
              </RouterLink>
              <RouterLink
                to="/about"
                color="inherit"
                style={{ marginRight: 20 }}
              >
                About
              </RouterLink>
              <RouterLink to="/contact" color="inherit">
                Contact
              </RouterLink>
            </nav>
          </Toolbar>
        </AppBar>
      </Box>

      <Typography variant="h4" align="center" sx={{ marginTop: "2rem" }}>
        HR Dashboard
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Button
          variant="contained"
          onClick={handlePersonalClick}
          sx={{ marginRight: "1rem" }}
        >
          Personal
        </Button>
        <Button variant="contained" onClick={handleProfessionalClick}>
          Professional
        </Button>
      </Box>
      {showPersonalData && (
        <Box sx={{ marginTop: "2rem", textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={handleFetchTotalGrievances}
            sx={{ marginRight: "1rem" }}
          >
            Total Grievances
          </Button>
          <Button variant="contained" onClick={fetchRecentGrievance}>
            Recent Grievance
          </Button>
          <Typography variant="h6">
            Total Grievances Solved: {totalGrievancesSolved}
          </Typography>
          {totalGrievances > 0 && (
            <Box sx={{ marginTop: "1rem", textAlign: "left" }}>
              <Typography variant="h6">Total HR Grievances:</Typography>
              <ul>
                {hrGrievances.map((grievance) => (
                  <li key={grievance._id}>{grievance.description}</li>
                ))}
              </ul>
            </Box>
          )}
        </Box>
      )}
      {showProfessionalData && (
        <Box sx={{ marginTop: "2rem", textAlign: "center" }}>
          {recentGrievance && (
            <>
              <Typography variant="h6">Recent Grievance:</Typography>
              <Typography>{recentGrievance.description}</Typography>
              {recentGrievance.status !== "Completed" && (
                <Button
                  variant="contained"
                  onClick={handleResolve}
                  sx={{ marginTop: "1rem" }}
                >
                  Resolve
                </Button>
              )}
            </>
          )}
          {!recentGrievance && (
            <Typography variant="body1">No recent grievance found.</Typography>
          )}
        </Box>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* No Grievance Form here */}
        </Box>
      </Modal>

      <Box sx={{ flexGrow: 1 }}>
        <footer
          style={{
            backgroundColor: "#333",
            color: "#fff",
            padding: "20px 0",
            textAlign: "center",
          }}
        >
          <Typography variant="body1" gutterBottom>
            © 2024 Grievance Portal. All Rights Reserved.
          </Typography>
        </footer>
      </Box>
    </>
  );
};

export default HrPage;
