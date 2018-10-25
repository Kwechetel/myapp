import React, { Component } from 'react';
import './Settings.css';
//import axios from 'axios';
import queryString from 'query-string';

//import {Public_URL} from '../Server/Server';

class Settings extends Component{
    
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            surname: "",
            email: "",
            uid: ""
        }

        this.handleChangeUid = this.handleChangeUid.bind(this);
        this.handleOnsubmit = this.handleOnsubmit.bind(this);


    }

    componentDidMount() {
        const qs = queryString;

        const userData = qs.parse(atob(localStorage.getItem("a-utn")));

        this.setState({
            name: userData.name,
            surname: userData.surname,
            email: userData.email,
            uid: userData.username
        })

    }

    handleChangeUid(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleOnsubmit(e) {

        alert(JSON.stringify(this.state));

        //const qs = queryString;

        /*
        
        axios.post(Public_URL+`/includes/signup.inc.php`, qs.stringify({submit:true, first: this.state.first, last: this.state.last, email: this.state.email, uid: this.state.uid, pwd: this.state.pwd}))
        .then(res => {
            //const response = res.data;
        })*/

        e.preventDefault();
    }

    render() {

        return(
            <div id="Settingspage" className="appContainer">
                <div className='forms'>

                    <h1>Settings</h1>
                    <hr/>

                    <form onSubmit={this.handleOnsubmit}>
                    <h4 className="pull-left">Basic Settings</h4>
                        <label>Name: 
                            <input onChange={this.handleChangeUid} type="text" name="name" value={this.state.name} readOnly={this.state.readOnly}/>
                        </label><br/>

                        <label>Surname: 
                            <input onChange={this.handleChangeUid} type="text" name="surname" value={this.state.surname} readOnly={this.state.readOnly} />
                        </label><br/>

                        <label>Email: 
                            <input onChange={this.handleChangeUid} type="email" name="email" value={this.state.email} readOnly={this.state.readOnly} />
                        </label><br/>


                        <label>Username: 
                            <input onChange={this.handleChangeUid} type="text" name="uid" value={this.state.uid} readOnly={this.state.readOnly} />
                        </label><br/>
                        <button type="submit">Save Changes</button>
                    </form>
                </div>

            </div>
        );
    }
}
export default Settings;