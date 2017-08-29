import React, { Component } from 'react'

import PropTypes from 'prop-types'


class Tournament extends Component {

  render() {
    const {
      tournaments
    } = this.props

    const tournamentList = tournaments ? tournaments : []

    return (
      <div className="table">
        { tournamentList.map(item =>
          <div key={item.objectID} className="table-row">
            <span style={{ width: '40%' }}>{item.name}</span>
            <span style={{ width: '30%' }}>{item.active}</span>
            <span style={{ width: '10%' }}>{item.max_players}</span>
            <span style={{ width: '10%' }}>{item.start_time}</span>
            <span style={{ width: '10%' }}>{item.end_time}</span><br />
          </div>
        )}
      </div>
    )
  }
}

Tournament.propTypes = {
  tournaments: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      max_players: PropTypes.number,
      start_time: PropTypes.string.isRequired,
      end_time: PropTypes.string,
    })
  ).isRequired
}

export default Tournament
