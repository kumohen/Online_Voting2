import React,{useEffect} from 'react';
import { useHistory} from 'react-router-dom'
const Profile = () => {
    const history = useHistory();

    const userInfor =JSON.parse(localStorage.getItem("user"));
  
      
      
   
    return (
        <div  >
           
                {
                    userInfor !== null ?
                    <div className="card"style={{padding:"10px"}} >
                    <p style={{textAlign:"center"}}><b>{userInfor.firstname}</b></p>
                    <img src={userInfor.pic} style={{height:"140px",width:"140px",borderRadius:"50%",marginLeft:"27%",marginBottom:"10px"}} />
                    <p><b>Name : </b>{userInfor.firstname}{" "}{userInfor.lastname}</p>
                    <p><b>Branch : </b>{userInfor.branch}</p>
                    <p><b>Reg.No : </b>{userInfor.mobile}</p>
                    <p><b>City : </b>{userInfor.city}</p>
                    <p><b>State : </b>{userInfor.stateName}</p>
                    </div>
                    : ""
                }
          
           
        </div>
    );
};

export default Profile;