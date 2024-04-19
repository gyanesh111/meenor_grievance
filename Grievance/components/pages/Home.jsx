import React from "react";
import {
  Typography,
  Container,
  AppBar,
  Toolbar,
  Link,
  Grid,
  Box,
  Button,
} from "@mui/material";
import { Line } from "react-chartjs-2"; // Import Line chart
import { Link as RouterLink } from "react-router-dom"; // Import Link from react-router-dom

const Home = () => {
  // Dummy data for the charts
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Resolved Grievances",
        data: [10, 20, 15, 25, 30, 20], // Placeholder values, replace with actual data
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 6,
      },
      {
        label: "Processing Grievances",
        data: [5, 10, 8, 15, 20, 12], // Placeholder values, replace with actual data
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 6,
      },
      {
        label: "Total Grievances",
        data: [2, 5, 4, 7, 10, 6], // Placeholder values, replace with actual data
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 6,
      },
    ],
  };

  return (
    <div>
      {/* Header section */}
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* Main heading */}
          <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
            Welcome to Grievance Portal
          </Typography>
          {/* Navigation menu */}
          <nav>
            {/* Use Link from react-router-dom for the login button */}
            <Link
              component={RouterLink}
              to="/login"
              color="inherit"
              sx={{ marginRight: 2, fontSize: "2.5rem" }}
            >
              Login
            </Link>
            <Link
              component={RouterLink}
              to="/about"
              color="inherit"
              sx={{ marginRight: 2, fontSize: "2.5rem" }}
            >
              About
            </Link>
            <Link
              component={RouterLink}
              to="/contact"
              color="inherit"
              sx={{ fontSize: "2.5rem" }}
            >
              Contact
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
      {/* Main content */}
      <Container maxWidth="md">
        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* About section */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h1" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "2rem" }}>
              Grievance Redressal System.
            </Typography>
          </Grid>
          {/* Charts section */}
          <Grid item xs={12} sm={6}>
            {/* Line chart for grievances */}
            <Typography variant="h1" gutterBottom>
              Grievance Status
            </Typography>
            <Box sx={{ width: "300%", height: "1000px" }}>
              {" "}
              {/* Adjust height here */}
              <Line data={data} />
            </Box>
          </Grid>
          {/* Contact section */}
          <Grid item xs={20} sm={10}>
            <Typography variant="h1" gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ fontSize: "2rem" }}>
              <Typography variant="body1" gutterBottom>
                If you have any queries, feel free to reach out to us:
              </Typography>
              <ul>
                <li>
                  Email: <a href="mailto:hr@qugates.com">hr@qugates.com</a>
                </li>
                <li>Phone: +919019733006</li>
              </ul>
            </Box>
          </Grid>
          {/* Button section */}
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              component={RouterLink}
              to="GLogin"
              color="primary"
              sx={{ fontSize: "2rem" }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Container>
      {/* Footer section */}
    </div>
  );
};

export default Home;
