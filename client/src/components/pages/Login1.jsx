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
        "http://localhost:8080/api/employee/login",
        formData
      );
      console.log(response.data);
      alert("Logged in successfully");
      setFormData({ email: "", password: "" });
      setError("");
      const { role } = response.data;
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
    <div className="flex justify-center items-center min-h-screen bg-skyblue">
      <div className="text-white text-center">
        <h2 className="text-3xl">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-2xl mr-4">Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              className="text-2xl px-8 py-4 rounded-lg border-none mb-4"
              style={{ width: "400px" }}
            />
          </div>
          <div className="mb-4">
            <label className="text-2xl mr-4">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
              className="text-2xl px-8 py-4 rounded-lg border-none mb-4"
              style={{ width: "400px" }}
            />
          </div>
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <button
            type="submit"
            className="text-2xl bg-red-500 text-white border-none rounded-lg px-8 py-4 cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default GLogin;
