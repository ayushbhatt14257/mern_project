import React,{createContext, useReducer} from "react"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import About from "./components/About"
import Contact from "./components/Contact"
import Login from "./components/Login"
import Register from "./components/Register"
import Logout from "./components/Logout"
import { Route, Routes} from "react-router-dom"
import "./index.css";
import { initialState,reducer } from "../src/reducer/UseReducer"

export const userContext = createContext();

const Routing = () => {
  return (
    <>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={< Register />} />
      <Route path="/logout" element={< Logout />} />
    </Routes>
    </>
  );
}

const App = () => {
  
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
    <userContext.Provider value={{state, dispatch}}>

      <Navbar />
      <Routing/>

    </userContext.Provider>
    </>
  );
}

export default App;
