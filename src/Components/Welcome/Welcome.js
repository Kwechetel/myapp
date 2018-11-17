import React, { Component } from 'react';
import Typing from 'react-typing-animation';
import Klastloader from '../Klastloader/Klastloader';

import './Welcome.css';


class Welcome extends Component{

    componentDidMount() {
        document.title = "Klast | Welcome!";
    }

    render() {
        const style = {
            margin: "0"
        }
        document.querySelector(".Header").style.background = "none";
        return(
            <div style={style} className="appContainer welcome">
                <div style={{padding: "10vh 10vw", height: "76vh"}} className="hello">
                    <Klastloader />
                    
                    <Typing>
                    <h1>Start your coding journey with us</h1>

                    <Typing.Speed ms={50} />

                    <Typing.Backspace count={20} />

                    </Typing>
                    <h4>Help us make it better</h4>
                    <a href="/about">
                        <input type="button" value="Learn more" style={{
                        backgroundColor: "#1C232E",
                        color: "white",
                        border: "none",
                        padding: "0.5vh 1vh",
                        fontSize: "1.8vh",
                        borderRadius: "0.3vh",
                        cursor: "pointer",
                        outline: "none"
                        }}/>
                    </a>
                </div>
                <div style={{display: "none", background: "#353B4510", padding: "2vh 10vw", height: "65vh"}} className="section">

                </div>
                <div style={{display: "none", padding: "0 10vw", height: "75vh"}} className="section">

                </div>
            </div>
        );
    }
}
export default Welcome;
