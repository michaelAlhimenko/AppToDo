import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import './index.css'

export default class Task extends Component {
  static defaultProps = {
    onDelite: () => {},
    onToogleDone: () => {},
    done: false,
    description: '',
    id: (Math.random() * 1000).toFixed(0),
    date: new Date(),
  }
  static propTypes = {
    onDelite: PropTypes.func,
    onToogleDone: PropTypes.func,
    done: PropTypes.bool,
    description: PropTypes.string,
    id: PropTypes.string,
    date: PropTypes.object,
  }

  constructor() {
    super()
    this.state = {
      currentDate: new Date(),
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 5000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      currentDate: new Date(),
    })
  }

  render() {
    const { id, done, description, date, onDelite, onToogleDone } = this.props

    let classNames = 'view'
    let checked = false

    if (done) {
      classNames += ' completed'
      checked = true
    } else {
      classNames = 'view'
    }

    return (
      <>
        <div className={classNames}>
          <input
            className="toggle"
            type="checkbox"
            readOnly
            checked={checked ? true : false}
            onClick={() => onToogleDone(id)}
          />
          <label>
            <span className="description">{description}</span>
            <span className="created">{`${formatDistanceToNow(date, { addSuffix: true, includeSeconds: true })}`}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={() => onDelite(id)}></button>
        </div>
        {this.props.editing ? <input type="text" className="edit" value="Editing task"></input> : ''}
      </>
    )
  }
}
