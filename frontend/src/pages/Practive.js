import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
 


const Practive = () => {
  return (
    <div>


<div className='d-flex flex-column align-items-center'>
       <Form style={{ width: '20rem', paddingTop: '2rem'}}>
           <Form.Group>
               <Form.Label>Enter Your Email</Form.Label>
               <Form.Control type='email' />
           </Form.Group>
           <Button type='submit' style={{marginTop: '2rem'}}>Submit Form</Button>
       </Form>
   	</div>

    </div>
  )
}

export default Practive