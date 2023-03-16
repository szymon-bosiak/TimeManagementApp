import React from 'react'
import Task from '../Task/Task'
import TaskCompleted from '../Task/TaskComplted'
import styles from './tasks.module.css'
import { motion, AnimatePresence } from 'framer-motion'

const Tasks = ({ tasks, onDelete, onCompletedDelete, onCompleteChange,
  onUncompleteChange, completedTasksList }) => {

  const uncompletedTasksQuantity = tasks.length;
  const completedTasksQuantity = completedTasksList.length;
  const tasksQuantity = uncompletedTasksQuantity + completedTasksQuantity;
  const completedTasks = tasks.filter(task => task.isCompleted).length;

  // Animations

  const taskVariantsUncompleted = {
    initial: { 
      opacity: 0,
      x: -100
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: .5 }
    },
    hidden: {
      x: 100,
      opacity: 0,
      height: '0px',
      transition: { duration: .5 }
    }
  }

  const taskVariantsCompleted = {
    initial: {
      opacity: 0,
      x: 100
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: .5 }
    },
    hidden: {
      x: -100,
      opacity: 0,
      height: '0px',
      transition: { duration: .5 }
    }
  }

  const line = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: { duration: .7 }
    },
    hidden: {
      opacity: 0,
      transition: { duration: .7 }
    }
  }

  return (
    <section className={styles.tasks}>
      <header className={styles.header}>
        <div>
          <p>Created tasks</p>
          <span>{tasksQuantity}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Completed tasks</p>
          <span>{completedTasksQuantity} of {tasksQuantity}</span>
        </div>
      </header>

      <div className={`${styles.list_uncomplted} ${styles.list}`}>
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
            key={task.id}
            variants={taskVariantsUncompleted}
            initial='initial'
            animate='animate'
            exit='hidden'
            >
              <div className={styles.uncompleted}>
                  {!task.isCompleted
                    ? <Task key={task.id} task={task} onDelete={onDelete} onUncompleteChange={onUncompleteChange} />
                    : ''
                  }
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
          <motion.div
            variants={line}
            initial='initial'
            animate='animate'
            exit='hidden'
          >
            {completedTasksQuantity > 0 && completedTasksQuantity !== tasksQuantity
              ? <hr className={styles.separator} />
              : ''
            }
          </motion.div>
      </AnimatePresence>

      <div className={`${styles.list_complted} ${styles.list}`}>
        <AnimatePresence>
          {completedTasksList.map((task) => (
            <motion.div
              key={task.id}
              variants={taskVariantsCompleted}
              initial='initial'
              animate='animate'
              exit='hidden'
            >
              <div className={styles.completed}>
                {task.isCompleted
                  ? <TaskCompleted key={task.id} task={task} onCompletedDelete={onCompletedDelete} onCompleteChange={onCompleteChange}/>
                  : ''
                }
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
    </section>
  )
}

export default Tasks