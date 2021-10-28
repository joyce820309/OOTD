import React, { useState } from "react";
import Header from "./Landing_Page/Header";
import styled from "styled-components";
import logo from "./img/OOTDLogo.png";
import badroom from "./img/bedroom.jpeg";
import AOS from "aos";
import Popup from "reactjs-popup";
import SignUp from "./SignIn_Page/SignUp";
import SignIn from "./SignIn_Page/SignIn";
import OverLay from "./SignIn_Page/OverLay";
import "aos/dist/aos.css"; // You can also use <link> for styles

const Section = styled.div`
  /* margin: 30px; */
`;

const SignBody = styled.div`
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  /* height: 100vh; */
  margin: -20px 0 50px;
`;

// const Container = styled.div`
//   background-color: #fff;
//   border-radius: 10px;
//   box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
//   position: relative;
//   overflow: hidden;
//   width: 768px;
//   max-width: 100%;
//   min-height: 480px;
// `;

const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 50px 0px 35px;
  scale: 0.6;
  height: 150px;
`;

const BedroomDiv = styled.div`
  display: flex;
  justify-content: center;
  z-index: 2;
`;

const TypingDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const Typing = styled.p`
  font-size: 50px;
  width: 6em;
  white-space: nowrap;
  border-right: 2px solid transparent;
  animation: typing 2s steps(6, end), blink-caret 0.75s step-end infinite;
  overflow: hidden;
  /* 列印效果 */
  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 6em;
    }
  }
  /* 游標閃啊閃 */
  @keyframes blink-caret {
    from,
    to {
      box-shadow: 1px 0 0 0 transparent;
    }
    50% {
      box-shadow: 1px 0 0 0;
    }
  }
`;

const BedroomDiv2 = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  opacity: 0.1;
  z-index: 0;
  top: 286px;
`;

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }
  &-content {
    /* background: rgb(255, 255, 255); */
    /* display: flex; */
    border-radius: 25px;
  }
`;

function IndexPage() {
  AOS.init();
  // const [toggle, setToggle] = useState(true);
  const [toggleClassName, setClassName] = useState("container");

  function onClick() {
    if (toggleClassName === "container") {
      setClassName("container right-panel-active");
    } else {
      setClassName("container");
    }
  }

  return (
    <Section>
      <div>
        <Header />
      </div>
      <div>
        <StyledPopup modal trigger={<button>登入</button>}>
          {(close) => (
            <SignBody>
              <div className={toggleClassName}>
                <SignIn />
                <SignUp />
                <OverLay onClick={onClick} />
              </div>
            </SignBody>
          )}
        </StyledPopup>
      </div>

      <LogoDiv>
        <img
          src={logo}
          alt="logo"
          style={{
            opacity: "0.7",
            transform: "scale(0.4)",
            // boxShadow: "0 1px 8px 0 rgb(34 36 38 / 18%)",
          }}
        />
      </LogoDiv>
      <BedroomDiv>
        <img
          src={badroom}
          alt="bedroom"
          data-aos="zoom-in"
          style={{ borderRadius: "18px" }}
        />
      </BedroomDiv>
      <BedroomDiv2>
        <img src={badroom} alt="bedroom" style={{ transform: "scale(1.6)" }} />
      </BedroomDiv2>
      <TypingDiv>
        <Typing>今天穿什麼？</Typing>
      </TypingDiv>
    </Section>
  );
}

export default IndexPage;
