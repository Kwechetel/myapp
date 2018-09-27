import React from 'react';
import "./Header.css";

const Header = (props) => {
    const style = {
        height: "100%",
        paddingRight: "2vh"
    }
    return (
        <div className="Header">
            <nav>
                <img id="logo" src="klast-logo.svg" />

                <div style={style} className="pull-right">
                    <button>Log In</button>
                    <button>Sign Up</button>
                </div>
            </nav>
        </div>
    )
}

export default Header;