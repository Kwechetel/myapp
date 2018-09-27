import React from 'react';
import "./Header.css";

const Header = (props) => {
    return (
        <div className="Person">
            <p onClick={props.click}>I'm a {props.name} and I am {props.age} old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.onchanged}  value={props.name}/>
        </div>
    )
}

export default Header;