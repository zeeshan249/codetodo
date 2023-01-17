
import { useState  } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const RegisterPage = ({BASE_URL}) =>{
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues); //declare an object with key value pairs and asssign it to formValues
  const [formErrors, setFormErrors] = useState({}); //declare a seperate empty object for errors
  // const [isSubmit, setIsSubmit] = useState(false);  //flag to check whether form cn be submited or not
  // const notify = () => toast("Wow so easy !");
  const submitData = async () => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!formValues.username) {
      errors.username = "Username is required!";
    }
    if (!formValues.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(formValues.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!formValues.password) {
      errors.password = "Password is required";
    } 
 if(Object.keys(errors).length === 0){
    try{
    const data = {
      fullName: formValues.username,
      email: formValues.email,
      password: formValues.password,
    };
    const res = await axios.post(`${BASE_URL}/saveUser`, data);
    //console.log(res.success);
  // alert(res.data.success)
  if(res.status=201 ){
    toast.success(res.data.message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  } catch (error) {
    console.log(error.response.status);
    if(error.response.status=400){
   toast.error(error.response.data.message, {
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
    else{
      toast.error("Server Error", {
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
 

 
  }
}
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // To submit the Data
    setFormErrors(validate(formValues));
    console.log("Set form Errors", formErrors); //should return empty object upon sucessfully entering all data

  submitData()

  };
 

 
 

  const validate = (values) => {
    var errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  
return (
  
 <body>
    <div className="container">
      <pre>{JSON.stringify(formValues,undefined,2)}</pre>
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card login-card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5  display-4 text-white">Register</h5>
            <form onSubmit={handleSubmit}>
             <div className="form-floating mb-3">
                <input type="name"  name="username" className="form-control" id="floatingInput" placeholder=""
                value={formValues.username}
                onChange={handleChange}
                 />
                <label for="floatingInput">Name</label>
                <span className="text-danger">{formErrors.username}</span>
              </div>
              <div className="form-floating mb-3">
                <input type="text"  name="email" className="form-control" value={formValues.email} id="floatingInput" placeholder=""
               onChange={handleChange}
                />
                <label for="floatingInput">Email address</label>
                <span className="text-danger">{formErrors.email}</span>
              </div>
              <div className="form-floating mb-3">
                <input type="password"  name="password" className="form-control" value={formValues.password} id="floatingPassword" placeholder="Password"
               onChange={handleChange}
                />
                <label for="floatingPassword">Password</label>
                <span className="text-danger">{formErrors.password}</span>
              </div>

             
              <div className="d-grid">
                <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Register</button>
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
export default RegisterPage;