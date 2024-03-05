import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

import Header from '../Header/Header.jsx'
import TaskFilter from '../TasksFilter/TaskFilter.jsx'
import TaskList from '../TaskList/TaskList.jsx'

import './App.css'

const App = () => {
  const [notFilteredData, setNotFilteredData] = useState([])
  const [filterOptions, setFilterOptions] = useState('All')
  const [counterOfTasks, setCounterOfTasks] = useState(3)
  const createToDoItem = (desc, time, done = false) => {
    return {
      id: nanoid(),
      description: desc,
      done: done,
      date: new Date(),
      timer: time,
      timerId: 0,
    }
  }
  const [data, setData] = useState([])

  const deleteItem = (id) => {
    const newArr = data.filter((el) => {
      if (el.id === id) {
        clearInterval(el.timerId)
        clearInterval(el.timerId + 1)
      }
      return el.id !== id
    })

    setData(newArr)

    if (notFilteredData.length !== 0) {
      const newArrFiltered = notFilteredData.filter((el) => el.id !== id)
      setNotFilteredData(newArrFiltered)
    }
    onCounterOfTasks()
  }

  const onCounterOfTasks = () => {
    if (notFilteredData.length !== 0) {
      const doneCount = notFilteredData.filter((el) => !el.done).length
      setCounterOfTasks(doneCount)
    } else {
      const doneCount = data.filter((el) => !el.done).length
      setCounterOfTasks(doneCount)
    }
  }
  const onToggleDone = (id) => {
    let done = null
    if (notFilteredData.length !== 0) {
      const newArr = notFilteredData.map((item) => {
        if (item.id === id) {
          done = !item.done
          return { ...item, done: !item.done }
        }
        return item
      })
      setNotFilteredData(newArr)
      if (done === false) {
        startTimer(id)
      }
    } else {
      const newArr = data.map((item) => {
        if (item.id === id) {
          done = !item.done
          return { ...item, done: !item.done }
        }
        return item
      })
      setData(newArr)
      if (done === false) {
        startTimer(id)
      }
    }
    onChangeFilter(filterOptions)
    onCounterOfTasks()
  }
  const onClearToDo = () => {
    const updatedData = data.filter((item) => !item.done)
    const updatedNotFilteredData = notFilteredData.filter((item) => !item.done)

    setData(updatedData)
    setNotFilteredData(updatedNotFilteredData)
    setFilterOptions('All')
    onCounterOfTasks()
  }
  const onItemAdd = (text) => {
    if (text.desc === '' || !text.desc.trim()) {
      return
    }
    const time = Number(text.min * 60) + (text.sec.length > 0 ? Number(text.sec) : 0)
    const newItem = createToDoItem(text.desc, time)

    if (notFilteredData.length !== 0) {
      const newArr = [...notFilteredData, newItem]
      setNotFilteredData(newArr)
    } else {
      const newArr = [...data, newItem]
      setData(newArr)
    }
    startTimer(newItem.id)
    onChangeFilter(filterOptions)
    onCounterOfTasks()
  }

  const onChangeFilter = (value) => {
    switch (value) {
      case 'All':
        if (notFilteredData.length === 0) {
          return
        }

        setData(notFilteredData)
        setFilterOptions(value)
        setNotFilteredData([])

        break

      case 'Completed':
        if (notFilteredData.length !== 0) {
          const newArr = notFilteredData.filter((item) => item.done)

          setData(newArr)
          setNotFilteredData(notFilteredData)
          setFilterOptions(value)
        } else {
          const newArr = data.filter((item) => item.done)
          const NewFiltredData = data

          setData(newArr)
          setNotFilteredData(NewFiltredData)
          setFilterOptions(value)
        }

        break

      case 'Active':
        if (notFilteredData.length !== 0) {
          const newArr = notFilteredData.filter((item) => !item.done)

          setData(newArr)
          setNotFilteredData(notFilteredData)
          setFilterOptions(value)
        } else {
          const newArr = data.filter((item) => !item.done)
          const NewFiltredData = data

          setData(newArr)
          setNotFilteredData(NewFiltredData)
          setFilterOptions(value)
        }

        break

      default:
        break
    }
  }

  const startTimer = (id) => {
    setData((oldData) => {
      const newArr = oldData.map((item) => {
        if (item.id === id) {
          console.log(item.id + item.timerId)
          const startTime = Date.now() + item.timer * 1000
          const timerId = setInterval(() => {
            setData((oldData) => {
              const newArr = oldData.map((item) => {
                if (item.id === id) {
                  const timer = Math.floor((startTime - Date.now()) / 1000)
                  return { ...item, timer }
                }
                return item
              })
              return newArr
            })
          }, 1000)
          return { ...item, timerId }
        }
        return item
      })
      return newArr
    })
  }

  const stopTimer = (id) => {
    setData((oldData) => {
      const newArr = oldData.map((item) => {
        if (item.id === id) {
          clearInterval(item.timerId)
          clearInterval(item.timerId - 1)
          return { ...item, timerId: 0 }
        } else {
          return item
        }
      })
      return newArr
    })
  }
  useEffect(() => {
    onCounterOfTasks()
  })
  return (
    <div className="todoapp">
      <Header onItemAdd={onItemAdd} />
      <TaskList
        data={data}
        onDelite={deleteItem}
        onToggleDone={onToggleDone}
        onStartTimer={startTimer}
        onStopTimer={stopTimer}
      />
      <TaskFilter
        data={filterOptions}
        onChangeFilter={onChangeFilter}
        onClearToDo={onClearToDo}
        onCounterOfTasks={counterOfTasks}
      />
    </div>
  )
}

export default App
