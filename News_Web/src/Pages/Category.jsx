


import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import Navbars from "../Components/Navbars"

const Category = () => {
  const navigate = useNavigate();

  const [inputdata, setInputData] = useState({ categoryname: "" });
  const [presentStatus, setPresentStatus] = useState(false);
  const [options, setOptions] = useState([]);
  const authToken =localStorage.getItem('authToken');

//   useEffect(() => {
//     console.log("PresentStatus updated:", presentStatus);
//   }, [presentStatus]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const cat_data = await fetch("http://localhost:5001/api/getcategory", {
      method: "GET",
    });
    const cat = await cat_data.json();
    console.log(cat);

    // Map category names
    const mappedOptions = cat.map((item) => item.categoryname);
    setOptions(mappedOptions);

    // Check for existing category name
    const isCategoryPresent = cat.some(
      (item) =>
        item.categoryname.toLocaleUpperCase() ===
        inputdata.categoryname.toLocaleUpperCase()
    );

    if (isCategoryPresent) {
      alert("Category name already exists!");
      return;
    }

    // Other validation logic
    if (inputdata.categoryname === "") {
      console.error("Category name is Required !");
      alert("Category name is Required !");
      return;
    }

    // Prepare data to send
    const dataToSend = {
      categoryname: inputdata.categoryname.toLocaleUpperCase(),
      // Include any other fields you need to send
    };

    try {
      // Send data to create category
      const response = await fetch("http://localhost:5001/api/createcategory", {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();
      console.log("Category creation response:", json);
      console.log("category creation from frontend ", inputdata.categoryname);

      if (json.success) {
        // Navigate to admin page if category created successfully
        navigate("/admin");
        alert("Updated category");
      } else {
        // Display error if category creation failed
        alert("New addition in category failed: " + json.error);
      }
    } catch (error) {
      console.error("Error sending category data:", error);
      alert("Error sending category data");
    }
  };

  return (
    <>
    


     <Navbars/>

       
      <div className=" me-auto text-light bg-danger" 
      style={{backgroundImage: 'url(" https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center',
    // display: 'flex',
    //  alignItems: 'center',
    // justifyContent: 'center'
   }}
    >
     

      {(!authToken) ? 
       <Card className="text-center text-center m-5 bg-dark text-light d-flex align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
       <Card.Header>Restricted page</Card.Header>
       <Card.Body  >
         <div className='container   bg-dark text-light'  style={{ minHeight: '10vh' }}>
      <h1 className='justify-content-center ' >If you are admin plz login</h1>
      
     
       <hr/>
       
      <button className='btn btn-primary mx-auto d-block' onClick={()=>{navigate('/login')}}>Login</button> </div>
      </Card.Body  >
      </Card>:
       
        <Card className=" container m-5 text-light bg-success">
          <Form>
            <Row>
              <Form.Group className="mb-3 col-lg-6 " controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="categoryname"
                  style={{ textTransform: "uppercase" }}
                  onChange={(event) =>
                    setInputData({
                      ...inputdata,
                      categoryname: event.target.value,
                    })
                  }
                  placeholder="Enter New Category"
                />
              </Form.Group>
            </Row>
            <Button
              variant="primary"
              type="submit"
              onClick={onSubmit}
            >
              Submit
            </Button>
          </Form>
        </Card>}
      </div>
     
    </>
  );
};

export default Category;
