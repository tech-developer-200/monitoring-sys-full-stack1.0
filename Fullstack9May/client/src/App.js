import React from 'react'
import { useState, useEffect } from 'react'
import {tdata2} from './tabledata.js'
import Home from './Home'
import Sidebar from './Sidebar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Table from './table.js'
import Graph1 from './graph1.js'
import Graph2 from './graph2.js'
import Graph3 from './graph3.js'
import Dataload from './dataload.js'
import {io} from 'socket.io-client'

const socket = io.connect("http://localhost:5000");

function App() {
  // socket.on('timestamp', (data)=> {
  //   console.log(data.time)
  // })
  let datalen = 16;
  const [maindata, setMaindata] = useState(()=>{
    let arr = [];
    for(let i=0; i<datalen; i++){
      let myid = i+1;
      arr.push({id:myid, sr:myid});
    }
    return arr;
  });
  useEffect(()=>{
    socket.on('deflection_data', (socketdata)=>{
      setMaindata((prevd)=>{
        let arr = prevd.map((item,i)=>{
          let myid = prevd.length+1;
          if(prevd.length<datalen){
            return {
              id:myid,
              temperature1:socketdata.temp1,
              temperature2:socketdata.temp2,
              temperature3:socketdata.temp3,
              deflection:socketdata.deflection,
              MLmodel:socketdata.MLmodel,
              date:socketdata.date,
              time:socketdata.time,
              sr: myid};
          }
          else{
            let ni = prevd[i-1];
            ni.id = i;
            ni.sr = i+1;
            return ni;
          }
        });
        return arr;
      })
    })
  },[socket]);
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<main><Sidebar/><Home/></main>}/> */}
        <Route path="/" element={<Home/>}/>
        <Route path="/table" element={<Table maindata={maindata}/>}/>
        <Route path="/graph1" element={<Graph1 maindata={maindata}/>}/>
        <Route path="/graph2" element={<Graph2 maindata={maindata}/>}/>
        <Route path="/graph3" element={<Graph3 maindata={maindata}/>}/>
        <Route path="/dataload" element={<Dataload maindata={maindata}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export {socket};
export default App


