import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import "../Style/SignIn.css";
import firebase from "../utils/firebase";
import "firebase/firestore";
import "firebase/auth";
import Auth from "./Auth";
import { facebookProvider } from "./SocialMediaAuth";
import { googleProvider } from "./SocialMediaAuth";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import {
  HeaderSignin,
  SocialContainer,
  SocialA,
  Form,
  ErrDiv,
  Input,
  Span,
} from "../Style/SignInCSS";
library.add(faGoogle, faFacebook);

// const HeaderSignin = styled.div`
//   color: #ed8f03;
// `;

// const SocialContainer = styled.div`
//   margin: 20px 0;
// `;

// const Input = styled.input`
//   background-color: #eee;
//   border: none;
//   padding: 12px 15px;
//   margin: 8px 0;
//   width: 100%;
//   border-radius: 5px;
// `;

// const Span = styled.span`
//   font-size: 12px;
// `;

// const SocialA = styled.a`
//   color: #333;
//   font-size: 14px;
//   text-decoration: none;
//   margin: 15px 0;
//   border: 1px solid #ecd9bc;
//   border-radius: 50%;
//   display: inline-flex;
//   justify-content: center;
//   align-items: center;
//   margin: 0 5px;
//   height: 40px;
//   width: 40px;
// `;

// const Form = styled.div`
//   background-color: #ffffff;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   padding: 0 50px;
//   height: 100%;
//   text-align: center;
// `;

// const ErrDiv = styled.div`
//   color: #f5756c;
// `;

const SignUp = ({ close }) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [isUser, setIsUser] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsUser(user);
      }
    });
  }, []);

  const handleSocialMedia = (provider) => {
    const res = Auth(provider);
    console.log(res);

    firebase.firestore().collection("users").doc().set({
      name: firebase.auth().currentUser.displayName,
      email: firebase.auth().currentUser.email,
      budget: 0,
      remaining: 0,
      // password: password,
    });
    history.push("/FittingRoom");
  };

  const onSubmit = (e) => {
    console.log("進來囉");
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        setUserInfo();
      })
      .then(() => {
        history.push("/FittingRoom");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            setErrorMsg("已經使用過這個信箱囉");
            break;
          case "auth/invalid-email":
            setErrorMsg("記得使用正確的信箱格式唷！");
            break;
          case "auth/weak-password":
            setErrorMsg("請再加強密碼強度，加油！");
            break;
          default:
        }
      });
  };

  const setUserInfo = () => {
    // const uid = firebase.auth().currentUser.uid;
    const uEmail = firebase.auth().currentUser.email;
    firebase.firestore().collection("users").doc(uEmail).set({
      name: name,
      email: email,
      password: password,
      budget: 0,
      remaining: 0,
    });
  };

  return (
    <div className="form-container sign-up-container">
      <Form>
        <HeaderSignin>Create Account</HeaderSignin>
        <SocialContainer>
          <SocialA href="#">
            <FontAwesomeIcon
              icon={faGoogle}
              style={{ color: "#70604c" }}
              onClick={() => handleSocialMedia(googleProvider)}
            />
          </SocialA>
          Use your Google Account
        </SocialContainer>
        <Span>or use your email for registration</Span>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
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
        <button
          onClick={(e) => {
            onSubmit(e);
            // close();
          }}
        >
          Sign Up
        </button>
      </Form>
    </div>
  );
};

export default SignUp;
