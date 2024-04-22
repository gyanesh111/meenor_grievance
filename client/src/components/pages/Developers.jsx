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
        sx={{ fontSize: "1.5rem", marginRight: "10px" }}
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
        }}
      >
        WELCOME DEV.
      </Typography>

      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button
          onClick={handleOpen} // Open the form directly on button click
          sx={{ fontSize: "1.5rem", marginRight: "10px" }}
        >
          Raise Grievance Form
        </Button>
        <Button
          onClick={() => setShowPersonal(true)}
          sx={{ fontSize: "1.5rem" }}
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
            sx={{ fontSize: "1.5rem", marginBottom: "10px" }}
          >
            Personal:
          </Typography>
          <Button
            onClick={handleFetchTotalGrievances}
            sx={{ fontSize: "1.5rem", marginBottom: "10px" }}
          >
            Total Grievances: {developerGrievances.length}
          </Button>
          <Button sx={{ fontSize: "1.5rem", marginBottom: "10px" }}>
            Under Processing: {developerGrievances.processing}
          </Button>
          <Button sx={{ fontSize: "1.5rem", marginBottom: "10px" }}>
            Resolved: {developerGrievances.resolved}
          </Button>
          <Button onClick={handleOpen} sx={{ fontSize: "1.5rem" }}>
            Raise Grievance Form
          </Button>
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Grievance ID</TableCell>
                <TableCell>Grievance Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {developerGrievances[0]?.grievanceHistory.map((grievance) => (
                <TableRow key={grievance._id}>
                  <TableCell>{grievance.grievanceId}</TableCell>
                  <TableCell>{grievance.grievanceName}</TableCell>
                  <TableCell>{grievance.grievanceStatus}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <AppBar
        position="sticky"
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
  );
};

export default DeveloperPage;
