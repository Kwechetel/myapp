import React, { Component } from 'react';
import './Settings.css';
import axios from 'axios';
import queryString from 'query-string';
import {getCookie} from '../Cookies/Cookies';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import {Public_URL} from '../Server/Server';

class Settings extends Component{
    
    constructor(props) {
        super(props);

        this.state = {
            first: "",
            last: "",
            email: "",
            uid: "",
            old_pwd: "",
            pwd: "",
            conf_pwd: "",
            readOnly: true
        }

        this.handleChangeUid = this.handleChangeUid.bind(this);
        this.handleOnsubmit = this.handleOnsubmit.bind(this);

        this.handleOnsubmitPwd = this.handleOnsubmitPwd.bind(this);

    }

    componentDidMount() {

        document.title = "Setting";
        
        const qs = queryString;

        const userData = qs.parse(atob(localStorage.getItem("a-utn")));

        this.setState({
            first: userData.name,
            last: userData.surname,
            email: userData.email,
            uid: userData.username
        })

        const getNotify = localStorage.getItem("s-stin");

        if(getNotify !== null) {
            document.querySelector(".Notify").style.display = "block";
        }

        localStorage.removeItem("s-stin");

    }

    handleChangeUid(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleOnsubmit(e) {

        const qs = queryString;

        const usid = atob(getCookie("a-vi"));
        
        axios.post(Public_URL+`/includes/settings.inc.php`, qs.stringify({submit_basic:true, id:usid, first: this.state.first, last: this.state.last, email: this.state.email, uid: this.state.uid}))
        .then(res => {
            const response = res.data;

            if(typeof(response) === "object") {
                let x = qs.stringify(response[0]);

                let encodAccess = btoa(x);
                localStorage.setItem("a-utn", encodAccess);
                localStorage.setItem("s-stin", "changes saved");
                window.location.replace('/settings');
            }else {
                alert(JSON.stringify(response));
                
            }
        })

        e.preventDefault();
    }

    handleOnsubmitPwd(event) {
        const qs = queryString;

        const usid = atob(getCookie("a-vi"));

        if(this.state.pwd < 8) {
            alert("Password must have at least 8 characters");
        }else {
            if(this.state.pwd === this.state.conf_pwd) {
                axios.post(Public_URL+`/includes/settings.inc.php`, qs.stringify({submit_pwd:true, id:usid, old_pwd: this.state.old_pwd, pwd: this.state.pwd}))
                .then(res => {
                    const response = res.data;
                    if(response === "Wrong password") {
                        alert(response);
                    }else {
                        localStorage.setItem("s-stin", "changes saved");
                        window.location.replace('/settings');
                        alert(response);
                    }
                })            
            }else {
                document.querySelector('.confirmedPwd').style.borderColor = "red";
                document.querySelector('#confirmInf').style.display = "block";

                alert("Confirmed password not match");
            }
        }

        event.preventDefault();
    }

    onKeyDownBasic() {
        document.querySelector("#basicBtn").removeAttribute("disabled");
    }

    onKeyDownPwd() {
        document.querySelector("#pwdBtn").removeAttribute("disabled");
    }

    closeNotify() {
        document.querySelector(".Notify").style.display = "none";
    }

    render() {

        return(
            <div id="Settingspage" className="appContainer">

                <div className="Notify" style={{
                    display: "none",
                    position: "relative",
                    width: "75vw",
                    padding: "0.01vh 0",
                    left: "12.5vw",
                    top: "10vh",
                    boxShadow: "0 0 0.3vh rgba(0, 0, 0, 0.287)",
                    fontSize: "1.5vh",
                    background: "#f4f8f9"
                }}>

                    <p>Changes saved successfully!</p>

                    <button style={{
                        position: "absolute",
                        height: "100%",
                        right: "1vw",
                        top: "0",
                        fontSize: "1.5vh",
                        fontWeight: "lighter",
                        border: "none",
                        background: "none",
                        cursor: "pointer"
                    }}
                    onClick={this.closeNotify}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>

                </div>
                <div className='forms'>

                    <div>

                    <h1>Settings</h1>
                    <hr/>
                    
                    <form onSubmit={this.handleOnsubmit}>
                    <h4 className="pull-left">General Settings</h4>
                        <label>Name: 
                            <input onKeyDown={this.onKeyDownBasic} onChange={this.handleChangeUid} type="text" name="first" value={this.state.first}/>
                        </label><br/>

                        <label>Surname: 
                            <input onKeyDown={this.onKeyDownBasic} onChange={this.handleChangeUid} type="text" name="last" value={this.state.last}/>
                        </label><br/>

                        <label>Email: 
                            <input onKeyDown={this.onKeyDownBasic} onChange={this.handleChangeUid} type="email" name="email" value={this.state.email}/>
                        </label><br/>


                        <label>Username: 
                            <input onKeyDown={this.onKeyDownBasic} onChange={this.handleChangeUid} type="text" name="uid" value={this.state.uid}/>
                        </label><br/>
                        <button id="basicBtn" type="submit" disabled>Save Changes</button>
                    </form>

                    </div>
                    <br/>

                    <div>
                    <hr/>

                    <form onSubmit={this.handleOnsubmitPwd}>

                        <h4 className="pull-left">Change Password</h4>

                        <label>Old Password: 
                            <input onFocus={() => {this.setState({readOnly: false})}} onChange={this.handleChangeUid} type="password" name="old_pwd" placeholder="Old password" readOnly={this.state.readOnly}/>
                        </label><br/>

                        <label>New Password: 
                            <input onFocus={() => {this.setState({readOnly: false})}} onChange={this.handleChangeUid} type="password" name="pwd" placeholder="New password" readOnly={this.state.readOnly}/>
                        </label><br/>

                        <label>Confirm New Password: 
                            <input onFocus={() => {this.setState({readOnly: false})}} className="confirmedPwd" onKeyDown={this.onKeyDownPwd} onChange={this.handleChangeUid} type="password" name="conf_pwd" placeholder="new password" readOnly={this.state.readOnly}/>
                        </label><br/>
                        <label id="confirmInf" style={{fontSize: "1.5vh", color: "red", display: "none"}}>Confirmed password not match <br/><br/></label>
                        <span id="confirmInf" style={{fontSize: "1.5vh"}}>Password must not less than 8 characters</span><br/>

                        <button id="pwdBtn" type="submit" disabled>Save Changes</button>
                    </form>

                    </div>

                </div>

            </div>
        );
    }
}
export default Settings;