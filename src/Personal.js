import React, { useEffect, useState } from "react";
import Header from "./Landing_Page/Header";
import styled from "styled-components";
import Pic from "./img/Pic.png";
import firebase from "./utils/firebase";
import Popup from "reactjs-popup";
import WebFont from "webfontloader";
import "firebase/auth";
import { useHistory } from "react-router-dom";
import Expense from "./Personal/Expense";

const Main = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 115px 30px 0 30px;
  font-family: "Chilanka";
  @media screen and (max-width: 1250px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Section1 = styled.div`
  display: flex;
  margin-top: 20px;
`;

const ProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #31342dd6;

  /* background-color: #f3d5ca; */
`;

const ProfileImg = styled.div`
  width: 120px;
  height: 120px;
  border: 1px solid black;
`;

const Button = styled.div`
  background-color: #f3d5ca;
  text-align: center;
  line-height: 1.6em;
  color: #31342d5c;
  cursor: pointer;
  width: 65% !important;
  border-radius: 15px;
  margin: 8px auto 3px auto;
  padding: auto 5px;
  font-size: 15px;
  font-weight: 600;
  &:hover {
    transform: scale(1.2) !important;
    background-color: #ffdd759e;
  }
`;

const UserInfo = styled.div`
  margin: 10px auto 5px;
  font-weight: 700;
`;

const ExchangeSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  position: relative;
`;

const ExchangeDiv = styled.div`
  display: flex;
  margin-left: 20px;
  width: 530px;
  height: 230px;
  background-color: #f5d1c36e;
  padding: 15px;
  @media screen and (max-width: 1250px) {
    width: 575px;
  }
`;

const ExchangeTitle = styled.div`
  margin: 20px;
  position: absolute;
  top: -45px;
  left: 10px;
  background-color: #edc4b4c7;
  color: #31342d5c;
  padding: 10px 12px 5px 5px;
  transform: rotate(2.8deg);
`;

const ExchangeItem = styled.div`
  box-shadow: 0 1px 8px 0 rgb(34 36 38 / 18%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 160px;
  margin: 18px 10px;
  padding: 10px;
  background: white;
`;

const ClosetSection = styled.div`
  position: relative;
  margin-top: 50px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;

const ClosetTitle = styled.div`
  margin: 20px;
  position: absolute;
  top: -45px;
  left: 10px;
  background-color: #84a9b191;
  color: #6696a1;
  padding: 10px 12px 5px 5px;
  transform: rotate(-4.8deg);
`;

const ClosetDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0px 10px;
  width: 680px;
  padding: 15px;
  min-height: 230px;
  background-color: #aab8bb6e;
  @media screen and (max-width: 1250px) {
    grid-template-columns: repeat(4, 1fr);
    width: 720px;
  }
`;

const ClosetItem = styled.div`
  box-shadow: 0 1px 8px 0 rgb(34 36 38 / 18%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  background: white;
  padding: 10px;
  position: relative;
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

const PendingDiv = styled.div`
  position: absolute;
  bottom: 88px;
  text-align: center;
  background-color: #7ecb8180;
  color: #424e42bf;
  width: 107%;
  height: 1.9rem;
  font-weight: 800;
  transform: rotate(-2.8deg);
`;

const DoneDiv = styled(PendingDiv)`
  background-color: #cd8c87b3;
`;

const NewHomeBtn = styled.div`
  position: absolute;
  right: -10px;
  bottom: 5px;
  background-color: #aacdd596;
  color: #6696a1;
  cursor: pointer;
  font-size: 14px;
  padding: 5px 16px 5px 22px;
  transform: rotate(1.8deg);
  &:hover {
    transform: scale(1.2) !important;
    transform: rotate(1.8deg);
    background-color: #fb84555e;
    color: #31342d5c;
  }
`;

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
`;

const ItemForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: snow; */
`;

const FormTitle = styled.div`
  margin-bottom: 15px;
  color: #768891f0;
  border-bottom: 5px solid #768891a1;
  font-weight: bold;
`;

const ImgPopup = styled.div`
  box-shadow: 0 0.2rem 1.2rem rgb(0 0 0 / 20%);
  margin-bottom: 15px;
  width: 80%;
  display: flex;
  justify-content: center;
  /* align-items: center; */
`;

const Div = styled.div`
  margin-bottom: 8px;
`;

const Span = styled.div`
  color: #3f484cc2;
  font-weight: 500;
  font-size: 13px;
`;

const Submitbtn = styled.div`
  background-color: #d4e4ebc9;
  text-align: center;
  line-height: 1.6em;
  color: #31342d5c;
  cursor: pointer;
  margin: 0 auto;
  font-size: 13px;
  font-weight: 900;
  border-radius: 15px;
  &:hover {
    transform: scale(1.2) !important;
  }
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

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 50px;
`;

const Personal = () => {
  const [itemsCollection, setItemsCollection] = useState([]);
  const [exchangeDone, setExchangeDone] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUseremail] = useState("");
  const [exchangeName, setExchangeName] = useState("");
  const [exchangeInfo, setExchangeInfo] = useState("");
  const history = useHistory();
  const [isUser, setIsUser] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isDone, setIsDone] = useState(false);

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
        .get()
        .then((doc) => {
          if (isMounted) {
            setUserName(doc.data().name);
            setUseremail(doc.data().email);
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
              return doc.data();
            })
            .filter(
              (data) => data.status === "done" && data.owner !== isUser.email
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

  const sumbitExchange = (e, item, id) => {
    const exchangeItem = firebase
      .firestore()
      .collection("users")
      .doc(isUser.email)
      .collection("exchangeItems")
      .doc(id);

    const items = firebase
      .firestore()
      .collection("users")
      .doc(isUser.email)
      .collection("items")
      .doc(id);

    exchangeItem.set({
      exchangeName: exchangeName,
      exchangeInfo: exchangeInfo,
      itemSize: item.data.itemSize,
      itemImg: item.data.itemImg,
      itemName: item.data.itemName,
      owner: item.data.owner,
      name: item.data.name,
      exchangeTime: firebase.firestore.Timestamp.now(),
      status: "pending",
    });
    items.update({
      status: "pending",
    });
    setIsPending(true);
  };

  // const deleteExchangeItem = (item, id) => {
  //   const itemDoc = firebase
  //     .firestore()
  //     .collection("users")
  //     .doc(isUser.email)
  //     .collection("items")
  //     .doc(id);
  //   let ref = firebase.storage().ref("itemImages/" + itemDoc.id);

  //   ref
  //     .delete()
  //     .then(() => {
  //       firebase
  //         .firestore()
  //         .collection("users")
  //         .doc(isUser.email)
  //         .collection("exchangeItems")
  //         .doc(id)
  //         .delete()
  //         .then(() => {
  //           itemDoc.delete();
  //         });
  //     })
  //     .then(() => {
  //       alert("刪除成功");
  //     });
  // };

  const deleteItem = (item, id) => {
    const itemDoc = firebase
      .firestore()
      .collection("users")
      .doc(isUser.email)
      .collection("items")
      .doc(id);
    let ref = firebase.storage().ref("itemImages/" + itemDoc.id);

    ref
      .delete()
      .then(() => {
        firebase
          .firestore()
          .collection("users")
          .doc(isUser.email)
          .collection("exchangeItems")
          .doc(id)
          .delete()
          .then(() => {
            itemDoc.delete();
          });
      })
      .then(() => {
        alert("刪除成功");
      });
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push("/");
      });
  };

  return (
    <div>
      <Header />
      <Main>
        <LeftDiv>
          <Section1>
            <ProfileDiv>
              <ProfileImg>
                <img
                  src={Pic}
                  alt="pic"
                  style={{ width: "100%", height: "100%" }}
                />
              </ProfileImg>
              <UserInfo>Hi, {userName}</UserInfo>
              <UserInfo>{userEmail}</UserInfo>
              <Button onClick={() => signOut()}>Log Out</Button>
            </ProfileDiv>
            <ExchangeSection>
              <ExchangeTitle>交換來的衣服</ExchangeTitle>
              <ExchangeDiv>
                {exchangeDone.map((item, i) => (
                  <ExchangeItem key={i}>
                    <img
                      src={item.itemImg}
                      alt="exchange-item"
                      style={{ height: "140px" }}
                    />
                  </ExchangeItem>
                ))}
              </ExchangeDiv>
            </ExchangeSection>
          </Section1>
          <ClosetSection>
            <ClosetTitle>我的衣櫥</ClosetTitle>
            <ClosetDiv>
              {itemsCollection.map((item, e) => (
                <ClosetItem key={e}>
                  <DeleteBtn
                    onClick={() => {
                      deleteItem(item, item.id);
                    }}
                  >
                    X
                  </DeleteBtn>
                  {item.data.status === "pending" ? (
                    <PendingDiv>交換ing</PendingDiv>
                  ) : (
                    <></>
                  )}
                  {item.data.status === "done" ? (
                    <DoneDiv>有人認領走囉！</DoneDiv>
                  ) : (
                    <></>
                  )}

                  <img
                    src={item.data.itemImg}
                    alt="OOTD"
                    style={{
                      marginBottom: "32px",
                      maxHeight: "140px",
                    }}
                  />
                  {item.data.status === "none" ? (
                    <StyledPopup
                      modal
                      trigger={<NewHomeBtn>幫它找新家</NewHomeBtn>}
                    >
                      {(close) => (
                        <Backdrop>
                          <ItemForm>
                            <FormTitle>我想送出</FormTitle>

                            <ImgPopup>
                              <img
                                src={item.data.itemImg}
                                alt="exchange-item"
                                style={{
                                  margin: "12px auto",
                                  maxHeight: "120px",
                                }}
                              />
                            </ImgPopup>
                            <div>
                              <Div>
                                <Span>原本的名稱： {item.data.itemName}</Span>
                              </Div>
                              <Div>
                                <Span>尺寸： {item.data.itemSize}</Span>
                              </Div>
                              <Div>
                                <div style={{ display: "flex" }}>
                                  <Span>取個新名稱吧</Span>
                                  <NameBtn
                                    onClick={() => {
                                      setExchangeName(item.data.itemName);
                                    }}
                                  >
                                    用原本名稱
                                  </NameBtn>
                                </div>
                                <input
                                  type="text"
                                  value={exchangeName}
                                  onChange={(e) =>
                                    setExchangeName(e.target.value)
                                  }
                                  placeholder="幫衣服換名字"
                                />
                              </Div>

                              <Div>
                                <Span>簡介：</Span>
                                <textarea
                                  value={exchangeInfo}
                                  style={{ height: "70px" }}
                                  onChange={(e) =>
                                    setExchangeInfo(e.target.value)
                                  }
                                  placeholder="幫衣服做個自我介紹吧 :)"
                                />
                              </Div>
                            </div>
                            <Div>
                              <Submitbtn
                                type="submit"
                                onClick={(e) => {
                                  sumbitExchange(e, item, item.id);
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
                    <></>
                  )}
                </ClosetItem>
              ))}
            </ClosetDiv>
          </ClosetSection>
        </LeftDiv>
        <Expense />
      </Main>
    </div>
  );
};

export default Personal;
