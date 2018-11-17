import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';

import {Public_URL} from '../Server/Server';

import './Login.css';

import {setCookie} from '../Cookies/Cookies';

class Login extends Component{

    constructor(props) {
        super(props);

        this.state = {
            uid: null,
            pwd: "",
            readOnly: true
        }

        this.handleChangeUid = this.handleChangeUid.bind(this);
        this.handleOnsubmit = this.handleOnsubmit.bind(this);


    }

    componentDidMount() {
        document.title = "Klast | Log In";
    }

    handleChangeUid(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleOnsubmit(e) {

        const qs = queryString;
        
        axios.post(Public_URL+`/includes/login.inc.php`, qs.stringify({submit:true, uid: this.state.uid, pwd: this.state.pwd}))
        .then(res => {
            const response = res.data;

            //Set verification

            setCookie("a-vi", btoa(response[0].id), 5);
            
            let x = qs.stringify(response[0]);

            let encodAccess = btoa(x);

            if(typeof(response) === "object") {

                //localStorage.setItem("a-utn", encodAccess);
                localStorage.setItem("a-utn", encodAccess);

                window.location.replace("/");
            }else {
                alert(response);
            }
        })

        e.preventDefault();
    }

    render() {
        const form = (
            <div className='form'>
                    <h2>Log In</h2>
                <form onSubmit={this.handleOnsubmit}>
                    <label>
                        <input onChange={this.handleChangeUid} onFocus={() => {this.setState({readOnly: false})}} type="text" name="uid" placeholder="Email" readOnly={this.state.readOnly} />
                    </label>

                    <label>
                        <input onChange={this.handleChangeUid} onFocus={() => {this.setState({readOnly: false})}} type="password" name="pwd" placeholder="Password" readOnly={this.state.readOnly} />
                    </label>
                    <button type="submit">Log In</button>
                </form>

                <button className="btnx">I forgot password?</button>
                <div type="text" style={{cursor: "text"}} className="btnx">Don't have an account? {this.props.anchor}</div>
            </div>
        );


        return(
            <div id="logpage" className="appContainer">
                 {this.props.logged === null ? form : <button id="logmessage">You logged successfully</button>}               
            </div>
        );
    }
}
export default Login;