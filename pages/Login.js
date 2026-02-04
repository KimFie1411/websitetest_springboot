import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { username, password } = credentials;

  const onInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:8080/login", credentials);
      
      // 1. Save user info to LocalStorage
      localStorage.setItem("user", JSON.stringify(result.data));
      
      alert("Login Successful!");
      navigate("/"); // Go to Home
      window.location.reload(); // Refresh to update Navbar
    } catch (error) {
      alert("Invalid Credentials!");
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-4 offset-md-4 border rounded p-4 shadow">
          <h2 className="text-center m-4">Login</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input type="text" className="form-control" name="username" value={username} onChange={onInputChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" name="password" value={password} onChange={onInputChange} />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
            <p className="mt-3 text-center">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}