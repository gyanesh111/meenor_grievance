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
        <option value="manager">Manager</option>
        <option value="tl">Team Lead</option>
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

const TlPage = () => {
  const [open, setOpen] = useState(false);
  const [showPersonalData, setShowPersonalData] = useState(false);
  const [showProfessionalData, setShowProfessionalData] = useState(false);
  const [totalGrievances, setTotalGrievances] = useState(0);
  const [totalGrievancesSolved, setTotalGrievancesSolved] = useState(0);
  const [recentGrievance, setRecentGrievance] = useState(null);
  const [tlGrievances, setTlGrievances] = useState([]);

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

  // Fetch total grievances solved
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

  // Fetch recent grievance
  const fetchRecentGrievance = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/grievance/recent/tl"
      );
      setRecentGrievance(response.data);
    } catch (error) {
      console.error("Error fetching recent grievance:", error);
    }
  };

  // Fetch TL grievances
  const fetchTlGrievances = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/grievance/tl"
      );
      setTlGrievances(response.data || []);
    } catch (error) {
      console.error("Error fetching TL grievances:", error);
    }
  };

  // Handle click events
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
    fetchTlGrievances();
  };

  const handleSolvedClick = async () => {
    fetchTotalGrievancesSolved();
  };

  // Fetch total grievances on initial render
  useEffect(() => {
    fetchTotalGrievancesSolved();
  }, []);

  return (
    <>
      <h1 className="text-2xl text-center mt-20">WELCOME TL</h1>
      <div className="flex justify-center mt-20">
        <button
          onClick={handlePersonalClick}
          className={`px-4 py-2 rounded ${
            showPersonalData
              ? "bg-blue-500 text-white"
              : "bg-white border-blue-500 border"
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
              : "bg-white border-blue-500 border"
          }`}
        >
          PROFESSIONAL
        </button>
      </div>

      {showPersonalData && (
        <div className="w-80 mx-auto mt-20">
          <h3 className="text-xl mt-4">TL Grievances</h3>
          <div className="flex justify-between mt-4">
            <button
              onClick={handleTotalClick}
              className="px-4 py-2 rounded border border-black-500 bg-blue-300"
            >
              TOTAL
            </button>

            <button
              onClick={handleSolvedClick}
              className="px-4 py-2 rounded border border-blue-500 bg-green-500 text-white"
            >
              SOLVED
            </button>
          </div>

          <div className="mt-8">
            <h4 className="text-lg">TL Grievances List</h4>
            <ol className="mb-4 border rounded border-gray-300 p-4">
              {tlGrievances.map((grievance, index) => (
                <li
                  key={index}
                  className={`mb-4 border rounded border-gray-300 p-4 ${
                    grievance.status !== "resolved" ? "bg-red-100" : ""
                  }`}
                >
                  {grievance.name} -- {grievance.description} --
                  <span
                    className={
                      grievance.status === "resolved"
                        ? "bg-green-500 text-white p-1 rounded"
                        : "text-red-600"
                    }
                  >
                    {grievance.status}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {showProfessionalData && (
        <div className="w-80 mx-auto mt-20">
          <h3 className="text-xl mt-4">Recent TL Grievance</h3>
          <p className="text-lg mt-4">
            {recentGrievance ? (
              <>
                <span>{recentGrievance.name} - </span>
                <span>{recentGrievance.description} - </span>
                <span
                  style={{
                    backgroundColor: "red",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "0.2rem",
                    color: "white",
                    border: "none",
                  }}
                >
                  {recentGrievance.status}
                </span>
              </>
            ) : (
              "No recent grievance"
            )}
          </p>
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
    </>
  );
};

export default TlPage;
