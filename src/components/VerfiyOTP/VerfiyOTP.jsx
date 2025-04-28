import axios from 'axios'
import React, { useState } from 'react'
import img from '../../assets/password-access.png'
import { useFormik } from 'formik'
import { useNavigate , useLocation, NavLink, Link } from 'react-router-dom'
import { motion } from 'framer-motion';
import * as Yup from 'yup'


function VerifyOtp() {

    let navigate= useNavigate()
    const location= useLocation()
    const initialEmail= location.state?.email||''
    let [isFlipping, setIsFlipping] = useState(false);  

    async function handleVerify(formData) {
        console.log("Verifying OTP for:", formData.email)
        try {
            const response = await axios.post('https://shelfshare-v2.vercel.app/api/auth/verify-otp', formData);
            console.log(response.data);

            setIsFlipping(true); 

            setTimeout(() => {
                navigate('/login');
            }, 800); 

        } catch (err) {
            console.error("Registration failed:", err);
        }
    }

    let validationSchema = Yup.object({
        email:Yup.string().required('Email is required').email('invalid email format'),
        otp:Yup.string().required('OTP is required').matches(/^[0-9]{6}$/)
    })

    let formik= useFormik({
        initialValues:{
            email:initialEmail,
            otp:''
        },
        enableReinitialize:true,
        onSubmit:handleVerify,
        validationSchema:validationSchema
    })


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
                <h1>Shelf Your Dreams</h1>
            </div>
            <div className='flex flex-wrap flex-col w-[50%] '>
                <form onSubmit={formik.handleSubmit}>
                    <div className='flex flex-col'>
                        <div>
                            <input type="email" placeholder='user@gmail.com' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className='border-1 p-2 my-2 w-full rounded-2xl hover:cursor-pointer hover:shadow-sm hover:shadow-stone-600 transition-all duration-300 ease' readOnly/>
                            {formik.touched.email && formik.errors.email? (<div className='text-red-800'>{formik.errors.email}</div>):null}
                        </div>
                        <div>
                            <input type="tel" placeholder='otp' name='otp' value={formik.values.otp} onChange={formik.handleChange} onBlur={formik.handleBlur} className='border-1 p-2 my-2 w-full rounded-2xl hover:cursor-pointer hover:shadow-sm hover:shadow-stone-600 transition-all duration-300 ease'/>
                            {formik.touched.otp && formik.errors.otp? (<div className='text-red-800'>{formik.errors.otp}</div>):null}
                        </div>
                        <div>
                            <p>
                                <Link to={'/resendotp'} className=' text-decoration-none text-amber-300 '>
                                    <span className='text-gray-600 hover:underline hover:cursor-pointer hover:text-blue-500'>Resend OTP</span>
                                </Link>
                            </p>
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

export default VerifyOtp
