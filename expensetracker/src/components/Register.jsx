import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const { register, getAllUsers } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    fullName: "",
    username: "",
  });
  const [error, setError] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        console.log(users)
        setAllUsers(Array.isArray(users) ? users : []); 
      } catch (err) {
        console.error("Error fetching users:", err);
        setAllUsers([]);  
      }
    };
    fetchUsers();
  }, []);


  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!userData.fullName.trim()) return setError("Full Name is required!");
    if (!userData.username.trim()) return setError("Username is required!");
    if (!userData.email.includes("@")) return setError("Invalid email format!");
    if (userData.password.length < 6)
      return setError("Password must be at least 6 characters!");

    const usernameExists = allUsers.some(
      (user) => user.username === userData.username
    );
    const emailExists = allUsers.some((user) => user.email === userData.email);

    if (usernameExists) {
      window.alert("Username already exists! Please choose another.");
      return setError("Username already exists!");
    }
    if (emailExists) {
      window.alert("Email already exists! Please use a different one.");
      return setError("Email already exists!");
    }

    try {
      await register(userData);
      window.alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Registration failed!");
    }
  };

  return (
    <div className="card p-4">
      <h3>Register</h3>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            className="form-control"
            value={userData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Register
        </button>
      </form>

      <div>
        <Link to="/login" className="text-primary">
          Already have an account? Login here
        </Link>

      </div>
    </div>
    
  );
};

export default Register;
