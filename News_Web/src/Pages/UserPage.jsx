import React, { useEffect, useState } from "react";
import Navbars from "../Components/Navbars";
import CardNews from "../Components/CardNews";
import { useParams } from "react-router-dom";
const UserPage = (props) => {
  const [newsdata, setNewsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/news", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);

        setNewsData(data);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure useEffect runs only once on component mount
  let categoryname = props.categoryname;
  console.log("userpage by front end befor lower case : ", categoryname);
  categoryname = categoryname.toLocaleLowerCase();
  // categoryname = categoryname.toLocaleLowerCase()
  // let checker =""
  console.log("userpage by front end after lower case : ", categoryname);

  console.log(newsdata);
  return (
    <>
      <Navbars />

      {/* <div >
      <div /> */}

      {newsdata.length !== 0 && categoryname !== "all" ? (
        <div className="grid-wrapper">
          {newsdata
            .filter(
              (data) => data.categoryname.toLocaleLowerCase() === categoryname
            )
            .map((item) => (
              <>
                {console.log(item.title)}
                <div key={item._id}>
                  <div  >
                    <CardNews
                      title={item.title}
                      description={item.description}
                      readmore={item.readmore}
                      authorname={item.authorname}
                      countryname={item.countryname}
                      id={item._id}
                      categoryname={item.categoryname}
                      profile={item.profile}
                    />
                  </div>
                </div>
              </>
            ))}
        </div>
      ) : (
        <div>
          <h1></h1>
        </div>
      )}

  
<div className="grid-wrapper" > {newsdata.length !== 0 && categoryname === "all" ? (
        newsdata.map((item) => {
          return (
            <div  key={item._id}>
              <div >
                <CardNews
                  title={item.title}
                  description={item.description}
                  readmore={item.readmore}
                  authorname={item.authorname}
                  countryname={item.countryname}
                  id={item._id}
                  categoryname={item.categoryname}
                  profile={item.profile}
                ></CardNews>
              </div>{" "}
            </div>
          );
        })
      ) : (
        <div></div>
      )}</div>
     

    
    </>
  );
};

export default UserPage;
