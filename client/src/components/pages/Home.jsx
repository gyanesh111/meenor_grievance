import React from "react";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      {/* Header section */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-700 py-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h4 className="text-white font-bold text-xl">Grievance Portal</h4>
            <h4 className="text-white text-center"> QUGATES TECH. PVT LTD. </h4>
            <nav className="space-x-4">
              <RouterLink to="/Glogin" className="text-white text-lg">
                Login
              </RouterLink>
              <RouterLink to="/about" className="text-white text-lg">
                About
              </RouterLink>
              <RouterLink to="/contact" className="text-white text-lg">
                Contact
              </RouterLink>
            </nav>
          </div>
        </div>
      </header>

      {/* Content section */}
      <section className="container mx-auto mt-16 bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center p-8">
          <div>
            <h4 className="text-2xl font-bold mb-4">About Us</h4>
            <p className="text-lg mb-4">
              We are dedicated to resolving your grievances.
            </p>
          </div>
          <div>
            <h4 className="text-2xl font-bold mb-4"></h4>
            {/* Add Line chart here */}
          </div>
          <div>
            <h4 className="text-2xl font-bold mb-4">Contact Us</h4>
            <div>
              <p className="text-lg mb-4">
                If you have any queries, feel free to reach out to us:
              </p>
              <p className="text-lg mb-4">
                Email:{" "}
                <a href="mailto:hr@qugates.com" className="text-blue-500">
                  hr@qugates.com
                </a>
              </p>
              <p className="text-lg">Phone: +919019733006</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button className="text-lg bg-blue-500 text-white px-6 py-3 rounded-full">
              Login
            </button>
          </div>
        </div>
      </section>

      {/* Footer section */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <div className="container mx-auto">
          <div>
            <p className="text-lg mb-4">
              If you have any queries, feel free to reach out to us:
            </p>
            <p className="text-lg mb-4">
              Email:{" "}
              <a href="mailto:hr@qugates.com" className="text-blue-500">
                hr@qugates.com
              </a>
            </p>
            <p className="text-lg">Phone: +919019733006</p>
          </div>
          <p className="text-lg">
            &copy; 2024 Grievance Portal. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
