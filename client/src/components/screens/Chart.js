import React,{useState,useEffect} from 'react';
import {Bar,Line,Pie} from 'react-chartjs-2';
const Chart = () => {
   // const [data,setData]= useState([]);

   const[element,setElement]=useState([])

    const[labels,setLabels]=useState(['January', 'February', 'March','April', 'May'])
    const[datasets,setDatesets]= useState(
        [
                {
                  label: 'Covid-19',
                 
                  backgroundColor: [
                    '#B21F00','#161750','#12BD93 ','#57BD12 '
                  
                  ],
                  borderColor: 'rgba(0,0,0,1)',
                  borderWidth: 2,
                  data: [65, 59, 80]
                }
              ]
    )

    useEffect(()=>{
        fetch('http://localhost:5000/allpost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setLabels(result.posts.map(item => item.title))
           setElement(result.posts.map(item => item.votes.length));
        })
     },[])       
  
     datasets.forEach(item => {
         item.data = element ;
     })

      const statedata = {
        labels,datasets
      }
    
  return (
        <div>

        
        <div style={{height:"400px",width:"60%",marginBottom:"50px",marginTop:"50px",marginLeft:"20%"}}>
          <Pie
            data={statedata}
            options={{
              title:{
                display:true,
                text:'Covid-19 active case',
                fontSize:20
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
          />
        </div>
     
     
     
        </div>
    );
};

export default Chart;