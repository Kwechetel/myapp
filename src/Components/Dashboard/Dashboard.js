import React, { Component } from 'react';
import './Dashboard.css';

import queryString from 'query-string';

class Dashboard extends Component{
    state = {
        userid: {}
    }

    componentDidMount() {

        document.title = "Klast | Dashboard";

        const qs = queryString;

        const userData = qs.parse(atob(localStorage.getItem("a-utn")));

        this.setState({userid: userData});

    }

    render() {
        
        return(
            <div id="dashboard" className="appContainer">
                <div id="dashHeader">
                    <div className="proImage pull-left">
                        <img className="avatar" src="/Avatar_1.png" alt="Avatar"/>
                    </div>
                    <div className="userDetails pull-left">
                        <h1>{this.state.userid.name} {this.state.userid.surname}</h1>
                        <h5>{this.state.userid.email} <br/> (@{this.state.userid.username})</h5>
                    </div>
                </div>
            </div>
        );
    }
}
export default Dashboard;