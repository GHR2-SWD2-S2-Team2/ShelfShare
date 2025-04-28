import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import img from '../../assets/digital-library.png'
import { useFormik } from 'formik'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import * as Yup from 'yup'
import { userContext } from '../../Context/userContext'

function Login() {

    let {setLogin}= useContext(userContext)

    let navigate= useNavigate()
    let [userData, getUserData]= useState([])
    let [isFlipping, setIsFlipping] = useState(false);  


    async function handleLogin(formData) {
        console.log(formData)
        try {
            const response = await axios.post('https://shelfshare-v2.vercel.app/api/auth/login', formData);
            console.log(response.data);

            setLogin(response.data.token)
            localStorage.setItem('userToken', response.data.token) 

            setIsFlipping(true); 

            setTimeout(() => {
                navigate('/');
            }, 500); 

        } catch (err) {
            console.error("Registration failed:", err);
        }
    }

    let validationSchema = Yup.object({
        email:Yup.string().required('email is required').email('invalid email'),
        password:Yup.string().required('password is required').matches(/^.{6,}$/)
    })

    let formik= useFormik({
        initialValues:{
            email:'',
            password:''
        },
        onSubmit:handleLogin,
        validationSchema:validationSchema
    })


    useEffect(()=>{
        handleLogin()
    },[])
    return <>
                <motion.div
                className='mx-auto flex flex-wrap flex-col justify-center items-center content-center h-screen w-[100%]'
                initial={{ rotateY: 0 }}
                animate={{ rotateY: isFlipping ? 180 : 0 }}
                transition={{ duration: 0.8 }}
                style={{
                    perspective: 1000, // Keep perspective for 3D feel
                    transformOrigin: "left center" // <<< CHANGE: Rotate around the left edge
                }}
                >
        <div className='mx-auto flex flex-wrap flex-col justify-center items-center content-center h-screen w-[100%]'>
        <div
            className={`flex  flex-col items-center justify-center transition-opacity duration-300 w-[100%] ${isFlipping ? 'opacity-0' : 'opacity-100'}`} // Fade out content during flip
            style={{ backfaceVisibility: 'hidden' }} // Hide the back when facing away
        >
            <div className="title text-center flex flex-col justify-center items-center">
                <span className='text-center'><img src={img} alt="BookImg" width={'80px'}/></span>
                <h1>Access Your Shelf</h1>
            </div>
            <div className='flex flex-wrap flex-col w-[50%] '>
                <form onSubmit={formik.handleSubmit}>
                    <div className='flex flex-col'>
                        <div>
                            <input type="email" placeholder='user@gmail.com' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className='border-1 p-2 my-2 w-full rounded-2xl hover:cursor-pointer hover:shadow-sm hover:shadow-stone-600 transition-all duration-300 ease'/>
                            {formik.touched.email && formik.errors.email? (<div className='text-red-800'>{formik.errors.email}</div>):null}
                        </div>
                        <div>
                            <input type="password" placeholder='Password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className='border-1 p-2 my-2 w-full rounded-2xl hover:cursor-pointer hover:shadow-sm hover:shadow-stone-600 transition-all duration-300 ease'/>
                            {formik.touched.password && formik.errors.password? (<div className='text-red-800'>{formik.errors.password}</div>):null}
                        </div>
                       
                        <div className='mx-auto'>
                            <button type='submit' className='bg-yellow-800 text-white rounded py-2 px-3 hover:shadow-sm hover:shadow-stone-600'>Login</button>
                        </div>
                    </div>
                    
                    <div className='text-center'>
                            <p>Don't have an account? <NavLink to={'/register'}>Signup</NavLink></p>
                    </div>
                </form>
            </div>
        </div>
        </div>
        </motion.div>
    </>
}

export default Login
