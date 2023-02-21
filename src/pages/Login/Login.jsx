// @ts-nocheck
import React, { useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, TwitterAuthProvider} from 'firebase/auth'
import {MdAlternateEmail} from 'react-icons/md'
import {BsFillShieldLockFill} from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase/firebaseAuth'

const Login = () => {
    const [user, setUser] = useState({})
    const [passwordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState(false)
    const [userEmail,  setUserEmail] = useState('');
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
    const handleLogin = (event) =>{
        event.preventDefault()
        setSuccess(false)
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user
            console.log(user);
            setSuccess(true)

            if(user.emailVerified === false){
                alert("please at first verify email")
                return
            }
            form.reset()
            navigate('/')
        })
        .catch(error => {
            if(error.code === "auth/user-not-found"){
                setPasswordError('Please check your email')
            }
            else if(error.code === "auth/wrong-password"){
                setPasswordError('Password didnt match')
            }
            else{
                setPasswordError(error.message)
                console.error(error)
            }
        })
    }

    // forgot password
    const handleEmailBlur = (event) => {
        const email = event.target.value;
        setUserEmail(email)
        console.log(email);
    }
    
    const handleForgotPassword = () => {
        if(!userEmail){
            alert('Please enter your email')
            return;
        }
        sendPasswordResetEmail(auth, userEmail)
        .then(() => {
            alert('Password reset email sent')
        })
        .catch(error => {
            console.error(error)
        })
    }



    return (
        <div className='flex justify-between'>
           <div className='bg-gray-200 w-1/2'>
                <p className=' text-center mt-4 mb-2 block text-2xl font-semibold text-blue-500 '>Login</p>
                <form onSubmit={handleLogin}>
                
                <div className='mx-10'>
                        <label htmlFor="email" className='mt-4 mb-2 block text-xl font-medium'>Email</label>
                        <div className='relative'>
                            <input onBlur={handleEmailBlur} type="email" name="email" id="email" className='w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500' placeholder='me.email@gmail.com' required />
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
                            success && <p className='text-green-700 font-semibold'>Successfully Logged in to the account</p>
                        }
                    </div>
                    <div>
                        <button type="submit" className='mt-4 mb-2 block text-xl font-medium mx-10 px-6 py-2 bg-blue-500 rounded-md text-white outline-none'>
                            Login
                        </button>
                    </div>
                    
                </form>
                <div className='mx-10 py-4 flex  justify-between '>
                        <div>
                            <span>Dont have an account.Please <span>
                            <Link className='text-blue-500' to='/register'>Register</Link>
                            </span> </span>
                        </div>
                        <div className=''>
                            <button onClick={handleForgotPassword} className='text-blue-500 font-semibold outline-none'>Forgot Password?</button>
                        </div>
                    </div>
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
             <img src={user.photoURL} alt={user.displayName} />
            </div>}
           </div>
        </div>
    );
};

export default Login;