import React from 'react'

const Dropdown = props => (
  // https://getbootstrap.com/docs/4.0/components/dropdowns/
  <div className="dropdown">
    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Select column
    </button>
    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a className="dropdown-item" href="#" onClick={()=>props.viewOnly("todo")}>Todo</a>
      <a className="dropdown-item" href="#" onClick={()=>props.viewOnly("in-progress")}>In Progress</a>
      <a className="dropdown-item" href="#" onClick={()=>props.viewOnly("review")}>Review</a>
      <a className="dropdown-item" href="#" onClick={()=>props.viewOnly("done")}>Done</a>
    </div>
  </div>
)


export default Dropdown
