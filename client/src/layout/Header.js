import { propTypes } from "react-bootstrap/esm/Image";
import { NavLink ,useNavigate } from "react-router-dom";
import { useEffect ,useState } from "react";
const Header = (props) =>{
  const[isLogin,logincheck] =useState(props.status);
  console.log("maro",props.status);
  const navigate = useNavigate();
  const logout = () =>{
 localStorage.removeItem('token')
  navigate('/')


  }

  
  useEffect(()=>{
   console.log("kya hua",isLogin)
  },[isLogin])


return (

     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
     
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarsExample05">
        <ul className="navbar-nav ">
         
          <li className="nav-item px-4">
           <NavLink to={"/register"}>
            <a className="nav-link" href="#">Sign Up</a>
            </NavLink>
          </li>
         
          <li className="nav-item px-2">
            <NavLink to={"/"} onClick={logout}>{props.status != null? <a  className="nav-link" href="#">Logout </a> :
            
            <a className="nav-link" href="#">Login </a>}
           
            </NavLink>
          </li>
       
        </ul>
      
      </div>
    </nav>

 
);
}
export default Header;