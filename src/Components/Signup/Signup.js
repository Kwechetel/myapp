import React, { Component } from 'react';
import './Signup.css';
import axios from 'axios';
import queryString from 'query-string';

import {Public_URL} from '../Server/Server';

class Signup extends Component{
    
    constructor(props) {
        super(props);

        this.state = {
            first: "",
            last: "",
            email:"",
            uid: "",
            pwd: "",
            readOnly: true
        }

        this.handleChangeUid = this.handleChangeUid.bind(this);
        this.handleOnsubmit = this.handleOnsubmit.bind(this);


    }

    handleChangeUid(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleOnsubmit(e) {

        const qs = queryString;
        
        axios.post(Public_URL+`/includes/signup.inc.php`, qs.stringify({submit:true, first: this.state.first, last: this.state.last, email: this.state.email, uid: this.state.uid, pwd: this.state.pwd}))
        .then(res => {
            const response = res.data;

            if(response === "Signup successfully!") {
                const signupMessage = document.querySelector("#ssmessage");
                
                signupMessage.innerHTML = response;
                signupMessage.style.color = "rgb(140, 224, 125)";

                setTimeout(() => {
                    window.location.replace("/login")
                }, 2000);
            }else {
                alert(response);
            }
        })

        e.preventDefault();
    }

    render() {
        return(
            <div id="Signuppage" className="appContainer">
                <h4 id="ssmessage"> </h4>
                <div className='form'>
                    <form onSubmit={this.handleOnsubmit}>
                        <h2>Sign Up</h2>

                        <label>
                            <input onChange={this.handleChangeUid} onFocus={() => {this.setState({readOnly: false})}} type="text" name="first" placeholder="Name" readOnly={this.state.readOnly} required/>
                        </label>

                        <label>
                            <input onChange={this.handleChangeUid} onFocus={() => {this.setState({readOnly: false})}} type="text" name="last" placeholder="Surname" readOnly={this.state.readOnly} />
                        </label>

                        <label>
                            <input onChange={this.handleChangeUid} onFocus={() => {this.setState({readOnly: false})}} type="email" name="email" placeholder="Email" readOnly={this.state.readOnly} />
                        </label>


                        <label>
                            <input onChange={this.handleChangeUid} onFocus={() => {this.setState({readOnly: false})}} type="text" name="uid" placeholder="Username" readOnly={this.state.readOnly} />
                        </label>

                        <label>
                            <input onChange={this.handleChangeUid} onFocus={() => {this.setState({readOnly: false})}} type="password" name="pwd" placeholder="Password" readOnly={this.state.readOnly} />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                    <div style={{cursor: "text"}} className="btnx">Don't have an account? {this.props.anchor}</div>
                </div>

            </div>
        );
    }
}
export default Signup;