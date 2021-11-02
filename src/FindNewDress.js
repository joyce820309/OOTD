import React, { useEffect, useState } from "react";
import Header from "./Landing_Page/Header";
import styled from "styled-components";
import Popup from "reactjs-popup";
import "firebase/firestore";
import "firebase/storage";
import firebase from "./utils/firebase";

const exchangeItems = firebase
  .firestore()
  .collection("users")
  .doc("joy")
  .collection("exchangeItems");
const exchangeItem = exchangeItems.doc();

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }
  &-content {
    margin: auto;
    background: rgb(255, 255, 255);
    /* opacity: 0.5; */
    width: 700px;
    display: flex;
    height: 550px;
  }
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fffcf1d4;
  display: flex;
  justify-content: center;
`;

const ItemForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Div = styled.div`
  margin: 5px auto;
`;
const Span = styled.span``;

const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px 10px;
  margin-top: 115px;
  margin-left: 30px;
  width: 100%;
  padding: 0 2rem;
  text-align: center;
`;
const EachBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-top: 2rem;
  background: #fff;
  padding: 1rem;
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

const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 8px;
  background-color: #b8d5db8c;
  color: #39474ab8;
  padding: 5px;
`;

const FindNewDress = () => {
  const [allItems, setAllItems] = useState([]);
  const [itemsCollection, setItemsCollection] = useState([]);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const YYYY = date.slice(0, 4);
  const MM = date.slice(5, 7);
  const DD = date.slice(8, 10);
  const hour = time.slice(0, 2);
  const min = time.slice(3, 5);

  const [itemDoc, setItemDoc] = useState();

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc("joy")
      .collection("items")
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setItemsCollection(data);
      });
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc("joy")
      .collection("exchangeItems")
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setAllItems(data);
      });
  }, []);

  const sumbitForm = () => {
    exchangeItems.doc(exchangeItem.id).set({
      exchangeID: exchangeItem.id,
      userName: userName,
      userPhone: userPhone,
      userAddress: userAddress,
      YYYY: YYYY,
      MM: MM,
      DD: DD,
      timeHour: hour,
      timeMin: min,
    });
  };

  return (
    <div>
      <Header />
      <Main>
        {allItems.map((item) => {
          return (
            <EachBox>
              <ImgBox>
                <img
                  src={item.itemImg}
                  alt="exchange item"
                  style={{ width: "100%", height: "100%" }}
                />
              </ImgBox>
              <DetailBox>
                <div style={{ marginBottom: "5px" }}>
                  衣服名字：{item.itemName}
                </div>
                <div style={{ marginBottom: "5px" }}>
                  衣服尺寸：{item.itemSize}
                </div>
              </DetailBox>

              <StyledPopup modal trigger={<button>我要換這件</button>}>
                {(close) => (
                  <Backdrop>
                    <ItemForm>
                      <Div>
                        <Span>它的主人是：</Span>
                      </Div>
                      <Div>
                        <Span>你要交換的是：</Span>
                      </Div>

                      <Div>
                        <Span>尺寸：</Span>
                      </Div>

                      <Div>
                        <Span>你的真名：</Span>
                        <input
                          type="text"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="喬伊斯"
                        />
                      </Div>

                      <Div>
                        <Span>手機號碼：</Span>
                        <input
                          type="text"
                          value={userPhone}
                          onChange={(e) => setUserPhone(e.target.value)}
                        />
                      </Div>

                      <Div>
                        <Span>希望交換地址：</Span>
                        <input
                          type="text"
                          value={userAddress}
                          placeholder="台北市政府站"
                          onChange={(e) => setUserAddress(e.target.value)}
                        />
                      </Div>

                      <Div>
                        <Span>希望交換日期：</Span>
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </Div>

                      <Div>
                        <Span>希望交換時間：</Span>
                        <input
                          type="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        />
                      </Div>

                      <Div>
                        <button type="submit" onClick={(e) => sumbitForm(e)}>
                          好了！
                        </button>
                      </Div>
                    </ItemForm>
                  </Backdrop>
                )}
              </StyledPopup>
            </EachBox>
          );
        })}
      </Main>
    </div>
  );
};

export default FindNewDress;
