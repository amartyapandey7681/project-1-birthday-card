import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";

let url = "https://api.github.com/users";


function App(){

  const [data,changeData] = useState([]);
  const [arr,changeArr] = useState(true);


  useEffect(()=>{

    fetch(url).then((val)=>{

      if(val.status>=200 && val.status<=299)
        return val.json();
      else{

        throw new Error(val.statusText);
      }
    }).then((val)=>{

      changeData(val);
      

    }).catch((err)=>{

      console.log(err);
    })

  },[]);


  if(data.length === 0 && arr){

    return (<>
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </>)
  }

  if(!arr){

    return (<>
        <h2>0 birthdays today</h2>
        <div></div>
        <button type="click"  className = "btn" onClick = {()=>changeArr(false)}>Clear All</button>
      </>)
  }


  function fiveBirthdays(){

    let a = [];

    for(let x=0;x<5;x++){

      a.push(<div key = {data[x].id} className="info">

        <img src={data[x].avatar_url} style={{width:"80px" , height:"80px"}} alt="avatar id"/>

        <div style={{width: "80px", height: "80px" ,float:"right"}} className="shift">
        
          <div className='text'>{data[x].login}</div>
          <div className="age">{data[x].id * Math.ceil((Math.random() *10))} years</div>
          
        </div>
        
      </div>)
    }

    return a;

  }

  let g = fiveBirthdays();
  

  return (<>
    <h2>{g.length} birthdays today</h2>
    <div>{g}</div>
    <button type="click" className = "btn" onClick = {()=>changeArr(false)}>Clear All</button>
  </>);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
