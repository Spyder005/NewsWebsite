import React from 'react'
import Addnews from './Addnews'
import { useNavigate } from 'react-router-dom'
// import { Form,Card } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Navbars from '../Components/Navbars';

const Admin = () => {
  const navigate = useNavigate()
  const authToken = localStorage.getItem('authToken')
  // console.log(email)
    return (
    <div  style={{backgroundImage: 'url(" https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center' }} >
      <div><Navbars/></div>
      {(!authToken) ? 
       <Card className="text-center text-center m-5 bg-dark text-light d-flex align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
       <Card.Header>Restricted page</Card.Header>
       <Card.Body  >
         <div className='container   bg-dark text-light'  style={{ minHeight: '10vh' }}>
      <h1 className='justify-content-center ' >If you are admin plz login</h1>
      
     
       <hr/>
       
      <button className='btn btn-primary mx-auto d-block' onClick={()=>{navigate('/login')}}>Login</button> </div>
         {/* <Card.Title>If you are admin plz login</Card.Title>
        
         <Button variant="primary" onClick={()=>{navigate('/login')}}>LogIn Admin</Button> */}
       </Card.Body>
       {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
     </Card>
      // <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      //  <div className='container  m-5 bg-dark text-light'>
      // <h1 className='d-flex justify-content-center ' >If you are admin plz login</h1>
      
     
      // <hr/>
       
      // <button className='btn btn-primary mx-auto d-block' onClick={()=>{navigate('/login')}}>Login</button>
 
          
          
      // </div>
        // </div>
        :<div> <Addnews/></div>

      }
    
    </div>
  )
}

export default Admin
