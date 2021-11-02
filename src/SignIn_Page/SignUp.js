import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import "../CSS/SignIn.css";
import firebase from "../utils/firebase";
import "firebase/firestore";
import "firebase/auth";
import Auth from "./Auth";
import { facebookProvider } from "./SocialMediaAuth";
import { googleProvider } from "./SocialMediaAuth";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";

library.add(faGoogle, faFacebook);

const HeaderSignin = styled.div`
  color: #ed8f03;
`;

// const Button = styled.button`
//   border-radius: 10px;
//   border: 1px solid #fdb254;
//   background-color: #fdb254;
//   color: #ffffff;
//   font-size: 12px;
//   font-weight: bold;
//   padding: 12px 45px;
//   letter-spacing: 1px;
//   text-transform: uppercase;
//   transition: transform 80ms ease-in;
//   &:active {
//     transform: scale(0.95);
//   }
//   &:focus {
//     outline: none;
//   }
// `;

const SocialContainer = styled.div`
  margin: 20px 0;
`;

const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  border-radius: 5px;
`;

const Span = styled.span`
  font-size: 12px;
`;

const SocialA = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
  border: 1px solid #ecd9bc;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
`;

// const A = styled.a`
//   color: #333;
//   font-size: 14px;
//   text-decoration: none;
//   margin: 15px 0;
// `;

const SignUp = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSocialMedia = (provider) => {
    const res = Auth(provider);
    console.log(res);
    // setUserInfo();
    history.push("/FittingRoom");
  };

  // const checkFormat = () => {
  //   if (name === "") {
  //     alert("記得輸入你的名稱唷！");
  //   } else if (email === "") {
  //     alert("記得輸入你的信箱唷！");
  //   } else if (password === "") {
  //     alert("記得輸入你的密碼唷！");
  //   } else {
  //     onSubmit();
  //   }
  // };

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
      });
  };

  const setUserInfo = () => {
    console.log("123");
    firebase.firestore().collection("users").doc("joy").set({
      name: name,
      email: email,
      password: password,
    });
  };

  return (
    <div className="form-container sign-up-container">
      <form>
        <HeaderSignin>Create Account</HeaderSignin>
        <SocialContainer>
          <SocialA href="#">
            <FontAwesomeIcon
              icon={faFacebook}
              style={{ color: "#70604c" }}
              onClick={() => handleSocialMedia(facebookProvider)}
            />
          </SocialA>

          <SocialA href="#">
            <FontAwesomeIcon
              icon={faGoogle}
              style={{ color: "#70604c" }}
              onClick={() => handleSocialMedia(googleProvider)}
            />
          </SocialA>
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
        <button
          onClick={(e) => {
            onSubmit(e);
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
