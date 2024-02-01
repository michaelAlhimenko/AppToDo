import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task.jsx'
import './index.css'

const TaskList = ({ data, onDelite, onToogleDone }) => {
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

TaskList.defaultProps = {
  onDelite: () => {},
  onToogleDone: () => {},
  data: [],
}
TaskList.propTypes = {
  onDelite: PropTypes.func,
  onToogleDone: PropTypes.func,
  data: PropTypes.array,
}

export default TaskList
