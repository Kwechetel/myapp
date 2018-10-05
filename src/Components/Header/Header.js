import React from 'react';
import "./Header.css";

const Header = (props) => {
    const style = {
        height: "100%",
        paddingRight: "2vh"
    };
    const userNavStyle = {
        boxShadow: "0 1px 1px #ccc",
        position: "fixed",
        top: "0"
    }

    let userSign = props.user;

    let guest = (
        <React.Fragment>
            <div className="Header">
                <nav>

                    {props.logo}

                    <div style={style} className="pull-right">
                        {props.navName}
                    </div>
                </nav>
            </div>
        </React.Fragment>
    ); 
    let users = (
        <React.Fragment>
            <div style={userNavStyle} className="Header">
                <nav>

                    {props.logo}

                    <div style={style} className="pull-right">
                        {props.userNav}
                    </div>
                </nav>
                <div style={{display: props.menu}} id="navMenu">
                    {props.menuLinks}
                </div>
            </div>
        </React.Fragment>
    );

    return userSign === null? guest : users;
}

export default Header;