import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task.jsx'
import './index.css'

const TaskList = ({ data, onDelite, onToggleDone, onStartTimer, onStopTimer }) => {
  const element = data.map((item) => {
    return (
      <li key={item.id}>
        <Task
          {...item}
          onDelite={() => onDelite(item.id)}
          onToggleDone={() => onToggleDone(item.id)}
          onStartTimer={() => onStartTimer(item.id)}
          onStopTimer={() => onStopTimer(item.id)}
        />
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
  onToggleDone: () => {},
  data: [],
}
TaskList.propTypes = {
  onDelite: PropTypes.func,
  onToggleDone: PropTypes.func,
  data: PropTypes.array,
}

export default TaskList
