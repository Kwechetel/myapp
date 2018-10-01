import React from 'react';

import axios from 'axios';

export default class PersonList extends React.Component {
    state = {
        person:[{}]
    }
    componentDidMount() {
        
        axios.post("http://server.klast.academy/index.php")
        .then(res => {
            console.log(res);
            const persons = res.data;
            this.setState({person: persons});
            console.log(persons);
        })
    }

  render() {
    return (
      <ul>
          {this.state.person.map( (person, index) => <li key={index}>{person.name} aged {person.age}</li>)}
      </ul>
    )
  }
}