import React, { Component } from 'react';

import './App.css';
import Header from './Include/Header';
import Footer from './Include/Footer';
import Testrespo from './Include/Testrespo';


class App extends Component {

  
  render() {
    
    return (
      <div className="App">
        <Header user={Math.floor(Math.random() * 2)} />
        <Testrespo />
        <Footer />

      </div>
    );

    }
}

export default App;
