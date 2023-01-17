import { useNavigate  } from "react-router-dom";
import { useState ,useEffect } from "react";

import axios from "axios";


const Dashboard = ({BASE_URL}) =>{
    
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const fetchUserData = async () => {
    try{
   
        const res = await axios.post(`${BASE_URL}/userdata`,
         {token:localStorage.getItem('token')});
      
            setUserData(res.data);
          console.log("usestate data",userData.fullName);
         
    }
    catch(error){

    }
         }



         

         useEffect(() => {
            fetchUserData();
          }, []);

 
          function Logout(){
            localStorage.removeItem('token');
            navigate('/');
        }
        
        
        

    return (
<body>
    <div className="container">
    <div className="row">
    <h3 className="text-white">Welcome User</h3>
    <h3 className="text-white">{userData?.fullName?userData.fullName:''}</h3>
    <h3 className="text-white">This  Will be A Todo Application</h3>
    <button onClick={Logout} className="btn btn-primary">Logout</button>
              
  </div>
  </div>
 
</body>
    );
}

export default Dashboard;