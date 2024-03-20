import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow, format } from 'date-fns'

import './index.css'

const Task = ({
  id,
  done,
  timerStatus,
  description,
  date,
  onDelite,
  onToggleDone,
  timer,
  onStartTimer,
  onStopTimer,
  editing,
}) => {
  const formatTime = (seconds) => {
    const time = new Date(seconds * 1000)
    return format(time, 'mm:ss')
  }
  let classNames = 'view'
  let checked = false

  if (done) {
    classNames += ' completed'
    checked = true
  } else {
    classNames = 'view'
  }
  useEffect(() => {
    if (timer <= 0) {
      onStopTimer(id)
    }
  }, [timer])

  useEffect(() => {
    if (done === true) {
      onStopTimer(id)
    }
  }, [done])

  return (
    <>
      <div className={classNames}>
        <input
          className="toggle"
          type="checkbox"
          readOnly
          checked={checked ? true : false}
          onClick={() => onToggleDone()}
        />
        <label>
          <span className="title">{description}</span>
          <span className="description">
            <span>{formatTime(timer)}</span>
            <button
              disabled={done || timer === 0 || timerStatus ? true : false}
              className="icon icon-play"
              onClick={onStartTimer}
            ></button>
            <button
              disabled={done || timer === 0 ? true : false}
              className="icon icon-pause"
              onClick={onStopTimer}
            ></button>
          </span>
          <span className="created">{`${formatDistanceToNow(date, { addSuffix: true, includeSeconds: true })}`}</span>
        </label>
        <button disabled={true} className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDelite}></button>
      </div>
      {editing ? <input type="text" className="edit" value="Editing task"></input> : ''}
    </>
  )
}
Task.defaultProps = {
  onDelite: () => {},
  onToggleDone: () => {},
  done: false,
  description: '',
  id: (Math.random() * 1000).toFixed(0),
  date: new Date(),
}
Task.propTypes = {
  onDelite: PropTypes.func,
  onToggleDone: PropTypes.func,
  done: PropTypes.bool,
  description: PropTypes.string,
  id: PropTypes.string,
  date: PropTypes.object,
}

export default Task
