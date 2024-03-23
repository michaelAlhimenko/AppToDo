import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

import Header from '../Header/Header.jsx'
import TaskFilter from '../TasksFilter/TaskFilter.jsx'
import TaskList from '../TaskList/TaskList.jsx'

import './App.css'

const App = () => {
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
      timerStatus: true,
    }
  }
  const [data, setData] = useState([])
  const [dataVisible, setDataVisible] = useState([])

  const deleteItem = (id) => {
    const newArr = data.filter((el) => {
      if (el.id === id) {
        clearInterval(el.timerId)
        clearInterval(el.timerId + 1)
      }
      return el.id !== id
    })

    setData(newArr)
  }

  const onCounterOfTasks = () => {
    const doneCount = data.filter((el) => !el.done).length
    setCounterOfTasks(doneCount)
  }
  const onToggleDone = (id) => {
    let done = null
    let newArr = []
    newArr = data.map((item) => {
      if (item.id === id) {
        done = !item.done
        return { ...item, done: done }
      }
      return item
    })

    setData(newArr)
    onChangeFilter(filterOptions)
    onCounterOfTasks()

    if (done === false) {
      startTimer(id)
    }
  }
  const onClearToDo = () => {
    const updatedData = data.filter((item) => !item.done)

    setData(updatedData)
    setFilterOptions('All')
  }
  const onItemAdd = (text) => {
    console.log(text)
    if (text.desc === '' || !text.desc.trim()) {
      return
    }
    const time = Number(text.min * 60) + (text.sec.length > 0 ? Number(text.sec) : 0)
    const newItem = createToDoItem(text.desc, time)
    console.log(time)
    const newArr = [...data, newItem]
    setData(newArr)
    startTimer(newItem.id)
  }

  const onChangeFilter = (value) => {
    switch (value) {
      case 'All': {
        setFilterOptions(value)
        setDataVisible(data)

        break
      }
      case 'Completed': {
        const newArr = data.filter((item) => item.done)
        setDataVisible(newArr)
        setFilterOptions(value)
        break
      }
      case 'Active': {
        const newArr = data.filter((item) => !item.done)
        setDataVisible(newArr)
        setFilterOptions(value)

        break
      }
      default:
        break
    }
  }

  const startTimer = (id) => {
    setData((oldData) => {
      const newArr = oldData.map((item) => {
        if (item.id === id) {
          if (item.timerId) {
            return
          }
          const startTime = Date.now() + item.timer * 1000
          console.log(startTime)
          const timerId = setInterval(() => {
            setData((oldData) => {
              const newArr = oldData.map((item) => {
                if (item.id === id) {
                  const timer = Math.ceil((startTime - Date.now()) / 1000)
                  return { ...item, timer }
                }
                return item
              })
              return newArr
            })
          }, 1000)
          return { ...item, timerId, timerStatus: true }
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
          return { ...item, timerId: 0, timerStatus: false }
        } else {
          return { ...item }
        }
      })
      return newArr
    })
  }

  useEffect(() => {
    onChangeFilter(filterOptions)
    onCounterOfTasks()
  }, [data])
  return (
    <div className="todoapp">
      <Header onItemAdd={onItemAdd} />
      <TaskList
        data={dataVisible}
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
