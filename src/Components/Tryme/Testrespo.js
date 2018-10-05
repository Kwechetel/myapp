import React from 'react';
import axios from 'axios';
import queryString from 'query-string';

export default class PersonList extends React.Component {
    state = {
        person:[{}]
    }

    componentDidMount() {

        const qs = queryString;
        
        axios.post("http://server.klast.academy/includes/index.php", qs.stringify({name: "last", surname: "Kwechete"}))
        .then(res => {
            const persons = res.data;
            this.setState({person: persons});
            console.log(qs.stringify(persons));
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