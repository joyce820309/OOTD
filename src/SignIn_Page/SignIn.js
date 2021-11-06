import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { facebookProvider } from "./SocialMediaAuth";
import { googleProvider } from "./SocialMediaAuth";
import Auth from "./Auth";
import firebase from "../utils/firebase";
import "firebase/firestore";
import "firebase/auth";
import "../CSS/SignIn.css";

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

const A = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

const Form = styled.div`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

const ErrDiv = styled.div`
  color: #f5756c;
`;

const SignIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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

  const handleSocialMedia = async (provider) => {
    const res = await Auth(provider);
    console.log(res);
    history.push("/FittingRoom");
  };

  return (
    <div className=" form-container sign-in-container">
      <Form>
        <HeaderSignin>Sign in</HeaderSignin>
        <SocialContainer>
          <SocialA href="#">
            <FontAwesomeIcon
              style={{ color: "#70604c" }}
              icon={faFacebook}
              onClick={() => handleSocialMedia(facebookProvider)}
            />
          </SocialA>

          <SocialA href="#">
            <FontAwesomeIcon
              style={{ color: "#70604c" }}
              // onMouseOver='this.style.color="#ed8f03"'
              // onMouseOut='this.style.color="#70604c"'
              icon={faGoogle}
              onClick={() => handleSocialMedia(googleProvider)}
            />
          </SocialA>
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
        <A href="#">Forgot your password?</A>
        <button onClick={onSubmit}>Sign In</button>
      </Form>
    </div>
  );
};

export default SignIn;
