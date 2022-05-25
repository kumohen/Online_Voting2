import React,{useState,useEffect,useContext} from 'react'
import swal from 'sweetalert'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
import Chart from "./Chart";
import Profile from "./Profile";

const Home  = ()=>{
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
       fetch('http://localhost:5000/allpost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
            console.log(result)
           setData(result.posts)
       })
    },[])

    const votePlayer = (id,userId)=>{
        swal({
            title: "Are you sure?",
            text: "Once selected, you will not be able to reselect the options!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                fetch('http://localhost:5000/vote',{
                    method:"put",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        postId:id,
                        userId
                    })
                }).then(res=>res.json())
                .then(result=>{
                         //   console.log(result)
                  const newData = data.map(item=>{
                      if(item._id==result._id){
                          return result
                      }else{
                          return item
                      }
                  })
                  setData(newData)
                }).catch(err=>{
                    console.log(err)
                })  
              swal("You successfully has given your vote!", {
                icon: "success",
              });
            } else {
              swal("Again ,select your option!");
            }
          });
         
    }
   
    let isVote ; 
    if(JSON.parse(localStorage.getItem("user")) !== null){
        isVote = JSON.parse(localStorage.getItem("user"))._id;
    }
   
    const userId = JSON.parse(localStorage.getItem("user")) ?  JSON.parse(localStorage.getItem("user"))._id : null ;
 
    const userIdExist = (data.map(item => item.votes.filter(item => item )));
    let newVlaue = false;
    for(let key of userIdExist) {
      if(key.length > 0 ){
         
         for(let key2 of key){
             if(key2 == isVote){
                newVlaue = true ;
             }
        }
      }
    }
  
   return (
       <div >
           <div className="col-md-8" style={{margin:"auto",paddingTop:"5%"}} >
           <div className='col-md-3' style={{float:"left",border:"1px solid green"}}>
            <Profile />
           </div>
            {/* <div className="col-md-2"  style={{border:"2px solid black"}} ></div> */}
           <div className='col-md-8' style={{float:"right",backgroundColor:"white",padding:"10px"}}>
               
           {
            
               data.map((item,index)=>{
                   return(
                    
                      <div key={item._id} 
                      style={{marginBottom:"10px",backgroundColor:"#f2f4f6",height:"100px",borderRadius:"15px",padding:"25px"}} > 
                        
                       <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}  >
                       <h6><b style={{}}>{index + 1}</b></h6>
                       <h6><b style={{}}>{item.title.split(" ")[0]}</b></h6>
                       
                                <img src={item.photo} style={{height:"200px",width:"200px"}} 
                                style={{width:"60px",height:"60px"}}
                                />
                       
                            <div className="card-content">
                          
                            {!item.votes.includes(state._id ) && newVlaue == false
                            ? 
                           
                            <button  className=" btn btn-success"  style={{}}
                            onClick={()=>{votePlayer(item._id,userId)}}>Vote</button>
                            : ""
                            }
                            {
                                newVlaue ?
                                 <button className="btn disabled" style={{marginLeft:"47px",background:"red"}}>
                                     Already Voted</button> : ""
                            }
                           
                               
                            
                             
                             
                                </div>    
                            </div>

                        </div>
                   
                   )
               })
           }
         </div> 
 
        </div>
       </div>
   )
}


export default Home