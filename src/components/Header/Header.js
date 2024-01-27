import React, { Component } from 'react'
import PropTypes from 'prop-types'

import NewTaskForm from '../NewTaskForm/NewTaskForm'

export default class Header extends Component {
  static defaultProps = {
    onItemAdd: () => {},
  }
  static propTypes = {
    onItemAdd: PropTypes.func,
  }
  render() {
    const { onItemAdd } = this.props
    return (
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onItemAdd={onItemAdd} />
      </header>
    )
  }
}
