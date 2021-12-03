import React, { useEffect, useState } from "react";
import firebase from "../utils/firebase";
import WebFont from "webfontloader";
import "firebase/auth";
import { EmptyDiv } from "../CSS/FittingCSS";
import {
  Div,
  Span,
  DeleteBtn,
  OKBtn,
  FormTitle,
  CheckSpan,
  Textarea,
  Input,
} from "../CSS/CommonCSS";
import { ImgDiv } from "../CSS/PopupCSS";
import Swal from "sweetalert2";
import Loading from "../CSS/LoadingCSS";

import {
  ClosetContainer,
  ClosetItem,
  PendingDiv,
  DoneDiv,
  NewHomeBtn,
  NameBtn,
  Submitbtn,
  StyledPopup,
  PendingPopup,
  DonePopup,
  Backdrop,
  ImgPopup,
  ItemForm,
  EditBtn,
  EmptyContainer,
} from "../CSS/PersonalCSS";

const MyCloset = () => {
  const [exchangeName, setExchangeName] = useState("");
  const [exchangeInfo, setExchangeInfo] = useState("");
  const [allExchange, setAllExchange] = useState([]);
  const [isUser, setIsUser] = useState(null);
  const [itemsCollection, setItemsCollection] = useState([]);
  const [exchangeCollection, setExchangeCollection] = useState([]);
  const [findId, setFindId] = useState("");
  const [editName, setEditName] = useState(false);
  const [editSize, setEditSize] = useState(false);
  const [editInfo, setEditInfo] = useState(false);
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [info, setInfo] = useState("");

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
        .collectionGroup("exchangeItems")
        .onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => {
            return doc.data();
          });

          if (isMounted) {
            setAllExchange(data);
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
        .doc(isUser.email)
        .collection("exchangeItems")
        .onSnapshot((snapshot) => {
          console.log(findId);

          const data = snapshot.docs
            .map((doc) => {
              return { data: doc.data(), id: doc.id };
            })
            .filter((doc) => {
              return findId === doc.id;
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
  }, [isUser, findId]);

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
    items
      .update({
        status: "pending",
      })
      .then(() => {
        Toast.fire({
          icon: "warning",
          title: "提交成功!！",
        });
      });
  };

  const updateName = (e, item, id) => {
    firebase
      .firestore()
      .collection("users")
      .doc(isUser.email)
      .collection("exchangeItems")
      .doc(id)
      .update({
        exchangeName: name,
      });
    setEditName(false);
  };

  const updateSize = (e, item, id) => {
    firebase
      .firestore()
      .collection("users")
      .doc(isUser.email)
      .collection("exchangeItems")
      .doc(id)
      .update({
        itemSize: size,
      });
    setEditSize(false);
  };

  const updateInfo = (e, item, id) => {
    firebase
      .firestore()
      .collection("users")
      .doc(isUser.email)
      .collection("exchangeItems")
      .doc(id)
      .update({
        exchangeInfo: info,
      });
    setEditInfo(false);
  };

  const deleteItem = (item, id) => {
    const itemDoc = firebase
      .firestore()
      .collection("users")
      .doc(isUser.email)
      .collection("items")
      .doc(id);
    let ref = firebase.storage().ref("itemImages/" + itemDoc.id);

    firebase
      .firestore()
      .collection("users")
      .doc(isUser.email)
      .collection("exchangeItems")
      .doc(id)
      .delete();

    firebase
      .firestore()
      .collection("users")
      .doc(isUser.email)
      .collection("items")
      .doc(id)
      .delete()
      .then(() => {
        if (!allExchange.map((obj) => obj.itemImg).includes(item.itemImg)) {
          ref.delete();
        }
        Toast.fire({
          icon: "warning",
          title: "刪除成功!!",
        });
      });
  };

  return (
    <ClosetContainer style={{ fontFamily: "Chilanka" }}>
      {itemsCollection.length === 0 ? (
        <EmptyContainer>
          <EmptyDiv
            style={{ padding: "15px", borderBottom: "4px #bdc5c9 solid" }}
          >
            衣櫥裡還沒有衣服唷！快去更衣室新增衣服吧！
          </EmptyDiv>
        </EmptyContainer>
      ) : (
        <>
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
                <PendingPopup
                  onOpen={() => {
                    setFindId(item.id);
                  }}
                  modal
                  trigger={<PendingDiv>交換ing</PendingDiv>}
                >
                  {(close) => (
                    <Backdrop style={{ fontFamily: "Chilanka" }}>
                      <ItemForm>
                        <FormTitle style={{ marginBottom: "20px" }}>
                          交換中
                        </FormTitle>

                        <ImgDiv>
                          <img
                            src={item.data.itemImg}
                            alt="exchange item"
                            style={{ height: "100%" }}
                          />
                        </ImgDiv>

                        {exchangeCollection.map((exchangeItem, i) => (
                          <>
                            {editName ? (
                              <Div key={i}>
                                <Span>
                                  我交換出去的是：
                                  <input
                                    type="text"
                                    placeholder={exchangeItem.data.exchangeName}
                                    onChange={(e) => setName(e.target.value)}
                                    style={{ margin: "8px 10px 10px 0" }}
                                  />
                                  <OKBtn
                                    onClick={(e) =>
                                      updateName(e, item, item.id)
                                    }
                                  >
                                    好了
                                  </OKBtn>
                                </Span>
                              </Div>
                            ) : (
                              <Div style={{ display: "flex" }}>
                                <CheckSpan>
                                  我交換出去的是：
                                  {exchangeItem.data.exchangeName}
                                </CheckSpan>
                                <EditBtn
                                  onClick={() => {
                                    setEditName(true);
                                  }}
                                >
                                  編輯
                                </EditBtn>
                              </Div>
                            )}

                            {editSize ? (
                              <Div key={i}>
                                <Span>
                                  它の尺寸：{exchangeItem.data.itemSize}
                                  <select
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                  >
                                    <option>選一個</option>
                                    <option value="XXS">XXS</option>
                                    <option value="XS">XS</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                  </select>
                                </Span>
                                <OKBtn
                                  onClick={(e) => updateSize(e, item, item.id)}
                                >
                                  好了
                                </OKBtn>
                              </Div>
                            ) : (
                              <Div>
                                <CheckSpan>
                                  它の尺寸：{exchangeItem.data.itemSize}
                                </CheckSpan>
                                <EditBtn
                                  onClick={() => {
                                    setEditSize(true);
                                  }}
                                >
                                  編輯
                                </EditBtn>
                              </Div>
                            )}

                            {editInfo ? (
                              <Div
                                key={i}
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <Span>
                                  它の自我介紹：
                                  <OKBtn
                                    onClick={(e) =>
                                      updateInfo(e, item, item.id)
                                    }
                                  >
                                    好了
                                  </OKBtn>
                                </Span>
                                <textarea
                                  value={info}
                                  style={{ margin: "8px 10px 10px 0" }}
                                  onChange={(e) => setInfo(e.target.value)}
                                  placeholder={exchangeItem.data.exchangeInfo}
                                />
                              </Div>
                            ) : (
                              <Div style={{ display: "flex" }}>
                                <CheckSpan>
                                  它の自我介紹：
                                  {exchangeItem.data.exchangeInfo}
                                </CheckSpan>
                                <EditBtn
                                  onClick={() => {
                                    setEditInfo(true);
                                  }}
                                >
                                  編輯
                                </EditBtn>
                              </Div>
                            )}
                          </>
                        ))}
                      </ItemForm>
                    </Backdrop>
                  )}
                </PendingPopup>
              ) : (
                <></>
              )}
              {item.data.status === "done" ? (
                <DonePopup
                  onOpen={() => {
                    setFindId(item.id);
                  }}
                  modal
                  trigger={<DoneDiv>有人認領走囉！</DoneDiv>}
                >
                  {(close) => (
                    <Backdrop>
                      <ItemForm>
                        <FormTitle style={{ marginBottom: "20px" }}>
                          交換完成
                        </FormTitle>

                        <ImgDiv>
                          <img
                            src={item.data.itemImg}
                            alt="exchange item"
                            style={{ height: "100%" }}
                          />
                        </ImgDiv>

                        {exchangeCollection.map((exchangeItem, i) => (
                          <>
                            <Div key={i}>
                              <CheckSpan>
                                新主人叫做：{exchangeItem.data.userName}
                              </CheckSpan>
                            </Div>
                            <Div>
                              <CheckSpan>
                                手機號碼：{exchangeItem.data.userPhone}
                              </CheckSpan>
                            </Div>
                            <Div>
                              <CheckSpan>
                                交換の日期：{exchangeItem.data.YYYY}年
                                {exchangeItem.data.MM}月{exchangeItem.data.DD}日
                              </CheckSpan>
                            </Div>
                            <Div>
                              <CheckSpan>
                                交換の時間：{exchangeItem.data.HHMM}
                              </CheckSpan>
                            </Div>
                            <Div>
                              <CheckSpan>
                                交換の地址：{exchangeItem.data.userAddress}
                              </CheckSpan>
                            </Div>
                          </>
                        ))}
                      </ItemForm>
                    </Backdrop>
                  )}
                </DonePopup>
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
                        <FormTitle style={{ marginBottom: "20px" }}>
                          我想送出
                        </FormTitle>
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            backgroundColor: "#aebabf57",
                            justifyContent: "center",
                          }}
                        >
                          <ImgPopup>
                            <img
                              src={item.data.itemImg}
                              alt="exchange-item"
                              style={{
                                height: "100%",
                              }}
                            />
                          </ImgPopup>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                            }}
                          >
                            <Div>
                              <CheckSpan>
                                原本的名稱： {item.data.itemName}
                              </CheckSpan>
                            </Div>
                            <Div>
                              <CheckSpan>尺寸： {item.data.itemSize}</CheckSpan>
                            </Div>
                          </div>
                        </div>

                        <div style={{ marginTop: "25px" }}>
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
                            <Input
                              style={{ backgroundColor: "#cddbe16e" }}
                              type="text"
                              value={exchangeName}
                              onChange={(e) => setExchangeName(e.target.value)}
                              placeholder="幫衣服換名字"
                            />
                          </Div>

                          <Div>
                            <Span>簡介：</Span>
                            <Textarea
                              value={exchangeInfo}
                              style={{
                                height: "70px",
                                width: "170px",
                                maxHeight: "70px",
                                maxWidth: "170px",
                                backgroundColor: "#cddbe16e",
                              }}
                              onChange={(e) => setExchangeInfo(e.target.value)}
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
        </>
      )}
    </ClosetContainer>
  );
};

export default MyCloset;
