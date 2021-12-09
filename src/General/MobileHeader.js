import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../img/OOTDLogo.png";
import "firebase/auth";

const MobileHeader = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 400;
    box-shadow: 0 1px 8px 0 rgb(34 36 38 / 18%);
    min-height: 50px;
    background: #efbf73;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 99;
    font-weight: 400;
    padding-left: 30px;
    color: #815e29;
    cursor: pointer;
    position: relative;
  }
`;

const MobileDiv = styled.div`
  position: absolute;
  width: 33%;
  top: 50px;
  left: 0px;
  background-color: #31342db8;
  z-index: 99;
  padding: 10px 5px;
`;

const NavbarDiv = styled.div`
  display: flex;
  align-items: center;
  color: #b1a086;
  font-weight: 400;
  box-shadow: none;
  margin: 10px 20px 10px 8px;
  padding: 5px;
  border-radius: 5px;
  &:hover {
    background-color: #31342d;
    cursor: pointer;
  }
`;

const NavLink = styled(Link)`
  color: #ddb578;
  text-decoration: none;
  font-weight: 700;

  /* &:hover {
    border-bottom: 5px solid #815e29;
    transition: all 0.3s ease-out;
  } */
`;

const CloseDiv = styled.div`
  color: #3e372d;
  font-weight: 700;
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const Mobile = () => {
  const [display, setDisplay] = useState(false);

  const displayControl = () => {
    if (display) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  };

  return (
    <>
      <MobileHeader
        onClick={() => {
          displayControl();
        }}
      >
        ☰
      </MobileHeader>

      {display ? (
        <>
          <MobileDiv>
            <NavbarDiv>
              <NavLink to="/FittingRoom">更衣室</NavLink>
            </NavbarDiv>
            <NavbarDiv>
              <NavLink to="/Diary">穿搭日記</NavLink>
            </NavbarDiv>
            <NavbarDiv>
              <NavLink to="/FindNewDress">幫衣服找新家</NavLink>
            </NavbarDiv>
            <NavbarDiv>
              <NavLink to="/Personal">我の檔案</NavLink>
            </NavbarDiv>
          </MobileDiv>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Mobile;
