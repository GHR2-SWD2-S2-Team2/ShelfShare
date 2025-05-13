import React from 'react'
import styles from './Cancel.module.css'
import { useNavigate } from 'react-router-dom'

export default function Cancel() {
  const navigate = useNavigate()
  return (
        <div className=' container text-center text-muted'>
                                <h1 className={styles.message}>Your order has been completed</h1>
                                <button
                                    onClick={() => navigate('/books')}
                                    className={`${styles.but}`}
                                >
                                    Go to Books
                                </button>
                            </div>
      )
  
}
