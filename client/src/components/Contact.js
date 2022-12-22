import React from "react"
import { useEffect, useState } from "react";

function Contact() {

  const [userData, setUserData] = useState({name: "", email: "", phone: "", message: ""});
  

  const callContactPage =  async () => {
    try {
      const res = await fetch('/getData', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      const data = await res.json();
      console.log(data);
      setUserData({...userData, name: data.name, email : data.email, phone: data.phone});
    

      if(!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    
    callContactPage();

  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({...userData, [name]:value});
  }

  // send the data to backend 
  const contactForm = async(e) => {
    e.preventDefault();

    const {name, email, phone, message} = userData;

    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        name, email, phone, message
      })
    });

    const data = await res.json();
    if(!data) {
      console.log("Message not send");
    } else {
      alert("Message Send");
      setUserData({...userData, message: ""});
    }

  }



  return (
    <>
      <div className="cartContainer">
        <div className="mainCart">

          <div className="cart">
            <i class="fa-solid fa-mobile"></i>
            <h2>Phone</h2>
            <p>9999999999</p>
          </div>

          <div className="cart">
          <i class="fa-solid fa-envelope"></i>
            <h2>Email</h2>
            <p>ayushbhatt1425@gmail.com</p>
          </div>

          <div className="cart">
          <i class="fa-solid fa-location-dot"></i>
            <h2>Address</h2>
            <p>Ratlam,IN</p>
          </div>          

        </div>

      <div className="contactForm">
        <div className="contactContainer">
          <div className="contactMain">
            <h1>Get In Touch</h1>

            <form action="" method="POST" className="contact">
              <input type="text" name="name" onChange={handleInput} value={userData.name} placeholder="Your Name" />
              <input type="text" name="email" onChange={handleInput} value={userData.email} placeholder="Your Email" />
              <input type="text" name="phone" onChange={handleInput} value={userData.phone} placeholder="Your Phone Number" />
            </form>
            <textarea name="message" id="" onChange={handleInput} value={userData.message} placeholder='Message...' cols="92" rows="6"></textarea>
            <button type="submit" onClick={contactForm} className="submitBtn">Submit</button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Contact;
