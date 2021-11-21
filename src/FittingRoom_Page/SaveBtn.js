import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Popup from "reactjs-popup";
import { ImgDiv, ItemForm } from "../CSS/PopupCSS";
import { Div, Span } from "../CSS/PersonalCSS";
import firebase from "../utils/firebase";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

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
  const [isUser, setIsUser] = useState(null);
  const [outfitName, setOutfitName] = useState("");
  const [outfitSeason, setOutfitSeason] = useState("");
  const [account, setAccount] = useState("");
  const [diaryURL, setDiaryURL] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsUser(user);
      }
    });
  }, [isUser]);

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
            setAccount(doc.data().name);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [isUser]);

  const handleSave = (e) => {
    const item = firebase
      .firestore()
      .collection("users")
      .doc(isUser.email)
      .collection("items")
      .doc();
    let canvas = document.getElementById("canvas");
    let dataUrl = canvas.toDataURL();
    let ref = firebase.storage().ref("diaryImages/" + item.id); //傳入filebase的路徑位置

    ref.putString(dataUrl, "data_url").then((snapshot) => {
      ref.getDownloadURL().then((diaryUrl) => {
        setDiaryURL(diaryUrl);

        firebase
          .firestore()
          .collection("users")
          .doc(isUser.email)
          .collection("outfits")
          .doc(item.id)
          .set({
            outfitName: outfitName, //讓使用者取名？
            outfitImg: diaryUrl,
            outfitSeason: outfitSeason,
            YYYY: new Date().getFullYear(),
            MM: new Date().getMonth() + 1,
            DD: new Date().getDate(),
            outfitTime: firebase.firestore.Timestamp.now(),
            owner: isUser.email,
            name: account,
          });

        console.log(new Date());
      });
    });
  };
  return (
    <StyledPopup modal trigger={<button>儲存</button>}>
      {(close) => (
        <Backdrop>
          <ItemForm>
            <ImgDiv>
              <img
                // src={diaryURL}
                alt="outfit item"
                style={{ height: "100%" }}
              />
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
                  handleSave(e);
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
