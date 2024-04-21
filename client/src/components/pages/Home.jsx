import React from "react";
import {
  Typography,
  Container,
  AppBar,
  Toolbar,
  Grid,
  Box,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
  // Dummy data for the charts
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Resolved Grievances",
        data: [10, 20, 15, 25, 30, 20],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 3,
      },
      {
        label: "Processing Grievances",
        data: [5, 10, 8, 15, 20, 12],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 3,
      },
      {
        label: "Total Grievances",
        data: [2, 5, 4, 7, 10, 6],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 3,
      },
    ],
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f0f0" }}>
      {/* Header section */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Grievance Portal
          </Typography>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Your Nicely Written Logo
          </Typography>
          <nav>
            <RouterLink
              to="/login"
              color="inherit"
              sx={{ marginRight: 2, fontSize: "1.2rem" }}
            >
              Login
            </RouterLink>
            <RouterLink
              to="/about"
              color="inherit"
              sx={{ marginRight: 2, fontSize: "1.2rem" }}
            >
              About
            </RouterLink>
            <RouterLink
              to="/contact"
              color="inherit"
              sx={{ fontSize: "1.2rem" }}
            >
              Contact
            </RouterLink>
          </nav>
        </Toolbar>
      </AppBar>

      {/* Content section */}
      <Container
        maxWidth="md"
        sx={{ marginTop: 4, flexGrow: 1, backgroundColor: "#ffffff" }}
      >
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body1" gutterBottom>
              We are dedicated to resolving your grievances.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" gutterBottom>
              Grievance Status
            </Typography>
            {/* Add Line chart here */}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" gutterBottom>
              Contact Us
            </Typography>
            <Box>
              <Typography variant="body1" gutterBottom>
                If you have any queries, feel free to reach out to us:
              </Typography>
              <Typography variant="body1" gutterBottom>
                Email: <a href="mailto:hr@qugates.com">hr@qugates.com</a>
              </Typography>
              <Typography variant="body1">Phone: +919019733006</Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              component={RouterLink}
              to="/Glogin"
              color="primary"
              sx={{ fontSize: "1.2rem" }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* Footer section */}
      <footer
        style={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "20px 0",
          textAlign: "center",
        }}
      >
        <Box>
          <Typography variant="body1" gutterBottom>
            If you have any queries, feel free to reach out to us:
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: <a href="mailto:hr@qugates.com">hr@qugates.com</a>
          </Typography>
          <Typography variant="body1">Phone: +919019733006</Typography>
        </Box>
        <Typography variant="body1" gutterBottom>
          © 2024 Grievance Portal. All Rights Reserved.
        </Typography>
      </footer>
    </div>
  );
};

export default Home;
