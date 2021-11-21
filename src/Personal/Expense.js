import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import WebFont from "webfontloader";
import "firebase/auth";
import Arrow from "../img/arrow.png";
import ArrowDark from "../img/arrowDark.png";
import LineChartForm from "./LineChart";
import PieChartForm from "./PieChart";

import SubTotal from "./SubTotal";

const BudgetContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: 720px;
  padding: 15px;
  background-color: #f5e8d4;
  z-index: 5;
  overflow-y: scroll;
  position: relative;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #f5e8d4;
  }

  &::-webkit-scrollbar-thumb {
    border: 3px solid #f5e8d4;
  }
  scrollbar-width: 5px;
  scrollbar-color: #f5e8d4 #f5e8d4;

  @media screen and (max-width: 1250px) {
    /* margin-top: 70px; */
  }
`;

const BudgetDiv = styled.div`
  margin: 20px auto auto 20px;
  background-color: #c8dadeb5;
  width: 50%;
  position: absolute;
  padding: 25px 25px 35px;
  transform: rotate(-1.8deg);
  height: 130px;
  top: 210px;
`;

const ExpDiv = styled(BudgetDiv)`
  margin: 100px 10px auto auto;
  position: absolute;
  background-color: #fbd2c19e;
  right: 50px;
  padding: 88px 25px 95px auto;
  transform: rotate(1.8deg);
  top: 200px;
`;

const LabelDiv = styled.div`
  position: absolute;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  background-color: #bcd3a1;
  transform: rotate(-1.3deg);
  top: 530px;
  right: 320px;
  width: 185px;
  height: 45px !important;
  color: #69725d;
  /* padding: auto 15px; */
  border-radius: 3px;
`;

const LabelDiv2 = styled(LabelDiv)`
  top: 710px;
  right: 100px;
  background-color: #ddd69cd4;
  color: #64624dd4;
  width: 165px;
  transform: rotate(2.3deg);
`;
const ArrowDarkImg = styled.img`
  /* transform: rotate(7.3deg) !important; */
  height: 150px;
  top: 590px;
  right: 390px;
  /* transform: scale(0.6); */
  position: absolute;
`;

const ArrowImg = styled.img`
  /* transform: rotate(2.3deg); */
  top: 737px;
  right: 46px;
  height: 150px;
  position: absolute;
`;

const EditBtn = styled.button`
  border-radius: 8px;
  background-color: #99858666;
  padding: 4px 12px;
  font-size: 0.9rem;
  margin-left: 12px;
  color: #31342dcf;
`;

const Span = styled.div`
  color: #3f484cc2;
  font-weight: 500;
  font-size: 1.1rem;
`;

const Expense = () => {
  const [isUser, setIsUser] = useState(null);
  const [budget, setBudget] = useState(0);
  const [expense, setExpense] = useState(0);
  const [remain, setRemain] = useState(0);
  const [positiveRemain, setPositiveRemain] = useState(0);
  const [editBudget, setEditBudget] = useState(false);
  const [renderItems, setRenderItems] = useState([]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Droid Sans", "Chilanka"],
      },
    });
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsUser(user);
      }
    });
  }, []);

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
            setBudget(doc.data().budget);
            setRemain(doc.data().remaining);

            console.log(Math.abs(doc.data().budget - doc.data().remaining));
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [isUser]);

  useEffect(() => {
    let isMounted = true;
    if (isUser !== null) {
      firebase
        .firestore()
        .collection("users")
        .doc(isUser.email)
        .collection("items")
        .get()
        .then((snapshot) => {
          let arr = [];
          let totalExp = 0;
          snapshot.forEach((doc) => {
            arr.push(doc.data().itemImg);
            totalExp += doc.data().itemExpense;
          });
          if (isMounted) {
            setRenderItems(arr);
            setExpense(totalExp);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [isUser]);

  const calculate = () => {
    let money = Number(budget - expense);

    setRemain(money);
    firebase
      .firestore()
      .collection("users")
      .doc(isUser.email)
      .update(
        {
          budget: Number(budget),
          remaining: Number(money),
        },
        { merge: true }
      )
      .then(() => {
        setEditBudget(false);
      });
  };
  return (
    <BudgetContainer>
      <SubTotal />

      {editBudget ? (
        <BudgetDiv>
          <Span>這個月的治裝費預算</Span>
          <input
            type="number"
            onChange={(e) => setBudget(e.target.value)}
            style={{ margin: "8px 10px 10px 0", backgroundColor: "#4488dd30" }}
          />
          <button onClick={(e) => calculate(e)}>好了</button>
        </BudgetDiv>
      ) : (
        <BudgetDiv>
          <Span>
            這個月的治裝費預算：
            <span style={{ fontSize: "1.1rem", fontWeight: "600" }}>
              {budget}元
            </span>
          </Span>
          <EditBtn
            style={{ backgroundColor: "#2979dc69" }}
            onClick={() => {
              setEditBudget(true);
            }}
          >
            {" "}
            編輯
          </EditBtn>
        </BudgetDiv>
      )}

      <ExpDiv>
        <Span>
          這個月已經花了{" "}
          <span style={{ fontSize: "1.1rem", fontWeight: "600" }}>
            ${expense}
          </span>
        </Span>
        {remain >= 0 ? (
          <Span>
            我這個月還可以花{" "}
            <span style={{ fontSize: "1.1rem", fontWeight: "600" }}>
              ${remain}
            </span>
          </Span>
        ) : (
          <Span>
            <span style={{ fontSize: "1.1rem", color: "#d1726b" }}>
              我這個月已經超過預算{" "}
              <span style={{ fontSize: "1.1rem", fontWeight: "900" }}>
                ${Math.abs(remain)}
              </span>
              ，不可以再花了！
            </span>
          </Span>
        )}
      </ExpDiv>

      <LabelDiv> 今年各類別花費</LabelDiv>
      <ArrowDarkImg src={ArrowDark} alt="ArrowDarkImg" />

      <LabelDiv2>今年總花費</LabelDiv2>
      <ArrowImg src={Arrow} alt="ArrowImg" />

      <PieChartForm />
      <LineChartForm />
    </BudgetContainer>
  );
};

export default Expense;
