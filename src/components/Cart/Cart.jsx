import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../../Context/cartContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' // ✅ أضفنا useNavigate
import styles from './Cart.module.css'
import { Link } from 'react-router-dom'

function Cart() {
    let { items, updateItemQty, removeItem } = useContext(CartContext)
    const navigate = useNavigate() 

    const handleCheckout = async () => {
        const requestBody = items.map((item) => {
            return {
                book: item.book._id,
                qty: item.qty
            }
        })
        axios.post('https://shelfshare-v2.vercel.app/api/order/checkout', { books: requestBody }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }).then((res) => {
            console.log(res.data);
            window.location.href = res.data.url
        }).catch((err) => {
            console.log(err);
        })
    }



    return (
        <div className='container py-5'>
            <h1 className={`text-center display-4 mb-5${styles.head}`}>Cart</h1>
            {
                items.length === 0 ? (
                    <div className='text-center text-muted'>
                        <h1 className={styles.message}>Your cart is empty</h1>
                        <button
                            onClick={() => navigate('/books')}
                            className={`${styles.but}`}
                        >
                            Go to Books
                        </button>
                    </div>
                ) : (
                    <dev className={`${styles.cart} container d-flex  justify-content-around align-items-end `}>
                        
                        <div className={`${styles.items} flex flex-col gap-3`}>
                            {items.map((item, index) => {
                                return (
                                    <div key={index} className={`${styles.item} flex justify-content-around align-items-center gap-5`}>
                                        <img src={item.book.image} alt="" className={styles.image} />
                                        <h3 className={styles.title}  >{item.book.title}</h3>
                                        <div className={styles.number}>
                                        <button onClick={() => { updateItemQty(item.book._id, item.qty + 1) }} className=''>+</button>
                                        <h3 className={styles.qty}  >{item.qty}</h3>
                                        
                                        <button onClick={() => { updateItemQty(item.book._id, item.qty - 1) }} className=''>-</button>
                                        </div>
                                        <h3 className={styles.price}  >{item.book.price} <span>EGP</span> </h3>
                                        <i className={`fa-solid fa-trash ${styles.deleteIcon}`} onClick={() => removeItem(item.book._id)}></i>
                                    </div>
                                )
                            })}
                        </div>
    
                        <div className={styles.totalSection}>
                        <h2 className={styles.totalTitle}>Total Price : <span> {items.reduce((acc, item) => acc + item.book.price * item.qty, 0).toFixed(2)} EGP</span></h2>
                        <button className={styles.checkoutBtn} onClick={handleCheckout}>Checkout</button>
                        <div className='text-center' ><Link to="/books" className={styles.backLink}>← Back to Books</Link></div>
                        </div>
                    </dev>
                )
            }
        </div>
    )
}    

export default Cart
