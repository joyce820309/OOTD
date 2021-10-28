import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import "../CSS/SignIn.css";

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
`;

const Overlay = styled.div`
  background: #ffb75e;
  background: -webkit-linear-gradient(to right, #ed8f03, #ffb75e);
  background: linear-gradient(to right, #ed8f03, #ffb75e);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

const H1 = styled.h1`
  font-weight: bold;
  margin: 0;
`;

const P = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

// const Button = styled.button`
//   background-color: transparent;
//   border-color: #ffffff;
// `;

const OverLay = ({ onClick }) => {
  return (
    <div className="overlay-container">
      <div className="overlay">
        <div className="overlay-panel overlay-left">
          <h1>歡迎回來!</h1>
          <p>等不及更衣了嗎？</p>
          <button
            onClick={onClick}
            className="btn-overlay"
            id="signIn"
            style={{ color: "#ffffffa8" }}
          >
            現在登入
          </button>
        </div>
        <div className="overlay-panel overlay-right">
          <h1>Ｈi, 很高興認識你!</h1>
          <p>還沒有帳號嗎？</p>
          <button
            onClick={onClick}
            className="btn-overlay"
            id="signUp"
            style={{ color: "#ffffff" }}
          >
            現在加入
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverLay;
