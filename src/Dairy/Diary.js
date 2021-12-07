import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Popup from "reactjs-popup";
import Loading from "../General/Loading";
import "firebase/firestore";
import Swal from "sweetalert2";
import { EmptyDiv } from "../Style/FittingCSS";
import { useSelector } from "react-redux";
import {
  setIntoOutfitCollection,
  deleteDairyItem,
} from "../utils/firebaseFunc";

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }
  &-content {
    margin: auto;
    background: rgb(255, 255, 255);
    width: 480px;
    display: flex;
    height: 530px;
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
  background-color: #aebabf57;
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

const EmptyContainer = styled.div`
  width: 100%;
  padding-top: 60px;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  /* width: 100%; */

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
  position: relative;
  width: 100%;
  height: 100%;
`;

const ImgBox = styled.div`
  max-height: 400px;
  margin-bottom: 15px;
  padding: 25px;
  cursor: pointer;
`;

const Img = styled.img`
  &:hover {
    transform: scale(1.1) !important;
    transition: all 0.35s;
  }
`;

const ContentImg = styled(ImgBox)`
  background-color: snow;
  height: 60%;
  box-shadow: 0 1px 8px 0 rgb(34 36 38 / 18%);
  border-radius: 5px;
  &:hover {
    transform: scale(1) !important;
  }
`;

const ContentTitle = styled.span`
  font-size: 1rem;
  text-align: center;
  margin-right: 8px;
  font-weight: 700;
  color: #576b74c2;
  background-color: #e5c07366;
  border-radius: 8px;
  @media screen and (max-width: 600px) {
    font-size: 0.8rem;
    line-height: 1.8em;
  }
`;

const Content = styled.span`
  color: #3f484cc2;
  font-weight: 800;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column-reverse;
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
  @media screen and (max-width: 350px) {
    font-size: 0.6rem;
    line-height: 1.5em;
  }
`;

const Diary = () => {
  const isUser = useSelector((state) => state.user);
  const [outfitCollection, setOutfitCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;
    if (isUser !== null) {
      unsubscribe = setIntoOutfitCollection(
        isUser,
        setLoading,
        setOutfitCollection
      );
    }
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [isUser]);

  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  return (
    <div
      style={{
        margin: "110px auto",
        height: "100%",
      }}
    >
      {loading ? (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Loading />
        </div>
      ) : (
        <>
          {outfitCollection.length === 0 ? (
            <EmptyContainer>
              <EmptyDiv
                style={{
                  padding: "13px",
                  borderBottom: "0.6rem #bdc5c9 solid",
                  fontSize: "1.6rem",
                }}
              >
                還沒有搭配過衣服唷！快前往更衣室穿搭吧！
              </EmptyDiv>
            </EmptyContainer>
          ) : (
            <Container>
              {outfitCollection.map((outfit, e) => (
                <EachBox key={e}>
                  <DeleteBtn
                    onClick={() => {
                      deleteDairyItem(outfit, outfit.id, isUser, Toast);
                    }}
                  >
                    X
                  </DeleteBtn>

                  <StyledPopup
                    modal
                    trigger={
                      <ImgBox>
                        <Img
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
                              style={{ maxWidth: "100%", maxHeight: "100%" }}
                            />
                          </ContentImg>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-start",
                            }}
                          >
                            <div
                              style={{ display: "flex", marginBottom: "9px" }}
                            >
                              <ContentTitle>穿搭主題：</ContentTitle>
                              <Content>{outfit.data.outfitName}</Content>
                            </div>
                            <div style={{ display: "flex" }}>
                              <ContentTitle>穿搭季節：</ContentTitle>
                              <Content>{outfit.data.outfitSeason}</Content>
                            </div>
                          </div>
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
          )}
        </>
      )}
    </div>
  );
};

export default Diary;
