import React from 'react'

function Graphind(props) {
    let mytext = props.text ? props.text : "Temperature 1";
    let mycolor = props.color ? props.color : "#8884d8";
    let curval = props.curval ? props.curval : 0;
    let unit = (mytext[0]==='T') ? 'Degree Celcius' : 'mm';
    let mystyle = {
        backgroundColor:mycolor
    }
    return (
      <div class="index-container">
        <div class="text">{mytext}</div>
        <div class="small-box">
          {/* <div class="line" style={mystyle}></div> */}
          {curval}
        </div>
        <div>{unit}</div>
      </div>
    )
}

export default Graphind
