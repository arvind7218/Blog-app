import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions, setDarkmode } from "../store";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { lightTheme, darkTheme } from "../utils/theme";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isDark = useSelector((state) => state.theme.isDarkmode);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const theme = isDark ? darkTheme : lightTheme;
  const [value, setValue] = useState(null);

  // Set the correct tab based on the route
  useEffect(() => {
    if (location.pathname === "/signup") {
      setValue(1);
    } else if (location.pathname === "/login") {
      setValue(0);
    } else {
      setValue(null); // No tab active for non-auth pages
    }
  }, [location]);

  return (
    <AppBar position="sticky" sx={{ background: theme.bg, boxShadow: 3 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" fontWeight={600} color="inherit">
          BlogsApp
        </Typography>
        {isLoggedIn && (
          <Tabs
            textColor="inherit"
            value={value}
            onChange={(e, val) => setValue(val)}
            indicatorColor="secondary"
          >
            <Tab component={Link} to="/blogs" label="All Blogs" />
            <Tab component={Link} to="/myBlogs" label="My Blogs" />
            <Tab component={Link} to="/blogs/add" label="Add Blog" />
          </Tabs>
        )}
        <Box display="flex" alignItems="center">
          {!isLoggedIn ? (
            <>
              <Button
                onClick={() => navigate("/login")}
                sx={{ mx: 1, fontWeight: "bold", borderRadius: 2 }}
                color="primary"
                variant={value === 0 ? "contained" : "outlined"}
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                sx={{ mx: 1, fontWeight: "bold", borderRadius: 2 }}
                color="secondary"
                variant={value === 1 ? "contained" : "outlined"}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <Button
              onClick={() => {
                dispatch(authActions.logout());
                navigate("/login");
              }}
              sx={{ mx: 1, borderRadius: 2 }}
              color="warning"
              variant="contained"
            >
              Logout
            </Button>
          )}
          <IconButton
            onClick={() => dispatch(setDarkmode(!isDark))}
            sx={{ ml: 1 }}
            color="inherit"
          >
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
