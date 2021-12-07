import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import WebFont from "webfontloader";
// import CountUp from "react-countup";

import "firebase/auth";

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 30%;
  margin: 5px auto;
`;
const TotalDiv = styled.div`
  width: 23%;
  background-color: #fffafab5;
  border-radius: 5px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Total = styled.div`
  font-size: 3rem;
  font-weight: 900;
  color: #779ab7;
`;
const Content = styled.div`
  color: #515d6087;
  background-color: #f5d3a1ba;
  width: 80%;
  font-weight: 700;
  font-size: 1.7rem;
  letter-spacing: 0.2rem;
  height: 22%;
  transform: rotate(1.8deg);
  position: absolute;
  left: -5px;
  bottom: 5px;
  padding-left: 12px;
  border-radius: 3px;
`;

const SubTotal = () => {
  const [totalItem, setTotalItem] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalSend, setTotalSend] = useState(0);
  const [totalGet, setTotalGet] = useState(0);
  const [isUser, setIsUser] = useState(null);

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
  }, [isUser]);

  useEffect(() => {
    let isMounted = true;

    if (isUser !== null) {
      firebase
        .firestore()
        .collection("users")
        .doc(isUser.email)
        .collection("items")
        .onSnapshot((snapshot) => {
          let arr = [];
          snapshot.forEach((doc) => {
            arr.push(doc.data().itemImg);
          });

          const priceDoc = snapshot.docs
            .map((doc) => {
              return { data: doc.data(), id: doc.id };
            })
            .filter((doc) => doc.data.itemExpense);

          let price = 0;
          priceDoc.forEach((doc) => {
            price += doc.data.itemExpense;
          });

          if (isMounted) {
            console.log(price.toLocaleString());
            setTotalExpense(price.toLocaleString());
            setTotalItem(arr.length);
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
        .collection("exchangeItems")
        .onSnapshot((snapshot) => {
          const getDoc = snapshot.docs
            .map((doc) => {
              return { data: doc.data(), id: doc.id };
            })
            .filter((doc) => {
              return (
                doc.data.status === "done" && doc.data.owner === isUser.email
              );
            });

          const sendDoc = snapshot.docs
            .map((doc) => {
              return { data: doc.data(), id: doc.id };
            })
            .filter(
              (doc) =>
                doc.data.status === "done" && doc.data.owner !== isUser.email
            );

          if (isMounted) {
            setTotalGet(getDoc.length);
            setTotalSend(sendDoc.length);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [isUser]);

  return (
    <Container>
      <TotalDiv>
        <Total>{totalItem}</Total>
        <Content>衣服件數</Content>
      </TotalDiv>
      <TotalDiv>
        <Total>
          {totalExpense}
          {/* <CountUp onEnd={() => console.log({ totalExpense })} /> */}
        </Total>
        <Content>總共花費</Content>
      </TotalDiv>
      <TotalDiv>
        <Total>{totalGet}</Total>
        <Content>交換件數</Content>
      </TotalDiv>
      <TotalDiv>
        <Total>{totalSend}</Total>
        <Content>送出件數</Content>
      </TotalDiv>
    </Container>
  );
};

export default SubTotal;
