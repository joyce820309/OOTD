import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { facebookProvider } from "./SocialMediaAuth";
import { googleProvider } from "./SocialMediaAuth";
import Auth from "./Auth";
import firebase from "../utils/firebase";
import "firebase/firestore";
import "firebase/auth";
import "../Style/SignIn.css";
import {
  HeaderSignin,
  SocialContainer,
  SocialA,
  Form,
  ErrDiv,
  Input,
} from "../Style/SignInCSS";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

library.add(faGoogle);

const SignIn = () => {
  const history = useHistory();
  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  // const [allUsers, setAllUsers] = useState("");

  const onSubmit = () => {
    console.log("進來囉");

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential;
        console.log(user);
        history.push("/FittingRoom");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            setErrorMsg("OH, 這個信箱還沒被註冊過喔");
            break;
          case "auth/invalid-email":
            setErrorMsg("記得使用正確的信箱格式唷！");
            break;
          case "auth/wrong-password":
            setErrorMsg("密碼是錯的唷！");
            break;
          default:
        }
      });
  };

  // useEffect(() => {
  //   firebase
  //     .firestore()
  //     .collectionGroup("users")
  //     .onSnapshot((snapshot) => {
  //       const data = snapshot.docs.map((doc) => {
  //         return doc.data();
  //       });

  //       setAllUsers(data);
  //     });
  // }, []);

  // console.log(allUsers);

  const handleSocialMedia = async (provider) => {
    const res = await Auth(provider);
    console.log(res);

    firebase
      .firestore()
      .collectionGroup("users")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return doc.data();
        });
        const checkMember = data.findIndex(
          (p) => p.email === firebase.auth().currentUser?.email
        );
        if (checkMember < 0) {
          firebase
            .firestore()
            .collection("users")
            .doc(`${firebase.auth().currentUser.email}`)
            .set({
              name: firebase.auth().currentUser.displayName,
              email: firebase.auth().currentUser.email,
              budget: 0,
              remaining: 0,
            });
        }
      });
    history.push("/FittingRoom");
  };

  return (
    <div className=" form-container sign-in-container">
      <Form>
        <HeaderSignin>Sign in</HeaderSignin>
        <SocialContainer onClick={() => handleSocialMedia(googleProvider)}>
          <SocialA href="#">
            <FontAwesomeIcon style={{ color: "#70604c" }} icon={faGoogle} />
          </SocialA>
          Use your Google Account
        </SocialContainer>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {errorMsg && <ErrDiv>{errorMsg}</ErrDiv>}
        {/* <A href="#">Forgot your password?</A> */}
        <button onClick={onSubmit}>Sign In</button>
      </Form>
    </div>
  );
};

export default SignIn;
