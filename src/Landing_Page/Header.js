import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../img/OOTDLogo.png";

const HeaderDiv = styled.div`
  display: flex;
  /* font-family: Lato, "Helvetica Neue", Arial, Helvetica, sans-serif;  */
  background: #fff;
  font-weight: 400;
  box-shadow: 0 1px 8px 0 rgb(34 36 38 / 18%);
  min-height: 80px;
  background: #e4a747bd;
`;

const IndexDiv = styled.div`
  display: flex;
  align-items: center;
  color: #815e29;
  font-weight: 400;
  box-shadow: none;
  margin-left: 35px;
  &:visited {
    color: #4f6d7a;
  }
`;

const Logo = styled.img`
  &:hover {
    opacity: 0.7;
    transform: scale(1.1);
  }
`;

const NavbarDiv = styled.div`
  display: flex;
  align-items: center;
  color: #815e29;
  font-weight: 400;
  box-shadow: none;
  margin-left: 43px;
`;

const NavLink = styled(Link)`
  color: #815e29;
  text-decoration: none;
  font-weight: 700;

  &:hover {
    border-bottom: 5px solid #815e29;
    transition: all 0.3s ease-out;
  }
`;

const SignUpDiv = styled(Link)`
  color: #815e29;
  text-decoration: none;
  font-weight: 700;
  margin-left: auto;
  display: flex;
  align-items: center;
  margin-right: 35px;
  &:hover {
    border-bottom: 5px solid #815e29;
    transition: all 0.3s ease-out;
  }
`;

const IndexLink = styled(Link)`
  color: #815e29;
  text-decoration: none;
  font-weight: 700;
`;

const Header = () => {
  return (
    <HeaderDiv>
      <IndexDiv>
        <IndexLink to="/">
          <Logo
            src={logo}
            alt="logo"
            style={{ height: "35px", width: "125px" }}
          />
        </IndexLink>
      </IndexDiv>
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
      {/* <SignUpDiv>
        <NavLink to="/SignUp">登入</NavLink>
      </SignUpDiv> */}
    </HeaderDiv>
  );
};

export default Header;
