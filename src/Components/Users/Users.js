import React, { Component } from 'react';
import './Users.css';

class Users extends Component{

    componentDidMount() {
        document.title = "Klast | Code School";
    }

    render() {
        return(
            <div className="appContainer">
                <h1>Welcome Users</h1>
            </div>
        );
    }
}
export default Users;