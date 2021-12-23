import React, { useEffect } from "react";
import styled from "styled-components";
import "../Style/SignIn.css";
import WebFont from "webfontloader";

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

const BackgroundRight = styled.div`
  position: absolute;
  width: 78%;
  height: 45%;
  bottom: 124px;
  right: 0;
  z-index: -1;
`;

const OverLay = ({ onClick }) => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <div className="overlay-container" style={{ fontFamily: "Chilanka" }}>
      <div className="overlay">
        <div className="overlay-panel overlay-left">
          <h1>Welcome back!</h1>
          <p>Can't wait to dress？</p>
          <button
            onClick={onClick}
            className="btn-overlay"
            id="signIn"
            style={{ color: "#ffffffa8" }}
          >
            Login now
          </button>
        </div>
        <div className="overlay-panel overlay-right">
          <BackgroundRight />
          <h1>Hi, there!</h1>
          <p>Don't have an account?</p>
          <button
            onClick={onClick}
            className="btn-overlay"
            id="signUp"
            style={{ color: "#ffffff" }}
          >
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverLay;
