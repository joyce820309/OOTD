import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "firebase/firestore";
import "firebase/storage";
import firebase from "../utils/firebase";
import "firebase/auth";
import { ItemInfo, ImgDiv, ItemForm } from "../Style/PopupCSS";
import { FormTitle } from "../Style/CommonCSS";
import Loading from "../General/Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {
  getNewExchangeItem,
  updateOwnerStatusToDone,
  updateNewOwnerInfoToOwner,
  redenAllPendingItems,
} from "../utils/firebaseFunc";
import {
  StyledPopup,
  CheckPopup,
  Backdrop,
  Input,
  Div,
  Span,
  CheckSpan,
  Submitbtn,
  Container,
  EachBox,
  Label,
  ImgBox,
  DetailBox,
  Detail,
  Button,
} from "../Style/FindNewDressCSS";

const FindNewDress = () => {
  const [selectDate, setSelectDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const isUser = useSelector((state) => state.user);
  const [allItems, setAllItems] = useState([]);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  const phoneRegular = /^[0]{1}[9]{1}[0-9]{8}/;


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

  useEffect(() => {
    setYear(selectDate.getFullYear());

    if (selectDate.getMonth() < 10) {
      setMonth("0" + selectDate.getMonth());
    } else {
      setMonth(selectDate.getMonth());
    }

    if (selectDate.getDate() < 10) {
      setDate("0" + selectDate.getDate());
    } else {
      setDate(selectDate.getDate());
    }

    if (selectDate.getHours() < 10) {
      setHour("0" + selectDate.getHours());
    } else {
      setHour(selectDate.getHours());
    }

    if (selectDate.getMinutes() < 10) {
      setMin("0" + selectDate.getMinutes());
    } else {
      setMin(selectDate.getMinutes());
    }
  }, [selectDate]);

  useEffect(() => {
    if (isUser !== null) {
      redenAllPendingItems(setAllItems, setLoading);
    }
  }, [isUser]);

  const sumbitForm = (e, item, id) => {

    if (
      userName === "" ||
      userPhone === "" ||
      e.target.value.match(!phoneRegular) ||
      userAddress === ""
    ) {
      Toast.fire({
        icon: "warning",
        title: "記得將表單填寫完整唷！",
      });
    } else {
      getNewExchangeItem(
        isUser,
        item,
        id,
        userName,
        userPhone,
        userAddress,
        year,
        month,
        date,
        hour,
        min
      );

      updateOwnerStatusToDone(item, id);
      updateNewOwnerInfoToOwner(
        isUser,
        item,
        id,
        userName,
        userPhone,
        userAddress,
        year,
        month,
        date,
        hour,
        min,
        Toast
      );
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {allItems.map((item, i) => {
            return (
              <EachBox key={i}>
                <Label></Label>
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
                    {item.data.exchangeName}
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
                            <Span style={{ marginLeft: "80px" }}>
                              希望交換時間：
                            </Span>

                            <DatePicker
                              timeInputLabel="Time:"
                              dateFormat="MM/dd/yyyy hh:mm aa"
                              showTimeInput
                              selected={selectDate}
                              onChange={(e) => setSelectDate(e)}
                              minDate={new Date()}
                            />
                          </Div>

                          <Div>
                            <Submitbtn
                              type="submit"
                              onClick={(e) => {
                                sumbitForm(e, item.data, item.id);

                                if (
                                  userName !== "" &&
                                  userPhone !== "" &&
                                  userAddress !== ""
                                ) {
                                  close();
                                }
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
      )}
    </div>
  );
};

export default FindNewDress;
