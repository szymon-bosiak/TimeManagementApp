import React, { useState } from 'react'
import styles from './header.module.css'
import { RiPlayListAddLine } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion'

const Header = ({ handleAddTask }) => {

  const [title, setTitle] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    handleAddTask(title);
    setTitle('');
  }

  function onChangeTitle(event) {
    setTitle(event.target.value);
  }

  return (
    <header className={styles.header}>

      <form onSubmit={handleSubmit} className={styles.newTaskForm}>
        <input placeholder="Add a new task" type="text" onChange={onChangeTitle} value={title} />

            <motion.div whileHover={{ scale: 1.05 }}>
              <button>Create <RiPlayListAddLine size={20} /></button>
            </motion.div>    
      </form>
    </header>
  )
}

export default Header