import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Navbars from '../Components/Navbars'

const Login = () => {
  localStorage.removeItem('authToken')
  const [credentials,setCredentials] =useState({email:"", password:""})
  let navigate=useNavigate();
   console.log(JSON.stringify({email:credentials.email,password:credentials.password}))
   
  const handleSubmit =async(e)=>{
    e.preventDefault();
    // console.log(credentials.email,credentials.password)
const response =await fetch("http://localhost:5001/api/loginuser",{
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({email:credentials.email,password:credentials.password})
})
  const json = await response.json();
  console.log(json);
  if(!json.success) alert("Enter valid Credentials")
  else{
      navigate('/admin')
      // localStorage.setItem('email',credentials.email)
      localStorage.setItem('authToken',json.authToken)
      
      // localStorage.setItem('authToken',authToken)
      // console.log(localStorage.getItem('authToken'));
    }
  }



  return (
    < > 
  
   <div><Navbars/></div>
   
    <div  style={{backgroundImage: 'url(" https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      
      <div className='container text-light'>
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' onChange={(event) => setCredentials({ ...credentials, email: event.target.value })} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone.</div>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} name='password' />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          
        </form>

      </div>
    </div>
    </>)}



export default Login
