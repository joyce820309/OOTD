import React, { useState, useEffect } from "react";
import Header from "./Landing_Page/Header";
import styled from "styled-components";
import combo from "./img/combo.png";
import pinkSweater from "./img/pinkSweater.jpeg";
import orangeSweater from "./img/orangeSweater.jpeg";
import WebFont from "webfontloader";
import badroom from "./img/bedroom.jpeg";
import small1 from "./img/small1.jpeg";
import small2 from "./img/small2.jpeg";
import small3 from "./img/small3.jpeg";

import AOS from "aos";
import Popup from "reactjs-popup";
import SignUp from "./SignIn_Page/SignUp";
import SignIn from "./SignIn_Page/SignIn";
import OverLay from "./SignIn_Page/OverLay";
import "aos/dist/aos.css"; // You can also use <link> for styles

const Section = styled.div`
  /* background: linear-gradient(#ffffff, #cac6ba); */
  /* border: solid 1px tomato; */
  height: 100vh;
  position: relative;
`;

const SectionBG = styled.div`
  background-color: #f5d1c36e;
  height: 450px;
  width: 100%;
  position: absolute;
  top: 130px;
  z-index: -1;
`;

const Section1 = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  padding-top: 50px;
  /* border: 2px solid steelblue; */
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-left: 80px;
`;

const Button = styled.div`
  background-color: #f3d5ca;
  /* background-color: #78938729 */
  text-align: center;
  line-height: 1.6em;
  color: #31342d5c;
  cursor: pointer;
  width: 40% !important;
  margin: 0 auto;
  font-family: "Chilanka";
  font-size: 19px;
  font-weight: 600;
  &:hover {
    transform: scale(1.2) !important;
  }
`;

const SignBody = styled.div`
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  margin: -20px 0 50px;
`;

const BedroomDiv = styled.div`
  z-index: 15;
  margin-left: -150px;
`;

const TypingDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const Typing = styled.p`
  font-size: 50px;
  font-weight: 800;
  color: #31342d5c;
  width: 6em;
  white-space: nowrap;
  border-right: 2px solid transparent;
  animation: typing 2s steps(6, end), blink-caret 0.75s step-end infinite;
  overflow: hidden;
  /* height: 160px; */
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

const SmallImg = styled.img`
  margin-top: 30px;
  width: 180px;
  box-shadow: 0 1px 8px 0 rgb(34 36 38 / 18%);
`;

const Section2 = styled.div`
  position: relative;
  display: flex;
`;
const ImgDiv = styled.div``;
const BlueDiv = styled.div`
  position: absolute;
  top: 50px;
  left: 350px;
  background-color: #c4d7d19c;
  z-index: -1;
  width: 620px;
  height: 430px;
  height: 98%;
`;

const ContentDiv = styled.div`
  display: flex;
  margin-top: 30px;
`;

const ContextText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 25px;
  font-family: "Chilanka";
  font-size: 19px;
  line-height: 1.5em;
  font-weight: 400;
  color: #5c6260e6;
`;

function IndexPage() {
  AOS.init();
  // const [toggle, setToggle] = useState(true);
  const [toggleClassName, setClassName] = useState("container");

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Droid Sans", "Chilanka"],
      },
    });
  }, []);

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

      <SectionBG />
      <Section1>
        <BedroomDiv>
          <img
            src={badroom}
            alt="bedroom"
            data-aos="zoom-in"
            style={{ width: "360px", opacity: "0.78" }}
          />
        </BedroomDiv>

        <TextDiv>
          <TypingDiv>
            <Typing>今天穿什麼？</Typing>
          </TypingDiv>
          <div style={{ zIndex: "15" }}>
            <StyledPopup
              modal
              trigger={<Button data-aos="zoom-in-left">Click Me</Button>}
            >
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
            <div style={{ display: "flex" }}>
              <SmallImg
                src={small1}
                alt="small-pic"
                style={{
                  transform: "rotate(-4.8deg)",
                  marginRight: "-5px",
                }}
              />
              <SmallImg
                src={small2}
                alt="small-pic"
                style={{
                  transform: "rotate(-2deg)",
                }}
              />
              <SmallImg
                src={small3}
                alt="small-pic"
                style={{
                  transform: "rotate(4.8deg)",
                  // marginRight: "-5px",
                }}
              />
            </div>
          </div>
        </TextDiv>
      </Section1>
      <Section2>
        <ImgDiv>
          <img
            src={combo}
            alt=""
            style={{
              width: "400px",
              transform: "rotate(-3deg)",
              margin: "30px",
            }}
          />
        </ImgDiv>
        <BlueDiv />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "30px",
          }}
        >
          <ContentDiv>
            <ContextText>
              Fashion is about dressing according to what’s fashionable. Style
              is more about being yourself.—Oscar de la Renta
            </ContextText>
            <img
              src={pinkSweater}
              alt="pinkSweater"
              style={{ width: "280px", height: "280px", marginRight: "18px" }}
            />
          </ContentDiv>
          <ContentDiv>
            <img
              src={orangeSweater}
              alt="orangeSweater"
              style={{ width: "280px", height: "280px" }}
            />
            <ContextText>
              Anyone can get dressed up and glamorous , but it is how people
              dress in their days off that are the most intriguing . —Alexander
              Wang
            </ContextText>
          </ContentDiv>
        </div>
      </Section2>
    </Section>
  );
}

export default IndexPage;
