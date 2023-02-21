// @ts-nocheck
import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile,  } from 'firebase/auth';
import app from '../firebase/firebase.init';

export const AuthContext = createContext();
// create auth
const auth = getAuth(app)


const AuthProvider = ({children}) => {
    // set state for user
    const [user, setUser] = useState({})

    //  set state for loading
    const [loading, setLoading] = useState(true)

    // Set Sign in Provider
    const googleProvider = new GoogleAuthProvider();   // now active
    const githubProvider = new GithubAuthProvider();

    // Sign in with Google Method apply
    const signInwithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    }

    //  Sign in with github method
    const signInWithGithub = () =>{
        setLoading(true)
        return signInWithPopup(auth, githubProvider);
    }

    // Sign UP or create user with email and password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Sign In method by the email and password
    const signIn =(email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    //  Log Out method
    const logOut = () => {
        setLoading(true);

        return signOut(auth);
    }

    // Display user name and  photo URL
    const updateUserProfile = (name) =>{
        return updateProfile(auth.currentUser)
    }

    // Verify email
    const verifyEmail = () =>{
        return sendEmailVerification(auth.currentUser);
    }

    // forgot password
    const forgotPass = (useEmail) => {
        return sendPasswordResetEmail(auth, useEmail)
    }

    //    
    
    // Use set some side effect
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {

            console.log('auth state changed', currentUser);
            // setState(CurrentUser);

            // Without verify the email no one login to the account
            if(currentUser === null || currentUser.emailVerified){
                setUser(currentUser)
            }
            
            // when user get any error in that time loading spinner will be close
            setLoading(false)
        });
        return () => {
            unSubscribe();
        }
    },[])

    // all variable send to the auth provider
    const authInformation = {user,setUser, forgotPass,createUser, signInWithGithub, signInwithGoogle, logOut, signIn, verifyEmail, loading, setLoading, updateUserProfile ,}

    return (
        <AuthContext.Provider value={authInformation}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;