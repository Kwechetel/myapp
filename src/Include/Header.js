import React from 'react';
import "./Header.css";

const Header = (props) => {
    const style = {
        height: "100%",
        paddingRight: "2vh"
    }

    let userSign = props.user;

    let x = (
        <React.Fragment>
            <div className="Header">
                <nav>
                    <img id="logo" src="klast-logo.svg" />

                    <div style={style} className="pull-right">
                        <button>Log In</button> 
                        <button>Sign Up</button>
                    </div>
                </nav>
            </div>
        </React.Fragment>
    ); 
    let y = (
        <React.Fragment>
            <div className="Header">
                <nav>
                    <img id="logo" src="klast-logo.svg" />

                    <div style={style} className="pull-right">
                    <button>Hi LastK</button><button id="proPic">Last</button>
                    </div>
                </nav>
            </div>
        </React.Fragment>
    );

    return userSign === 1 ? x : y;
}

export default Header;