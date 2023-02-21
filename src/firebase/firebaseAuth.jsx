import { getAuth } from "firebase/auth";
import app from "./firebase.init";

 const auth = getAuth(app)

export default auth;