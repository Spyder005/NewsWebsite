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
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

const Editnews = () => {
  const [newsdata, setNewsData] = useState([]);
  const { id } = useParams();
  console.log(id);
  const [inputdata, setInputData] = useState({
    title: "",
    authorname: "",
    countryname: "",
    description: "",
    readmore: "",
    user_profile: "",
     category:""
  });
  const [options, setOptions] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/getnews/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        ); 
     const data = await response.json()
         console.log(data);
        // setInputData({ ...inputdata, title: data.title });
        // setInputData({ ...inputdata, authorname: data.authorname });
        // setInputData({ ...inputdata, countryname: data.countryname });
        // setInputData({ ...inputdata, description: data.description });
        // setInputData({ ...inputdata, readmore: data.readmore });
        // setInputData({ ...inputdata, categoryname: data.categoryname });
        // setInputData({ ...inputdata, user_profile: data.profile });
         
    setInputData(data)

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

  //   const [inputdata, setInputData] = useState({
  //             title: "",
  //             authorname: "",
  //             countryname: "",
  //             description: "",
  //             readmore: "",
  //             // user_profile: "",
  //             // category:""
  //           });
  //   setInputData ({...inputdata,title:newsdata.title})
  //   setInputData({...inputdata , authorname:newsdata.authorname})
  //   setInputData({...inputdata , countryname:newsdata.countryname})
  //   setInputData({...inputdata,description:newsdata.description})
  //   setInputData({...inputdata,readmore:newsdata.readmore})

  //   console.log( newsdata.title)


   const [image, setImage] = useState("");
  // const [showspin,setShowSpin] = useState(true);
  let navigate = useNavigate();
  const [status,setStatus]=useState("");
    //status set
  const setStatusValue = (e) => {
    setStatus(e.value);
  };
  // status optios
//   const options = [
//     { value: "Health", label: "Health" },
//     { value: "Business", label: "Business" },
//     { value: "Sport", label: "Sport" },
//     { value: "Technology", label: "Technology" },
//     { value: "Entertainment", label: "Entertainment" },
//     { value: "Science", label: "Science" },
//   ];

//   setinput value
  const setInputValue=(e)=>{
    const {name,value} =e.target;
    setInputData({...inputdata,[name]:value})
  }

//   profile set
  const setProfile = (e) => {
    setImage(e.target.files[0])
  }

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
    }
    else if (inputdata.categoryname=== "") {
        console.error("Description  is Required !")
        return alert("Description name is Required !")
       } 
       else if (inputdata.image=== "") {
        console.error("Description  is Required !")
        return alert("Description name is Required !")
       }
       
       
       const formData = new FormData();
       formData.append("title", inputdata.title);
       formData.append("authorname", inputdata.authorname);
       formData.append("description", inputdata.description);
       formData.append("readmore", inputdata.readmore);
       formData.append("countryname", inputdata.countryname);
       formData.append("categoryname", status);
       formData.append("user_profile", image);
       
       const response = await fetch(`http://localhost:5001/api/updatenews/${id}`, {
         method: "POST",
         body: formData,
       });
       console.log("formData new ",formData)
    // const response = await fetch(`http://localhost:5001/api/updatenews/${id}`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     title: inputdata.title,
    //     authorname: inputdata.authorname,
    //     description: inputdata.description,
    //     readmore: inputdata.readmore,
    //     countryname: inputdata.countryname,
    //     categoryname:inputdata.categoryname
    //   }),
    // });
    const json = await response.json();
    console.log(
      inputdata.title,
      inputdata.authorname,
      inputdata.description,
      inputdata.readmore,
     "category : ", status,
     "image url : ", image


    );
    console.log(json);
    if (!json.success) return alert("enter valid data");
    else {
      alert("updated successfully");
      navigate("/");
    }
  };

  return (
    //  {
    // showspin ? <Spinners/>:
    // <div className="container">
    <div  style={{backgroundImage: 'url(" https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center' }} >
      <h2 className="text-center mt-1">News Input</h2>
      <Card className="shadow mt-3 p-3 bg-black text-light ">
        <Form>
          <Row>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={inputdata.title}
                onChange={setInputValue}
                // onChange={(event) =>
                //   setInputData({ ...inputdata, title: event.target.value })
                // }
                placeholder="Enter Title"
              />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6" controlId="authorname">
              <Form.Label>Author Name </Form.Label>
              <Form.Control
                type="text"
                name="authorname"
                value={inputdata.authorname}
                onChange={setInputValue}
                // onChange={(event) =>
                //   setInputData({ ...inputdata, authorname: event.target.value })
                // }
                placeholder="Enter LastName"
              />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6" controlId="countryname">
              <Form.Label>Country Name</Form.Label>
              <Form.Control
                type="email"
                name="countryname"
                 value={inputdata.countryname}
                 onChange={setInputValue}
                // onChange={(event) =>
                //   setInputData({
                //     ...inputdata,
                //     countryname: event.target.value,
                //   })
                // }
                placeholder="Country Name"
              />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={inputdata.description}
                onChange={setInputValue}
                // onChange={(event) =>
                //   setInputData({
                //     ...inputdata,
                //     description: event.target.value,
                //   })
                // }
                rows={4}
              />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6" controlId="newurl">
              <Form.Label>NEWS URL</Form.Label>
              <Form.Control
                type="email"
                name="countryname"
                 value={inputdata.readmore}
                 onChange={setInputValue}
                // onChange={(event) =>
                //   setInputData({ ...inputdata, readmore: event.target.value })
                // }
                placeholder="url"
              />
            </Form.Group>
             
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Select Your Category</Form.Label>
              <Select
                options={options}
                className="text-dark"
                defaultValue={status}
                onChange={setStatusValue}
              />
            </Form.Group>

            {/* <Form.Group className="mb-3 col-lg-6" controlId="categoryname">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="email"
                name="countryname"
                onChange={(event) =>
                  setInputData({ ...inputdata, categoryname: event.target.value })
                }
                placeholder="category"
              />
            </Form.Group> */}

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

export default Editnews;
