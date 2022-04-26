import React from 'react';

const TaskItem = props => {
  return (
    <div className='card mt-2'>
      <div className='card-body'>
        <h6>
          {props.task.title}
        </h6>
   
        <p>
          Type:{props.task.type}
        </p>
        <div style={{color:"#001fff", cursor:'pointer'}}>

        {
          (props.task.column === "todo") && (
            <p onClick={() => props.moveTask(props.task, "in-progress")}>Start Work</p>
          )
        }
        {
          (props.task.column === "in-progress") && (
            <>
            <p onClick={() => props.moveTask(props.task, "todo")}>Send back</p>
            <p onClick={() => props.moveTask(props.task, "review")}>Request-review</p>
            </>
          )
        }
        {
          (props.task.column === "review") && (
            <>
            <p onClick={() => props.moveTask(props.task, "in-progress")}>More Work Required</p>
            <p onClick={() => props.moveTask(props.task, "done")}>Mark done</p>
            </>
          )
        }
        {
          (props.task.column === "done") && (
            <p onClick={() => props.moveTask(props.task, "review")}>Request Re-Review</p>
          )
        }
        </div>



      </div>
    </div>
  )
};

export default TaskItem;
