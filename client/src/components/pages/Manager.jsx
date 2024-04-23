import { useState, useEffect } from "react";
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
      role: "hr", // Set role as 'HR' for manager
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
    <form onSubmit={handleSubmit} className="bg-gray-200 p-8 rounded-lg w-full">
      {/* Input fields */}
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="w-full h-12 mb-4 px-4 rounded border border-gray-300"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full h-12 mb-4 px-4 rounded border border-gray-300"
        required
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        className="w-full h-12 mb-4 px-4 rounded border border-gray-300"
        required
      />
      <select
        name="severity"
        className="w-full h-12 mb-4 px-4 rounded border border-gray-300"
        required
      >
        <option value="">Select Severity</option>
        <option value="minor">Minor</option>
        <option value="major">Major</option>
        <option value="critical">Critical</option>
      </select>
      <select
        name="role"
        className="w-full h-12 mb-4 px-4 rounded border border-gray-300"
        required
      >
        <option value="">Select Role</option>
        <option value="hr">hr</option>
      </select>
      <textarea
        name="description"
        placeholder="Description"
        className="w-full h-32 mb-4 px-4 rounded border border-gray-300"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
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
  // Open modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
  };

  // Callback after form submission
  const handleFormSubmit = () => {
    handleClose();
    setTotalGrievances(totalGrievances + 1);
  };

  // Placeholder function for handling resolve button click
  const handleResolve = async (_id) => {
    try {
      // Assuming recentGrievance has an _id property
      const response = await axios.put(
        `http://localhost:8080/api/grievance/resolve/${_id}`
      );
      // Assuming the API returns the updated grievance data
      setRecentGrievance(response.data);
    } catch (error) {
      console.error("Error resolving grievance:", error);
    }
  };

  // // Fetch total grievances solved
  // const fetchTotalGrievancesSolved = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:8080/api/grievance/solved"
  //     );
  //     setTotalGrievancesSolved(response.data.total);
  //   } catch (error) {
  //     console.error("Error fetching total grievances solved:", error);
  //   }
  // };

  // Fetch recent grievance
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

  // Fetch manager grievances
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

  // Handle click events
  const handlePersonalClick = async () => {
    setShowPersonalData(true);
    setShowProfessionalData(false);
  };

  const handleProfessionalClick = async () => {
    setShowPersonalData(false);
    setShowProfessionalData(true);
    fetchRecentGrievance();
  };

  const handleTotalClick = async () => {
    fetchManagerGrievances();
  };

  const handleSolvedClick = async () => {
    // fetchTotalGrievancesSolved();
  };

  // Fetch total grievances on initial render
  useEffect(() => {
    // fetchTotalGrievancesSolved();
  }, []);

  return (
    <div className="bg-blue-100 min-h-screen">
      <>
        <h1 className="text-3xl text-center mt-10 font-bold text-gray-800">
          WELCOME MANAGER
        </h1>
        <div className="flex justify-center mt-20">
          <button
            onClick={handlePersonalClick}
            className={`px-4 py-2 rounded ${
              showPersonalData
                ? "bg-blue-500 text-white"
                : "bg-blue-200 text-blue-800"
            } mr-4`}
          >
            PERSONAL
          </button>

          <button
            onClick={handleOpen}
            className="px-4 py-2 rounded bg-blue-500 text-white mr-4"
          >
            RAISE GRIEVANCE
          </button>
          <button
            onClick={handleProfessionalClick}
            className={`px-4 py-2 rounded ${
              showProfessionalData
                ? "bg-blue-500 text-white"
                : "bg-blue-200 text-blue-800"
            }`}
          >
            PROFESSIONAL
          </button>
        </div>

        {showPersonalData && (
          <div className="w-80 mx-auto mt-20">
            <h3 className="text-xl mt-4">Manager Grievances</h3>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleTotalClick}
                className="px-4 py-2 rounded border border-black-500 bg-blue-300"
              >
                TOTAL
              </button>
            </div>

            <div className="mt-8">
              <h4 className="text-lg">Manager Grievances List</h4>
              <ol
                className="mb-4 border rounded border-gray-300 p-4"
                style={{ width: "100%" }}
              >
                {managerGrievances.map((grievance, index) => (
                  <li
                    key={index}
                    className={`mb-4 border rounded border-gray-300 p-4 ${
                      grievance.status !== "resolved" ? "bg-red-100" : ""
                    }`}
                    style={{ width: "100%" }}
                  >
                    {grievance.name} -- {grievance.description} --{" "}
                    {grievance.date} -- {grievance.time} --{" "}
                    {grievance.status !== "resolved" && (
                      <span
                        className={
                          grievance.status === "processing"
                            ? "bg-red-500 text-white p-1 rounded cursor-pointer"
                            : "bg-green-600 text-white p-1 rounded cursor-pointer"
                        }
                        onClick={() => {
                          handleResolve(grievance._id);
                          alert(
                            "Your grievance has been resolved successfully."
                          );
                        }}
                      >
                        {grievance.status}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {showProfessionalData && (
          <div className="w-80 mx-auto mt-20">
            <h3 className="text-xl mt-4">Recent Manager Grievance</h3>
            <div className="flex items-center mt-4">
              {recentGrievance ? (
                <>
                  <span className="mr-2">{recentGrievance.name} - </span>
                  <span className="mr-2">{recentGrievance.description} - </span>
                  <span
                    style={{
                      backgroundColor: "red",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "0.2rem",
                      color: "white",
                      border: "none",
                    }}
                    className="mr-2"
                  >
                    {recentGrievance.status}
                  </span>
                  {/* Resolve Button */}
                  {recentGrievance.status !== "resolved" && (
                    <button
                      className="bg-green-500 text-white py-1 px-2 rounded"
                      onClick={() => {
                        handleResolve(recentGrievance._id);
                        alert("Your grievance has been resolved successfully.");
                      }}
                    >
                      Resolve
                    </button>
                  )}
                </>
              ) : (
                "No recent grievance"
              )}
            </div>
          </div>
        )}

        {/* Modal for Grievance Form */}
        {open && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div className="bg-white rounded-lg p-8 w-80">
              <h2 className="text-lg mb-4">Raise Grievance</h2>
              <GrievanceForm onSubmit={handleFormSubmit} />
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="fixed bottom-0 left-0 w-full bg-black text-white text-center py-4">
          © 2024 QuGates Grievance Portal. All Rights Reserved.
        </footer>
      </>
    </div>
  );
};

export default ManagerPage;
