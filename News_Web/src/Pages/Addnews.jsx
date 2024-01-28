import React, { useState, useEffect } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
// import Select from 'react-select';
// import { ToastContainer, toast } from "react-toastify"
// import 'react-toastify/dist/ReactToastify.css';
// import Spinners from "../Components/Spinner/Spinners"
// import {addnewsfunc} from "../services/Api"
import { useNavigate } from "react-router-dom";
import Select from "react-select";



const Addnews = () => {



  const [inputdata, setInputData] = useState({
    title: "",
    authorname: "",
    countryname: "",
    description: "",
    readmore: "",
    // profile: "",
    user_profile: "",
    category: "",
  });

  const [status, setStatus] = useState("");
  //status set
  const setStatusValue = (e) => {
    setStatus(e.value);
  };
  // status optios
  // let options =[]

  const [options, setOptions] = useState([])
   
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cat_data =  await fetch("http://localhost:5001/api/getcategory",{ method: "GET"})
        const cat = await cat_data.json();
  
        const mappedOptions = cat.map((item) => ({
          value: item.categoryname,
          label: item.categoryname
        }));
        setOptions(mappedOptions);
  
        
         
          console.log(cat)
        // setNewsData(data);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchData();
  }, []);


  
  // const options = [
  //   { value: "Health", label: "Health" },
  //   { value: "Business", label: "Business" },
  //   { value: "Sport", label: "Sport" },
  //   { value: "Technology", label: "Technology" },
  //   { value: "Entertainment", label: "Entertainment" },
  //   { value: "Science", label: "Science" },
  // ];

  const [image, setImage] = useState("");
  // const [showspin,setShowSpin] = useState(true);
  let navigate = useNavigate();

  //setinput value
  // const setInputValue=(e)=>{
  //   const {name,value} =e.target;
  //   setInputData({...inputdata,[name]:value})
  // }

  // profile set
  const setProfile = (e) => {
    setImage(e.target.files[0]);
  };

  const submitUserData = async (e) => {
    e.preventDefault();

    if (inputdata.title === "") {
      console.error("Title is Required !");
      return alert("Title is Required !");
    } else if (inputdata.authorname === "") {
      console.error("Author name is Required !");
      return alert("Author name is Required !");
    } else if (inputdata.countryname === "") {
      console.error("Country name is Required !");
      return alert("Country name is Required !");
    } else if (inputdata.description === "") {
      console.error("Description  is Required !");
      return alert("Description name is Required !");
    } else if (inputdata.readmore === "") {
      console.error("Description  is Required !");
      return alert("Description name is Required !");
    } else if (inputdata.categoryname === "") {
      console.error("Description  is Required !");
      return alert("Description name is Required !");
    } else if (image === "") {
      return alert("Img is Required !");
    }

    const formData = new FormData();
    formData.append("title", inputdata.title);
    formData.append("authorname", inputdata.authorname);
    formData.append("description", inputdata.description);
    formData.append("readmore", inputdata.readmore);
    formData.append("countryname", inputdata.countryname);
    formData.append("categoryname", status);
    formData.append("user_profile", image);
    
    const response = await fetch("http://localhost:5001/api/createnews", {
      method: "POST",
      body: formData,
    }); 


    // const response = await fetch("http://localhost:5001/api/createnews", {
    //   method: "POST",
    //   headers: {
    //     "Accept":'*/*'
    //   // "Content-Type": "application/json" 
    //     // "Content-Type":"multipart/form-data"
    //     },
    //   body: JSON.stringify({
    //     title: inputdata.title,
    //     authorname: inputdata.authorname,
    //     description: inputdata.description,
    //     readmore: inputdata.readmore,
    //     countryname: inputdata.countryname,
    //     categoryname: status,
    //     user_profile: image,
    //   }),
    // });
    const json = await response.json();
    console.log(
      inputdata.title,
      inputdata.authorname,
      inputdata.description,
      inputdata.readmore
    );
    console.log(json);
    if (!json.success) return alert("enter valid data");
    else {
      navigate("/");
    }
  };

 
  return (
    //  {
    // showspin ? <Spinners/>:
    <div className="container">
      {/* <h2 className='text-center mt-1'>News Input</h2> */}
      <Card className="shadow mt-3 p-3 bg-black text-light ">
        <Form>
          <Row>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                onChange={(event) =>
                  setInputData({ ...inputdata, title: event.target.value })
                }
                placeholder="Enter Title"
              />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6" controlId="authorname">
              <Form.Label>Author Name </Form.Label>
              <Form.Control
                type="text"
                name="authorname"
                onChange={(event) =>
                  setInputData({ ...inputdata, authorname: event.target.value })
                }
                placeholder="Enter LastName"
              />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6" controlId="countryname">
              <Form.Label>Country Name</Form.Label>
              <Form.Control
                type="email"
                name="countryname"
                onChange={(event) =>
                  setInputData({
                    ...inputdata,
                    countryname: event.target.value,
                  })
                }
                placeholder="Country Name"
              />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                onChange={(event) =>
                  setInputData({
                    ...inputdata,
                    description: event.target.value,
                  })
                }
                rows={4}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3 col-lg-6" controlId="categoryname">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="email"
                name="categoryname"
                onChange={(event) =>
                  setInputData({ ...inputdata, categoryname: event.target.value })
                }
                placeholder="category"
              /> */}
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Select Your Category</Form.Label>
              <Select
                options={options
                }
                //   .map((item)=>{
                //   //  "value": {item.categoryname} "label": {item.categoryname} 
                //   item.categoryname
                // })}
                className="text-dark"
                defaultValue={status}
                onChange={setStatusValue}
              />
            </Form.Group>
            {/* </Form.Group> */}
            <Form.Group className="mb-3 col-lg-6" controlId="newurl">
              <Form.Label>NEWS URL</Form.Label>
              <Form.Control
                type="email"
                name="countryname"
                onChange={(event) =>
                  setInputData({ ...inputdata, readmore: event.target.value })
                }
                placeholder="url"
              />
            </Form.Group>

            {/* <Form.Group className="mb-3 col-lg-6" controlId="exampleForm.ControlTextarea1">
                <Form.Label>NEWS URL</Form.Label>
                    <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3" name='url_news' onChange={(event) => setInputData({ ...inputdata, readmore: event.target.value })}>
                     
                    </InputGroup.Text>
                    
                 </InputGroup>
              </Form.Group> */}
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail" encType="multipart/form-data">
                <Form.Label>Select Your News Image</Form.Label>
                <Form.Control type="file" name='user_profile' onChange={setProfile} placeholder='Select Your Profile' />
              </Form.Group>

            <Button variant="primary" type="submit" onClick={submitUserData}>
              Submit
            </Button>
          </Row>
        </Form>
      </Card>
      {/* <ToastContainer position="top-center" /> */}
    </div>
    // }
  );
};

export default Addnews;

// import React, {useState,useEffect} from 'react'

// const Addnews = () => {

//     const [currentDateTime, setCurrentDateTime] = useState(new Date());

//     useEffect(() => {
//       const intervalId = setInterval(() => {
//         setCurrentDateTime(new Date());
//       }, 1000); // Update every 1000 milliseconds (1 second)

//       return () => clearInterval(intervalId);
//     }, []); // Empty dependency array ensures useEffect runs only once on mount

//     const formatDate = (date) => {
//       const options = {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit',
//         timeZoneName: 'short',
//       };
//       return date.toLocaleDateString(undefined, options);
//     };
//   return (
//     <div className='addnews container-fluid'>
//       <form>
//   <div className="mb-3">
//     <label htmlFor="title" className="form-label">Title</label>
//     <input type="text" className="form-control" id="title"/>
//   </div>
//   <div className="mb-3">
//     <label htmlFor="authorname" className="form-label">Author Name</label>
//     <input type="text" className="form-control" id="authorname"/>
//   </div>
//   <div className="mb-3">
//     <label htmlFor="authorname" className="form-label">Country Name</label>
//     <input type="text" className="form-control" id="authorname"/>
//   </div>
//   <div className="mb-3">
//   <label htmlFor="formFile" className="form-label">Input Image </label>
//   <input className="form-control" type="file" id="formFile"/>
//  </div>
//   <div className='mb-3'>
//   <label htmlFor="datetime">Current Date and Time:</label>
//         <input
//           type="text"
//           id="datetime"
//           name="datetime"
//           value={formatDate(currentDateTime)}
//           readOnly
//         />
//   </div>
//   <div className="mb-3">
//     <label htmlFor="description" className="form-label">Description</label>
//     <textarea className="form-control" id="description" aria-label="With textarea"></textarea>
//   </div>

// <div className="mb-3">
//   <label htmlFor="basic-url" className="form-label">URL</label>
//     <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4"/>
// </div>

//   <div className="mb-3 form-check">
//     <input type="checkbox" className="form-check-input" id="Check1"/>
//     <label className="form-check-label" htmlFor="Check1">Check me out</label>
//   </div>
//   <button type="submit" className="btn btn-primary">Submit</button>
// </form>

//     </div>
//   )
// }

// export default Addnews
