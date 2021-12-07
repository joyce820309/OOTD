import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "firebase/auth";
import firebase from "../utils/firebase";

const NoticeDiv = styled.div`
  position: absolute;
  top: 60px;
  height: 390px;
  right: 30px;
  width: 300px;
  padding: 8px;
  background-color: #fffaf2;
  border-radius: 5px;
  box-shadow: 0 0.2rem 1.2rem rgb(0 0 0 / 20%);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #fffaf2;
  }

  &::-webkit-scrollbar-thumb {
    border: 3px solid #fffaf2;
  }
  scrollbar-width: 5px;
  scrollbar-color: #8f54a0 #8f54a0;
`;

const NewsText = styled(Link)`
  font-size: 0.9rem;
  color: rgb(129, 94, 41);
  margin: 5px 5px 8px 5px;
  border-radius: 5px;
  padding: 5px;
  text-decoration: none;

  &:hover {
    background-color: #31342d36;
    cursor: pointer;
  }
`;

const Notice = () => {
  const [isUser, setIsUser] = useState(null);
  const [exchangeCollection, setExchangeCollection] = useState([]);

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
        // .limit(6)
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
            console.log(data);
            setExchangeCollection(data);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [isUser]);

  return (
    <>
      <NoticeDiv>
        {exchangeCollection.map((exchange, e) => (
          <>
            <NewsText to="/Personal/mycloset">
              <span
                style={{
                  fontWeight: "800",
                  fontSize: "0.9rem",
                  marginRight: "0.4rem",
                }}
              >
                {exchange.data.userName}
              </span>
              想要跟你交換衣服，快去「我の檔案」確認看看吧！
            </NewsText>
            {/* <div>X</div> */}
          </>
        ))}
      </NoticeDiv>
    </>
  );
};

export default Notice;
