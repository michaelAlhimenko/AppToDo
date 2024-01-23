import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns'

import './index.css';

export default class Task extends Component {

    constructor(){
        super();
        this.date = formatDistanceToNow(new Date(), { addSuffix: true });
    }
    
    render(){
        const { id, onDelite, onToogleDone, done, ...itemProps } = this.props;
        
        let classNames = 'view';
        let checked = false; 

        if (done){
            classNames += ' completed';
            checked = true;
        }else{
            classNames = 'view';
        }


        return (
                <>
                <div className={ classNames }>
                    <input className="toggle" type="checkbox" readOnly checked={ checked ? true : false } onClick={ () => onToogleDone(id) } />
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