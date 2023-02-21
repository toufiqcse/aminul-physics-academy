import React, {  useState ,useContext} from 'react';
import {FaUserAlt} from 'react-icons/fa'
import {MdAlternateEmail}  from 'react-icons/md'
import {BsFillShieldLockFill,BsGithub} from 'react-icons/bs'
import {GrGoogle} from 'react-icons/gr'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import { updateProfile } from 'firebase/auth';
import auth from '../../firebase/firebaseAuth';



const SignUp = () => {
    // ,verifyEmail, signInwithGoogle
    // setting method
    const {createUser, verifyEmail, signInwithGoogle, signInWithGithub,updateUserProfile} = useContext(AuthContext)
    
    // set location
    const location = useLocation();
    const from = location.state?.from?.pathName || '/'
    
    // navigate to other page 
    const navigate = useNavigate();

    // state for set password error handling
    const [passError, setPassError] = useState(null)
    const [user, setUser] = useState({});
    // Handle submit button
    const handleSubmit = (event) =>{
        event.preventDefault();
        const form  = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        // const Cpassword = form.confirm.value;
        console.log(name, email, password);

        // password validation
        if (!/(?=.*[A-Z])/.test(password)) {
            setPassError('Please provide at least one uppercase')
            return;
        }
        if (!/(?=.*[!@#$&*])/.test(password)) {
            setPassError('Please add at least one special character')
            return;
        }
        if (!/(?=.*[0-9])/.test(password)) {
            setPassError('Please provide at least one digit')
            return;
        }
        if (!/.{6}/.test(password)) {
            setPassError('Password should be at least 6 characters')
            return;
        }
        // if (password !== confirmPass) {
        //     setPassError('confirm password not match on password');
        //     return;
        // }
        else {
            setPassError('');
        }



        // signUp method declare
        createUser(email, password)
        .then(result => {
            const user = result.user;
            setUser(user)
            form.reset();
            // handle updateUserProfile (name, photoURL);
            handleEmailVerification()
            alert("Please verify your email before login..!");
            navigate('/login')
            handleUserName();
            
            // console.log(user);
        })
        .catch(error => {
            if(error.code === "auth/email-already-in-use"){
                setPassError("The Email address is already used")
            }
            else if(error.code === "auth/invalid-email"){
                setPassError('The Email address is not valid')
           }
           else if(error.code === "auth/operation-not-allowed"){
            setPassError('Operation Not allowed')
           }
           else if(error.code === "auth/weak-password"){
            setPassError('Password should be at 6 characters')
           }
           else{
            setPassError(error.message);
            console.error('error', error)
           }
            console.error(error)
        })
    } 


    // Handle google sign In method
    const handleGoogleSignIn = () =>{
        signInwithGoogle()
        .then(result => {
            const user = result.user;
            setUser(user)
            // setPassError()
            navigate(from, {replace: true});
        })
        .catch(error => {
            if(error.code === "auth/popup-closed-by-user"){
                setPassError('PopUp closed by user')
            }
            else{
                setPassError(error.message)
            }
            console.error(error)
        })
    }


    // handle github signIN
    const handleGithubSignIn = () => {
        signInWithGithub()
        .then(result => {
            const user = result.user;
            setPassError('')
            navigate(from, {replace: true});
        })
        .catch(error => {
            if(error.code === "auth/popup-closed-by-user"){
                setPassError('PopUp closed by user')
            }
            else{
                setPassError(error.message)
            }
            console.error(error)
        })
    }

    // update user profile
    // const handleUserName = (name) => {
    //     updateProfile(auth.currentUser, {
    //         displayName: name
    //     })
    //     .then(() =>{
    //         console.log("display name updated");
            
    //     })
    //     .catch(error => {
    //         console.error(error)
    //     })
    // }
    const handleUserName =() => {
        const user = auth.currentUser
        if(user !== null) {
            const name = user.displayName
            setUser(name)
        }
    }

    // handle Email verification
    const handleEmailVerification =() => {
        verifyEmail()
        .then(() => {

        })
        .catch(error => console.error(error))
    }


    return (
        <div>
            <div className='bg-gray-50 desktop:w-1/2 large:w-1/2 mobile:w-full laptop:w-1/2 mx-auto mt-4 rounded-md font-[Inter]'>
                <div>
                    <h1 className='text-2xl text-slate-700 font-bold text-center py-3'>Sign Up</h1>
                </div>
                <form onSubmit={handleSubmit} className=' px-6 pb-6'>
                    <div>
                        <label 
                        htmlFor="name" 
                        className='mt-4 mb-2 block text-xl text-slate-700 font-medium'>Name
                        </label>
                        <div className="relative">
                            <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            className='w-full border border-gray-200 rounded-md px-4 py-3 pl-11 shadow-md text-sm  focus:z-10 outline-none focus:border-[#DE0655] focus:ring-[#DE0655]'
                            placeholder='Enter Your Name' 
                            required />
                            <div className='absolute left-0 inset-y-0 inline-flex items-center pointer-events-none px-3 text-slate-800'>
                            <FaUserAlt></FaUserAlt>
                            </div>
                        </div>
                    </div>
                    {/* email */}
                    <div>
                        <label 
                        htmlFor="email" 
                        className='mt-4 mb-2 block text-xl text-slate-700 font-medium'>Email
                        </label>
                        <div className="relative">
                            <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            className='w-full border appearance-none border-gray-200 rounded-md px-4 py-3 pl-11 shadow-md text-sm outline-none focus:border-[#DE0655] focus:ring-[#DE0655]' 
                            placeholder='Enter Your email' 
                            required />
                            <div className='absolute left-0 inset-y-0 inline-flex items-center pointer-events-none px-3 text-slate-800'>
                            <MdAlternateEmail></MdAlternateEmail>
                            </div>
                        </div>
                    </div>
                    {/* password */}
                    <div>
                        <label 
                        htmlFor="password" 
                        className='mt-4 mb-2 block text-xl text-slate-700 font-medium'>Password
                        </label>
                        <div className="relative">
                            <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            className='w-full border border-gray-200 rounded-md px-4 py-3 pl-11 shadow-md text-sm outline-none focus:border-[#DE0655] focus:ring-[#DE0655]' 
                            placeholder='Enter Your password' 
                            required />
                            <div className='absolute left-0 inset-y-0 inline-flex items-center pointer-events-none px-3 text-slate-800'>
                            <BsFillShieldLockFill></BsFillShieldLockFill>
                            </div>
                        </div>
                    </div>
                    {/* confirm */}
                    {/* <div>
                        <label 
                        htmlFor="password" 
                        className='mt-4 mb-2 block text-xl text-slate-700 font-medium'>Confirm Password
                        </label>
                        <div className="relative">
                            <input 
                            type="password" 
                            name="password" 
                            id="Confirm-password" 
                            className='w-full border appearance-none border-gray-200 rounded-md px-4 py-3 pl-11 shadow-md text-sm outline-none focus:border-[#DE0655] focus:ring-[#DE0655]' 
                            placeholder='Enter Your password' 
                            required />
                            <div className='absolute left-0 inset-y-0 inline-flex items-center pointer-events-none px-3 text-slate-800'>
                            <BsFillShieldLockFill></BsFillShieldLockFill>
                            </div>
                        </div>
                    </div> */}

                    <div>
                        <p className='text-red-500'>{passError}</p>
                    </div>

                    <div className='py-4 flex items-center justify-center'>
                        <button 
                        className='bg-gradient-to-r  from-[#EF512E] to-[#DE0655] rounded-full w-48 outline-none py-2 text-white'>Sign Up
                        </button>
                    </div>

                    <div className='flex flex-wrap gap-6 items-center justify-center'>
                        <span>Already have an account.Please <span>
                            <Link 
                            className='text-blue-500' 
                            to='/login'>login</Link>
                        </span> 
                        </span>
                        <div className='flex gap-6 items-end '>
                            <div className='bg-white px-3 py-2 rounded-lg shadow-lg'>
                                <button  
                                onClick={handleGoogleSignIn}
                                className='text-[#DE0655]'>
                                    <GrGoogle></GrGoogle>
                                </button>
                            </div>
                            <div className='bg-white px-3 py-2 rounded-lg shadow-lg'>
                            <button 
                            onClick={handleGithubSignIn}
                            className='text-[#DE0655]'>
                                <BsGithub></BsGithub>
                            </button>
                            </div>
                            
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;