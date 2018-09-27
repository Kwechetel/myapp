import React, { Component } from 'react';
import './App.css';
import Header from './Include/Header';
import Footer from './Include/Footer';

class App extends Component {
  
  render() {
    
    return (
      <div className="App">
        <Header user={1} />
        <Footer />
      </div>
    );

    }
}

export default App;
