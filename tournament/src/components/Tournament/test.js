import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import Tournament from '../Tournament'

describe('Tournament Tests', () => {

  const props = {
    tournaments: [
      {name: '1', max_players: 2, start_time: '2017-08-29', end_time: '2017-08-29', objectID: 'y'},
      {name: '2', max_players: 3, start_time: '2017-08-30', end_time: '2017-08-30', objectID: 'z'},
    ],
 }

  it('shows two tournaments', () => {
    const element = shallow(<Tournament { ...props } />)

    expect(element.find('.table-row').length).toBe(2)
  })

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Tournament />, div)
  })

})
