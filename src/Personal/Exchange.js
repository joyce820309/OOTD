import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import Popup from "reactjs-popup";
import WebFont from "webfontloader";
import "firebase/auth";
import { Div, Span, DeleteBtn } from "../CSS/CommonCSS";
import { ItemInfo, ImgDiv } from "../CSS/PopupCSS";
import Swal from "sweetalert2";
import { EmptyDiv } from "../CSS/FittingCSS";

const EmptyContainer = styled.div`
  width: 100%;
  padding-top: 60px;
  display: flex;
  justify-content: center;
`;

const ExchangeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  max-height: 720px;
  padding: 15px;
  overflow-y: scroll;
  background-color: #fbeae3;
  z-index: 5;
  height: 720px;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #fbeae3;
  }

  &::-webkit-scrollbar-thumb {
    border: 3px solid #fbeae3;
  }
  scrollbar-width: 5px;
  scrollbar-color: #fbeae3 #fbeae3;
  @media screen and (max-width: 1250px) {
    width: 575px;
  }
`;

const EachDiv = styled.div`
  box-shadow: 0 1px 8px 0 rgb(34 36 38 / 18%);
  width: 20%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
  background: white;
  padding: 10px;
  position: relative;
  cursor: pointer;
  @media screen and (max-width: 1200px) {
    width: 30%;
  }
`;

const ExchangeItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 18px 10px;
  padding: 10px;
`;

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }
  &-content {
    margin: auto;
    background: rgb(255, 255, 255);
    width: 450px;
    display: flex;
    height: 500px;
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
`;

const NameBtn = styled.div`
  background-color: #f3d5ca;
  text-align: center;
  line-height: 1.6em;
  color: #31342d5c;
  cursor: pointer;
  width: 43% !important;
  margin: 0 auto;
  font-size: 13px;
  font-weight: 600;
  border-radius: 8px;
  margin-bottom: 5px;
  &:hover {
    transform: scale(1.2) !important;
  }
`;

const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Exchange = () => {
  const [isUser, setIsUser] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const [itemsCollection, setItemsCollection] = useState([]);
  const [exchangeDone, setExchangeDone] = useState([]);

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
        .collectionGroup("items")
        .onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => {
            return doc.data();
          });

          if (isMounted) {
            setAllItems(data);
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
        .orderBy("itemTime", "desc")
        .onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => {
            return { data: doc.data(), id: doc.id };
          });
          if (isMounted) {
            setItemsCollection(data);
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
        .doc(isUser.email) //拿到別人的衣服
        .collection("exchangeItems")
        .orderBy("exchangeTime", "desc")
        .onSnapshot((snapshot) => {
          const data = snapshot.docs
            .map((doc) => {
              return { data: doc.data(), id: doc.id };
            })
            .filter(
              (data) =>
                data.data.status === "done" && data.data.owner !== isUser.email
            );
          if (isMounted) {
            setExchangeDone(data);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [isUser]);

  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const deleteExchangeItem = (item, id) => {
    console.log(item, "Id", id);

    const itemDoc = firebase
      .firestore()
      .collection("users")
      .doc(isUser.email)
      .collection("exchangeItems")
      .doc(id);
    let ref = firebase.storage().ref("itemImages/" + itemDoc.id);

    firebase
      .firestore()
      .collection("users")
      .doc(isUser.email)
      .collection("exchangeItems")
      .doc(id)
      .delete()
      .then(() => {
        if (!allItems.map((obj) => obj.itemImg).includes(item.itemImg)) {
          ref.delete();
        }
        Toast.fire({
          icon: "warning",
          title: "刪除成功!!",
        });
      });
  };
  return (
    <ExchangeContainer>
      {exchangeDone.length === 0 ? (
        <EmptyContainer>
          <EmptyDiv
            style={{ padding: "15px", borderBottom: "4px #bdc5c9 solid" }}
          >
            還沒有交換過的衣服唷！快去尋找新衣服吧！
          </EmptyDiv>
        </EmptyContainer>
      ) : (
        <>
          {exchangeDone.map((item, i) => {
            return (
              <EachDiv key={i}>
                <DeleteBtn
                  onClick={() => {
                    deleteExchangeItem(item.data, item.id);
                  }}
                >
                  X
                </DeleteBtn>

                <StyledPopup
                  modal
                  trigger={
                    <ExchangeItem>
                      <img
                        src={item.data.itemImg}
                        alt="exchange-item"
                        style={{ height: "140px" }}
                      />
                    </ExchangeItem>
                  }
                >
                  {(close) => (
                    <Backdrop>
                      <ItemDiv>
                        <ItemInfo>
                          <ImgDiv>
                            <img
                              src={item.data.itemImg}
                              alt="exchange item"
                              style={{ height: "100%" }}
                            />
                          </ImgDiv>
                          <Div>
                            <Span>原主人叫做：{item.data.name}</Span>
                          </Div>
                          <Div>
                            <Span>尺寸：{item.data.itemSize}</Span>
                          </Div>
                          <Div>
                            <Span>名稱：{item.data.exchangeName}</Span>
                          </Div>
                          <Div>
                            <Span>自我介紹：{item.data.exchangeInfo}</Span>
                          </Div>
                        </ItemInfo>
                      </ItemDiv>
                    </Backdrop>
                  )}
                </StyledPopup>
              </EachDiv>
            );
          })}
        </>
      )}
    </ExchangeContainer>
  );
};

export default Exchange;
