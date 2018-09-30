import React from 'react';

import axios from 'axios';

export default class PersonList extends React.Component {
    state = {
        person:[{}]
    }
    componentDidMount() {
        
        axios.get(`https://server.klast.academy/index.php`)
        .then(res => {
            const persons = res.data;
            this.setState({person: persons});
            console.log(persons);
        })
    }

  render() {
    return (
      <ul>
          {this.state.person.map( (person, index) => <React.Fragment><li key={index}>{person.name}</li></React.Fragment>)}
      </ul>
    )
  }
}