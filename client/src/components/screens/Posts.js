import React,{useState,useEffect} from 'react'



const Posts  = ()=>{
    const [data,setData] = useState([])
  
    useEffect(()=>{
       fetch('http://localhost:5000/posts',{
         
       }).then(res=>res.json())
       .then(result=>{
         
           setData(result.posts)
       })
    },[])


   
   const  renderData = data.map((item) => (
        <div style={{width:"207px",height:"200px",border:"1px solid grey",marginLeft:"10px",
        float:"left",marginBottom:"15px",background:"white",borderRadius:"15px"}}  key={item.title}>
       
           
            <p style={{textAlign:"center"}}><b >{item.title.split(" ")[0]}</b></p>
            <img src={item.photo} style={{height:"130px",width:"140px",marginLeft:"31px",borderRadius:"10%"}} />
                 
            {/* <p style={{textAlign:"center"}}><b >{item.votes.length > 1 ?  item.votes.length  + " votes" :  + item.votes.length + " vote" }</b></p> */}
            </div>
        
     
    ))
  
   return (
       <div className="home">
           <div  style={{width:"450px",height:"500px"}}>
           {renderData}
           </div>
       </div>   
   )   
}


export default Posts