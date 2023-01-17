import { NavLink ,useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState ,useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
const LoginPage = ({BASE_URL}) =>{
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setUserInfo(data);
   
    try{
   
      const res = await axios.post(`${BASE_URL}/loginUser`, data);
    
    
      if(res.data.success==true){
        localStorage.setItem('token',res.data.user.token);
        toast.success('🦄 Login Successfull Redirecting....', {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      
            setTimeout(()=>{
         
              navigate('/welcome');
              },3000);
        
      }
      else if(res.data.success==false ){
       
        toast.error(res.data.message, {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }
    } catch (error) {
      console.log("wtf",error);
      toast.error('🦄 Server Error', {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
    // To submit the Data
 
  };
  console.log(errors);
return (
  /* "handleSubmit" will validate your inputs before invoking "onSubmit".. */
 <body>
    <div className="container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card login-card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5  display-4 text-white">Sign In</h5>
            {/* <pre className="text-white">{JSON.stringify(userInfo, undefined, 2)}</pre> */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-floating mb-3">
                <input type="text" name="email" className="form-control" id="floatingInput" placeholder="name@example.com" 
              {...register("email", {
                required: true,
                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
              })}
                />
                   {errors.email && errors.email.type === "required" && (
          <span className="text-danger">Email Is Required</span>
          )}
          {errors.email && errors.email.type === "pattern" && (
          <span className="text-danger">Email Format is Invalid</span>
          )}
                <label for="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" name="password" className="form-control" id="floatingPassword" placeholder="Password" 
                 {...register("password", {
                  required: true,
                
                })}
                />
                   {errors.password && errors.password.type === "required" && (
             <span className="text-danger">Password is Required</span>
          )}
       
                <label for="floatingPassword">Password</label>
              </div>

              <div className="form-check mb-3 ">
                <NavLink to={'/register'}>
                    <a className="link-light"> Not Registered ? Click Here To Register</a>
               
                </NavLink>
            
           
              </div>
              <div className="d-grid">
                <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Sign
                  in</button>
              </div>
        
            </form>
          </div>
        </div>
      </div>
  </div>
  </div>
  <ToastContainer />
</body>
 
);
}
export default LoginPage;