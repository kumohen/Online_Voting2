import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const SignUp  = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [city,setCity] = useState("")
    const [mobile,setMobile] = useState("")
    const [branch,setBranch] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])
    const uploadPic = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "voting");
        data.append("cloud_name", "dvfpkko1z");
        fetch("https://api.cloudinary.com/v1_1/dvfpkko1z/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setUrl(data.url);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    const uploadFields = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("http://localhost:5000/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                mobile,city,branch,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    const PostData = ()=>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
       
    }

   return (
      <div className="mycard" style={{width:"35%",marginLeft:"30%"}}>
          <div className="card auth-card input-field">
            <p style={{marginLeft:"30%",fontWeight:"600",fontSize:"30px"}}>Registration</p>
        
            <div >
            <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            style={{border:"2px solid grey",width:"88%",marginLeft:"20px",borderRadius:"5%"}}
            />
            </div> 
      
            <div>
            <input
            type="text"
            placeholder="email"
            value={email}
            style={{border:"2px solid grey",width:"88%",marginLeft:"20px"}}
            onChange={(e)=>setEmail(e.target.value)}
            />
            </div>
            <div>
            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPasword(e.target.value)}
            style={{border:"2px solid grey",width:"88%",marginLeft:"20px"}}
            />
            </div>
            <div>
             <input
            type="text"
            placeholder="branch"
            value={branch}
            onChange={(e)=>setBranch(e.target.value)}
            style={{border:"2px solid grey",width:"88%",marginLeft:"20px"}}
            />
            </div>
            <div>
             <input
            type="text"
            placeholder="city"
            value={city}
            onChange={(e)=>setCity(e.target.value)}
            style={{border:"2px solid grey",width:"88%",marginLeft:"20px"}}
            />
            </div>
            <div>
             <input
            type="text"
            placeholder="mobile"
            value={mobile}
            onChange={(e)=>setMobile(e.target.value)}
            style={{border:"2px solid grey",width:"88%",marginLeft:"20px"}}
            />
            </div>
            <div className="file-field input-field" >
            <div className="btn #64b5f6 green" style={{marginLeft:"20px"}} >
                <span>Upload pic</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])}   />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" style={{border:"1px solid white",}}/>
            </div>
            </div>
            <button className="btn "
             style={{marginLeft:"38%",height:"40px",width:"80px",backgroundColor:'grey'}}
            onClick={()=>PostData()}
            >
                SignUP
            </button>
            <p style={{fontFamily:"Raleway",marginLeft:"115px",fontSize:"17px"}}>
                <Link to="/signin" style={{color:"grey",fontWeight:"600"}}>Already you have an account ?</Link>
            </p>
             
               
         
            
    
        </div>
      </div>
   )
}


export default SignUp