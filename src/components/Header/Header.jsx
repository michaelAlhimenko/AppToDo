import React from 'react'
import PropTypes from 'prop-types'

import NewTaskForm from '../NewTaskForm/NewTaskForm'

const Header = ({ onItemAdd }) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onItemAdd={onItemAdd} />
    </header>
  )
}
Header.propTypes = {
  onItemAdd: PropTypes.func,
}
Header.defaultProps = {
  onItemAdd: () => {},
}

export default Header
