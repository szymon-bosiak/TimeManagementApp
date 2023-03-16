import React, { useState, useEffect } from 'react'
import Header from './Header/Header'
import Tasks from './Tasks/Tasks'
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY_UNCOMPLETED = 'tasks_uncompleted';
const LOCAL_STORAGE_KEY_COMPLETED = 'tasks_completed';

const ToDo = () => {

  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Local storage for uncomplted tasks

  function loadUncompltedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_UNCOMPLETED);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }

  function setUncompletedAndSave(newTasks) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY_UNCOMPLETED, JSON.stringify(newTasks));
  }

  // Local storage for completed tasks

  function loadCompletedTasks() {
    const savedCompleted = localStorage.getItem(LOCAL_STORAGE_KEY_COMPLETED);
    if (savedCompleted) {
      setCompletedTasks(JSON.parse(savedCompleted));
    }
  }

  function setCompletedAndSave(newTasks) {
    setCompletedTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY_COMPLETED, JSON.stringify(newTasks));
  }

  // Load stored data

  useEffect(() => {
    loadUncompltedTasks();
    loadCompletedTasks();
  }, [])

  // Adding tasks

  function addTask(taskTitle) {
    setUncompletedAndSave([{
      id: crypto.randomUUID(),
      title: taskTitle,
      isCompleted: false
    }, ...tasks]);
  }

  // Manipulating Task's state

  function deleteTaskById(taskId) {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setUncompletedAndSave(newTasks);
  }

  function deleteCompletedTaskById(taskId) {
    const newTasks = completedTasks.filter(task => task.id !== taskId);
    setCompletedAndSave(newTasks);
  }

  function setTaskCompletedById(taskId) {

    tasks.map(task => {
      if (task.id === taskId) {
        task.isCompleted = !task.isCompleted
        setCompletedTasks([task, ...completedTasks])
      }
      return task;
    });

    const filteredCompletedTasks = tasks.filter(task => task.id !== taskId);
    const remaining = tasks.filter(task => task.id === taskId);
    setUncompletedAndSave(filteredCompletedTasks);
    setCompletedAndSave([remaining[0], ...completedTasks]);
  }

  function setTaskUncompletedById(taskId) {

    completedTasks.map(task => {
      if (task.id === taskId) {
        task.isCompleted = !task.isCompleted
        setTasks([task, ...tasks])
      }
      return task;
    });

    const filteredUncompletedTasks = completedTasks.filter(task => task.id !== taskId);
    const remaining = completedTasks.filter(task => task.id === taskId);
    setCompletedAndSave(filteredUncompletedTasks);
    setUncompletedAndSave([remaining[0], ...tasks]);
  }
  
  return (
    <>
      <Header handleAddTask={addTask} />
      <Tasks
        tasks={tasks}
        completedTasksList={completedTasks}
        onDelete={deleteTaskById}
        onCompletedDelete={deleteCompletedTaskById}
        onCompleteChange={setTaskUncompletedById}
        onUncompleteChange={setTaskCompletedById}
      />
    </>
  )
}

export default ToDo