import React, { Component } from 'react';
import axios from 'axios';
import ScrollToTop from 'react-router-scroll-top';

import queryString from 'query-string';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab, faTwitterSquare, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
//import { faTwitterSquare } from '@fortawesome/free-solid-svg-icons';

import './App.css';
import Modal from './Components/Modal/Modal';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Welcome from './Components/Welcome/Welcome';
import Users from './Components/Users/Users';
import Dashboard from './Components/Dashboard/Dashboard';
import Settings from './Components/Settings/Settings';
import Library from './Components/Library/Library';
import Beta from './Components/Beta/Beta';
import Privacy from './Components/Privacy/Privacy';
import About from './Components/About/About';
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
    currentState === "none" ? newState = menuNone : newState = menuBlock;
    this.setState({usermenu: newState});
  }

  onPagesClick = () => {
    this.setState({usermenu: "none"});
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
                <NavLink to='/learn/tryme'><button>Try Me</button></NavLink>
                <NavLink to='/login'><button>Log In</button></NavLink>
                <NavLink to='/signup'>
                  <button style={{background:"#0F1E35", color: "white", borderRadius: "0.5vh", padding: "0.8vh 1.5vh", height: "auto"}}>Sign Up</button>
                </NavLink>
              </React.Fragment>
            } 
            logo={
              <NavLink to='/'><img className="pull-left" id="logo" src="/klast-logo.svg" alt= "Klast Academy" /><i className="pull-left Beta">Testing build</i></NavLink>
            }
            userAccess={
              <React.Fragment>
                <NavLink to='/'><button className="pull-left">Home</button></NavLink>
                {/*<NavLink to='/beta'><button className="pull-left">Beta Courses</button></NavLink>*/}
                <NavLink to='/dashboard'><button>Dashboard</button></NavLink>
              </React.Fragment>
            }
            userNav={
              <React.Fragment>
                <button className="name">Hi {this.state.user.name}</button>
                <button onClick={this.onClickUserMenu.bind(this)} id="proPic"><img className="avatar" src="/Avatar_1.png" alt="Avatar"/></button>
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

          <div className="appPages" onClick={this.onPagesClick}>

          <Modal/>

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

              {/*Beta page*/}

              <Route path='/Beta' exact strict render={
                () => {
                  return (
                    this.state.login !== null ? (<Beta />)  : (<Redirect to="/" />)
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
                    this.state.login === true ? (<Settings/>) : (<Redirect to="/" />)
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

              <Route path='/learn/:testnum' exact strict render={
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
          </div>

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
                <Link to="/learn/tryme"><button>Try Me</button></Link>
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

                <a href="https://www.facebook.com/Klast-Academy-2030964817223490/" target="_black">
                    <button className="pull-right fontsAw"><FontAwesomeIcon icon={faFacebookSquare}/></button>
                </a>
                  <button className="pull-right  fontsAw"><FontAwesomeIcon icon={faTwitterSquare}/></button>
              </div>

            </React.Fragment>}
          childrenMin={
            <React.Fragment>
              <div className="row">

                <div style={{textAlign: "left"}} className="col-4">
                  <p><strong>Klast</strong> | Code School<br /><i>Learn codes</i></p>
                </div>

                <div className="col-4">
                  <Link to="/policy"><button className="btnPolicy">Privacy Policy</button></Link>
                  <span> | </span>
                  <button style={{cursor: "text"}}>&copy; {new Date().getFullYear()} Klast Academy </button>
                </div>

                <div style={{textAlign: "right"}} className="col-4">
                  <a href="https://www.facebook.com/Klast-Academy-2030964817223490/" target="_black">
                    <button className="fontsAw"><FontAwesomeIcon icon={faFacebookSquare}/></button>
                  </a>
                  <button className="fontsAw"><FontAwesomeIcon icon={faTwitterSquare}/></button>
                </div>

              </div>
            </React.Fragment>
          }/>

        </div>

        </ScrollToTop>
      </Router>
    );

    }
}

export default App;
