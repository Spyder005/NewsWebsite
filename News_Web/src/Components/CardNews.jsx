import React from 'react'
import Editnews from '../Pages/Editnews'
import { Link ,useNavigate, useParams} from 'react-router-dom'


const CardNews = (props) => {
  const authToken = localStorage.getItem('authToken')
  let id =props.id 
  console.log("in the card : ",props.categoryname)
 
 
  // const email = localStorage.getItem('email')
  let navigate =useNavigate()

   //for edit a news
  const OnClickedit =(id)=>{

            // <Editnews id={id}/>
       navigate(`/editnews/${id}`)
          
  }

  //for delete a news
  const OnClickdelete= async(id)=>{
    const deletedata = await fetch(`http://localhost:5001/api/deletenews/${id}`, {
      method: "DELETE",
      headers: {"Content-Type":"application/json"},
      
    });
    navigate('/')  
    const json = await deletedata.json();
    console.log(json.success)
        { (json.success)? 
            
         alert("Delete item successfully")
    : 
        alert("Delete item failed") 
}

   
  }
    return (
        <>
        
            <div className='my-4 mx-2 me-2'>
            <div className="card" style={{width: "18rem" }}>
       
            <div >
        <span    style={{display:"flex",
                 justifyContent:"flex-end",
                 position:"absolute",
                 right:"0",
                 left:"90%" ,zIndex:"1",
                 
                 }}>
               
        <h6 className="badge rounded-pill bg-danger">source</h6>  
      </span>
      <img className="card-img-top my-2 card-image-container" src={`http://localhost:5001/uploads/${props.profile}`} alt="..." />
      </div>
    
     
      <div className="card-body">
        <h5 className="card-title">{props.title}
     
        </h5>
        <p className="card-text">{props.description}</p>
        <p className="card-text"><small className="text-muted">By author {props.authorname} </small></p>
        <p className="card-text"><small className="text-muted">{props.countryname} </small></p>
        <p className="card-text"><small className="text-muted">{props.categoryname} </small></p>
         
        <a href="#" target='_blank' className="btn btn-secondary md-2 inline me-2">{props.readmore}</a>

        {/* console.log(authToken) */}
        {/* console.log(email) */}
        <div>
        { (!authToken) ? console.log(authToken) :
    
    // console.log(authToken)
           <div className='inline '>
             <button type="button" className="btn btn-success " onClick={()=>{OnClickedit(id)}}>Edit</button>
             <button type="button" className="m-3 btn btn-danger " onClick={()=>{OnClickdelete(id)}}>delete</button>

           </div>

    }

  
        </div>
   
      </div>
    </div>
          </div>
        </>)
}

export default CardNews
