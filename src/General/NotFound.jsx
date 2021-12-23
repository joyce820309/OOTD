import React, { useEffect } from "react";
import styled from "styled-components";
import WebFont from "webfontloader";
import notFound from "../img/404.gif";
import arrow from "../img/arrow.gif";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  @media screen and (max-width: 895px) {
    flex-direction: column;
  }
`;

const ImgDiv = styled.div`
  @media screen and (max-width: 770px) {
    width: 60%;
  }
`;

const BtnDiv = styled.div`
  position: absolute;
  top: 330px;
  right: 194px;
  height: 120px;
  @media screen and (max-width: 1200px) {
    right: 104px;
    height: 80px;
  }
  @media screen and (max-width: 991px) {
    right: 34px;
    height: 40px;
  }
  @media screen and (max-width: 895px) {
    position: initial;
    /* width: 200px; */
  }
`;

const ArrowDiv = styled(BtnDiv)`
  top: 186px;
  right: 99px;
  transform: scale(0.2);
  @media screen and (max-width: 1200px) {
    right: 9px;
    height: 80px;
  }
  @media screen and (max-width: 991px) {
    right: -39px;
    height: 40px;
  }
  @media screen and (max-width: 895px) {
    display: none;
  }
`;

const Div = styled(BtnDiv)`
  top: 300px;
  right: 164px;
  height: 60px;
  transform: rotate(7.8deg);
  font-family: Chilanka;
  @media screen and (max-width: 895px) {
    right: 304px;
    top: 565px;
  }
`;

const Btn = styled(Link)`
  text-decoration: none;
  color: #31342d5c;
  padding: 5px;
  background-color: #d4e4eb;
  text-align: center;
  line-height: 1.6em;

  border-radius: 15px;

  margin: 0 auto;
  font-size: 1rem;
  font-weight: 600;
  font-family: Chilanka;
  &:hover {
    transform: scale(1.2) !important;
  }
  @media screen and (max-width: 895px) {
    font-size: 0.6rem;
  }
`;

const NotFound = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Chilanka", "Droid Sans"],
      },
    });
  }, []);
  return (
    <Container>
      <ImgDiv>
        <img src={notFound} alt="404" style={{ width: "100%" }} />{" "}
      </ImgDiv>
      <ArrowDiv>
        {" "}
        <img src={arrow} alt="arrow" />
      </ArrowDiv>
      <Div>Click Me!</Div>
      <BtnDiv>
        <Btn to="/">Back to Home</Btn>
      </BtnDiv>
    </Container>
  );
};

export default NotFound;
