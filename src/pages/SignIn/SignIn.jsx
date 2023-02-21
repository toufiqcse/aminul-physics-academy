import React, { useContext, useState } from 'react';
import {MdAlternateEmail} from 'react-icons/md';
import {BsFillShieldLockFill} from 'react-icons/bs'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const SignIn = () => {
    const [userEmail, setUserEmail] = useState('')
    const[error, setError] = useState(null)
    const [user, setUser] = useState({});
    const {signIn, setLoading, forgotPass} = useContext(AuthContext);

    const navigate = useNavigate();

    const location = useLocation();
    const from = location.state?.from?.pathName || '/'

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email =  form.email.value;
        const password = form.password.value;
    

    // sign in method
    signIn(email, password)
    .then(result => {
        const user = result.user;

        // email verify then login
        if(user.emailVerified) {
            form.reset();
            navigate(from, {replace: true});
        }
        else{
            setError();
            alert("Email not verified")
        }
    })
    .catch(error => {
        if (error.code === "auth/user-not-found") {
            setError("Please check your email.");

        } else if (error.code === "auth/wrong-password") {
            setError("Wrong Password.");

        } else {
            setError(error.message);
            console.error(error);
        }
    })
    // Email verified na hole PrivateRoute a gele loading... ta theke jay, seta remove korar jnno
    .finally(() => {
        setLoading(false);
    })
}

    // password forgot
    const handleEmailBlur = (event) => {
        const email = event.target.value;
        setUserEmail(email)
        // console.log(email);
    }

    const handleForgotPassword = () => {
        if(!userEmail){
            alert('Please enter your email') 
        }
        forgotPass(userEmail)
        .then(() => {
            alert('Password reset email sent')
        })
        .catch(error => {
            console.error(error)
        })
    }

    

    return (
        <div className='bg-gray-50 desktop:w-1/2 large:w-1/2 mobile:w-full laptop:w-1/2 mx-auto mt-4 rounded-md font-[Inter]'>
            <div>
                <h1 className='text-2xl text-slate-700 font-bold text-center py-3'>Log In</h1>
            </div>
            <form onSubmit={handleLogin} className='px-6 pb-3'>
                {/* email */}
                <div>
                        <label 
                        htmlFor="email" 
                        className='mt-4 mb-2 block text-xl text-slate-700 font-medium'>Email
                        </label>
                        <div className="relative">
                            <input 
                                onBlur={handleEmailBlur} 
                                type="email" 
                                name="email" 
                                id="email" 
                                className='w-full border border-gray-200 rounded-md px-4 py-3 pl-11 shadow-md text-sm outline-none  focus:border-[#DE0655] focus:ring-[#DE0655] focus:z-0' 
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

                    <div>
                    <span className='text-red-500'>{error}</span>
                    </div>
                    <div>
                        <button 
                        type="submit" 
                        className='mt-3 mb-2 block text-xl font-medium  px-6 py-2 bg-gradient-to-r  from-[#EF512E] to-[#DE0655] rounded-md text-white outline-none'>
                        Login
                        </button>
                    </div>
            </form>
            <div className='mx-6 pb-4 flex flex-col md:flex-row  justify-between '>
                <div className=' '>
                    <span>Don't have an account.Please <span>
                        <Link 
                            className='text-blue-500' 
                            to='/register'>Register
                        </Link>
                        </span> 
                    </span>
                </div>
                <div className='my-4 md:my-0'>
                    <button 
                    onClick={handleForgotPassword} 
                    className='text-blue-500 font-semibold outline-none'>Forgot Password?
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;