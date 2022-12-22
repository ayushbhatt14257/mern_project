import React, { useContext, useState } from "react"
import login from "../image/login.png"
import { Link, useNavigate } from "react-router-dom"

import {userContext } from "../App";

function Login() {
    const {state, dispatch} = useContext(userContext);


    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const uerLogin = async (e) => {
      e.preventDefault();

      const res = await fetch('/signin', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type' : "application/json"
        },
        body:JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

      if(res.status === 400 || !data) {
          window.alert("Invalid Login Detail");
      }else {
        dispatch({type:'USER', payload:true})
        window.alert("Login Successfull");
          navigate("/")
      }
    }



  return (
    <>
      <div className="loginSection">
        <div className="loginContainer">
          <div className="loginMainContainer">
            <h1 className="loginTitle">LogIn</h1>

            <div className="mainLogin">

              <div className="logInImage">
                <figure>
                  <img src={login} alt="login" />
                </figure>
                <Link to="/register" className="loginLink">Create An Account</Link>
              </div>


              <div className="loginForm">
                <form method="POST"> 

                  <div className="logInField">
                    <input type="text" name= 'email' id="email" autoComplete="on" autoCapitalize="off" value={email} 
                    onChange = {(e) => setEmail(e.target.value)}
                    placeholder="Email" />
                    <i class="fa-regular fa-envelope"></i>
                  </div>

                  <div className="logInField">
                    <input type="text" name="password" id="password" autoCapitalize="off"  value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                     placeholder="Password" />
                    <i class="fa-solid fa-lock"></i>
                  </div>
                  <button type="submit" onClick={uerLogin} className="loginBtn">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
