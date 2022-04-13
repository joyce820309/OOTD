import firebase from "../utils/firebase";
import "firebase/auth";

const Auth = (provider) => {
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      return res.user;
    })
    .catch((err) => {
      console.log('hihi')
      console.error()
      return err;
    });
};

export default Auth;
