import React, { Component } from 'react';
import Task from '../Task/Task';
import './index.css';

export default class TaskList extends Component {

    constructor(){
        super();
        this.state = {
            done: false,
        }

    }

    render(){
        const { data, onDelite } = this.props;
        const element = data.map((item) => {
            return (
                <li key={item.id}>
                    <Task 
                        { ...item }
                        onDelite = { onDelite }
                    />
                </li>
            )
        })
        return (
            <section className="main">
                <ul className="todo-list">
                    { element }
                </ul>
            </section>
        )
    };
};  