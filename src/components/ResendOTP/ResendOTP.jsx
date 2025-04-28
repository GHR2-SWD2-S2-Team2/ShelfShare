import axios from 'axios'
import React, { useState } from 'react'
import img from '../../assets/password-access.png'
import { useFormik } from 'formik'
import { useNavigate , useLocation, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion';
import * as Yup from 'yup'


function ResendOtp() {

    let navigate= useNavigate()
    const location= useLocation()
    let [isFlipping, setIsFlipping] = useState(false);  

    async function handleVerify(formData) {
        console.log("Verifying OTP for:", formData.email)
        try {
            const response = await axios.post('https://shelfshare-v2.vercel.app/api/auth/resend-otp', formData);
            console.log(response.data);

            setIsFlipping(true); 

            const emailToPass = formData.email;

            setTimeout(() => {
                navigate('/verifyOtp', { state: { email: emailToPass }, replace: true });
            }, 800); 

        } catch (err) {
            console.error("Registration failed:", err);
        }
    }

    let validationSchema = Yup.object({
        email:Yup.string().required('Email is required').email('invalid email format'),
    })

    let formik= useFormik({
        initialValues:{
            email:'',
        },
        onSubmit:handleVerify,
        validationSchema:validationSchema
    })


    return <>

    <motion.div
        className='mx-auto flex flex-wrap flex-col justify-center items-center content-center h-screen w-[100%]'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className='mx-auto flex flex-wrap flex-col justify-center items-center content-center h-screen w-[100%]'>
        <div
            className={`flex  flex-col items-center justify-center transition-opacity duration-300 w-[100%] ${isFlipping ? 'opacity-0' : 'opacity-100'}`} // Fade out content during flip
            style={{ backfaceVisibility: 'hidden' }} // Hide the back when facing away
        >
            <div className="title text-center flex flex-col justify-center items-center">
                <span className='text-center'><img src={img} alt="BookImg" width={'80px'}/></span>
                <h1>Shelf Your Dreams</h1>
            </div>
            <div className='flex flex-wrap flex-col w-[50%] '>
                <form onSubmit={formik.handleSubmit}>
                    <div className='flex flex-col'>
                        <div>
                            <input type="email" placeholder='user@gmail.com' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className='border-1 p-2 my-2 w-full rounded-2xl hover:cursor-pointer hover:shadow-sm hover:shadow-stone-600 transition-all duration-300 ease'/>
                            {formik.touched.email && formik.errors.email? (<div className='text-red-800'>{formik.errors.email}</div>):null}
                        </div>
                       
                        <div className=' text-sm mt-2'>
                            <button
                                type="button"
                                onClick={() => navigate('/login', { replace: true })} // Navigate back to login
                                className="text-blue-700 hover:underline">
                                    Back to Login
                                </button>
                        </div>

                        <div className='mx-auto'>
                            <button type='submit' className='bg-emerald-400 text-white rounded py-2 px-3 hover:shadow-sm hover:shadow-stone-600'>Send</button>
                        </div>

                        
                    </div>
                    

                </form>
            </div>
            </div>
        </div>
        </motion.div>
    </>
}

export default ResendOtp
