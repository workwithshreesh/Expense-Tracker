import React, { createContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = "http://localhost:3000/auth/";

// Initial State
const initialState = {
  user: JSON.parse(sessionStorage.getItem("user")) || null,
  message: sessionStorage.getItem("jwtmessage") || null,
};

// Reducer Function
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload.user, message: action.payload.message };
    case "LOGOUT":
      return { ...state, user: null, message: null };
    default:
      return state;
  }
};

// Create Context
export const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  // Save session on login

  const login = async (credentials) => {
    try {
      console.log("Logging in with credentials:", credentials);
      
      const response = await axios.post(`${API_BASE_URL}login`, credentials, {
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("Login response:", response.data);
  
      const { message, userId, username } = response.data;
      if (message) {
        const decodedUser = jwtDecode(message);
  
        sessionStorage.setItem("jwtmessage", message);
        sessionStorage.setItem("userId",userId);
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("user", JSON.stringify(decodedUser));
  
        dispatch({ type: "LOGIN", payload: { user: decodedUser, message } });
        navigate("/");
      } else {
        console.error("Login failed: No message received");
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  
  

  // Register New User
  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}register`, userData);
      if (response.data.success) {
        window.alert("Registration successful! Please login.");
       
      }
    } catch (error) {
      console.error("Registration Error:", error.response?.data?.message || error.message);   
      throw new Error("Registration failed. Please try again.");
    }
  };
  

  // Logout function
  const logout = () => {
    sessionStorage.removeItem("jwtmessage");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userId")
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  // Check message validity
  const isAuthenticated = () => {
    if (!state.message) return false;
    try {
      const decoded = jwtDecode(state.message);
      return decoded.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  };

  // Fetch all users
  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}users`, {
        headers: { Authorization: `Bearer ${state.message}` },
      });
      return response.data.user;
    } catch (error) {
      console.error("Error fetching users:", error.response?.data?.message || error.message);
    }
  };



  useEffect(() => {
    if (state.message) {
      const decoded = jwtDecode(state.message);
      const expirationTime = decoded.exp * 1000 - Date.now();
      const timer = setTimeout(logout, expirationTime);
      return () => clearTimeout(timer);
    }
  }, [state.message]);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, isAuthenticated, getAllUsers }}>
      {children}
    </AuthContext.Provider>
  );
};
