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
  const [datalen, setDatalen] = useState(15);
  const [maindata, setMaindata] = useState([]);

  // console.log(datalen);
  // let arr=[];
  // arr[1] = 'First element';
  // arr[3] = 'Third element';

  // useEffect(()=>{
  //   console.log(datalen);
  //   setDatalen2(datalen);
  //   console.log(datalen2);
  //   if(datalen<maindata.length){
  //     setMaindata((prevd)=>{
  //       let arr = [];
  //       for(let i=0; i<datalen; i++){
  //         arr.push(prevd[prevd.length-datalen+i]);
  //       }
  //       return arr;
  //     })
  //     console.log('In uE datalen');
  //     console.log(maindata);
  //   }
  // },[datalen]);

  useEffect(()=>{
    // console.log(`two ${datalen2}`);
    socket.on('deflection_data', (socketdata)=>{
      // console.log(`three ${datalen2}`);
      setMaindata((prevd)=>{
        // console.log(`prevd.length=${prevd.length}`);
        // console.log(`datalen=${datalen2}`);
        if(prevd.length<datalen){
          let myid = prevd.length+1;
          let arr = prevd;
          arr.push({
            id:myid,
            temperature1:socketdata.temp1,
            temperature2:socketdata.temp2,
            temperature3:socketdata.temp3,
            deflection:socketdata.deflection,
            date:socketdata.date,
            time:socketdata.time,
            sr: myid});
          console.log('In uE prel<datalen');
          console.log(arr);
          return arr;
        }
        if(prevd.length===0 && datalen>0){
          return [{
            id:1,
            temperature1:socketdata.temp1,
            temperature2:socketdata.temp2,
            temperature3:socketdata.temp3,
            deflection:socketdata.deflection,
            MLmodel:socketdata.MLmodel,
            date:socketdata.date,
            time:socketdata.time,
            sr: 1}];
        }
        let arr = prevd.map((item,i)=>{
          if(i===(prevd.length-1)){
            return {
              id:1,
              temperature1:socketdata.temp1,
              temperature2:socketdata.temp2,
              temperature3:socketdata.temp3,
              deflection:socketdata.deflection,
              date:socketdata.date,
              time:socketdata.time,
              sr: prevd.length};
          }
          else{
            let ni = prevd[i+1];
            ni.id = i;
            ni.sr = i+1;
            return ni;
          }
        });
        console.log('In socket')
        console.log(arr);
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


