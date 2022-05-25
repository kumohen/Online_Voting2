import React,{useContext} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../App'

const NavBar = ()=>{
    
     const history = useHistory()
     const {state,dispatch} = useContext(UserContext)
     const currentUser = localStorage.getItem("currentUser")

     console.log("currentUser",currentUser)

    //  const renderList = ()=>{
     
    //    if(state){
    //        return [
            
            
    //         <li key="3"
    //          style={{fontSize:"20px",fontWeight:"600",color:"white",backgroundColor:"grey"}}
    //         onClick={()=>{
    //           localStorage.clear()
    //           dispatch({type:"CLEAR"})
    //           history.push('/signin')
    //         }}
    //         >
    //             Logout
           
    //         </li>
         
            
    //        ]
    //    }else{
    //      return [
    //       // <li key="4"><Link to="/signin" style={{fontSize:"20px",fontWeight:"600"}}>Signin</Link></li>,
    //       // <li key="5"><Link to="/signup" style={{fontSize:"20px",fontWeight:"600"}}>Signup</Link></li>
    //      ]
    //    }
    //  }
    return(
        <nav className='navbar navbar-dark bg-success'>
        <div className="nav-wrapper blue" style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
           
           <div >
           <Link to={state?"/":"/signin"} className="brand-logo center" 
          style={{color:"white",fontSize:"30px",textDecoration:"none",fontFamily:"Acme"}}>Online Voting System</Link>
           </div>
           <div style={{marginLeft:"60px"}}>
           {state && state.isAdmin &&  (
              <li 
              style={{fontSize:"22px",fontWeight:"600",color:"white",float:"right",listStyleType:"none",}}
             
             >
              <Link to="/result" style={{color:"white",textDecoration:"none",fontSize:"20px",fontWeight:"600"}}>
              <i className="fas fa-poll"></i> {" "}Result</Link>
            
             </li>
             
           )}
           </div>
           <div style={{marginLeft:"60px"}}>
           {state && (
              <li 
              style={{fontSize:"22px",fontWeight:"600",color:"white",float:"right",listStyleType:"none",}}
             onClick={()=>{
               localStorage.clear()
               dispatch({type:"CLEAR"})
               history.push('/signin')
             }}
             >
               <i className="far fa-sign-out "></i> {" "} Logout
            
             </li>
           )}
           </div>
         
        </div>
      </nav>
    )
}


export default NavBar