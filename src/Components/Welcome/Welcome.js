import React, { Component } from 'react';
import './Welcome.css';

class Welcome extends Component{

    render() {
        const style = {
            margin: "0",
        }
        return(
            <div style={style} className="appContainer">
                <div style={{padding: "10vh 10vw", height: "94vh"}} className="hello">
                    <h1>Welcome Home</h1>
                </div>
                <div style={{background: "#353B4510", padding: "2vh 10vw", height: "65vh"}} className="section">

                </div>
                <div style={{padding: "0 10vw", height: "75vh"}} className="section">

                </div>
            </div>
        );
    }
}
export default Welcome;
