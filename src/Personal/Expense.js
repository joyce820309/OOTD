import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import WebFont from "webfontloader";
import "firebase/auth";
import PieChartForm from "./PieChart";

const BudgetSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  margin-top: 20px;
  position: relative;

  @media screen and (max-width: 1250px) {
    margin-top: 70px;
  }
`;

const BudgetSpan = styled.span`
  background-color: #dfb166b8;
  position: absolute;
  top: -25px;
  left: 33px;
  color: #72674cd9;
  padding: 10px 12px 5px 5px;
  font-size: 15px;
  transform: rotate(-3.8deg);
`;

const BudgetDiv = styled.div`
  margin-bottom: 20px;
  background-color: #f0bc6880;
  position: relative;
  width: 60%;
  padding: 25px 25px 35px;
  transform: rotate(-1.8deg);
  height: 130px;
`;

const ExpDiv = styled.div`
  background-color: #f0bc6880;
  width: 60%;
  margin-top: 106px;
  position: absolute;
  right: 0;
  padding: 35px 25px 45px;
  transform: rotate(1.8deg);
`;

const Span = styled.div`
  color: #3f484cc2;
  font-weight: 500;
  font-size: 13px;
`;

const Expense = () => {
  const [isUser, setIsUser] = useState(null);
  const [budget, setBudget] = useState(0);
  const [expense, setExpense] = useState(0);
  const [remain, setRemain] = useState(0);
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
    if (money < 0) {
      money = 0;
    }
    setRemain(money);
    firebase
      .firestore()
      .collection("users")
      .doc(isUser.email)
      .set(
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
    <BudgetSection>
      {editBudget ? (
        <BudgetDiv>
          <BudgetSpan>設定預算</BudgetSpan>
          <Span>這個月的治裝費預算</Span>
          <input
            type="number"
            onChange={(e) => setBudget(e.target.value)}
            style={{ margin: "8px 10px 10px 0" }}
          />
          <button onClick={(e) => calculate(e)}>好了</button>
        </BudgetDiv>
      ) : (
        <BudgetDiv>
          <BudgetSpan>設定預算</BudgetSpan>
          <Span>這個月的治裝費預算</Span>
          <div>{budget}</div>
          <button
            onClick={() => {
              setEditBudget(true);
            }}
          >
            {" "}
            編輯
          </button>
        </BudgetDiv>
      )}

      <ExpDiv>
        <Span>這個月已經花了 ${expense}</Span>
        <Span>我這個月還可以花 ${remain}</Span>
      </ExpDiv>
      <PieChartForm />
    </BudgetSection>
  );
};

export default Expense;
