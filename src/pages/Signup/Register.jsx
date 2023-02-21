/* eslint-disable react-hooks/rules-of-hooks */
// @ts-nocheck
import React, { useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut, TwitterAuthProvider, updateProfile} from 'firebase/auth'
import {MdAlternateEmail} from 'react-icons/md'
import {BsFillShieldLockFill , BsUser} from 'react-icons/bs'
import {FaUserAlt} from 'react-icons/fa'
import app from '../../firebase/firebase.init';
import { Link, useNavigate } from 'react-router-dom';
import emailVerification from '../../firebase/verification/emailVerification';
import { ToastContainer } from 'react-toastify';
const auth = getAuth(app)
const Register = () => {
    const [user, setUser] = useState({})
    const [passwordError, setPasswordError] = useState(null);
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider()
    const twitterProvider = new TwitterAuthProvider()

    const handleGoogleSignIn = () =>{
        signInWithPopup(auth,googleProvider)
        .then(result => {
            const user = result.user
            setUser(user)
        })
        .catch(error => {
            console.error(error);
        })
    }

    const handleSignOut = () =>{
       signOut(auth)
       .then(() => {
        setUser({})
       })
       .catch(() =>{
        setUser({})
       })
    } 

    const handleGithubSignIn =() =>{
        signInWithPopup(auth, githubProvider)
        .then(result => {
            const user = result.user;
            setUser(user)
        })
        .catch(error => {
            console.error(error);
        })
    }
    
    const handleTwitterSignIn = () =>{
        signInWithPopup(auth, twitterProvider)
        .then(result => {
            const user = result.user;
            setUser(user)
        })
        .cath(error =>{
            console.error(error)
        })
    }

    //  form validation
    const handleRegister =(event) =>{
        event.preventDefault()
        setSuccess(false)
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const name = form.name.value

        // password validation
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setPasswordError('Please provide at least two uppercase')
            return;
        }
        if (!/(?=.*[!@#$&*])/.test(password)) {
            setPasswordError('Please add at least one special character')
            return;
        }
        
        if (!/(?=.*[0-9])/.test(password)) {
            setPasswordError('Please provide at least one digit')
            return;
        }
        if (!/.{8}/.test(password)) {
            setPasswordError('Password should be at least 8 characters')
            return;
        }
        else{
            setPasswordError('')
        }

        createUserWithEmailAndPassword(auth, email,password)
        .then(output => {
            const user = output.user;
            setSuccess(true)
            form.reset()
            emailVerification()
            navigate("/login")
            handleUserName(name)
            console.log(user);
        })
        .catch(error => {
            if(error.code === "auth/email-already-in-use"){
                setPasswordError('The email address in already use.');
            }
            else if(error.code  === "auth/invalid-email"){
                setPasswordError('The email address is not valid');
            }
           else if(error.code === "auth/operation-not-allowed"){
                setPasswordError("Operation Not allowed")
            }
            else if(error.code  ===  "auth/weak-password"){
                setPasswordError("Password should be at least  8  characters")
            }
            else {
                setPasswordError(error.message);
                console.log("error", error);
            }
            
        })
    }

    const handleUserName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
        .then(() =>{
            console.log("display name updated");
        })
        .catch(error => {
            console.error(error)
        })
    }

    return (
        <div className='flex justify-between'>
           <div className='bg-gray-200 w-1/2'>
               
                <p className=' text-center mt-4 mb-2 block text-2xl font-medium'>Registration</p>
                <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                >

                </ToastContainer>
                <form onSubmit={handleRegister}>

                <div className='mx-10'>
                        <label htmlFor="name" className='mt-4 mb-2 block text-xl font-medium'>Name</label>
                        <div className='relative'>
                            <input type="text" name="name" id="name" className='w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500' placeholder='Enter your name' required />
                            <div className='pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3'>
                                <FaUserAlt></FaUserAlt>

                            </div>
                        </div>
                    </div>

                <div className='mx-10'>
                        <label htmlFor="email" className='mt-4 mb-2 block text-xl font-medium'>Email</label>
                        <div className='relative'>
                            <input type="email" name="email" id="email" className='w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500' placeholder='me.email@gmail.com' required />
                            <div className='pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3'>
                                <MdAlternateEmail></MdAlternateEmail>

                            </div>
                        </div>
                    </div>
                    <div className='mx-10'>
                        <label htmlFor="password" className='mt-4 mb-2 block text-xl font-medium'>Password</label>
                        <div className='relative'>
                            <input type="password" name="password" id="password" className='w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500' placeholder='Enter Password' required/>
                            <div className='pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3'>
                                <BsFillShieldLockFill></BsFillShieldLockFill>

                            </div>
                        </div>


                        <p className='text-red-500 font-semibold text-sm'>{passwordError}</p>

                        {
                            success && <p className='text-green-700 font-semibold'>Successfully Registered</p>
                        }
                    </div>
                    <div>
                        <button type="submit" className='mt-4 mb-2 block text-xl font-medium mx-10 px-6 py-2 bg-blue-500 rounded-md text-white outline-none'>Register</button>
                    </div>
                    <div className='mx-10 py-4'>
                        <span>Already have an account.Please <span>
                            <Link className='text-blue-500' to='/login'>login</Link>
                            </span> </span>
                    </div>
                </form>
           </div>
           <div>
           {
                user.uid ? <button className='p-4 mx-10 my-20  bg-red-400' onClick={handleSignOut}>Sign Out</button> 
                : 
                <div>
                    <button className='bg-green-500 p-4 mx-10 my-20 ' onClick={handleGoogleSignIn}>Google Sign in</button>
                    <button className='bg-blue-500 p-4 mx-10 my-20 ' onClick={handleGithubSignIn}>Github Sign in</button>
                    <button className='bg-orange-500 p-4 mx-10 my-20 ' onClick={handleTwitterSignIn}>Twitter Sign in</button>
                </div>

            }
            
            

            { user.uid && <div>
             <p> User Name:{user.displayName}</p>
             <p>Email {user.email}</p>
             <img src={user.photoURL} alt="" />
            </div>}
           </div>
        </div>
    );
};

export default Register;