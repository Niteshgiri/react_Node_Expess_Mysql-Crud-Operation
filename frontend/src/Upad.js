
import React ,{ useState, useEffect }from "react";
import { useHistory,useParams} from 'react-router-dom';
import { Container } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";


function Upad() {

    const [state,setState] = useState({name:'', email:'',role:'', address:''});
    const [Employee, setEmployee] = useState('');

    const { name, email, role,address } = state;
   
  
    const [useredit, setUseredit]= useState({name:'', email:'',role:'', address:''});
const [msg, setMsg]= useState('');
const history= useHistory();
const {id} = useParams();


const [data, setData] = useState([]);
const [selectedState, setSelectedState] = useState('')
useEffect(() => {
    getRoles();
  }, []); 

  const updateUser = async (data, id) => {
  
    const response = await axios.put(`http://localhost:8080/api/${id}`, data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

const getRoles = async () => {
    const response = await axios.get("http://localhost:8080/api/role");
    if (response.status === 200) {
      setData(response.data);
    }
  };
// useEffect( ()=>{
//   const edituserid = async()=>{
//       const reqdata= await axios.get(`http://localhost:8080/api/${id}`);
//       const res = await reqdata.json();
//       setEmployee(reqdata);
//   }
//   edituserid();
// },[]);
useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);
const getSingleUser = async (id) => {
    const response = await axios.get(`http://localhost:8080/api/getLeave/${id}`);
    console.log("response", response);
    if (response.status === 200) {
      setEmployee({ ...response.data });
    }
  };


const handleEdit =(e)=>{
    setUseredit({...useredit, [e.target.name]:e.target.value});  

}

const handleUserupdate= async (e)=>{
    e.preventDefault();
    const response= await axios.post(`http://localhost:8080/api/${id}`, useredit);
    setMsg(response.data.msg);
    
    setTimeout( ()=>{
        history.push("/");
    }, 2000);





}

const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
      [role]:selectedState
    });
  };



const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email  || !address) {
      toast.error("Please provide value in each input field");
    } else {
      if (!id) {
       
      } else {
        state.role=selectedState;
        updateUser(state, id);
      }

      setTimeout(() => history.push("/"), 500);
    }
  };

return(

   
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
      <strong>Update Employee At ID: </strong>
          <span>{id} </span>
          <br />
          <br />
         
         
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
        <input  type="submit" value={ "Update"} />
      </form>
    </div>

)
}
export default Upad