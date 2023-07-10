// AuthContext.jsx

import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const url="http://localhost:8800/api/v1"
// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState(null ||
    JSON.parse(localStorage.getItem('user'))
    ); // [1

    

  // Log in the user
  const login = async(input) => {
    try {
      console.log("input",input);
      const resp= await axios.post(`${url}/auth/login`, input,{
        withCredentials: true,
      });
      setCurrentUser(resp.data.user);
      

      
    } catch (error) {
        // setError(err);
    }
  };

  // Log out the user
  const logout = async() => {
    const resp=await axios.get(`${url}/auth/logout`);
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
