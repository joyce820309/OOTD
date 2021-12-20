import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";
import logo from "../img/OOTDLogo.png";
import Notification from "../img/Notification.png";
import "firebase/auth";
import firebase from "../utils/firebase";
import Mobile from "./MobileHeader";
import Notice from "./Notice";

const HeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 400;
  box-shadow: 0 1px 8px 0 rgb(34 36 38 / 18%);
  min-height: 80px;
  background: #f7d093;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 99;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const IndexDiv = styled.div`
  display: flex;
  align-items: center;
  color: #815e29;
  font-size: 1rem;
  font-weight: 400;
  box-shadow: none;
  margin-left: 35px;
  &:visited {
    color: #4f6d7a;
  }
`;

const Logo = styled.img`
  height: 35px;
  width: 125px;

  &:hover {
    opacity: 0.7;
    /* transform: scale(1.1); */
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

const BellDiv = styled.div`
  width: 28px;
  height: 28px;
  right: 33px;
  top: 28px;
  position: absolute;
  cursor: pointer;
  flex-direction: column;
  &:hover {
    transform: scale(1.1) !important;
  }
`;

const CircleDiv = styled.div`
  border-radius: 50px;
  background-color: #f15757;
  width: 10px;
  height: 10px;
  right: 3px;
  bottom: 2px;
  position: absolute;
  z-index: 50;
`;

// const NewsDiv = styled.div`
//   position: absolute;
//   bottom: -60px;
//   right: 30px;
//   width: 300px;
//   min-height: 50px;
//   max-height: 150px;
//   padding: 8px;
//   background-color: #31342d5c;
//   border-radius: 5px;
// `;

const NavLink = styled(Link)`
  color: #815e29;
  text-decoration: none;
  font-weight: 700;
  border-bottom: ${(props) =>
    props.status === "FittingRoom"
      ? "5px solid #815e29"
      : "5px solid transparent"};
  &:hover {
    border-bottom: 5px solid #815e29;
    transition: all 0.3s ease-out;
  }
`;

const NavLink2 = styled(NavLink)`
  border-bottom: ${(props) =>
    props.status === "Diary" ? "5px solid #815e29" : "5px solid transparent"};
`;

const NavLink3 = styled(NavLink)`
  border-bottom: ${(props) =>
    props.status === "FindNewDress"
      ? "5px solid #815e29"
      : "5px solid transparent"};
`;

const NavLink4 = styled(NavLink)`
  border-bottom: ${(props) =>
    props.status === "Personal"
      ? "5px solid #815e29"
      : "5px solid transparent"};
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
  const bell = useRef();
  const [isUser, setIsUser] = useState(null);
  const [display, setDisplay] = useState(false);
  const [read, setRead] = useState(false);
  const [msgLength, setMsgLength] = useState(null);
  const [allExchange, setAllExchange] = useState([]);
  const [once, setOnece] = useState(true);
  const [initMsgLength, setInitMsgLength] = useState(0);
  const [status, setStatus] = useState("homepage");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsUser(user);
    });
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isUser !== null) {
      firebase
        .firestore()
        .collection("users")
        .doc(isUser.email)
        .collection("exchangeItems")
        .orderBy("exchangeTime", "desc")
        .onSnapshot((snapshot) => {
          const data = snapshot.docs
            .map((doc) => {
              return { data: doc.data(), id: doc.id };
            })
            .filter((doc) => {
              return (
                doc.data.status === "done" && doc.data.owner === isUser.email
              );
            });

          if (isMounted) {
            setAllExchange(data);
            setMsgLength(data.length);
            if (once) {
              setInitMsgLength(data.length);

              setOnece(false);
            }
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [isUser, read]);

  const displayControl = () => {
    setInitMsgLength(msgLength);
    if (display) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
    let arr = [];

    allExchange.map((data) => {
      return arr.push(data.id);
    });

    arr.map((item) => {
      firebase
        .firestore()
        .collection("users")
        .doc(isUser.email)
        .collection("exchangeItems")
        .doc(item)
        .update({
          read: true,
        })
        .then(() => {
          setRead(true);
        });
      return item;
    });
  };

  // document.body.addEventListener("click", function (e) {
  //   if (e.target === bell.current) {
  //     setDisplay(true);
  //   } else {
  //     setDisplay(false);
  //   }
  // });

  return (
    <div>
      {isUser ? (
        <>
          <HeaderDiv>
            <NavbarDiv>
              <NavLink
                to="/FittingRoom"
                status={status}
                onClick={() => setStatus("FittingRoom")}
              >
                更衣室
              </NavLink>
            </NavbarDiv>
            <NavbarDiv>
              <NavLink2
                to="/Diary"
                status={status}
                onClick={() => setStatus("Diary")}
              >
                穿搭日記
              </NavLink2>
            </NavbarDiv>
            <IndexDiv>
              <IndexLink to="/">
                <Logo src={logo} alt="logo" />
              </IndexLink>
            </IndexDiv>
            <NavbarDiv>
              <NavLink3
                to="/FindNewDress"
                status={status}
                onClick={() => setStatus("FindNewDress")}
              >
                幫衣服找新家
              </NavLink3>
            </NavbarDiv>
            <NavbarDiv>
              <NavLink4
                to="/Personal/mycloset"
                status={status}
                onClick={() => setStatus("Personal")}
              >
                我の檔案
              </NavLink4>
            </NavbarDiv>

            {msgLength ? (
              msgLength === initMsgLength ? (
                <BellDiv>
                  <img
                    ref={bell}
                    onClick={displayControl}
                    src={Notification}
                    alt="Bell"
                    style={{ color: "#815e29", width: "25px" }}
                  />
                </BellDiv>
              ) : (
                <BellDiv>
                  <img
                    ref={bell}
                    onClick={displayControl}
                    src={Notification}
                    alt="Bell"
                    style={{ color: "#815e29", width: "25px" }}
                  />
                  <CircleDiv />
                </BellDiv>
              )
            ) : (
              <>
                <BellDiv>
                  <img
                    ref={bell}
                    onClick={displayControl}
                    src={Notification}
                    alt="Bell"
                    style={{ color: "#815e29", width: "25px" }}
                  />
                </BellDiv>
              </>
            )}

            {display && <Notice />}
          </HeaderDiv>

          <Mobile />
        </>
      ) : (
        <>
          <HeaderDiv>
            <IndexDiv>
              <IndexLink to="/">
                <Logo src={logo} alt="logo" />
              </IndexLink>
            </IndexDiv>
          </HeaderDiv>
        </>
      )}
    </div>
  );
};

export default Header;
