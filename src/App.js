import  Header from './components/header/header';
import TaskFilter from './components/TasksFilter/TaskFilter';
import TaskList from './components/TaskList/TaskList';

import './App.css';


function App() {
  const todoData = [
    {id: 0, class: 'completed', description: 'Completed task'},
    {id: 1, class: 'editing', editing: true, description: 'Editing task'},
    {id: 2, class: '', description: 'Active task'}
  ];
  
  return (
    <section className="todoapp">
      <Header/>
      <TaskList data={todoData}/>
      <TaskFilter/>
    </section>
  );
}

export default App;
