import { sendEmailVerification } from "firebase/auth"
import { toast, ToastContainer } from "react-toastify"
import auth from "../firebaseAuth"

const emailVerification = () => {
    sendEmailVerification(auth.currentUser)
    .then(() => {
        alert('verify email')
        
    })
}

export default emailVerification;