// App.js or App.jsx
import { Routes, Route } from "react-router-dom"; // Change BrowserRouter to Router
import Home from "./components/pages/Home";
import GLogin from "./components/pages/Login";
import HRPage from "./components/pages/Hr";
import TlPage from "./components/pages/Tl";
import ManagerPage from "./components/pages/Manager";
import DeveloperPage from "./components/pages/Developers";

/**
 * Component defining routes for the Grievances Management System.
 * Uses React Router for routing.
 */

const GrievancesRoutes = () => {
  return (
    // Define routes using React Router's Routes component
    <Routes>
      {/* Route for the Home page */}
      <Route path="/" element={<Home />} />
      {/* Route for the Login page */}
      <Route path="/GLogin" element={<GLogin />} />
      {/* Route for the HR page, change the routes from anoither name from hr to something else name */}
      <Route path="/hr" element={<HRPage />} />
      {/* Route for the Team Leader (TL) page */}
      <Route path="/tl" element={<TlPage />} />
      {/* Route for the Manager page */}
      <Route path="/manager" element={<ManagerPage />} />
      {/* Route for the Developer page */}
      <Route path="/developer" element={<DeveloperPage />} />
      {/* Define other routes if needed */}
      {/* <Route path="/about" element={<AboutPage />} /> */}
      {/* <Route path="/contact" element={<ContactPage />} /> */}
    </Routes>
  );
};

export default GrievancesRoutes;
