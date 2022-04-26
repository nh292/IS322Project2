import React from 'react';
import axios from 'axios';

import TaskList from './TaskList';
import AddTask from './AddTask';
import Dropdown from './Dropdown';

class App extends React.Component {
  state = {
    tasks: [],
    tasksDone: [],
    tasksTodo: [],
    tasksInProgress: [],
    errorMessage: '',
    loading: true,
    list: false,
    newTask: false,
    view: undefined,
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios.get('http://my-json-server.typicode.com/bnissen24/project2DB/posts')
      .then(response => {

        const data = {}
        response.data.forEach(element => {

          if (!data[element.column]) {
            data[element.column] = [];
          }
          data[element.column].push(element);
        });
        this.setState({ tasks: data, loading: false });
      }).catch(error => {
        this.setState({ errorMessage: error.message });
      });
  }

  onAddTask = (taskName) => {
    let tasks = this.state.tasks;
    tasks.todo.push({
      title: taskName,
      id: this.state.tasks.todo.length + 1,
      type: 'task',
      column: 'todo'
    });
    this.setState({ tasks, newTask: false });
  }


  onView = (list) => {
    this.setState({ list })
  }

  onMoveTask = (task, column) => {
    console.log(task, column);
    let tasks = this.state.tasks;
    tasks[task.column] = tasks[task.column].filter(function (value, index, arr) {
      return value.id !== task.id;
    }); //https://love2dev.com/blog/javascript-remove-from-array/
    task.column = column;
    tasks[column].push(task);
    this.setState(tasks)
  }

  onViewOnly = (view) => {
    console.log("on view", view);
    this.setState({ view })
  }



  render() {

    if (this.state.loading) {
      return <h5>loading...</h5>
    }

    return (
      <div className="container mt-5">


        <div className='row ml-2' >
          <p
            className='mr-4'
            style={{ cursor: 'pointer', color: "#001fff" }}
            onClick={() => this.onView(false)}>Grid View</p>
          <p
            className='mr-4'
            style={{ cursor: 'pointer', color: "#001fff" }}
            onClick={() => this.onView(true)}>List View</p>
          <p
            className='mr-4'
            style={{ cursor: 'pointer', color: "#001fff" }}
            onClick={() => { this.setState({ newTask: !this.state.newTask }) }}
          >Add Task</p>
        </div>
        {
          (this.state.newTask) && (
            <AddTask onSubmit={this.onAddTask} />
          )
        }

  <div className='d-block d-sm-none'>
          <Dropdown viewOnly={this.onViewOnly}></Dropdown>
  </div>

        <div className='row'>
          {
            (this.state.view === undefined || this.state.view === "todo") && (

              <div className={`col${this.state.list ? '-12' : ''}`}>
                <TaskList tasks={this.state.tasks.todo} title="TO DO" moveTask={this.onMoveTask} />
              </div>
            )
          }
          {
            (this.state.view === undefined || this.state.view === "in-progress") && (
              <div className={`col${this.state.list ? '-12' : ''}`}>
                <TaskList tasks={this.state.tasks["in-progress"]} title="In progress" moveTask={this.onMoveTask} />
              </div>
            )
          }
          {
            (this.state.view === undefined || this.state.view === "review") && (
              <div className={`col${this.state.list ? '-12' : ''}`}>
                <TaskList tasks={this.state.tasks.review} title="Review" moveTask={this.onMoveTask} />
              </div>
            )}
          {
            (this.state.view === undefined || this.state.view === "done") && (
              <div className={`col${this.state.list ? '-12' : ''}`}>
                <TaskList tasks={this.state.tasks.done} title="Done" moveTask={this.onMoveTask} />
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default App;
