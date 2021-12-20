import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import combo from "../img/combo.png";
import pinkSweater from "../img/pinkSweater.jpeg";
import orangeSweater from "../img/orangeSweater.jpeg";
import badroom from "../img/bedroom.jpeg";
import small1 from "../img/small1.jpeg";
import small2 from "../img/small2.jpeg";
import small3 from "../img/small3.jpeg";
import firebase from "../utils/firebase";
import "firebase/auth";
import AOS from "aos";
import Popup from "reactjs-popup";
import SignUp from "../SignIn_Page/SignUp";
import SignIn from "../SignIn_Page/SignIn";
import OverLay from "../SignIn_Page/OverLay";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { useHistory } from "react-router-dom";

const Container = styled.div`
  position: relative;
`;

const SectionBG = styled.div`
  background-color: #f5d1c36e;
  height: 453px;
  width: 100%;
  position: absolute;
  top: 10px;
  z-index: -1;
`;

const Section1 = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 30px;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-left: 80px;
  @media screen and (max-width: 1160px) {
    width: 230px;
    margin-left: 40px;
  }
  @media screen and (max-width: 581px) {
    width: 180px;
    margin-left: 10px;
  }
`;

const Button = styled.div`
  background-color: #f3d5ca;
  text-align: center;
  line-height: 1.6em;
  color: #31342d5c;
  cursor: pointer;
  width: 40% !important;
  margin: 0 auto;
  font-size: 1rem;
  font-weight: 600;
  &:hover {
    transform: scale(1.2) !important;
    background-color: #ffdd759e;
  }
  @media screen and (max-width: 581px) {
    font-size: 0.7rem;
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
  width: 360px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 1160px) {
    width: 320px;
  }
  @media screen and (max-width: 1025px) {
    width: 270px;
  }
  @media screen and (max-width: 725px) {
    width: 230px;
    margin-left: 0;
  }
  @media screen and (max-width: 581px) {
    width: 180px;
  }
  @media screen and (max-width: 445px) {
    width: 120px;
  }
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
  @media screen and (max-width: 1160px) {
    font-size: 35px;
  }
  @media screen and (max-width: 581px) {
    font-size: 20px;
  }
`;

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }
  &-content {
    border-radius: 25px;
  }
  @media screen and (max-width: 830px) {
    font-size: 20px;
  }
`;

const SmallImgDiv = styled.div`
  display: flex;
  margin-left: 0.8rem;
  @media screen and (max-width: 1215px) {
    /* margin-left: 0; */
  }
`;

const SmallImg = styled.img`
  margin-top: 30px;
  width: 180px;
  box-shadow: 0 1px 8px 0 rgb(34 36 38 / 18%);
  transform: rotate(-4.8deg);
  marginright: -5px;
  @media screen and (max-width: 1160px) {
    width: 160px;
  }
  @media screen and (max-width: 1025px) {
    width: 120px;
  }
  @media screen and (max-width: 725px) {
    width: 80px;
  }
  @media screen and (max-width: 581px) {
    width: 55px;
  }
`;

const SmallImg1 = styled(SmallImg)`
  transform: rotate(-2deg);
`;

const SmallImg2 = styled(SmallImg)`
  transform: rotate(4.8deg);
`;

const Section2 = styled.div`
  position: relative;
  display: flex;
  margin-top: 35px;
  @media screen and (max-width: 570px) {
    flex-direction: column-reverse;
  }
`;
const ImgDiv = styled.div`
  /* position: absolute; */
  /* top: -10px; */
  @media screen and (max-width: 1100px) {
  }
`;
const BlueDiv = styled.div`
  position: absolute;
  /* left: 350px; */
  right: -30px;
  top: -70px;
  background-color: #c4d7d19c;
  z-index: -1;
  width: 65%;
  height: 100%;
  @media screen and (max-width: 575px) {
    /* left: 165px; */
  }
`;

const ComboImg = styled.img`
  width: 400px;
  transform: rotate(-3deg);
  margin: 30px;
  @media screen and (max-width: 1100px) {
    width: 350px;
    margin: 10px;
  }
  @media screen and (max-width: 836px) {
    width: 300px;
  }
  @media screen and (max-width: 718px) {
    width: 200px;
  }
  @media screen and (max-width: 445px) {
    width: 120px;
  }
`;

const ContentDivBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px auto 40px 30px;
  @media screen and (max-width: 836px) {
    margin: 10px auto 20px 10px;
  }
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
  font-size: 1rem;
  line-height: 1.5em;
  font-weight: 400;
  color: #5c6260e6;
  @media screen and (max-width: 925px) {
    font-size: 0.8rem;
  }
  @media screen and (max-width: 445px) {
    font-size: 0.6rem;
  }
`;

const ContentImg1 = styled.img`
  width: 280px;
  height: 280px;
  margin-right: 18px;
  @media screen and (max-width: 1100px) {
    width: 220px;
    height: 220px;
  }
  @media screen and (max-width: 900px) {
    width: 150px;
    height: 150px;
  }
  @media screen and (max-width: 445px) {
    width: 100px;
    height: 100px;
  }
`;
const ContentImg2 = styled.img`
  width: 280px;
  height: 280px;
  @media screen and (max-width: 1100px) {
    width: 220px;
    height: 220px;
  }
  @media screen and (max-width: 900px) {
    width: 150px;
    height: 150px;
  }
  @media screen and (max-width: 445px) {
    width: 100px;
    height: 100px;
  }
`;

function IndexPage() {
  AOS.init();
  const history = useHistory();
  const [isUser, setIsUser] = useState(null);
  const user = useSelector((state) => state.user);
  const [toggleClassName, setClassName] = useState("container");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsUser(user);
      }
    });
  }, []);

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push("/");
        setIsUser(null);
      });
  };

  function onClick() {
    if (toggleClassName === "container") {
      setClassName("container right-panel-active");
    } else {
      setClassName("container");
    }
  }

  return (
    <Container>
      <SectionBG />
      <Section1>
        <BedroomDiv>
          <img
            src={badroom}
            alt="bedroom"
            data-aos="zoom-in"
            style={{ width: "100%", opacity: "0.78" }}
          />
        </BedroomDiv>

        <TextDiv>
          <TypingDiv>
            <Typing>今天穿什麼？</Typing>
          </TypingDiv>
          <div style={{ zIndex: "15" }}>
            {isUser ? (
              <Button onClick={() => signOut()}>Sign Out</Button>
            ) : (
              <StyledPopup
                modal
                trigger={<Button data-aos="zoom-in-left">Sign In</Button>}
              >
                {(close) => (
                  <SignBody>
                    <div className={toggleClassName}>
                      <SignIn />
                      <SignUp close={close} />
                      <OverLay onClick={onClick} />
                    </div>
                  </SignBody>
                )}
              </StyledPopup>
            )}

            <SmallImgDiv data-aos="zoom-in-left">
              <SmallImg src={small1} alt="small-pic" />
              <SmallImg1 src={small2} alt="small-pic" />
              <SmallImg2 src={small3} alt="small-pic" />
            </SmallImgDiv>
          </div>
        </TextDiv>
      </Section1>
      <Section2>
        <ImgDiv>
          <ComboImg src={combo} alt="" />
        </ImgDiv>
        <BlueDiv />
        <ContentDivBox>
          <ContentDiv>
            <ContextText>
              Fashion is about dressing according to what’s fashionable. Style
              is more about being yourself.—Oscar de la Renta
            </ContextText>
            <ContentImg1 src={pinkSweater} alt="pinkSweater" />
          </ContentDiv>
          <ContentDiv>
            <ContentImg2 src={orangeSweater} alt="orangeSweater" />
            <ContextText>
              Anyone can get dressed up and glamorous , but it is how people
              dress in their days off that are the most intriguing . —Alexander
              Wang
            </ContextText>
          </ContentDiv>
        </ContentDivBox>
      </Section2>
    </Container>
  );
}

export default IndexPage;
