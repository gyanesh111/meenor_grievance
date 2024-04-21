import { useState } from "react";
import axios from "axios";

const GLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        // "http://localhost:8080/api/employee/login",
        "http://localhost:8000/api/employee/login",
        formData
      );
      console.log(response.data);
      alert("Logged in successfully"); // Display alert
      setFormData({ email: "", password: "" }); // Clear form fields
      setError(""); // Clear error message

      // Extract role from response data
      const { role } = response.data;

      // Redirect to respective pages based on the role
      if (role === "hr") {
        window.location.href = "/hr";
      } else if (role === "manager") {
        window.location.href = "/manager";
      } else if (role === "developer") {
        window.location.href = "/developer";
      } else {
        // Handle other roles or scenarios
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Something went wrong. Please try again later.");
      }
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "skyblue",
      }}
    >
      <div style={{ textAlign: "center", color: "#fff" }}>
        <h2 style={{ fontSize: "3rem" }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "2rem" }}>
            <label style={{ fontSize: "2rem", marginRight: "2rem" }}>
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              style={{
                fontSize: "2rem",
                padding: "1rem 2rem",
                borderRadius: "12px",
                border: "none",
                marginBottom: "2rem",
                width: "400px",
              }}
            />
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <label style={{ fontSize: "2rem", marginRight: "2rem" }}>
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
              style={{
                fontSize: "2rem",
                padding: "1rem 2rem",
                borderRadius: "12px",
                border: "none",
                marginBottom: "2rem",
                width: "400px",
              }}
            />
          </div>
          <div
            style={{ color: "red", fontSize: "1.6rem", marginBottom: "1rem" }}
          >
            {error}
          </div>
          {/* Style the button with red background and white text */}
          <button
            type="submit"
            style={{
              fontSize: "2rem",
              backgroundColor: "red",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "1rem 2rem",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default GLogin;
