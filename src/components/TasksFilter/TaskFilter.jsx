import React from 'react'
import PropTypes from 'prop-types'
import './index.css'

const TaskFilter = ({ data, onCounterOfTasks, onClearToDo, onChangeFilter }) => {
  const storageOfElemFilt = ['All', 'Active', 'Completed']

  const onToogleFilter = (e) => {
    switch (e.target.innerText) {
      case 'Active':
        onChangeFilter(e.target.innerText)
        break
      case 'Completed':
        onChangeFilter(e.target.innerText)
        break
      case 'All':
        onChangeFilter(e.target.innerText)
        break
      default:
        break
    }
  }

  const buttons = storageOfElemFilt.map((element, id) => {
    return (
      <li key={id}>
        <button className={data === element ? 'selected' : ''} onClick={onToogleFilter}>
          {element}
        </button>
      </li>
    )
  })

  return (
    <footer className="footer">
      <span className="todo-count">{onCounterOfTasks} items left</span>
      <ul className="filters">{buttons}</ul>
      <button className="clear-completed" onClick={onClearToDo}>
        Clear completed
      </button>
    </footer>
  )
}

TaskFilter.defaultProps = {
  data: 'All',
  onClearToDo: () => {},
  onCounterOfTasks: 3,
  onChangeFilter: () => {},
}
TaskFilter.propTypes = {
  data: PropTypes.string,
  onClearToDo: PropTypes.func,
  onChangeFilter: PropTypes.func,
  onCounterOfTasks: PropTypes.number,
}

export default TaskFilter
