import React, { Component } from 'react';

import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Testrespo from './Components/Testrespo';
import Codemirror from './Components/Codemirror';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import Route from 'react-router-dom/Route';


class App extends Component {

  
  render() {
    
    return (

      <Router>
        <div className="App">
          <Header user={Math.floor(Math.random() * 2)} />

          <Link to='/'> <button>Home</button> </Link>
          <Link to='/about'> <button>About</button> </Link>
          <Link to='/course'> <button>Learn</button> </Link>
          <Route path='/' exact strict render={
            () => {
              return (
                <h1>Welcome Home</h1>
              );
            }
          }/>
          <Route path='/about' exact strict render={
            () => {
              return (
                <Testrespo />
              );
            }
          }/>
          <Route path='/course' exact strict render={
            () => {
              return (
                <Codemirror />
              );
            }
          }/>
          <Footer />

        </div>
      </Router>
    );

    }
}

export default App;
