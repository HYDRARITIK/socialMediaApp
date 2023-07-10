import React from "react";
import "./register.scss";
import axios from "axios";
const url="http://localhost:8800/api/v1"
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { makeRequest } from "../../axios";

const Register = () => {
  const navigate=useNavigate();

  const [input, setInput] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
setError(null);
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    console.log(input);
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if(!input.name || !input.email || !input.password || !input.confirmPassword){
      alert("Please fill all the fields");
      return
    }
    if(input.password !== input.confirmPassword){
      alert("Password doesn't match");
      return
    }

    try {
      const resp= await makeRequest.post(`/auth/register`, input);
      navigate("/login");
      
    } catch (error) {
        setError(err);
    }
  }


  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Hello World</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati,
            veritatis?
          </p>
          <span>
            Do have an account? <b>Login Now</b>
          </span>
          <button>Login</button>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form action="">
            <input type="text" placeholder="Username" name="name" onChange={handleChange}/>
            <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
            <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleChange}/>
            <button onClick={handleSubmit}> Register</button>
          </form>
        </div>
        {error && <span className="error">Something went wrong</span>}
      </div>
    </div>
  );
};

export default Register;
