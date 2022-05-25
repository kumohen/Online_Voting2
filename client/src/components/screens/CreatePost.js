import React,{useState,useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'
const CretePost = ()=>{
    const [data,setData] = useState([])
  
    useEffect(()=>{
       fetch('http://localhost:5000/posts',{
         
       }).then(res=>res.json())
       .then(result=>{
         
           setData(result.posts)
       })
    },[])
    let total = 0;
    
    data.map(item => {
        total += (item.votes.length);
    })
    
  

 

   return(
  

    <div>
        <table style={{width:"80%",marginTop:"50px",marginLeft:"10%"}}>
        <thead style={{fontSize:"22px"}}>
          <tr>
              <th >Option</th>
              <th>Symbol</th>
              <th>Vote</th>
              <th>Persentage Vote</th>
          </tr>
        </thead>

        {
            data.map(item => (
                <tbody key={item.title} style={{padding:"5px"}}>
                <tr >
                   <td>{item.title}</td>
                
                  <td>
                  <img src={item.photo} 
                                style={{width:"150px",height:"150px",paddingTop:"10px",paddingBottom:"10px"}}
                                />
                  </td>
                  <td style={{fontSize:"19px",fontWeight:"700"}}>{item.votes.length}</td>
                  <td>{((item.votes.length/total)*100).toFixed(2)}%</td>
                </tr>
              
              </tbody>
            ))
        }
      </table>
      <p style={{fontSize:"30px"}}><b style={{marginLeft:"39%",backgroundColor:"white",marginTop:"150px"}}>Total counting Vote : {total}</b></p>
    </div>
   )
}


export default CretePost