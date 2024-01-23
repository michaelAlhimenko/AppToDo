import React, { Component } from 'react';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import './index.css';

export default class Header extends Component {
    render(){
        return (      
            <header className="header">
                <h1>todos</h1>
                <NewTaskForm  onItemAdd ={ this.props.onItemAdd } />
            </header>
        )
    }
}
