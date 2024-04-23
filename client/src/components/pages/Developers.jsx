import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Link as RouterLink } from "react-router-dom";
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
      role: formData.get("role"), // Set role as 'HR' for manager
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
      <select
        name="role"
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
        <option value="">Select Role</option>
        <option value="TL">Team Lead (TL)</option>
        <option value="MANAGER">Manager</option>
        <option value="HR">Human Resources (HR)</option>
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

const RaiseGrievance = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = () => {
    handleClose();
    onSubmit(); // Callback function to trigger parent component's logic
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{
          fontSize: "1.5rem",
          marginRight: "10px",
          backgroundColor: "#1976d2",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          "&:hover": {
            backgroundColor: "#135ca9",
          },
        }}
      >
        RAISE GRIEVANCE
      </Button>

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

const DeveloperPage = () => {
  const [grievanceStats, setGrievanceStats] = useState({
    total: 0,
    resolved: 0,
    processing: 0,
  });
  const [developerGrievances, setDeveloperGrievances] = useState([]);
  const [open, setOpen] = useState(false);
  const [showPersonal, setShowPersonal] = useState(false);
  const [showTable, setShowTable] = useState(false); // State to control table visibility

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFetchTotalGrievances = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/grievance/developerhistory"
      );
      // Extract grievance history array from response data
      const grievanceHistory = response.data.grievanceHistory;
      console.log(response.data);
      setDeveloperGrievances(grievanceHistory);
      setShowTable(true); // Show the table when grievances are fetched
    } catch (error) {
      console.error("Error fetching grievances:", error);
    }
  };

  useEffect(() => {
    const fetchGrievanceStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/grievance/status/employee"
        );
        setGrievanceStats(response.data);
      } catch (error) {
        console.error("Error fetching grievance stats:", error);
      }
    };

    fetchGrievanceStats();
  }, []);

  return (
    <div className="bg-blue-100 min-h-screen">
      <>
        <AppBar position="sticky" sx={{ backgroundColor: "#1976d2" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <RouterLink
                to="/"
                style={{ color: "white", textDecoration: "none" }}
              >
                Grievance Portal
              </RouterLink>
            </Typography>
          </Toolbar>
        </AppBar>
        <Typography
          variant="h1"
          sx={{
            fontSize: "2rem",
            textAlign: "center",
            backgroundColor: "#f0f0f0",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
          }}
        >
          WELCOME DEVELOPER
        </Typography>

        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <Button
            onClick={handleOpen}
            sx={{
              fontSize: "1.5rem",
              marginRight: "10px",
              backgroundColor: "#1976d2",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              "&:hover": {
                backgroundColor: "#135ca9",
              },
            }}
          >
            Raise Grievance
          </Button>

          <Button
            onClick={() => setShowPersonal(true)}
            sx={{
              fontSize: "1.5rem",
              backgroundColor: "#1976d2",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              "&:hover": {
                backgroundColor: "#135ca9",
              },
            }}
          >
            Personal
          </Button>
        </Box>

        {showPersonal && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: "1.5rem",
                marginBottom: "10px",
                fontWeight: "bold",
                color: "#333", // Adjust color as needed
              }}
            >
              Grievance History
            </Typography>

            <Button
              onClick={handleFetchTotalGrievances}
              sx={{ fontSize: "1.5rem", marginBottom: "10px", color: "blue" }}
            >
              Total Grievances
            </Button>

            {/* 
          <Button sx={{ fontSize: "1.5rem", marginBottom: "10px" }}>
            Under Processing: {developerGrievances.processing}
          </Button>
          <Button sx={{ fontSize: "1.5rem", marginBottom: "10px" }}>
            Resolved: {developerGrievances.resolved}
          </Button>
          */}
          </Box>
        )}

        {/* Modal for Grievance Form */}
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
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              maxWidth: "80%",
              minWidth: "400px",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Raise Grievance
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <GrievanceForm onSubmit={handleClose} />
            </Typography>
          </Box>
        </Modal>

        {/* Table to display grievances */}
        {showTable && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1976d2", color: "#fff" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Grievance ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Grievance Name
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {developerGrievances[0]?.grievanceHistory.map((grievance) => (
                  <TableRow key={grievance._id}>
                    <TableCell>
                      <Box bgcolor={grievance.idColor} p={1}>
                        {grievance.grievanceId}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box bgcolor={grievance.nameColor} p={1}>
                        {grievance.grievanceName}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <AppBar
          position="fixed"
          sx={{ top: "auto", bottom: 0, backgroundColor: "#000" }}
        >
          <Toolbar>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ flexGrow: 1, color: "#fff" }}
            >
              © 2024 Grievance Portal. All Rights Reserved.
            </Typography>
          </Toolbar>
        </AppBar>
      </>
    </div>
  );
};

export default DeveloperPage;
