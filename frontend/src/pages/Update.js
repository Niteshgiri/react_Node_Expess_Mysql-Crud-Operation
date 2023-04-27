import React, { useState, useEffect } from "react";
import { useHistory,useParams } from "react-router-dom";
import "./AddEdit.css";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  role: "",
  address:""
};

const Update = () => {
  const [data, setData] = useState([]);
  const [data1] = useState([]);
  const [state, setState] = useState(initialState);
  


  


  const [name, setName] = useState('')  
    const [email, setEmail] = useState('')   
    const [address, setAddresss] = useState('')   
     
      //const navigate = useNavigate();

  const { id } = useParams();
  const [values,setValues]=useState({
    id:id,
    name:'',
    email:'',
    role:'',
    address:''

  })
  
  useEffect(() =>{
    axios.get('http://localhost:8080/api/'+id)
    .then(res =>res.setEmail(email))
    .catch(err => console.log(err))
  })
  const history = useHistory();

 
  const getObject = async () => {
    const response = await axios.get('http://localhost:8080/api/'+id);
    if (response.status === 200) {
      setData(response.state);
     
    }
  };


  const getRoles = async () => {
    const response = await axios.get("http://localhost:8080/api/role");
    if (response.status === 200) {
      setData(response.data);
    }
  };


  useEffect(() => {
    getRoles();
  }, []); 

  useEffect(() => {
    
  }, []); 

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

  
  const [selectedState, setSelectedState] = useState('')

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
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
       state.role=selectedState;
        updateUser(state, id);
      }

      setTimeout(() => history.push("/"), 500);
    }
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <strong>Update Employee At ID: </strong>
          <span>{id} </span>
          <br />
          <br />
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
          id="name"
          name="name"
          placeholder="Enter Name..."
      
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email</label>
        <input 
          type="email"
          id="email"
          name="email"
          placeholder="Enter Email..."
          
          
        />

<label htmlFor="name">Role</label>
        {/* <input
          type="text"
          id="role"
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

        <label htmlFor="email">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Enter address . ..."
         
          onChange={handleInputChange}
        />

        <input type="submit" value={id ? "Update" : "Add"} />
      </form>
    </div>
  );
};

export default Update