import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import BookCard from '../Books/BookCard'
import { useNavigate } from 'react-router-dom'
import styles from './Favorite.module.css'

function Favorite() {
    const navigate = useNavigate()
    const [items, setItems] = React.useState([])
    useEffect(() => {
        axios.get('https://shelfshare-v2.vercel.app/api/favorite', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }})
            .then((res) => {
                console.log(res.data)
                setItems(res.data.favoriteList)
            })
            .catch((err) => {
                console.log(err)
            })
    } , [])
    return (
        <div className="container py-5">
          <h1 className={`text-center display-4 ${styles.head}`}>Favorite</h1>
    
          {items.length === 0 ? (
            <div className="text-center text-muted">
              <p className={styles.message} >Your favorites list is empty.</p>
              <button 
                className={styles.but}
                onClick={() => navigate("/Books")}
              >
                return to Books
              </button>
            </div>
          ) : (
            <div className={`row g-4 justify-content-center ${styles.cart}`}>
  {items.map((item, index) => (
    <div key={index} className="col-12 col-sm-6 mt-5 col-md-4 col-lg-3">
      <BookCard book={item} isFav={true} />
    </div>
  ))}
</div>
          )}
        </div>
      );
    }

export default Favorite
