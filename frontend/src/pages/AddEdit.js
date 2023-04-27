import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./AddEdit.css";
import { toast } from "react-toastify";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'
import { Form, Button } from 'semantic-ui-react';
import { useForm } from "react-hook-form";

const initialState = {
  name: "",
  email: "",
  role: "",
  address:"",
  role1:""
};

const AddEdit = () => {
  const [data, setData] = useState([]);

  const [state,setState] = useState(initialState);

  


  const getRoles = async () => {
    const response = await axios.get("http://localhost:8080/api/role");
    if (response.status === 200) {
      setData(response.data);
    }
  };

console.log(data)

  const { name, email, role,address } = state;

  useEffect(() => {
    getRoles();
  }, []); 

 
  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    const response = await axios.get(`http://localhost:8080/api/${id}`);
    if (response.status === 200) {
      setState({ ...response.data[0] });
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
      [role]:selectedState
    });
  };

  const addUser = async (data) => {
    const response = await axios.post("http://localhost:8080/api", data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  const updateUser = async (data, id) => {
    const response = await axios.put(`http://localhost:8080/api/${id}`, data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email  || !address) {
      toast.error("Please provide value in each input field");
    } else {
      if (!id) {
        state.role=selectedState;
        addUser(state);
      } else {
        updateUser(state, id);
      }

      setTimeout(() => history.push("/"), 500);
    }
  };

  const [selectedState, setSelectedState] = useState('')
   //role={selectedState};
  return (
    <div style={{ marginTop: "100px" }}>
      
      <form     
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        
        <input
          type="text"
          required  
          id="name"
          name="name"
          placeholder="Enter Name..."
          value={name}
          
          onChange={handleInputChange}
        />
        <div class="valid-feedback"></div>
    <div class="invalid-feedback">Please fill out this field.</div>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          required
          name="email"
          placeholder="Enter Email..."
          value={email}
          onChange={handleInputChange}
        />
 <div class="valid-feedback"></div>
    <div class="invalid-feedback">Please fill out this field.</div>

<label htmlFor="role">Role</label>
        {/* <input
          type="text"
          id="role"
          required
          name="role"
          placeholder="Enter Role..."
          value={role}
          onChange={handleInputChange}
        /> */}

   
<select  value={selectedState} onChange={(e) => { setSelectedState(e.target.value) }}>
        {
          
          data.map(state => {
            <option value=" ">Select</option>
            return <option>{state.role}</option>
          })
        }
      </select>
         
<br></br>
        <label  htmlFor="address">Address</label><br></br>
        <textarea
       
          type="text"
          id="address"
          required
          name="address"
          placeholder="Enter address . ..."
          value={address}
          onChange={handleInputChange}
        />
 <div class="valid-feedback"></div>
    <div class="invalid-feedback">Please fill out this field.</div>
        <input  type="submit" value={ "Add"} />
      </form>
    </div>
  );
};

export default AddEdit;
