import React, { Component } from 'react';
import './Login.css';

class Login extends Component{

    render() {
        const style = {
            height: "120vh",
            border: "0.3vw solid #00000010"
        }
        return(
            <div style={style} className="appContainer">
                <button onClick={this.props.click}>Log In</button>
            </div>
        );
    }
}
export default Login;