import React, { Component } from 'react';

import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Testrespo from './Components/Testrespo';


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
