import React from "react";
import "./login.scss";
// import { AudioHTMLAttributes } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({
    name:"",
    password:""
  });
  const [error, setError] = useState(false);

  const {login} = useContext(AuthContext);

  const handleChange = (e) => {

    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    console.log(input);
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    login(input);

    navigate("/");
  
  }
  
  const navigate = useNavigate();

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati,
            veritatis?
          </p>
          <span>
            Dont have an account? <b>Register Now</b>
          </span>
          <button>Register</button>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form >
            <input type="text" placeholder="Username" name="name" onChange={handleChange}/>
            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
            <button onClick={handleSubmit}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
