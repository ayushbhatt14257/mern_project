// import { set } from "mongoose";
import React from "react"
import { useState, useEffect } from "react";
import Footer from "./Footer";


const Home = () => {

  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(false);
  

  const homePage =  async () => {
    try {
      const res = await fetch('/getData', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      const data = await res.json();
      console.log(data);
      setUserName(data.name);
      setShow(true);
    

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    
    homePage();

  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  return (
   <>
    <div className="homeContainer">
      <div className="homeMain">
        <p>Welcome</p>
        <h1>{userName}</h1>
        <h2>{show ? 'Happy, to see you......!!' : 'we are the mernStack Developer..!!'}</h2>
      </div>
    </div>
    <Footer/>
   </>
  );
}

export default Home;
