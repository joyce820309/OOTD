import React, { useState } from "react";
import styled from "styled-components";
import "firebase/auth";
import firebase from "../utils/firebase";
import { useHistory } from "react-router-dom";

const Form = styled.div``;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SigninDiv = styled.div`
  display: flex;
  justify-content: center;
  z-index: 5;
  background-color: white;
  width: 640px;
  height: 800px;
  border: 3px solid black;
  border-radius: 18px;
`;

const SignUpTitle = styled.div`
  display: flex;
`;

function SignUp() {
  const history = useHistory();
  const [activeItem, setActiveItem] = useState("signUp");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [signUp, setsignUp] = useState(true)

  const onSubmit = () => {
    if (activeItem === "signUp") {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((data) => {
          console.log(data);
          history.push("./"); //讓使用者倒回首頁
        });
    } else if (activeItem === "signIn") {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          history.push("/");
        });
    }
  };

  return (
    <MainDiv>
      <SigninDiv>
        <div style={{ borderRadius: "18px" }}>
          <SignUpTitle>
            <button
              active={activeItem === "signUp"}
              onClick={() => setActiveItem("signUp")}
            >
              加入會員
            </button>
            <button
              active={activeItem === "signIn"}
              onClick={() => setActiveItem("signIn")}
            >
              登入會員
            </button>
          </SignUpTitle>
          <Form>
            <div>
              <input
                type="text"
                value={name}
                placeholder="你的名字"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="email"
                value={email}
                placeholder="你的信箱"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                placeholder="你的密碼"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button onClick={() => onSubmit}>
              {activeItem === "signUp" && "註冊"}
              {activeItem === "signIn" && "登入"}
            </button>
          </Form>
        </div>
      </SigninDiv>
    </MainDiv>
  );
}

export default SignUp;
