import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./View.css";

const View = () => {
  const [user, setUser] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  console.log("user", id);

  const getSingleUser = async (id) => {
    const response = await axios.get(`http://localhost:8080/api/getLeave/${id}`);
    console.log("response", response);
    if (response.status === 200) {
      setUser({ ...response.data });
    }
  };
  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>Employee Detail</p>
        </div>
        <div className="container">
        <strong>ID: </strong>
          <span>{id} </span>
          <br />
          <br />
          <strong>Name: </strong>
          <span>{user && user.name} </span>
          <br />
          <br />
          <strong>Email: </strong>
          <span>{user && user.email} </span>
          <br />
          <br /> 
          <strong>Role: </strong>
          <span>{user && user.role} </span>
          <br />
          <br />
          <strong>Address: </strong>
          <span>{user && user.address} </span>
          <br />
          <br />
           <Link to={`/update/${id}`}>
                      <button className="btn btn-edit"></button>
                    </Link>
          <Link to="/">
            <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
