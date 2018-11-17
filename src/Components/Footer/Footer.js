import React from 'react';
import './Footer.css';

const Footer = (props) => {
    const main = (
        <div className="Footer mainFooter row">
            {props.childrenMain}
        </div>
    );

    const min = (
        <div className="Footer minFooter row">
            {props.childrenMin}
        </div>
    );

    const location = window.location.pathname;
    return (
        location === "/" ? (props.isUserLogged === null ? min : main): location.startsWith("/learn/tryme") || location.startsWith("/login") || location.startsWith("/signup") ? true :  main 
    );
}

export default Footer;