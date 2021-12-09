import React from "react";
import styled from "styled-components";
import ArrowDark from "../img/arrowDark.png";
import PieChartForm from "./PieChart";
import Arrow from "../img/arrow.png";
import LineChartForm from "./LineChart";

const PieContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PieTitle = styled.div`
  position: relative;
  width: 40%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LabelDiv = styled.div`
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  background-color: #bcd3a1;
  transform: rotate(-1.3deg);
  position: absolute;
  top: 80px;
  right: -60px;
  width: 185px;
  height: 45px !important;
  color: #69725d;
  border-radius: 3px;
`;

const ArrowDarkImg = styled.img`
  height: 110px;
  top: 0px;
  left: 140px;
  position: absolute;
`;

const PieDiv = styled.div`
  width: 120px;
  height: 180px;
  border: dashed 4px #565d661f;
  /* position: absolute;
  bottom: -56px;
  left: 409px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 40px 80px 20px 20px;
`;

const PieCircle = styled.div`
  border-radius: 50%;
  height: 1.2rem;
  width: 1.1rem;
  border: 1px snow solid;
  background-color: #a5c2c9;
  margin: auto 12px;
`;

const CircleDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 5px auto;
`;

const PieCircle1 = styled(PieCircle)`
  background-color: #edc4b4;
`;
const PieCircle2 = styled(PieCircle)`
  background-color: #ebc382;
`;
const PieCircle3 = styled(PieCircle)`
  background-color: #9acb9c;
`;
const PieCircle4 = styled(PieCircle)`
  background-color: #c5bad9;
`;

const PieText = styled.div`
  width: 50px;
  color: #606658;
`;

const LabelDiv2 = styled.div`
  position: absolute;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  height: 45px !important;
  border-radius: 3px;
  /* top: 710px;
  right: 100px; */
  background-color: #ddd69cd4;
  color: #64624dd4;
  width: 165px;
  transform: rotate(2.3deg);
  height: 45px !important;
`;

const LineTitle = styled(PieTitle)`
  margin-top: 130px;
`;

const ArrowImg = styled.img`
  top: 32px;
  right: 70px;
  height: 150px;
  margin-top: 25px;
  position: absolute;
`;

const RenderCharts = () => {
  return (
    <PieContainer>
      <PieTitle>
        <LabelDiv> 今年各類別花費</LabelDiv>
        <ArrowDarkImg src={ArrowDark} alt="ArrowDarkImg" />
      </PieTitle>
      <div
        style={{
          display: "flex",
          height: "50%",
          width: "100%",
          justifyContent: "space-between",
          marginTop: "50px",
          marginBottom: "40px",
        }}
      >
        <PieChartForm />
        <PieDiv>
          <CircleDiv>
            <PieCircle></PieCircle>
            <PieText>上衣</PieText>
          </CircleDiv>
          <CircleDiv>
            <PieCircle1></PieCircle1>
            <PieText>褲子</PieText>
          </CircleDiv>
          <CircleDiv>
            <PieCircle2></PieCircle2>
            <PieText>裙子</PieText>
          </CircleDiv>
          <CircleDiv>
            <PieCircle3></PieCircle3>
            <PieText>鞋子</PieText>
          </CircleDiv>
          <CircleDiv>
            <PieCircle4></PieCircle4>
            <PieText>配件</PieText>
          </CircleDiv>
        </PieDiv>
        <LineTitle>
          <LabelDiv2>今年總花費</LabelDiv2>
          <ArrowImg src={Arrow} alt="ArrowImg" />
        </LineTitle>
      </div>{" "}
      <div
        style={{
          height: "100%",
          width: "100%",
          marginTop: "-150px",
          marginBottom: "50px",
          bottom: "0",
        }}
      >
        <LineChartForm />
      </div>
    </PieContainer>
  );
};

export default RenderCharts;