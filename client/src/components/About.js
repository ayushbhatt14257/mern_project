import React, { useState } from "react"
import { useEffect } from "react"
import profileImg from '../image/profile.png'
import {useNavigate} from 'react-router-dom'

const About = () => {
 
  const [userData, setUserData] = useState(0);
  const navigate = useNavigate();

  const callAboutPage =  async () => {
    try {
      const res = await fetch('/about', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if(!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }

    } catch (error) {
      console.log(error);
      navigate('/login');
    }
  }

  useEffect(() => {
    
    callAboutPage();

  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  







  return (
    <>
      <div className="container emo-profile">
        <form method="GET">
          <div className="row">

            <div className="col-md-4 profileImg">
              <img src={profileImg} alt="profile" />
            </div>

            <div className="col-md-6">
              <div className="profileHead">
                <h5>{userData.name}</h5>
                <h6>{userData.work}</h6>
                <p className="profileRating mt-3 mb-5">Rainking<span>1/10</span></p>

                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="home-tab" data-toggle='tab' href="#home" role='tab' aria-controls='home' aria-selected='true'>About</a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" id="profile-tab" data-toggle='tab' href="#profile" role='tab' aria-controls='profile' aria-selected='false'>profile</a>
                  </li>
                </ul>

              </div>
            </div>

            <div className="col-md-2">
              <input type="text" className="profile-edit-btn" placeholder="edit profile" />
            </div>

            <div className="col-md-8 pl-5 about-info">
              <div className="tab-content profile-tab" id="my-tab-content">
                <div className="tab-pan fade show active" id="home" role='tabpanel' aria-labelledby='home-tab'>

                  <div className="row">
                    <div className="col-md-6">
                      <label>User ID</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData._id}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.name}</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.email}</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.phone}</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Profession</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.work}</p>
                    </div>
                  </div>


                </div>

                {/* <div className="tab-pannel-fade" id="profile" role='tabpanel' aria-labelledby='profile-tab'>

                  <div className="row">
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>Ayush Bhatt</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>Ayush Bhatt</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>Ayush Bhatt</p>
                    </div>
                  </div>

                </div> */}
              </div>
            </div>

          </div>
        </form>
      </div>
    </>
  );
}

export default About;
