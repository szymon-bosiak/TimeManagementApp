import React from 'react'
import ToDo from '../ToDo/ToDo'
import styles from './home.module.css'

const Home = () => {
  return (
    <div className={styles.outer_padding}>
        <div className={styles.inner_border}>
            <div className={styles.main_content}>
                <ToDo />
            </div>
        </div>
    </div>
  )
}

export default Home