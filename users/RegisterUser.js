import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterUser() {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        name:"",
        username:"",
        email:"",
        password:""
    });

    const {name, username, email, password} = user;

    const onInputChange = (e) => {
        setUser({...user,[e.target.name]:e.target.value});
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/register", user);
            navigate("/");
        } catch(error){
            console.error("Failed : ", error);
        }
    }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register User</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type={"text"} className="form-control" name="name" value={name} onChange={onInputChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input type={"text"} className="form-control" name="username" value={username} onChange={onInputChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type={"email"} className="form-control" name="email" value={email} onChange={onInputChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type={"password"} className="form-control" name="password" value={password} onChange={onInputChange} required />
            </div>
            <button type="submit" className="btn btn-outline-primary">Submit</button>
            <Link className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
