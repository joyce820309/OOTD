import React, { useEffect, useState } from "react";
import Header from "./Landing_Page/Header";
import styled from "styled-components";
import Popup from "reactjs-popup";
import "firebase/firestore";
import "firebase/storage";
import firebase from "./utils/firebase";
import WebFont from "webfontloader";
import "firebase/auth";
import "firebase/auth";

//需要show出所有會員交換的衣服
const exchangeItems = firebase
  .firestore()
  .collection("users")
  .doc()
  .collection("exchangeItems");

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
  background-color: #aebabf57;
  display: flex;
  justify-content: space-evenly;
  position: relative;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
`;

const ImgDiv = styled.div`
  width: 100%;
  height: 160px;
  margin-bottom: 15px;
  padding: 5px;
  display: flex;
  justify-content: center;
  background-color: snow;
  box-shadow: 0 0.2rem 1.2rem rgba(0, 0, 0, 0.2);
`;

const ItemForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 305px;
  background-color: snow;
`;

const FormTitle = styled.div`
  margin-bottom: 40px;
  color: #768891f0;
  border-bottom: 5px solid #768891a1;
  font-weight: bold;
`;
const Div = styled.div`
  margin: 5px auto;
`;
const Span = styled.span`
  color: #3f484cc2;
  font-weight: 500;
`;

const Submitbtn = styled.div`
  background-color: #f3d5caa3;
  text-align: center;
  line-height: 1.6em;
  color: #31342d5c;
  cursor: pointer;
  margin-top: 14px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 15px;
  &:hover {
    transform: scale(1.2) !important;
    background-color: #f3d5ca;
  }
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px 10px;
  margin-top: 115px;
  margin-left: 30px;
  width: 100%;
  padding: 0 2rem;
  text-align: center;
  @media screen and (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
    margin-left: 20px;
  }
`;
const EachBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 73%;
  margin-top: 2rem;
  background: #fff;
  padding: 1rem;
  @media screen and (max-width: 1100px) {
    padding: 0.5rem;
  }
`;
const ImgBox = styled.div`
  height: 300px;
  margin-bottom: 15px;
  padding: 5px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1) !important;
    transition: all 0.35s;
  }
  @media screen and (max-width: 1100px) {
    height: 300px;
  }
  @media screen and (max-width: 767px) {
    height: 230px;
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
  const [isUser, setIsUser] = useState(null);
  const [allItems, setAllItems] = useState([]);
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

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Droid Sans", "Chilanka"],
      },
    });
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsUser(user);
    });
  }, [isUser]);

  useEffect(() => {
    firebase
      .firestore()
      .collectionGroup("exchangeItems")
      .orderBy("exchangeTime", "desc")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs
          .map((doc) => {
            return { data: doc.data(), id: doc.id };
          })
          .filter((data) => data.data.status === "pending");
        console.log("OMG", data);
        setAllItems(data);
      });
  }, [isUser]);

  const sumbitForm = (e, item, id) => {
    firebase
      .firestore()
      .collection("users")
      .doc(isUser.email)
      .collection("exchangeItems")
      .doc(id)
      .update({
        userName: userName,
        userPhone: userPhone,
        userAddress: userAddress,
        YYYY: YYYY,
        MM: MM,
        DD: DD,
        exchangeHour: hour,
        exchangeMin: min,
        exchangeName: item.exchangeName,
        exchangeInfo: item.exchangeInfo,
        itemSize: item.itemSize,
        itemImg: item.itemImg,
        itemName: item.itemName,
        owner: item.owner,
        name: item.name,
        exchangeTime: firebase.firestore.Timestamp.now(),
        status: "done",
      });

    firebase
      .firestore()
      .collection("users")
      .doc(item.owner)
      .collection("items")
      .doc(id)
      .update({
        status: "done",
      });
    console.log("status done");
  };

  return (
    <div>
      <Header />
      <Main style={{ fontFamily: "Chilanka" }}>
        {allItems.map((item, i) => {
          return (
            <EachBox key={i}>
              <ImgBox>
                <img
                  src={item.data.itemImg}
                  alt="exchange item"
                  style={{ width: "100%", height: "100%" }}
                />
              </ImgBox>
              <DetailBox>
                <div style={{ marginBottom: "5px", fontWeight: "700" }}>
                  NAME：{item.data.exchangeName}
                </div>
                <div style={{ marginBottom: "5px", fontWeight: "700" }}>
                  SIZE：{item.data.itemSize}
                </div>
              </DetailBox>

              {item.data.owner !== isUser.email ? (
                <StyledPopup modal trigger={<button>點我看更多</button>}>
                  {(close) => (
                    <Backdrop>
                      {/* <InfoBG /> */}
                      <ItemInfo>
                        <ImgDiv>
                          <img
                            src={item.data.itemImg}
                            alt="exchange item"
                            style={{ height: "100%" }}
                          />
                        </ImgDiv>
                        <Div>
                          <Span>主人叫做：{item.data.name}</Span>
                        </Div>
                        <Div>
                          <Span>尺寸：{item.data.itemSize}</Span>
                        </Div>
                        <Div>
                          <Span>你要交換的是：{item.data.exchangeName}</Span>
                        </Div>
                        <Div>
                          <Span>自我介紹：{item.data.exchangeInfo}</Span>
                        </Div>
                      </ItemInfo>
                      <ItemForm>
                        <FormTitle>我想要它</FormTitle>
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
                            placeholder="09"
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
                            style={{ color: "gray" }}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                          />
                        </Div>

                        <Div>
                          <Span>希望交換時間：</Span>
                          <input
                            type="time"
                            style={{ color: "gray" }}
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                          />
                        </Div>

                        <Div>
                          <Submitbtn
                            type="submit"
                            onClick={(e) => sumbitForm(e, item.data, item.id)}
                          >
                            好了！
                          </Submitbtn>
                        </Div>
                      </ItemForm>
                    </Backdrop>
                  )}
                </StyledPopup>
              ) : (
                <StyledPopup modal trigger={<button>查看</button>}>
                  {(close) => (
                    <Backdrop>
                      {/* <InfoBG /> */}
                      <ItemInfo>
                        <ImgDiv>
                          <img
                            src={item.data.itemImg}
                            alt="exchange item"
                            style={{ height: "100%" }}
                          />
                        </ImgDiv>
                        <Div>
                          <Span>我交換出去的是：{item.data.exchangeName}</Span>
                        </Div>
                        <Div>
                          <Span>
                            它の尺寸：
                            {item.data.itemSize}
                          </Span>
                        </Div>

                        <Div>
                          <Span>
                            它の自我介紹：
                            {item.data.exchangeInfo}
                          </Span>
                        </Div>
                      </ItemInfo>
                    </Backdrop>
                  )}
                </StyledPopup>
              )}
            </EachBox>
          );
        })}
      </Main>
    </div>
  );
};

export default FindNewDress;
