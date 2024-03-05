import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './index.css'

const NewTaskForm = ({ onItemAdd }) => {
  const [desc, setDesc] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onDescChange = (e) => {
    setDesc(e.target.value)
  }
  const onMinChange = (e) => {
    if (isNaN(e.target.value)) {
      return setMin('')
    }
    setMin(e.target.value)
  }
  const onSecChange = (e) => {
    if (isNaN(e.target.value)) {
      return setSec('')
    }
    setSec(e.target.value)
  }

  const onSubmitDesc = (e) => {
    e.preventDefault()
    onItemAdd({ desc, min, sec })

    setDesc('')
    setMin('')
    setSec('')
  }

  return (
    <form className="new-todo-form" onSubmit={(e) => onSubmitDesc(e)}>
      <input
        className="new-todo"
        value={desc}
        onChange={onDescChange}
        placeholder="Что должно быть сделано?"
        autoFocus
        required
      />
      <input className="new-todo-form__timer" value={min} onChange={onMinChange} placeholder="Min"></input>
      <input className="new-todo-form__timer" value={sec} onChange={onSecChange} placeholder="Sec"></input>
      <button type="submit" style={{ display: 'none' }}></button>
    </form>
  )
}
export default NewTaskForm

NewTaskForm.defaultProps = {
  onItemAdd: () => {},
}

NewTaskForm.spropTypes = {
  onItemAdd: PropTypes.func,
}
