import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import { useSelector } from "react-redux";
import { calaulateExp } from "../utils/func";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 30%;
  outline: 1px tomato solid;
  margin-bottom: 20%;
`;

const BudgetDiv = styled.div`
  margin: 20px auto auto 20px;
  background-color: #c8dadeb5;
  width: 50%;
  position: absolute;
  padding: 25px 25px 35px;
  transform: rotate(-1.8deg);
  height: 130px;
  top: 20px;
`;
const ExpDiv = styled(BudgetDiv)`
  margin: 100px 10px auto auto;
  background-color: #fbd2c19e;
  right: 50px;
  padding: 88px 25px 95px auto;
  transform: rotate(1.8deg);
  top: 20px;
`;
const Span = styled.div`
  color: #3f484cc2;
  font-weight: 500;
  font-size: 1.1rem;
`;

const EditBtn = styled.button`
  border-radius: 8px;
  background-color: #99858666;
  padding: 4px 12px;
  font-size: 0.9rem;
  margin-left: 12px;
  color: #31342dcf;
`;

const EditBudget = () => {
  const isUser = useSelector((state) => state.user);
  const [budget, setBudget] = useState(0);
  const [expense, setExpense] = useState(0);
  const [remain, setRemain] = useState(0);
  const [positiveRemain, setPositiveRemain] = useState(0);
  const [editBudget, setEditBudget] = useState(false);
  const [renderItems, setRenderItems] = useState([]);
  const realMonth = new Date().toLocaleString().slice(5, 7);

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
    // let isMounted = true;
    let unsuscribe;
    if (isUser !== null) {
      firebase
        .firestore()
        .collection("users")
        .doc(isUser.email)
        .collection("items")
        .onSnapshot((snapshot) => {
          const data = [];
          snapshot.forEach((doc) => {
            console.log(doc.data().MM, realMonth);
            if (
              parseInt(doc.data().MM) === parseInt(realMonth) &&
              doc.data().itemExpense !== undefined
            ) {
              data.push(doc.data());
            }
          });

          let totalExp = 0;
          data.forEach((doc) => {
            totalExp += doc.itemExpense;
          });

          setExpense(totalExp);
        });
    }
    return () => {
      // isMounted = false;
      unsuscribe && unsuscribe();
    };
  }, [isUser]);

  const calculate = () => {
    let money;
    calaulateExp(money, budget, expense, setRemain);

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
    <Container>
      {editBudget ? (
        <BudgetDiv>
          {budget === 0 ? (
            <Span>咦？！這個月沒有預算唷</Span>
          ) : (
            <Span>這個月的治裝費預算</Span>
          )}
          <input
            type="number"
            onChange={(e) => setBudget(e.target.value)}
            style={{
              margin: "8px 10px 10px 0",
              backgroundColor: "#4488dd30",
            }}
          />
          <button onClick={(e) => calculate(e)}>好了</button>
        </BudgetDiv>
      ) : (
        <BudgetDiv>
          {budget === 0 ? (
            <Span>目前預算是0元，快設定本月治裝預算吧!!</Span>
          ) : (
            <Span>
              這個月的治裝費預算：
              <span style={{ fontSize: "1.1rem", fontWeight: "600" }}>
                {budget}元
              </span>
            </Span>
          )}

          <EditBtn
            style={{ backgroundColor: "#6d8bb169" }}
            onClick={() => {
              setEditBudget(true);
            }}
          >
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
    </Container>
  );
};

export default EditBudget;
