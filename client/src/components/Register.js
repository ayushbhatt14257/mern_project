import React ,{useState} from "react"
import Sinin from "../image/Checklist.jpg"
import {Link, useNavigate} from "react-router-dom"

function Register() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "", email: "", phone: "", work: "", password: "", cpassword: ""
    });

    let name, value;

    const handleInput = (event) => {
        name = event.target.name;
        value = event.target.value;

        setUser({...user, [name]:value});
    }

    const postData = async (e) => {
        e.preventDefault();

        const {name, email, phone, work, password, cpassword} = user;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body:JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });

        const data = await res.json();
        if (data.status === 400 || !data) {
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        }else {
            window.alert("Registration Successful");
            console.log("Registration Successful");
            navigate("/login")
        }
    }




  return (
   <>
    <section className="register">
        <div className="Rcontainer">
            <div className="registerContainer">

                    <h2 className="title">Sign up</h2>

                <div className="form">
                    <form method="POST" className="registrationForm">

                        <div className="inputField">
                            <input type="text" name ="name" id= "name" autoComplete="on" value={user.name} onChange = {handleInput} placeholder="Your Name" />
                            <i className="fa-solid fa-user"></i>
                        </div>

                        <div className="inputField">
                            <input type="text" name="email" id="email" autoComplete="on" autoCapitalize="off" value={user.email} onChange = {handleInput}  placeholder="Your Email" />
                            <i className="fa-regular fa-envelope"></i>
                        </div>

                        <div className="inputField">
                            <input type="text" name= 'phone' id="phone" autoComplete="on" value={user.phone} onChange = {handleInput} placeholder="Your Phone" />
                            <i className="fa-solid fa-phone"></i>
                        </div>

                        <div className="inputField">
                            <input type="text" name="work"id="work" autoComplete="off" value={user.work} onChange = {handleInput} placeholder="Your Profession" />
                            <i className="fa-solid fa-briefcase"></i>
                        </div>

                        <div className="inputField">
                            <input type="text" name="password" id="password" autoComplete="off" autoCapitalize="off" value={user.password} onChange = {handleInput} placeholder="Your password" />
                            <i className="fa-solid fa-lock"></i>
                        </div>

                        <div className="inputField">
                            <input type="text"  name="cpassword" id="cpassword" autoComplete="off" autoCapitalize="off" value={user.cpassword} onChange = {handleInput} placeholder="Confirm Your password" />
                            <i className="fa-solid fa-lock"></i>
                        </div>
                        <button type="submit" onClick={postData} className="regBtn">Register</button>
                    </form>

                    <div className="sininImage">
                        <figure>
                            <img src={Sinin} alt="Register" />
                        </figure>
                        <Link to= "/login" className="link">I am already Register</Link>
                    </div>

                </div>
            </div>
        </div>
    </section>
   </>
  );
}

export default Register;
