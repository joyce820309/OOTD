import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Popup from "reactjs-popup";
import "firebase/firestore";
import "firebase/storage";
import firebase from "./utils/firebase";
import WebFont from "webfontloader";
import "firebase/auth";
import "firebase/auth";
import { ItemInfo, ImgDiv, ItemForm } from "./CSS/PopupCSS";
import { FormTitle } from "./CSS/CommonCSS";
import Loading from "./CSS/LoadingCSS";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2/dist/sweetalert2.js";

//需要show出所有會員交換的衣服

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }
  &-content {
    margin: auto;
    background: rgb(255, 255, 255);
    width: 700px;
    display: flex;
    height: 550px;
    border-radius: 25px;
  }
`;

const CheckPopup = styled(StyledPopup)`
  &-content {
    width: 400px;
    height: 500px;
  }
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  background-color: #aebabf57;
  display: flex;
  justify-content: space-evenly;
  position: relative;
  border-radius: 25px;
`;

const Input = styled.input`
  background-color: #cddbe16e;
`;

const Div = styled.div`
  margin: 5px auto;
  font-family: Chilanka;
`;
const Span = styled.span`
  color: #3f484cc2;
  font-weight: 600;
  font-size: 0.8rem;
`;

const CheckSpan = styled.span`
  font-weight: 700;
  font-size: 0.9rem;
  color: #3f484ca3;
  background-color: #e5c07366;
  border-radius: 8px;
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

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 40px;
  margin: 0 auto;
  padding: 40px;
  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 40px;
  }
  @media screen and (max-width: 532px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 30px 30px;
  }
`;

const EachBox = styled.div`
  background: #fff;
  padding: 1rem;
  box-shadow: 0 0.2rem 1.2rem rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  @media screen and (max-width: 1100px) {
    padding: 0.5rem;
  }
`;
const ImgBox = styled.div`
  height: 260px;
  margin-bottom: 15px;
  padding: 5px;
  display: flex;
  justify-content: center;
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
  align-items: center;
  margin-bottom: 8px;
  background-color: #b8d5db5c;
  color: #39474ab8;
  padding: 5px 16px;
  width: 100%;
`;

const Detail = styled.div`
  font-size: 1rem;
  text-align: center;
  line-height: 2em;
  font-weight: 700;
  color: #6e7f83b5;
  letter-spacing: 0.2rem;
  @media screen and (max-width: 350px) {
    font-size: 0.6rem;
    line-height: 1.5em;
  }
`;

const Button = styled.div`
  background-color: #a9dbe596;
  text-align: center;
  line-height: 1.6rem;
  color: #31342d5c;
  cursor: pointer;
  border-radius: 5px;
  margin: 8px auto 3px auto;
  padding: 3px 10px;
  font-size: 1rem;
  font-weight: 600;
  &:hover {
    transform: scale(1.2) !important;
    background-color: #ffdd759e;
  }
  @media screen and (max-width: 350px) {
    font-size: 0.6rem;
    line-height: 1.5em;
  }
`;

const FindNewDress = () => {
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [isUser, setIsUser] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [time, setTime] = useState("");
  const YYYY = date.toLocaleString().slice(0, 4);
  const MM = date.toLocaleString().slice(5, 7);
  const DD = date.toLocaleString().slice(8, 10);
  const HHMM = date.toLocaleString().slice(11, 17);

  console.log(date.toLocaleString());
  console.log(YYYY, MM, DD, HHMM);

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
        setLoading(false);
      });
  }, [isUser]);

  const sumbitForm = (e, item, id) => {
    firebase
      .firestore()
      .collection("users")
      .doc(isUser.email)
      .collection("exchangeItems")
      .doc(id)
      .set({
        userName: userName,
        userPhone: userPhone,
        userAddress: userAddress,
        YYYY: YYYY,
        MM: MM,
        DD: DD,
        HHMM: HHMM,
        // message: message,
        newOwner: isUser.email,
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

    firebase
      .firestore()
      .collection("users")
      .doc(item.owner)
      .collection("exchangeItems")
      .doc(id)
      .update({
        status: "done",
        newOwner: isUser.email,
        userName: userName,
        userPhone: userPhone,
        userAddress: userAddress,
        YYYY: YYYY,
        MM: MM,
        DD: DD,
        HHMM: HHMM,
        read: false,
        // message: message,
      });
  };

  return (
    <div style={{ fontFamily: "Chilanka" }}>
      <Container>
        {allItems.map((item, i) => {
          return (
            <EachBox key={i}>
              <ImgBox>
                {loading ? (
                  <Loading />
                ) : (
                  <img
                    src={item.data.itemImg}
                    alt="exchange item"
                    style={{ objectFit: "contain", width: "100%" }}
                  />
                )}
              </ImgBox>
              <DetailBox>
                <Detail style={{ marginBottom: "5px", fontWeight: "700" }}>
                  NAME：{item.data.exchangeName}
                </Detail>
                <Detail style={{ marginBottom: "5px", fontWeight: "700" }}>
                  SIZE：{item.data.itemSize}
                </Detail>
              </DetailBox>

              {item.data.owner !== isUser.email ? (
                <StyledPopup modal trigger={<Button>點我看更多</Button>}>
                  {(close) => (
                    <Backdrop>
                      <ItemInfo>
                        <ImgDiv>
                          <img
                            src={item.data.itemImg}
                            alt="exchange item"
                            style={{ height: "100%" }}
                          />
                        </ImgDiv>
                        <Div>
                          <CheckSpan>主人叫做：{item.data.name}</CheckSpan>
                        </Div>
                        <Div>
                          <CheckSpan>尺寸：{item.data.itemSize}</CheckSpan>
                        </Div>
                        <Div>
                          <CheckSpan>
                            你要交換的是：{item.data.exchangeName}
                          </CheckSpan>
                        </Div>
                        <Div>
                          <CheckSpan>
                            自我介紹：{item.data.exchangeInfo}
                          </CheckSpan>
                        </Div>
                      </ItemInfo>
                      <ItemForm>
                        <FormTitle>我想要它</FormTitle>
                        <Div>
                          <Span>你的真名：</Span>
                          <Input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                          />
                        </Div>

                        <Div>
                          <Span>手機號碼：</Span>
                          <Input
                            type="text"
                            value={userPhone}
                            onChange={(e) => setUserPhone(e.target.value)}
                          />
                        </Div>

                        <Div>
                          <Span>希望交換地址：</Span>
                          <Input
                            type="text"
                            value={userAddress}
                            onChange={(e) => setUserAddress(e.target.value)}
                          />
                        </Div>

                        <Div>
                          <Span>希望交換時間：</Span>

                          <DatePicker
                            timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy h:mm aa"
                            showTimeInput
                            selected={date}
                            onChange={(e) => setDate(e)}
                            minDate={new Date()}
                          />
                        </Div>

                        <Div>
                          <Submitbtn
                            type="submit"
                            onClick={(e) => {
                              sumbitForm(e, item.data, item.id);
                              close();
                            }}
                          >
                            好了！
                          </Submitbtn>
                        </Div>
                      </ItemForm>
                    </Backdrop>
                  )}
                </StyledPopup>
              ) : (
                <CheckPopup modal trigger={<Button>查看</Button>}>
                  {(close) => (
                    <Backdrop>
                      <ItemInfo>
                        <ImgDiv style={{ marginBottom: "18px" }}>
                          <img
                            src={item.data.itemImg}
                            alt="exchange item"
                            style={{ height: "100%" }}
                          />
                        </ImgDiv>
                        <div>
                          <Div>
                            <CheckSpan>
                              我交換出去的是：{item.data.exchangeName}
                            </CheckSpan>
                          </Div>
                          <Div>
                            <CheckSpan>
                              它の尺寸：
                              {item.data.itemSize}
                            </CheckSpan>
                          </Div>

                          <Div>
                            <CheckSpan>
                              它の自我介紹：
                              {item.data.exchangeInfo}
                            </CheckSpan>
                          </Div>
                        </div>
                      </ItemInfo>
                    </Backdrop>
                  )}
                </CheckPopup>
              )}
            </EachBox>
          );
        })}
      </Container>
    </div>
  );
};

export default FindNewDress;
