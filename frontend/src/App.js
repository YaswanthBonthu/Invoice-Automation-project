import "./App.css";
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import InvoiceList from "./components/InvoiceList";
import Navbar from "./components/Navbar";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true)
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      const userName = urlParams.get('userName');
      setIsLoggedIn(false);
      if (token && userName) {
        localStorage.setItem('token', token);
        localStorage.setItem('userName', userName);
        setIsLoggedIn(true)
        window.location.href = '/';
      }
    }
  }, []);

  return (
    <Router>
      <ToastContainer position="top-center" autoClose={3000}/>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/invoices" element={isLoggedIn ? <InvoiceList /> : <div>Please log in to view invoices</div>} />
          <Route
            path="/"
            element={
              <div className="flex justify-center items-center min-h-screen">
                Please Login to Access your Invoices
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;