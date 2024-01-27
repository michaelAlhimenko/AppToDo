import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export default class TaskFilter extends Component {
  static defaultProps = {
    data: 'all',
    onClearToDo: () => {},
    onCounterOfTasks: 3,
    onChangeFilter: () => {},
  }
  static propTypes = {
    data: PropTypes.string,
    onClearToDo: PropTypes.func,
    onChangeFilter: PropTypes.func,
    onCounterOfTasks: PropTypes.number,
  }

  onToogleFilter = (e) => {
    switch (e.target.innerText) {
      case 'Active':
        this.props.onChangeFilter(e.target.innerText.toLowerCase())
        break
      case 'Completed':
        this.props.onChangeFilter(e.target.innerText.toLowerCase())
        break
      case 'All':
        this.props.onChangeFilter(e.target.innerText.toLowerCase())
        break
      default:
        break
    }
  }

  render() {
    const { data, onCounterOfTasks, onClearToDo } = this.props

    return (
      <footer className="footer">
        <span className="todo-count">{onCounterOfTasks} items left</span>
        <ul className="filters">
          <li>
            <button className={data === 'all' ? 'selected' : ''} onClick={this.onToogleFilter}>
              All
            </button>
          </li>
          <li>
            <button className={data === 'active' ? 'selected' : ''} onClick={this.onToogleFilter}>
              Active
            </button>
          </li>
          <li>
            <button className={data === 'completed' ? 'selected' : ''} onClick={this.onToogleFilter}>
              Completed
            </button>
          </li>
        </ul>
        <button className="clear-completed" onClick={onClearToDo}>
          Clear completed
        </button>
      </footer>
    )
  }
}
