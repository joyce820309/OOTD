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
    if (userName === "" || userPhone === "" || userAddress === "") {
      Toast.fire({
        icon: "warning",
        title: "?????????????????????????????????",
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
                    SIZE???{item.data.itemSize}
                  </Detail>
                </DetailBox>

                {item.data.owner !== isUser.email ? (
                  <StyledPopup modal trigger={<Button>???????????????</Button>}>
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
                            <CheckSpan>???????????????{item.data.name}</CheckSpan>
                          </Div>
                          <Div>
                            <CheckSpan>?????????{item.data.itemSize}</CheckSpan>
                          </Div>
                          <Div>
                            <CheckSpan>
                              ?????????????????????{item.data.exchangeName}
                            </CheckSpan>
                          </Div>
                          <Div>
                            <CheckSpan>
                              ???????????????{item.data.exchangeInfo}
                            </CheckSpan>
                          </Div>
                        </ItemInfo>
                        <ItemForm>
                          <FormTitle>????????????</FormTitle>
                          <Div>
                            <Span>???????????????</Span>
                            <Input
                              type="text"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                            />
                          </Div>

                          <Div>
                            <Span>???????????????</Span>
                            <Input
                              type="text"
                              value={userPhone}
                              onChange={(e) => setUserPhone(e.target.value)}
                            />
                          </Div>

                          <Div>
                            <Span>?????????????????????</Span>
                            <Input
                              type="text"
                              value={userAddress}
                              onChange={(e) => setUserAddress(e.target.value)}
                            />
                          </Div>

                          <Div>
                            <Span style={{ marginLeft: "80px" }}>
                              ?????????????????????
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
                              ?????????
                            </Submitbtn>
                          </Div>
                        </ItemForm>
                      </Backdrop>
                    )}
                  </StyledPopup>
                ) : (
                  <CheckPopup modal trigger={<Button>??????</Button>}>
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
                                ????????????????????????{item.data.exchangeName}
                              </CheckSpan>
                            </Div>
                            <Div>
                              <CheckSpan>
                                ???????????????
                                {item.data.itemSize}
                              </CheckSpan>
                            </Div>

                            <Div>
                              <CheckSpan>
                                ?????????????????????
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
