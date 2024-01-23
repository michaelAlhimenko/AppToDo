import Task from '../Task/Task';
import './index.css';

const TaskList = ({ data }) =>{
    const element = data.map((item)=>{
        const { id, ...itemProps } = item;

        return (
            <li className={itemProps.class} key={id}>
                <Task { ...itemProps }/>
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
}

export default TaskList;