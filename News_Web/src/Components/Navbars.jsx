import React from 'react'
import {Link ,useNavigate} from 'react-router-dom'

const Navbars = () => {
  // let email =localStorage.getItem('email')
  let authToken=localStorage.getItem('authToken')
  let navigate =useNavigate();
  // OnClick =()=>{
  //   localStorage.removeItem('email')
  //   navigate('/')
  // }
  return (
    <div>
       
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark text-light"> 
       
    
   
    <div className="collapse navbar-collapse text-light" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item mx-2 ">
            
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        
        <li className="nav-item mx-2">
          <Link className="nav-link active" aria-current="page" to="/business">Business</Link>
        </li>
        <li className="nav-item mx-2"> 
          <Link className="nav-link active" aria-current="page" to="/entertainment">Entertainment</Link>
        </li>
        
        <li className="nav-item mx-2"> 
          <Link className="nav-link active" aria-current="page" to="/science">Science</Link>
        </li>
        <li className="nav-item mx-2"> 
          <Link className="nav-link active" aria-current="page" to="/sport">Sport</Link>

        </li>
        <li className="nav-item mx-2">
          <Link className="nav-link active" aria-current="page" to="/technology">Technology</Link>
        </li>

        <li className="nav-item mx-2">
          <Link className="nav-link active" aria-current="page" to="/health">Health</Link>
        </li>

        {(authToken) ? <li className="nav-item mx-2">
          <Link className="nav-link active" aria-current="page" to="/admin">Admin Page</Link>
        </li> :<div></div>

        }
         {(authToken) ? <li className="nav-item mx-2">
             <Link className="nav-link active" aria-current="page" to="/addcategory">Add Category</Link>
          
        </li> :<div></div>

        }
       
      </ul>
      </div>
        <div className=' float-right'  >
          {(!authToken) ?<button type="button" className="btn btn-success "> <Link className="nav-link active text-light" aria-current="page" to="/login">Admin Login</Link></button>
                    : 
                    <button className=" text-light btn btn-success" aria-current="page" onClick={()=>{localStorage.removeItem('authToken')}}><Link className="nav-link active text-light" aria-current="page" to="/">Admin Logout</Link></button>
                    
          
        }
</div>
     </nav>
        
      </nav>
    </div>
  )
}

export default Navbars
