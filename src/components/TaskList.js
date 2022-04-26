import React from 'react';

import TaskItem from './TaskItem';

class TaskList extends React.Component {


  render() {
    const taskItems = this.props.tasks.map(task => {
      return <TaskItem task={task} key={task.id} moveTask={this.props.moveTask} />
    });

    return (
      <div className='mt-3'>
        <h5 className='text-center'>
        {this.props.title}
        </h5>
        <ul className="task-list list-group">
          {taskItems}
        </ul>
      </div>
    )
  }
}

export default TaskList;
