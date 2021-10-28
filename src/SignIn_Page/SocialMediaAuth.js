import firebase from "../utils/firebase";
import "firebase/auth";

export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
