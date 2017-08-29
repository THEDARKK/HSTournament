import React, { Component } from 'react';

import './App.css';
import Tournament from './components/Tournament'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tournaments: null
    }

    this.fetchTournaments = this.fetchTournaments.bind(this)
    this.setTournaments = this.setTournaments.bind(this)
  }

  fetchTournaments() {
    fetch(`http://localhost:8000/tournaments/`)
      .then(response => response.json())
      .then(tournaments => this.setTournaments(tournaments))
      .catch(e => e)
  }

  setTournaments(tournaments) {
    this.setState({ tournaments: tournaments })
  }

  componentDidMount() {
    this.fetchTournaments()
  }

  render() {
    const {
      tournaments
    } = this.state

    return (
      <div className="page">
        <h1>Tournaments</h1>
        <Tournament
          tournaments={tournaments}
        />
      </div>
    );
  }
}

export default App;
