import React, { Component } from 'react'

import Header from './components/Header/Header.js'
import TaskFilter from './components/TasksFilter/TaskFilter.js'
import TaskList from './components/TaskList/TaskList.js'

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
      filterOptions: 'all',
      counterOfTasks: 3,
    }
  }

  createToDoItem = (desc) => {
    let id = Math.random() * 10000000

    return {
      id: id.toFixed(0),
      description: desc,
      done: false,
      date: new Date(),
    }
  }
  deleteItem = (id) => {
    this.setState(({ data, notFilteredData }) => {
      const itemDelId = data.findIndex((el) => el.id === id)

      const newArr = [...data.slice(0, itemDelId), ...data.slice(itemDelId + 1)]

      if (notFilteredData.length !== 0) {
        const itemDelId = notFilteredData.findIndex((el) => el.id === id)
        const newArrFiltered = [...notFilteredData.slice(0, itemDelId), ...notFilteredData.slice(itemDelId + 1)]

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
    this.setState(({ data, notFilteredData }) => {
      if (notFilteredData.length !== 0) {
        const itemId = notFilteredData.findIndex((el) => el.id === id)
        const oldItem = notFilteredData[itemId]

        const newItem = { ...oldItem, done: !oldItem.done }
        const newArr = [...notFilteredData.slice(0, itemId), newItem, ...notFilteredData.slice(itemId + 1)]

        return {
          notFilteredData: newArr,
        }
      } else {
        const itemId = data.findIndex((el) => el.id === id)
        const oldItem = data[itemId]
        const newItem = { ...oldItem, done: !oldItem.done }

        const newArr = [...data.slice(0, itemId), newItem, ...data.slice(itemId + 1)]

        return {
          data: newArr,
        }
      }
    })
    this.onChangeFilter(this.state.filterOptions)
    this.onCounterOfTasks()
  }

  onItemAdd = (text) => {
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
      case 'all':
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

      case 'completed':
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

      case 'active':
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
    this.setState(() => {
      return {
        data: [],
        notFilteredData: [],
        filterOptions: 'all',
      }
    })
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

  render() {
    return (
      <section className="todoapp">
        <Header onItemAdd={this.onItemAdd} />
        <TaskList data={this.state.data} onDelite={this.deleteItem} onToogleDone={this.onToogleDone} />
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
