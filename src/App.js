import React, { Component } from 'react';
import axios from 'axios';
import ScrollToTop from 'react-router-scroll-top';

import queryString from 'query-string';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab, faTwitterSquare, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
//import { faTwitterSquare } from '@fortawesome/free-solid-svg-icons';

import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Welcome from './Components/Welcome/Welcome';
import Users from './Components/Users/Users';
import Dashboard from './Components/Dashboard/Dashboard';
import Library from './Components/Library/Library';
import Privacy from './Components/Privacy/Privacy';
import About from './Components/About/About';
//import Testrespo from './Components/Tryme/Testrespo';
import Codemirror from './Components/Tryme/Tryme';
import {BrowserRouter as Router, Link, NavLink, Switch, Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';

import {Public_URL} from './Components/Server/Server';

import {getCookie} from './Components/Cookies/Cookies';

library.add(fab, faTwitterSquare, faFacebookSquare);


class App extends Component {

  state = {
    login: true,
    user: {},
    usermenu: "none"
  }

  componentDidMount() {

    const qs = queryString;

    //alert();

    const checkAccess = localStorage.getItem("a-utn");

    if(checkAccess !== null) {
      const getUser = qs.parse(atob(checkAccess));

      if(atob(getCookie("a-vi")) === getUser.id) {

        axios.post(Public_URL+`/includes/login_react.php`, qs.stringify({submit:true, id: getUser.id}))
        .then(res => {
            const respo = res.data;

            if(respo === "ok") {
              this.setState({user: getUser});
            }else {
              //alert(respo);
              localStorage.removeItem("a-utn");
              //this.onClickEventLoginOut().bind(this);
              window.location.replace("/account");
            }
            
        })

      }else {
        this.onClickEventLoginOut().bind(this);
      }
    }else {
      this.setState({login: null});
    }
  }

  onClickEventLogin = () => {
    this.setState({login: true});
  }
  onClickEventLoginOut = () => {
    localStorage.removeItem("a-utn");
    window.location.replace("/");
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

    const location = window.location.pathname;

    const notFound = () => {
      return(
      <div className="appContainer" style={{height: "60vh"}}>
        <h1 style={{fontSize: "5em"}}>404</h1>
        <h3>The requested page cannot be found!</h3>
        <p>The page <strong>({location})</strong> you are looking for was moved, removed, renamed or might never existed.</p>
        <a href="/"><button>Go Home</button></a>
      </div>
      );
    }
  
    return (
      <Router>
        <ScrollToTop>
        <div className="App">

          {/*Page Header*/}
        
          <Header menu={this.state.usermenu} user={this.state.login} 
            navName={
              <React.Fragment>
                <NavLink to='/tryme/1'><button style={{
                  background: "#1C232E", height: "auto", color: "white", fontSize: "1.5vh", padding: "0.5vh 1vh"
                  }}>Try Me</button></NavLink>
                <NavLink to='/login'><button>Log In</button></NavLink>
                <NavLink to='/signup'><button>Sign Up</button></NavLink>
              </React.Fragment>
            } 
            logo={
              <NavLink to='/'><img className="pull-left" id="logo" src="/klast-logo.svg" alt= "Logo" /></NavLink>
            }
            userAccess={
              <React.Fragment>
                <NavLink to='/'><button className="pull-left">Home</button></NavLink>
                <NavLink to='/library'><button className="pull-left">Library</button></NavLink>
                <NavLink to='/dashboard'><button>Dashboard</button></NavLink>
              </React.Fragment>
            }
            userNav={
              <React.Fragment>
                <button className="name">Hi {this.state.user.name}</button>
                <button onClick={this.onClickUserMenu.bind(this)} id="proPic"></button>
              </React.Fragment>
            }
            menuLinks={
              <React.Fragment>
                <div id="menuTangle"></div>
                <NavLink to='/dashboard'><button onClick={this.onClickUserMenu.bind(this)}>Dashboard</button></NavLink>
                <NavLink to='/settings'><button onClick={this.onClickUserMenu.bind(this)}>Settings</button></NavLink>
                <NavLink to='/'><button onClick={this.onClickEventLoginOut}>Log Out</button></NavLink>
              </React.Fragment>
            }
          />
          

          {/*Public/Guest home page*/}

          <Switch>

          <Route path='/' exact strict render={
            () => {
              return (
                this.state.login === null ? <Welcome /> : <Users />
              );
            }
          }/>

          {/*Library page*/}

          <Route path='/library' exact strict render={
            () => {
              return (
                this.state.login !== null ? (<Library />)  : (<Redirect to="/" />)
              );
            }
          }/>
          
          {/*Dashboard page*/}

          <Route path='/dashboard' exact strict render={
            () => {
              return (
                this.state.login !== null ? (<Dashboard />)  : (<Redirect to="/" />)
              );
            }
          }/>

          {/*User Settings page*/}

          <Route path='/settings' exact strict render={
            () => {
              return (
                this.state.login === true ? (<div className="appContainer"><h1>Settings</h1></div>) : (<Redirect to="/" />)
              );
            }
          }/>

          {/*Log In page*/}

          <Route path='/login' exact strict render={
            () => {
              return (
                <Login click={this.onClickEventLogin}
                anchor={<Link to="/signup"><span style={{color: "rgb(68, 56, 80)", fontSize: "1.95vh", fontWeight: "bold"}}>Sign up</span></Link>}
                logged={this.state.login} />
              );
            }
          }/>

          {/*Sign Up page*/}

          <Route path='/signup' exact strict render={
            () => {
              return (
                this.state.login === null ? (
                <Signup anchor={
                  <Link to="/login"><span style={{color: "rgb(68, 56, 80)", fontSize: "1.95vh", fontWeight: "bold"}}>Log in</span></Link>
                } />
                ) : (<Redirect to="/" />)
              );
            }
          }/>

          {/*Sample course page*/}

          <Route path='/tryme/:testnum' exact strict render={
            () => {
              return (
                
                <Codemirror /> 
                
              );
            }
          }/>

          {/*About page*/}

          <Route path='/about' exact strict render={
            () => {
              return (
                <About/>
              );
            }
          }/>

          {/*Privacy Policy page*/}

          <Route path='/policy' exact strict render={
            () => {
              return (
                (<Privacy />)
              );
            }
          }/>

          <Route component={notFound} />

          </Switch>

          <Footer 
          isUserLogged={
            this.state.login}
          childrenMain={
            <React.Fragment>
              <div className="col-4">
                <h2><img className="pull-left" src="/klast-logo.svg" alt='logo' /> Klast | Code School</h2>
                <Link to="/about"><button>About</button></Link>
              </div>

              <div className="col-4">
                <h2>| Learn</h2>
                <Link to="/tryme/learn"><button>Try Me</button></Link>
              </div>

              <div className="col-4">
                <h2>| Resources</h2>
                <button>Blog</button>
                <button>Articles</button>
                <button>Help</button>
              </div>
              
              <div className="col-12 Policy">
                <Link to="/policy"><button className="btnPolicy">Privacy Policy</button></Link>
                <span> | </span>
                <button style={{cursor: "text"}}>&copy; {new Date().getFullYear()} Klast Academy </button>

                <button className="pull-right fontsAw"><FontAwesomeIcon icon={faTwitterSquare}/></button>
                <button className="pull-right fontsAw"><FontAwesomeIcon icon={faFacebookSquare}/></button>
              </div>

            </React.Fragment>}
          childrenMin={
            <React.Fragment>
              <p className="pull-left" style={{textAlign: "left"}}><strong>Klast</strong> | Code School<br /><i>Learn codes</i></p>

              <Link to="/policy"><button className="btnPolicy">Privacy Policy</button></Link>
              <span> | </span>
              <button style={{cursor: "text"}}>&copy; {new Date().getFullYear()} Klast Academy </button>

              <button className="pull-right fontsAw"><FontAwesomeIcon icon={faTwitterSquare}/></button>
              <button className="pull-right fontsAw"><FontAwesomeIcon icon={faFacebookSquare}/></button>
            </React.Fragment>
          }/>

        </div>

        </ScrollToTop>
      </Router>
    );

    }
}

export default App;
