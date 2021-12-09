import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Popup from "reactjs-popup";
import { useSelector } from "react-redux";
import { Div, Span, DeleteBtn } from "../Style/CommonCSS";
import { ItemInfo, ImgDiv } from "../Style/PopupCSS";
import Swal from "sweetalert2";
import { EmptyDiv } from "../Style/FittingCSS";
import { EachDiv, ExchangeContainer } from "../Style/PersonalCSS";
import {
  getAllItemCollection,
  getOthersItem,
  deleteExchangeItem,
} from "../utils/firebaseFunc";

const EmptyContainer = styled.div`
  width: 100%;
  padding-top: 60px;
  display: flex;
  justify-content: center;
`;

const ExchangeItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 18px 10px;
  padding: 10px;
  height: 140px;
  width: 150px;
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

const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Exchange = () => {
  const isUser = useSelector((state) => state.user);
  const [allItems, setAllItems] = useState([]);
  const [exchangeDone, setExchangeDone] = useState([]);

  useEffect(() => {
    let unsubscribe;
    if (isUser !== null) {
      unsubscribe = getAllItemCollection(setAllItems);
    }
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [isUser]);

  useEffect(() => {
    let unsubscribe;
    if (isUser !== null) {
      unsubscribe = getOthersItem(isUser, setExchangeDone);
    }
    return () => {
      unsubscribe && unsubscribe();
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

  return (
    <ExchangeContainer style={{ padding: "15px" }}>
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
                    deleteExchangeItem(
                      item.data,
                      item.id,
                      isUser,
                      allItems,
                      Toast
                    );
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
                        style={{
                          height: "100%",
                          width: "100%",
                          cursor: "pointer",
                        }}
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
