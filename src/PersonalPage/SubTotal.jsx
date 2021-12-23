import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import { useSelector } from "react-redux";
import AnimatedNumbers from "react-animated-numbers";
import Loading from "../General/Loading";
import "firebase/auth";

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 25%;
  margin: 5px auto;
  @media screen and (max-width: 441px) {
    flex-wrap: wrap;
    height: 50%;
  }
`;
const TotalDiv = styled.div`
  width: 20%;
  height: 8rem;
  background-color: #fffafab5;
  border-radius: 5px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 441px) {
    width: 45%;
    margin-top: 8px;
  }
`;
const Total = styled.div`
  font-size: 2.8rem;
  font-weight: 900;
  color: #779ab7;
  @media screen and (max-width: 725px) {
    font-size: 2rem;
  }
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
  @media screen and (max-width: 1074px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 1002px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 725px) {
    font-size: 1rem;
    letter-spacing: 0.08rem;
    width: 90%;
  }
  @media screen and (max-width: 550px) {
    font-size: 0.8rem;
    width: 96%;
  }
  @media screen and (max-width: 459px) {
    font-size: 0.4rem;
  }
`;

const SubTotal = () => {
  const [totalItem, setTotalItem] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalSend, setTotalSend] = useState(0);
  const [totalGet, setTotalGet] = useState(0);
  const isUser = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

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
            setTotalExpense(price);
            setTotalItem(arr.length);
            setIsLoading(false);
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
    <>
      <Container>
        <TotalDiv>
          {isLoading ? (
            <Loading />
          ) : (
            <Total>
              <AnimatedNumbers
                animateToNumber={totalItem}
                configs={(number, index) => {
                  return { mass: 2, tension: 200 * (index + 1), friction: 70 };
                }}
              ></AnimatedNumbers>
            </Total>
          )}

          <Content>衣服件數</Content>
        </TotalDiv>
        <TotalDiv>
          {isLoading ? (
            <Loading />
          ) : (
            <Total>
              <AnimatedNumbers
                includeComma
                animateToNumber={totalExpense}
                configs={(number, index) => {
                  return { mass: 2, tension: 200 * (index + 1), friction: 70 };
                }}
              ></AnimatedNumbers>
            </Total>
          )}
          <Content>總共花費</Content>
        </TotalDiv>
        <TotalDiv>
          {isLoading ? (
            <Loading />
          ) : (
            <Total>
              <AnimatedNumbers
                animateToNumber={totalGet}
                configs={(number, index) => {
                  return { mass: 2, tension: 200 * (index + 1), friction: 70 };
                }}
              ></AnimatedNumbers>
            </Total>
          )}
          <Content>交換件數</Content>
        </TotalDiv>

        <TotalDiv>
          {isLoading ? (
            <Loading />
          ) : (
            <Total>
              <AnimatedNumbers
                animateToNumber={totalSend}
                configs={(number, index) => {
                  return { mass: 2, tension: 200 * (index + 1), friction: 70 };
                }}
              ></AnimatedNumbers>
            </Total>
          )}
          <Content>送出件數</Content>
        </TotalDiv>
      </Container>
    </>
  );
};

export default SubTotal;
