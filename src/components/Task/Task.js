import { formatDistanceToNow } from 'date-fns'

import './index.css';

const Task = (item) =>{
    const date = formatDistanceToNow(new Date(), { addSuffix: true });

    
    return (
        <>
            <div className="view">
                <input className="toggle" type="checkbox"/>
                <label>
                    <span className="description">{item.description}</span>
                    <span className="created">{`${date}`}</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy"></button>
            </div>
            { item.editing ?  <input type="text" className="edit" value="Editing task"></input> : '' }
        </>
        )
}

export default Task;