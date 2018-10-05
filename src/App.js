import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import Welcome from './Components/Welcome/Welcome';
import Users from './Components/Users/Users';
import Dashboard from './Components/Dashboard/Dashboard';
import Testrespo from './Components/Tryme/Testrespo';
import Codemirror from './Components/Tryme/Tryme';
import {BrowserRouter as Router, NavLink, Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';



class App extends Component {

  state = {
    login: null,
    usermenu: "none"
  }

  componentDidMount() {
    axios.post(`http://server.klast.academy/includes/login_react.php`)
    .then(res => {
        const respo = res.data;
        const newstatus = respo[0].login === "true"? true : null;
        this.setState({login: newstatus});
        console.log(respo);
    })
  }

  onClickEventLogin = () => {
    this.setState({login: true});
  }
  onClickEventLoginOut = () => {
    this.setState({login: null, usermenu: "none"});
  }  
  onClickUserMenu = () => {
    let menuNone = "block";
    let menuBlock = "none";
    let currentState = this.state.usermenu;
    let newState = menuNone;
    currentState === "none" ? newState = menuNone : newState = menuBlock
    this.setState({usermenu: newState});
  }
  
  
  render() {
  
    return (
      <Router>
        <div className="App">

          {/*Page Header*/}
        
          <Header menu={this.state.usermenu} user={this.state.login} 
            navName={
              <React.Fragment>
                <NavLink to='/tryme'><button style={{
                  background: "#1C232E", height: "auto", color: "white", fontSize: "1.5vh", padding: "0.5vh 1vh"
                  }}>Try Me</button></NavLink>
                <NavLink to='/login'><button>Log In</button></NavLink>
                <NavLink to='/signup'><button>Sign Up</button></NavLink>
              </React.Fragment>
            } 
            logo={
              <NavLink to='/'><img id="logo" src="/klast-logo.svg" alt= "Logo" /></NavLink>
            }
            userNav={
              <React.Fragment>
                <NavLink to='/course/javascript'><button>Learn</button></NavLink>
                <button className="name">Hi LastK</button>
                <button onClick={this.onClickUserMenu.bind(this)} id="proPic"></button>
              </React.Fragment>
            }
            menuLinks={
              <React.Fragment>
                <NavLink to='/dashboard'><button onClick={this.onClickUserMenu.bind(this)}>Dashboard</button></NavLink>
                <NavLink to='/'><button onClick={this.onClickEventLoginOut}>Log Out</button></NavLink>
              </React.Fragment>
            }
          />

          {/*Public/Guest home page*/}

          <Route path='/' exact strict render={
            () => {
              return (
                this.state.login === null ? <Welcome /> : <Redirect to="/home" />
              );
            }
          }/>

          {/*Users home page*/}

          <Route path='/home' exact strict render={
            () => {
              return (
                this.state.login === true ? <Users /> : <Redirect to="/" />
              );
            }
          }/>

          {/*Log In page*/}

          <Route path='/login' exact strict render={
            () => {
              return (
                this.state.login === null ? (<Login click={this.onClickEventLogin} />) : (<Redirect to="/" />)

              );
            }
          }/>

          {/*Dashboard page*/}

          <Route path='/dashboard' exact strict render={
            () => {
              return (
                this.state.login === null ? (<Redirect to="/" />) :  <Dashboard />
              );
            }
          }/>

          {/*Sign Up page*/}

          <Route path='/signup' exact strict render={
            () => {
              return (
                <React.Fragment>
                  <h1>Sign up here</h1>
                  <Testrespo />
                </React.Fragment>
              );
            }
          }/>

          {/*Sample course page*/}

          <Route path='/tryme' exact strict render={
            () => {
              return (
                
                this.state.login === null ? <Codemirror /> : (<Redirect to="/" />)
                
              );
            }
          }/>

          <Route path='/course/javascript' exact strict render={
            () => {
              return (
                 <h1>Start Learning</h1>
              );
            }
          }/>

          <Footer/>
          

        </div>
      </Router>
    );

    }
}

export default App;
