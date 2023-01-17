import {Routes,Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import NavBar from "./components/Navbar";

import About from "./components/About";

import Header from "./layout/Header";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import './components/app.css'
import Dashboard from "./components/Dashboard";
import { useNavigate  } from "react-router-dom";
import { useEffect ,useState } from "react";


function App () {
  const navigate = useNavigate();
  //  const[isLogin,logincheck] =useState(1);
  // useEffect(()=>{
  //   if(!localStorage.getItem('token')){
  //     navigate('/')
  //     logincheck(0);
  //   }
  //   else{
  //     logincheck(1);
  //   }
 

  // },[isLogin])

   const isLoggedIn =localStorage.getItem('token');
 
//  const BASE_URL = "https://codeapitodo-production.up.railway.app/api/v1";
  const BASE_URL = "http://localhost:4000/api/v1";
return (
  <>
  <Header status={isLoggedIn} />
  <Routes>
  <Route path="/" element={isLoggedIn != null ?<Dashboard BASE_URL={BASE_URL}/>:<LoginPage BASE_URL={BASE_URL}  />}/>
  <Route path="/register" element={<RegisterPage BASE_URL={BASE_URL} />}/>
  <Route path="/About" element={<About />}/>
  <Route path="/welcome" element={<Dashboard BASE_URL={BASE_URL} /> }/>
  </Routes>

  </>
)
}

export default App;