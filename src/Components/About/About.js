import React, { Component } from 'react';
import './About.css';

class About extends Component{

    componentDidMount() {
        document.title = "Klast | About";
    }

    render() {
        
        return(
            <div id="About" className="appContainer">
                <div className="aboutHeader">
                    <h1 style={{fontSize: "3em", fontWeight: "lighter"}}>Make coding a basic knowledge <br/>for everyone is our passion</h1>
                    <p>Do you want to get involved? <span style={{color: "#1C232E"}}><strong>learn more</strong></span></p>
                </div>

                <div className="abtCont">
                    <h3>About Klast Academy</h3>
                    <p><strong>Klast Academy</strong> is an educational platform dedicates to bring your ideas to life through
                    offering coding courses. We are striving to build and give you better skills which helps to solve complicated
                    problems. We build it for you and for your future.</p>
                </div>

                <div className="abtCont">
                    {
                        //<h3>Vision</h3>
                    }
                </div>

            </div>
        );
    }
}
export default About;