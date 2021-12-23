import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import { useSelector } from "react-redux";
import { calaulateExp } from "../utils/func";
import Loading from "../General/Loading";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 30%;
  margin-bottom: 40px;
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
  @media screen and (max-width: 576px) {
    width: 70%;
    /* height: 160px; */
  }
`;

const BudgetEdit = styled(BudgetDiv)`
  display: flex;
  align-items: center;
  @media screen and (max-width: 1003px) {
    flex-direction: column;
  }
`;
const ExpDiv = styled(BudgetDiv)`
  margin: 100px 10px auto auto;
  background-color: #fbd2c19e;
  right: 50px;
  padding: 88px 25px 95px auto;
  transform: rotate(1.8deg);
  top: 20px;
  @media screen and (max-width: 576px) {
    top: 50px;
    right: -3px;
  }
`;
const Span = styled.div`
  color: #3f484cc2;
  font-weight: 500;
  font-size: 1.1rem;
  @media screen and (max-width: 576px) {
    font-size: 0.9rem;
  }
  @media screen and (max-width: 341px) {
    font-size: 0.7rem;
  }
`;

const NumSpan = styled.span`
  font-size: 1.1rem;
  fontweight: 600;
  @media screen and (max-width: 576px) {
    font-size: 0.9rem;
  }
  @media screen and (max-width: 341px) {
    font-size: 0.7rem;
  }
`;

const ExceedNum = styled(NumSpan)`
  color: #d1726b;
`;

const InputDiv = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
`;

const Input = styled.input`
  margin: 8px 2px 10px 0;
  background-color: #4488dd30;
  width: 90px;
`;

const Button = styled.button`
  padding: 5px 8px;
  background-color: #4488dd30;
`;

const EditBtn = styled.button`
  border-radius: 8px;
  background-color: #4488dd30;
  padding: 4px 12px;
  font-size: 0.9rem;
  margin-left: 12px;
  color: #31342dcf;
  @media screen and (max-width: 500px) {
    font-size: 0.7rem;
  }
`;

const EditBudget = () => {
  const isUser = useSelector((state) => state.user);
  const [budget, setBudget] = useState(0);
  const [expense, setExpense] = useState(0);
  const [remain, setRemain] = useState(0);
  const [editBudget, setEditBudget] = useState(false);
  const realMonth = new Date().toLocaleString().slice(5, 7);
  const [isLoading, setIsLoading] = useState(true);

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
          setIsLoading(false);
        });
    }
    return () => {
      unsuscribe && unsuscribe();
    };
  }, [isUser]);

  const calculate = () => {
    const remainMoney = calaulateExp(budget, expense);
    setRemain(remainMoney);
    firebase
      .firestore()
      .collection("users")
      .doc(isUser.email)
      .update(
        {
          budget: Number(budget),
          remaining: Number(remainMoney),
        },
        { merge: true }
      )
      .then(() => {
        setEditBudget(false);
      });
  };

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {editBudget ? (
            <BudgetDiv>
              {budget === 0 ? (
                <Span>咦？！這個月沒有預算唷</Span>
              ) : (
                <Span>這個月的治裝費預算</Span>
              )}
              <InputDiv>
                <Input
                  type="number"
                  style={{ "-webkit-appearance": "none" }}
                  onChange={(e) => setBudget(e.target.value)}
                />
                <Button onClick={(e) => calculate(e)}>好了</Button>
              </InputDiv>
            </BudgetDiv>
          ) : (
            <BudgetEdit>
              {budget === 0 ? (
                <Span>目前預算是0元，快設定本月治裝預算吧！</Span>
              ) : (
                <Span>
                  這個月的治裝費預算：
                  <NumSpan>{budget}元</NumSpan>
                </Span>
              )}

              <EditBtn
                style={{ backgroundColor: "#4488dd30", color: "#31342d5c" }}
                onClick={() => {
                  setEditBudget(true);
                }}
              >
                編輯
              </EditBtn>
            </BudgetEdit>
          )}

          <ExpDiv>
            <Span>
              這個月已經花了 <NumSpan>${expense}</NumSpan>
            </Span>
            {remain >= 0 ? (
              <Span>
                我這個月還可以花 <NumSpan>${remain}</NumSpan>
              </Span>
            ) : (
              <Span>
                <ExceedNum>
                  我這個月已經超過預算 <NumSpan>${Math.abs(remain)}</NumSpan>
                  ，不可以再花了！
                </ExceedNum>
              </Span>
            )}
          </ExpDiv>
        </>
      )}
    </Container>
  );
};

export default EditBudget;
