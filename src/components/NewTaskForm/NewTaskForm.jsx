import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export default class NewTaskForm extends Component {
  static defaultProps = {
    onItemAdd: () => {},
  }

  static propTypes = {
    onItemAdd: PropTypes.func,
  }

  constructor() {
    super()
    this.state = {
      desc: '',
    }
  }

  onDescChange = (e) => {
    this.setState({
      desc: e.target.value,
    })
  }

  onSubmitDesc = (e) => {
    const { onItemAdd } = this.props

    e.preventDefault()
    onItemAdd(this.state.desc)

    this.setState({
      desc: '',
    })
  }

  render() {
    return (
      <form onSubmit={this.onSubmitDesc}>
        <input
          className="new-todo"
          value={this.state.desc}
          onChange={this.onDescChange}
          placeholder="Что должно быть сделано?"
          autoFocus
          required
        />
      </form>
    )
  }
}
