import React from 'react';

import axios from 'axios';

export default class PersonList extends React.Component {

  componentDidMount() {
    axios.get(`http://server.klast.academy/index.php`)
      .then(res => {
        const persons = res.data;
        console.log(persons);
      })
  }

  render() {
    return (
      <ul>
          
      </ul>
    )
  }
}