import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/add") {
      setActiveTab("AddEmployee");
    } else if (location.pathname === "/about") {
      setActiveTab("About");
    }else if (location.pathname === "/viewLeave") {
      setActiveTab("viewLeave");
    }else if (location.pathname === "/addLeave") {
      setActiveTab("addLeave");
    }
  }, [location]);
  return (
    <div className="header">
      <Link to="/">
      <p  className="logo">Employee Management </p>
      </Link>
      <div className="header-right">
        <Link to="/">
          <p
            className={`${activeTab === "Home" ? "active" : ""}`}
            onClick={() => setActiveTab("Home")}
          >
            Home
          </p>
        </Link>
        <Link to="/add">
          <p
            className={`${activeTab === "AddEmployee" ? "active" : ""}`}
            onClick={() => setActiveTab("AddEmployee")}
          >
             AddEmployee
          </p>
        </Link> 

        <Link to="/addLeave">
          <p
            className={`${activeTab === "addLeave" ? "active" : ""}`}
            onClick={() => setActiveTab("addLeave")}
          >
             AddLeave
          </p>
        </Link> 
        <Link to="/viewLeave">
          <p
            className={`${activeTab === "viewLeave" ? "active" : ""}`}
            onClick={() => setActiveTab("viewLeave")}
          >
             ViewEmployeeLeaves
          </p>
        </Link> 
        <Link to="/about">
          <p
            className={`${activeTab === "About" ? "active" : ""}`}
            onClick={() => setActiveTab("About")}
          >
            About
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
