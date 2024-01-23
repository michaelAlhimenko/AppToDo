import React, { Component } from 'react';
import  Header from './components/header/header';
import TaskFilter from './components/TasksFilter/TaskFilter';
import TaskList from './components/TaskList/TaskList';

import './App.css';

export default class App extends Component{
  constructor(){
    super();

    this.state = {
      data: [
        {id: 4561, description: 'Completed task'},
        {id: 5654,  description: 'Editing task'},
        {id: 6474, description: 'Active task'}
      ]
    }
  }

  deleteItem = (id) => {
    this.setState (({ data }) => {
      const itemDelId = data.findIndex((el) => el.id === id); 
      const newArr = [...data.slice(0, itemDelId), ...data.slice(itemDelId + 1)]
      
      return{
        data: newArr
      }
    })
  }

  render(){
    return (
      <section className="todoapp">
        <Header/>
        <TaskList 
          data={this.state.data}
          onDelite={ this.deleteItem }
        />
        <TaskFilter/>
      </section>
    );
  }
}


