import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Popup from "reactjs-popup";
import { ImgDiv, ItemForm } from "../Style/PopupCSS";
import { Div, Span } from "../Style/PersonalCSS";
import "firebase/firestore";
import "firebase/storage";
import { useSelector } from "react-redux";
import { SaveTitleToDairy, handleSaveBtn } from "../utils/firebaseFunc";

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f3d19e57;
  display: flex;
  justify-content: center;
  border-radius: 25px;
`;

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
const SubmitBtn = styled.div`
  background-color: #d4e4eb;
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
    background-color: #f3d5ca;
  }
`;

const SaveBtn = () => {
  const isUser = useSelector((state) => state.user);
  const [outfitName, setOutfitName] = useState("");
  const [outfitSeason, setOutfitSeason] = useState("");
  const [account, setAccount] = useState("");

  useEffect(() => {
    let unsubscribe;

    if (isUser !== null) {
      unsubscribe = SaveTitleToDairy(isUser, setAccount);
    }
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [isUser]);

  return (
    <StyledPopup modal trigger={<button>儲存</button>}>
      {(close) => (
        <Backdrop>
          <ItemForm>
            <ImgDiv>
              <img alt="outfit item" style={{ height: "100%" }} />
            </ImgDiv>
            <Div>
              <Span>想個主題</Span>
              <input
                type="text"
                value={outfitName}
                onChange={(e) => setOutfitName(e.target.value)}
              ></input>
            </Div>
            <Div>
              <Span>類別：</Span>

              <select
                value={outfitSeason}
                onChange={(e) => setOutfitSeason(e.target.value)}
              >
                <option value="selectSeason">適合季節</option>
                <option value="spring">春天</option>
                <option value="summer">夏天</option>
                <option value="fall">秋天</option>
                <option value="winter">冬天</option>
              </select>
            </Div>
            <Div>
              <SubmitBtn
                onClick={(e) => {
                  handleSaveBtn(e, isUser, outfitName, outfitSeason, account);
                  close();
                }}
              >
                好了
              </SubmitBtn>
            </Div>
          </ItemForm>
        </Backdrop>
      )}
    </StyledPopup>
  );
};

export default SaveBtn;
