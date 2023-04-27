import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./AddEdit.css";
import { toast } from "react-toastify";
import axios from "axios";



const AddLeave = () => {

    const initialState = {
        LeavesDates: "",
        LeaveReason: "",
        employee_id:""
        
      };
      
      const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({
          ...state,
          [name]: value,
        });
      };
    


      const [state, setState] = useState(initialState);
  const { LeavesDates, LeaveReason,employee_id} = state;

  const history = useHistory();

  const { id } = useParams();


  const AddLeave = async (data, id) => {
    const response = await axios.post(`http://localhost:8080/api/${data.employee_id}`, data);
    if (response.status === 200) {
      toast.success(response.data);
      
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!LeaveReason || !LeavesDates || !employee_id) {
      toast.error("Please provide value in each input field");
    } else {
      
        AddLeave(state);
      

      setTimeout(() => history.push("/viewLeave"), 500);
    }
  };
  return (
    <div >

<form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="LeavesDates">LeavesDates: </label>
        <input
          type="date"
          id="LeavesDates"
          name="LeavesDates"
          placeholder="Enter LeavesDates..."
          value={LeavesDates}
          onChange={handleInputChange}
        />
      <br></br>
        <label htmlFor="LeaveReason">LeaveReason</label>
        <input
          type="text"
          id="LeaveReason"
          name="LeaveReason"
          placeholder="Enter LeaveReason..."
          value={LeaveReason}
          onChange={handleInputChange}
        />

<label htmlFor="employee_id">employee_id</label>
        <input
          type="number"
          id="employee_id"
          name="employee_id"
          placeholder="Enter employee_id To add Leave..."
          value={employee_id}
          onChange={handleInputChange}
        />
        

        <input  type="submit"  value={ "Add"} />
      </form>

    </div>
  )
}

export default AddLeave