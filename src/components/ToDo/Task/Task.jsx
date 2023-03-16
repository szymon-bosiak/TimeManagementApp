import React, { useEffect } from 'react'
import { VscTrash } from 'react-icons/vsc';
import './task.css'

const Task = ({ task, onDelete, onUncompleteChange }) => {


  return (
    <div className='task_container'>
      <div className='task'>
        <button className='checkContainer' onClick={() => onUncompleteChange(task.id)}>
          <div />
        </button>

        <p>
          {task.title}
        </p>

        <button className='deleteButton' onClick={() => onDelete(task.id)}>
          <VscTrash size={20} />
        </button>
      </div>
    </div>
  )
}

export default Task