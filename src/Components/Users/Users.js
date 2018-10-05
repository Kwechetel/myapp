import React, { Component } from 'react';
import './Users.css';

class Users extends Component{

    render() {
        const style = {
            height: "120vh",
            border: "0.3vw solid #00000010",
            marginTop: "6.5vh"
        }
        return(
            <div style={style} className="appContainer">
                <h1>Welcome Users</h1>
            </div>
        );
    }
}
export default Users;