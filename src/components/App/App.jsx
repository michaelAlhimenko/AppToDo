import React, { Component } from 'react'
import { nanoid } from 'nanoid'

import Header from '../Header/Header.jsx'
import TaskFilter from '../TasksFilter/TaskFilter.jsx'
import TaskList from '../TaskList/TaskList.jsx'

import './App.css'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      data: [
        this.createToDoItem('Completed task'),
        this.createToDoItem('Editing task'),
        this.createToDoItem('Active task'),
      ],
      notFilteredData: [],
      filterOptions: 'All',
      counterOfTasks: 3,
    }
  }

  createToDoItem = (desc) => {
    return {
      id: nanoid(),
      description: desc,
      done: false,
      date: new Date(),
      timer: 0,
      timerId: null,
    }
  }
  deleteItem = (id) => {
    this.setState(({ data, notFilteredData }) => {
      const newArr = data.filter((el) => {
        if (el.id === id) {
          clearInterval(el.timerId)
          clearInterval(el.timerId + 1)
        }
        return el.id !== id
      })

      if (notFilteredData.length !== 0) {
        const newArrFiltered = notFilteredData.filter((el) => el.id !== id)
        return {
          data: newArr,
          notFilteredData: newArrFiltered,
        }
      } else {
        return {
          data: newArr,
        }
      }
    })
    this.onCounterOfTasks()
  }

  onToogleDone = (id) => {
    this.stopTimer(id)
    this.setState(({ data, notFilteredData }) => {
      if (notFilteredData.length !== 0) {
        const newArr = notFilteredData.map((item) => {
          if (item.id === id) {
            return { ...item, done: !item.done }
          }
          return item
        })

        return {
          notFilteredData: newArr,
        }
      } else {
        const newArr = data.map((item) => {
          if (item.id === id) {
            return { ...item, done: !item.done }
          }
          return item
        })
        return {
          data: newArr,
        }
      }
    })
    this.onChangeFilter(this.state.filterOptions)
    this.onCounterOfTasks()
  }

  onItemAdd = (text) => {
    if (text === '' || !text.trim()) {
      return
    }
    this.setState(({ data, notFilteredData }) => {
      const newItem = this.createToDoItem(text)

      if (notFilteredData.length !== 0) {
        const newArr = [...notFilteredData, newItem]

        return {
          notFilteredData: newArr,
        }
      }

      const newArr = [...data, newItem]

      return {
        data: newArr,
      }
    })

    this.onChangeFilter(this.state.filterOptions)
    this.onCounterOfTasks()
  }

  onChangeFilter = (value) => {
    switch (value) {
      case 'All':
        this.setState((state) => {
          const { notFilteredData } = state

          if (notFilteredData.length === 0) {
            return
          }

          return {
            data: notFilteredData,
            filterOptions: value,
            notFilteredData: [],
          }
        })
        break

      case 'Completed':
        this.setState((state) => {
          const { data, notFilteredData } = state

          if (notFilteredData.length !== 0) {
            const newArr = notFilteredData.filter((item) => item.done)

            return {
              data: newArr,
              notFilteredData: notFilteredData,
              filterOptions: value,
            }
          }
          const newArr = data.filter((item) => item.done)
          const NewFiltredData = data
          return {
            data: newArr,
            notFilteredData: NewFiltredData,
            filterOptions: value,
          }
        })
        break

      case 'Active':
        this.setState((state) => {
          const { data, notFilteredData } = state

          if (notFilteredData.length !== 0) {
            const newArr = notFilteredData.filter((item) => !item.done)

            return {
              data: newArr,
              notFilteredData: notFilteredData,
              filterOptions: value,
            }
          }

          const newArr = data.filter((item) => !item.done)
          const NewFiltredData = data

          return {
            data: newArr,
            notFilteredData: NewFiltredData,
            filterOptions: value,
          }
        })

        break

      default:
        break
    }
  }

  onClearToDo = () => {
    this.setState((state) => {
      const { data, notFilteredData } = state

      if (notFilteredData.length !== 0) {
        const newArr = notFilteredData.filter((item) => !item.done)
        return {
          data: [],
          notFilteredData: newArr,
        }
      } else {
        const newArr = data.filter((item) => !item.done)

        return {
          data: newArr,
          notFilteredData: [],
          filterOptions: 'All',
        }
      }
    })
    this.onChangeFilter(this.state.filterOptions)
    this.onCounterOfTasks()
  }

  onCounterOfTasks = () => {
    this.setState(({ data, notFilteredData }) => {
      if (notFilteredData.length !== 0) {
        const doneCount = notFilteredData.filter((el) => !el.done).length
        return {
          counterOfTasks: doneCount,
        }
      } else {
        const doneCount = data.filter((el) => !el.done).length
        return {
          counterOfTasks: doneCount,
        }
      }
    })
  }

  startTimer = (id) => {
    this.setState(({ data }) => {
      const newArr = data.map((item) => {
        if (item.id === id && item.timerId === null) {
          const startTime = Date.now() - item.timer * 1000
          const timerId = setInterval(() => {
            this.setState(({ data }) => {
              const newArr = data.map((item) => {
                if (item.id === id) {
                  const timer = Math.floor((Date.now() - startTime) / 1000)
                  return { ...item, timer }
                }
                return item
              })
              return { data: newArr }
            })
          }, 1000)
          return { ...item, timerId }
        }
        return item
      })
      return { data: newArr }
    })
  }

  stopTimer = (id) => {
    this.setState(({ data }) => {
      const newArr = data.map((item) => {
        if (item.id === id && item.timerId !== null) {
          clearInterval(item.timerId)
          clearInterval(item.timerId + 1)
          return { ...item, timerId: null }
        }
        return item
      })
      return { data: newArr }
    })
  }

  render() {
    return (
      <section className="todoapp">
        <Header onItemAdd={this.onItemAdd} />
        <TaskList
          data={this.state.data}
          onDelite={this.deleteItem}
          onToogleDone={this.onToogleDone}
          onStartTimer={this.startTimer}
          onStopTimer={this.stopTimer}
        />
        <TaskFilter
          data={this.state.filterOptions}
          onChangeFilter={this.onChangeFilter}
          onClearToDo={this.onClearToDo}
          onCounterOfTasks={this.state.counterOfTasks}
        />
      </section>
    )
  }
}
