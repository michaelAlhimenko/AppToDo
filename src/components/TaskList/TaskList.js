import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'
import './index.css'

export default class TaskList extends Component {
  static defaultProps = {
    onDelite: () => {},
    onToogleDone: () => {},
    data: [],
  }
  static propTypes = {
    onDelite: PropTypes.func,
    onToogleDone: PropTypes.func,
    data: PropTypes.array,
  }

  render() {
    const { data, onDelite, onToogleDone } = this.props
    const element = data.map((item) => {
      return (
        <li key={item.id}>
          <Task {...item} onDelite={() => onDelite(item.id)} onToogleDone={() => onToogleDone(item.id)} />
        </li>
      )
    })
    return (
      <section className="main">
        <ul className="todo-list">{element}</ul>
      </section>
    )
  }
}
