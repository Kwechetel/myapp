import React, { Component } from 'react';
import './App.css';
import Person from './Header/Header';

class App extends Component {
  state = {
    persons: [
      {name: "Last", age: "29"},
      {name: "Rax", age: "28"},
      {name: "Chris", age: "25"}
    ]
  }

  switchNameEvent = (newName) => {
    // DONT DO THIS! this.state.persons[0].name = "Last Kwechete";
    this.setState({
      persons: [
        {name: newName, age: "29"},
        {name: "Rax", age: "28"},
        {name: "Chris", age: "65"}
      ]
    })
  }

  onChangeNameEvent = (event) => {
    this.setState({
      persons: [
        {name: "Last", age: "29"},
        {name: event.target.value, age: "28"},
        {name: "Chris", age: "65"}
      ]
    })
  }

  render() {
    const style = {
      backgroundColor: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer"
    }
    return (
      <div className="App">
        <h1>Hi buddy, I'm a react app</h1>
        <p>This is really working!</p>
        <button style={style} onClick={() => this.switchNameEvent("Chaps")}>Switch Name</button>

        <Person 
        name={this.state.persons[0].name} 
        age={this.state.persons[0].age}
        click={this.switchNameEvent.bind(this, "Panashe")}>My hobbies: Coding</Person>

        <Person 
        name={this.state.persons[1].name} 
        age={this.state.persons[1].age}
        onchanged={this.onChangeNameEvent} />

        <Person 
        name={this.state.persons[2].name} 
        age={this.state.persons[2].age} />
      </div>
    );

    //return React.createElement('div',{className: 'App'}, React.createElement('h1',null, 'Hello Last. How\'re doing there????'));
  }
}

export default App;
