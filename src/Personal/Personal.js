import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Pic from "../img/Pic.png";
import firebase from "../utils/firebase";
import { useSelector } from "react-redux";
import Expense from "./Expense";
import MyCloset from "./Closet";
import Exchange from "./Exchange";
import NotFound from "../General/NotFound";
import { EmptyContainer } from "../Style/PersonalCSS";

const BigDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Container = styled.div`
  position: relative;
  margin-top: 35px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  width: 900px;
  height: 830px;
  @media screen and (max-width: 1440px) {
    height: 540px;
  }
`;

const Title = styled(Link)`
  text-decoration: none;
  font-weight: 800;
  margin: 20px;
  position: absolute;
  top: -60px;
  left: 10px;
  color: #515d6087;
  padding: 10px 12px 12px 5px;
  transform: rotate(-1.8deg);
  cursor: pointer;
  z-index: ${(props) => (props.click === "closetDiv" ? 10 : 0)};
  background-color: ${(props) =>
    props.click === "closetDiv" ? "#a5c2c9" : "#a5c2c999"};
  &:hover {
    transform: scale(1.16);
  }
`;

const Title1 = styled(Title)`
  left: 86px;
  background-color: ${(props) =>
    props.click === "exchangeDiv" ? "#edc4b4" : "#edc4b4a1"};
  color: #31342d5c;
  z-index: 0;
  padding: 10px 12px 18px 12px;
  top: -65px;
  transform: rotate(-1.2deg);
  z-index: ${(props) => (props.click === "exchangeDiv" ? 10 : 0)};
`;

const Title2 = styled(Title)`
  left: 208px;
  background-color: ${(props) =>
    props.click === "expenseDiv" ? "#ebc382" : "#dfb16687"};
  z-index: ${(props) => (props.click === "expenseDiv" ? 10 : 0)};
  color: #72674c9c;
  transform: rotate(1.8deg);
`;

const ProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #31342dd6;
  /* background-color: #f3d5ca; */
`;

const SetDiv = styled(ProfileDiv)``;

const ProfileImg = styled.div`
  width: 120px;
  height: 120px;
  border: 1px solid black;
`;

const Button = styled.div`
  background-color: #f3d5ca;
  text-align: center;
  line-height: 1.6em;
  color: #31342d5c;
  cursor: pointer;
  width: 65% !important;
  border-radius: 15px;
  margin: 8px auto 3px auto;
  padding: auto 5px;
  font-size: 15px;
  font-weight: 600;
  &:hover {
    transform: scale(1.2) !important;
    background-color: #ffdd759e;
  }
`;

const UserInfo = styled.div`
  margin: 10px auto 5px;
  font-weight: 700;
`;

const Personal = () => {
  const isUser = useSelector((state) => state.user);
  const [userName, setUserName] = useState("");
  const [userEmail, setUseremail] = useState("");
  const history = useHistory();
  const [btnStatus, setBtnStatus] = useState("closetDiv");

  useEffect(() => {
    let isMounted = true;
    if (isUser !== null) {
      firebase
        .firestore()
        .collection("users")
        .doc(isUser.email)
        .get()
        .then((doc) => {
          if (isMounted) {
            setUserName(doc.data()?.name);
            setUseremail(doc.data()?.email);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [isUser]);

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push("/");
      });
  };

  return (
    <div>
      <BigDiv>
        <ProfileDiv>
          <ProfileImg>
            <img
              src={Pic}
              alt="pic"
              style={{ width: "100%", height: "100%" }}
            />
          </ProfileImg>
          <UserInfo>Hi, {userName}</UserInfo>
          <UserInfo>{userEmail}</UserInfo>
          <Button onClick={() => signOut()}>Log Out</Button>
        </ProfileDiv>
        <SetDiv></SetDiv>

        <Container>
          <Title
            to="/Personal/mycloset"
            onClick={() => {
              setBtnStatus("closetDiv");
            }}
          >
            我的衣櫥
          </Title>
          <Title1
            to="/Personal/myexchange"
            onClick={() => {
              setBtnStatus("exchangeDiv");
            }}
          >
            交換過的衣服
          </Title1>
          <Title2
            to="/Personal/myexpense"
            // click={btnStatus}
            onClick={() => {
              setBtnStatus("expenseDiv");
            }}
          >
            相關費用
          </Title2>

          <Switch>
            <Route path="/Personal/mycloset" exact>
              <MyCloset />
            </Route>
            <Route path="/Personal/myexchange" exact>
              <Exchange />
            </Route>
            <Route path="/Personal/myexpense" exact>
              <Expense />
            </Route>
            <Route path="">
              <EmptyContainer>
                <NotFound />
              </EmptyContainer>
            </Route>
          </Switch>
        </Container>
      </BigDiv>
    </div>
  );
};

export default Personal;
