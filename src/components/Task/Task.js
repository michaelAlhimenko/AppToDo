import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns'

import './index.css';

export default class Task extends Component {

    constructor(){
        super();
        this.date = formatDistanceToNow(new Date(), { addSuffix: true });
        this.state = {
            done: false,
        }
    }

    onDone = () => {
        this.setState((state) => {
            return {
                done: !state.done,
            } 
        })
    }
    render(){
        const { id, onDelite, ...itemProps } = this.props;
        
        let classNames = 'view';

        if (this.state.done){
            classNames += ' completed';
        }else{
            classNames = 'view';
        }


        return (
                <>
                <div className={ classNames }>
                    <input className="toggle" type="checkbox" onClick={ this.onDone } />
                    <label>
                        <span className="description">{itemProps.description}</span>
                        <span className="created">{`${this.date}`}</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy" onClick={ () => onDelite(id) }></button>
                </div>
                { this.props.editing ?  <input type="text" className="edit" value="Editing task"></input> : '' }
                </>
        )
        
    }
}