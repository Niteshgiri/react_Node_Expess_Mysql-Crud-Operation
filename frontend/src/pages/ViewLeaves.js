import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ViewLeave.css";
import axios from "axios";
import { toast } from "react-toastify";

const ViewLeaves = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
      getUsers();
    }, []); 

    const getUsers = async () => {
        const response = await axios.get("http://localhost:8080/api/all");
        if (response.status === 200) {
          setData(response.data);
        }
      };

  return (
    <div style={{ marginTop: "150px" }}>
      <table className="styled-table">
     
     
      
      {data.map((item)=>
      <div >ID: {item.id}<br></br>
        Name: {item.name}  <br></br>
        Email: {item.email} <br></br>
        Role: {item.role}  <br></br>
        Address: {item.address}  <br></br>
      <div/>
      
      <ul>
        {item.leave.map((sub)=>
        <li> LeavesDates: {sub.LeavesDates}
       </li>
        )}
      </ul>
      
      </div>
      )}
       </table>
    </div>
  )
}

export default ViewLeaves