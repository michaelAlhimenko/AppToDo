import React, { Component } from 'react';
import { format } from 'date-fns';
import './index.css';

export default class NewTaskForm extends Component {

    constructor(){
        super();
        this.state = {
            desc: '',
        }
    }

    onDescChange = (e) => {
        this.setState({
            desc: e.target.value,
        })
    }

    onSubmitDesc = (e) => {
        e.preventDefault();
        this.props.onItemAdd(this.state.desc);

        this.setState({
            desc: '',
        })
    }

    render(){
        return (
            <form onSubmit={ this.onSubmitDesc }>
                <input className="new-todo" value={ this.state.desc } onChange={ this.onDescChange } placeholder="What needs to be done?" autoFocus/>
            </form>
        )
    }
};