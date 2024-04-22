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
      role: "hr",
    };
    try {
      console.log(grievanceData);
      const response = await axios.post(
        "http://localhost:8080/api/grievance/create",
        grievanceData
      );
      console.log(response.data);
      onSubmit();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-200 p-8 rounded-lg w-96 mx-auto"
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="w-full h-14 mb-4 px-4 rounded border border-gray-300"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full h-14 mb-4 px-4 rounded border border-gray-300"
        required
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        className="w-full h-14 mb-4 px-4 rounded border border-gray-300"
        required
      />
      <select
        name="severity"
        className="w-full h-14 mb-4 px-4 rounded border border-gray-300"
        required
      >
        <option value="">Select Severity</option>
        <option value="minor">Minor</option>
        <option value="major">Major</option>
        <option value="critical">Critical</option>
      </select>
      <select
        name="role"
        className="w-full h-14 mb-4 px-4 rounded border border-gray-300"
        required
      >
        <option value="">Select role</option>
        <option value="minor">hr</option>
      </select>
      <textarea
        name="description"
        placeholder="Description"
        className="w-full h-40 mb-4 px-4 rounded border border-gray-300"
        required
      />
      <Button
        type="submit"
        variant="contained"
        className="bg-blue-600 text-white px-8 py-3 rounded"
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
  const [recentGrievance, setRecentGrievance] = useState(null);
  const [managerGrievances, setManagerGrievances] = useState([]);
  const [showResolveOptions, setShowResolveOptions] = useState(false);

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

  const fetchTotalGrievances = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/grievance/solved"
      );
      setTotalGrievances(response.data.total);
    } catch (error) {
      console.error("Error fetching total grievances:", error);
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

  const handlePersonalClick = () => {
    setShowPersonalData(true);
    setShowProfessionalData(false);
    fetchTotalGrievances();
  };

  const handleProfessionalClick = () => {
    setShowPersonalData(false);
    setShowProfessionalData(true);
    fetchRecentGrievance();
  };

  const handleTotalClick = () => {
    fetchManagerGrievances();
  };

  const handleRecentClick = () => {
    fetchRecentGrievance();
  };

  const handleResolveButtonClick = () => {
    setShowResolveOptions(true);
  };

  const handleMeetingButtonClick = async () => {
    try {
      // Make API call to update the status of the grievance to "completed"
      await axios.put("http://localhost:8080/api/grievance/resolve");
      // Optionally, you can add logic to handle success or display a message
      console.log("Grievance resolved successfully");
      // After resolving the grievance, fetch the recent grievance again to update the UI
      fetchRecentGrievance();
    } catch (error) {
      console.error("Error resolving grievance:", error);
      // Optionally, you can add logic to handle errors or display an error message
    }
  };

  const handleCallButtonClick = async () => {
    try {
      // Make API call to update the status of the grievance to "completed"
      await axios.put("http://localhost:8080/api/grievance/resolve");
      // Optionally, you can add logic to handle success or display a message
      console.log("Grievance resolved successfully");
      // After resolving the grievance, fetch the recent grievance again to update the UI
      fetchRecentGrievance();
    } catch (error) {
      console.error("Error resolving grievance:", error);
      // Optionally, you can add logic to handle errors or display an error message
    }
  };

  useEffect(() => {
    fetchTotalGrievances();
  }, []);

  return (
    <>
      <Header />
      <Box className="flex justify-center mt-8">
        <Button
          onClick={handlePersonalClick}
          variant={showPersonalData ? "contained" : "outlined"}
          className="text-lg mr-4"
        >
          PERSONAL
        </Button>
        <Button
          onClick={handleOpen}
          variant="contained"
          color="primary"
          className="text-lg mr-4"
        >
          RAISE GRIEVANCE
        </Button>
        <Button
          onClick={handleProfessionalClick}
          variant={showProfessionalData ? "contained" : "outlined"}
          className="text-lg"
        >
          PROFESSIONAL
        </Button>
      </Box>

      {showPersonalData && (
        <Box className="w-80 mx-auto mt-8">
          <Typography variant="h3" className="text-lg mt-8">
            HR Grievances
          </Typography>
          <Box className="flex justify-between mt-4">
            <Button onClick={handleTotalClick} className="text-lg">
              TOTAL
            </Button>
            <Button onClick={handleRecentClick} className="text-lg">
              RECENT
            </Button>
          </Box>
          <Typography variant="body1" className="text-lg mt-4">
            Total grievances raised: {totalGrievances}
          </Typography>
          <Box className="mt-8">
            <Typography variant="h4" className="text-lg">
              Manager Grievances List
            </Typography>
            <ul className="list-none pl-0">
              {managerGrievances.map((grievance, index) => (
                <li
                  key={index}
                  className={`mb-4 border rounded border-gray-300 p-4 ${
                    grievance.status === "resolved"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {grievance.name} - - {grievance.description} --{" "}
                  <span
                    className={
                      grievance.status === "resolved"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {grievance.status}
                  </span>
                </li>
              ))}
            </ul>
          </Box>
        </Box>
      )}

      {showProfessionalData && (
        <Box className="w-80 mx-auto mt-8">
          <Typography variant="h5" className="text-lg mt-8">
            Recent Manager Grievance
          </Typography>
          <Typography>
            {`${recentGrievance.name} - ${recentGrievance.description}- ${recentGrievance.status}`}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="mt-8"
            onClick={handleResolveButtonClick}
          >
            RESOLVE
          </Button>
          {showResolveOptions && (
            <Box className="mt-4">
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="mr-4"
                onClick={handleMeetingButtonClick}
              >
                FIX MEETING
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleCallButtonClick}
              >
                CALL
              </Button>
            </Box>
          )}
        </Box>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg p-8 rounded">
          <Typography id="modal-title" variant="h6" component="h2">
            Raise Grievance
          </Typography>
          <Typography id="modal-description" className="mt-4">
            <GrievanceForm onSubmit={handleFormSubmit} />
          </Typography>
        </Box>
      </Modal>
      <Footer />
    </>
  );
};

export default ManagerPage;
