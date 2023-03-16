import React, { useEffect } from 'react'
import { MdRadioButtonChecked } from 'react-icons/md';
import { VscTrash } from 'react-icons/vsc';
import './task.css'

const Task = ({ task, onCompletedDelete, onCompleteChange }) => {


  return (
    <div className='task_container'>
      <div className='task'>
        <button className='checkContainer' onClick={() => onCompleteChange(task.id)}>
          <MdRadioButtonChecked />
        </button>

        <p className='textCompleted'>
          {task.title}
        </p>

        <button className='deleteButton' onClick={() => onCompletedDelete(task.id)}>
          <VscTrash size={20} />
        </button>
      </div>
    </div>
  )
}

export default Task