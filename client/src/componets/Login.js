import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate, useLocation } from "react-router-dom";
import config from "../config";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const isSignup = location.pathname === "/signup"; // Check if on signup page

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    try {
      const res = await axios.post(`${config.BASE_URL}/api/users/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      return res.data;
    } catch (err) {
      console.error("Request failed:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await sendRequest(isSignup ? "signup" : "login");
    if (data) {
      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("token", data.token); // ✅ Save Token
      dispatch(authActions.login());
      navigate("/blogs");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f4f6f8">
      <Paper elevation={6} sx={{ p: 4, width: 400, borderRadius: 3 }}>
        <Typography variant="h4" textAlign="center" gutterBottom color="primary.main" fontWeight={600}>
          {isSignup ? "Sign Up" : "Login"}
        </Typography>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <TextField
              fullWidth
              name="name"
              onChange={handleChange}
              value={inputs.name}
              label="Name"
              variant="outlined"
              margin="normal"
            />
          )}
          <TextField
            fullWidth
            name="email"
            onChange={handleChange}
            value={inputs.email}
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            name="password"
            onChange={handleChange}
            value={inputs.password}
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }} color="primary">
            {isSignup ? "Sign Up" : "Login"}
          </Button>
          <Button
            onClick={() => navigate(isSignup ? "/login" : "/signup")}
            sx={{ mt: 2 }}
            fullWidth
            color="secondary"
          >
            {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
