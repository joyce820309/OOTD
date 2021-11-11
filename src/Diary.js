import React, { useState, useEffect } from "react";
import Header from "./Landing_Page/Header";
import styled from "styled-components";
import firebase from "./utils/firebase";
import Popup from "reactjs-popup";
import WebFont from "webfontloader";

import "firebase/firestore";

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }
  &-content {
    margin: auto;
    background: rgb(255, 255, 255);
    width: 500px;
    display: flex;
    height: 550px;
    border-radius: 25px;
    background-color: snow;
  }
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  border-radius: 25px;
  background-color: #f5f5f57a;
`;

const Main = styled.div`
  margin: 115px auto 20px auto;
  max-width: 1200px;
  padding: 0 2rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
`;

const DeleteBtn = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  font-weight: bolder;
  color: #9aa8ab;
  cursor: pointer;
  &:hover {
    transform: scale(1.2) !important;
    color: #fb8455;
  }
`;

const EachBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  margin-top: 2rem;
  background: #fff;
  padding: 1rem;
  box-shadow: 0 0.2rem 1.2rem rgba(0, 0, 0, 0.2);
  position: relative;
`;

const ImgBox = styled.div`
  max-height: 400px;
  margin-bottom: 15px;
  padding: 5px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1) !important;
    transition: all 0.35s;
  }
`;

const ContentImg = styled(ImgBox)`
  background-color: snow;
  box-shadow: 0 1px 8px 0 rgb(34 36 38 / 18%);
  border-radius: 5px;
  &:hover {
    transform: scale(1) !important;
  }
`;

const ContentTitle = styled.div`
  font-size: 1rem;
  text-align: center;
  line-height: 2em;
  font-weight: 700;
  color: #758b91c4;
`;

const Content = styled(ContentTitle)`
  /* font-size: 0.9rem;
  font-weight: 600; */
`;

const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled.div`
  margin-bottom: 12px;
`;

const Text = styled.div`
  font-size: 1rem;
  text-align: center;
  line-height: 2em;
  font-weight: 700;
  color: #6e7f83b5;
  letter-spacing: 0.2rem;
`;

const Diary = () => {
  const [isUser, setIsUser] = useState(null);
  const [outfitCollection, setOutfitCollection] = useState([]);

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
        .collection("outfits")
        .orderBy("outfitTime", "desc")
        .onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => {
            return { data: doc.data(), id: doc.id };
          });
          if (isMounted) {
            setOutfitCollection(data);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [isUser]);

  const deleteItem = (outfits, id) => {
    const item = firebase
      .firestore()
      .collection("users")
      .doc(isUser.email)
      .collection("outfits")
      .doc(id);

    item.delete().then(() => {
      let ref = firebase.storage().ref("diaryImages/" + item.id);
      ref
        .delete()
        .then(() => {
          // File deleted successfully
          alert("刪除成功");
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          console.error(error);
        });
    });
  };

  return (
    <div style={{ fontFamily: "Chilanka" }}>
      <Header />
      <Main>
        <Container>
          {outfitCollection.map((outfit, e) => (
            <EachBox key={e}>
              <DeleteBtn
                onClick={() => {
                  deleteItem(outfit, outfit.id);
                }}
              >
                X
              </DeleteBtn>

              <StyledPopup
                modal
                trigger={
                  <ImgBox>
                    <img
                      src={outfit.data.outfitImg}
                      alt="outfitImg"
                      style={{ maxWidth: "100%", height: "100%" }}
                    />
                  </ImgBox>
                }
              >
                {(close) => (
                  <Backdrop>
                    <ItemDiv>
                      <ContentImg>
                        <img
                          src={outfit.data.outfitImg}
                          alt="outfitImg"
                          style={{ maxWidth: "100%", height: "100%" }}
                        />
                      </ContentImg>
                      <ContentTitle>
                        穿搭主題：{outfit.data.outfitName}
                      </ContentTitle>
                      <Content>穿搭季節：{outfit.data.outfitSeason}</Content>
                    </ItemDiv>
                  </Backdrop>
                )}
              </StyledPopup>

              <Text>
                {outfit.data.YYYY}年{outfit.data.MM}月{outfit.data.DD}日
              </Text>
            </EachBox>
          ))}
        </Container>
      </Main>
    </div>
  );
};

export default Diary;
