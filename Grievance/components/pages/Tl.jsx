import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

// GrievanceForm component
const GrievanceForm = ({ onSubmit }) => {
  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const grievanceData = {
      name: formData.get("name"),
      email: formData.get("email"),
      department: formData.get("department"),
      severity: formData.get("severity"), // Include severity in the form data
      description: formData.get("description"),
    };
    try {
      // Make an API call to save the data
      const response = await axios.post(
        "http://localhost:8080/api/grievance/create",
        grievanceData
      );
      console.log(response.data);
      onSubmit(); // Trigger callback function after successful submission
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#f0f0f0",
        padding: "20px",
        borderRadius: "10px",
        width: "800px",
        margin: "auto",
      }}
    >
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

const TlPage = () => {
  const [open, setOpen] = useState(false);
  const [showGrievanceForm, setShowGrievanceForm] = useState(false);
  const [showPersonalGrievances, setShowPersonalGrievances] = useState(false);
  const [totalGrievances, setTotalGrievances] = useState(0);
  const [recentGrievances, setRecentGrievances] = useState([]);
  const [totalSolved, setTotalSolved] = useState(0);
  const [tlGrievances, setTlGrievances] = useState([]);
  const [showTable, setShowTable] = useState(false); // Add state for showing the table

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = () => {
    handleClose(); // Close the modal after successful form submission
    // You can perform additional actions here if needed
  };

  const fetchTotalGrievances = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/grievance/total"
      );
      setTotalGrievances(response.data.total);
    } catch (error) {
      console.error("Error fetching total grievances:", error);
    }
  };

  const fetchRecentGrievances = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/grievance/recent"
      );
      setRecentGrievances(response.data);
    } catch (error) {
      console.error("Error fetching recent grievances:", error);
    }
  };

  const fetchTotalSolved = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/grievance/solved"
      );
      setTotalSolved(response.data.total);
    } catch (error) {
      console.error("Error fetching total solved grievances:", error);
    }
  };

  const fetchTlGrievances = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/grievance/tlhistory"
      );
      setTlGrievances(response.data); // Update tlGrievances state with the TL grievances history
      setShowTable(true); // Show the table after fetching data
    } catch (error) {
      console.error("Error fetching TL grievances:", error);
    }
  };

  return (
    <>
      <Typography variant="h1" sx={{ fontSize: "2rem" }}>
        WELCOME TL
      </Typography>
      <div>
        <Button
          onClick={() => {
            setShowPersonalGrievances(true);
            fetchTotalGrievances(); // Fetch total grievances when button clicked
          }}
          sx={{ fontSize: "1.5rem" }}
        >
          TOTAL GRIEVANCES
        </Button>
        <Button
          onClick={() => {
            setShowPersonalGrievances(true);
            fetchRecentGrievances(); // Fetch recent grievances when button clicked
          }}
          sx={{ fontSize: "1.5rem" }}
        >
          RECENT GRIEVANCES
        </Button>
        <Button
          onClick={() => setShowGrievanceForm(true)}
          sx={{ fontSize: "1.5rem" }}
        >
          RAISE GRIEVANCE
        </Button>
        <Button onClick={() => fetchTlGrievances()} sx={{ fontSize: "1.5rem" }}>
          PROFESSIONAL
        </Button>
      </div>

      {showGrievanceForm && (
        <Box sx={{ width: "80%", margin: "auto", marginTop: "20px" }}>
          <Typography variant="h3" sx={{ fontSize: "1.5rem" }}>
            Recent Grievance
          </Typography>
          {/* Render the form here */}
          <GrievanceForm onSubmit={handleFormSubmit} />
        </Box>
      )}

      {showPersonalGrievances && (
        <Box sx={{ width: "80%", margin: "auto", marginTop: "20px" }}>
          <Typography variant="h3" sx={{ fontSize: "1.5rem" }}>
            Total Grievances
          </Typography>
          <Typography variant="body1">{totalGrievances}</Typography>
          <Typography variant="h3" sx={{ fontSize: "1.5rem" }}>
            Recent Grievances
          </Typography>
          {recentGrievances.map((grievance, index) => (
            <div
              key={index}
              style={{
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "red", // You can change color based on severity or any other criteria
                  marginRight: "5px",
                }}
              />
              <Typography variant="body1">{grievance.description}</Typography>
            </div>
          ))}
          <Typography variant="h3" sx={{ fontSize: "1.5rem" }}>
            Total Grievances Solved
          </Typography>
          <Typography variant="body1">{totalSolved}</Typography>
        </Box>
      )}

      {showTable && ( // Render the table if showTable is true
        <Box sx={{ width: "80%", margin: "auto", marginTop: "20px" }}>
          <Typography variant="h3" sx={{ fontSize: "1.5rem" }}>
            TL Grievances
          </Typography>
          {/* Table to display grievances */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Grievance ID</TableCell>
                  <TableCell>Grievance Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tlGrievances.map((grievance, index) => (
                  <TableRow key={index}>
                    <TableCell>{grievance._id}</TableCell>
                    <TableCell>{grievance.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
            {showGrievanceForm && <GrievanceForm onSubmit={handleFormSubmit} />}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default TlPage;
