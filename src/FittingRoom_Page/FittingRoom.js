import React, { useState, useEffect, useRef } from "react";
import Header from "../Landing_Page/Header";
import styled from "styled-components";
import "../CSS/FittingRoom.css";
import { fabric } from "fabric";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import firebase from "../utils/firebase";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import WebFont from "webfontloader";
let movingImage;
let filePath;

const YellowBG = styled.div`
  background-color: #f3d19e57;
  position: absolute;
  width: 100%;
  height: 80%;
  top: 120px;
  z-index: -1;
`;

const Main = styled.div`
  margin: 115px auto 20px auto;
  max-width: 1200px;
`;

const Container = styled.div`
  display: flex;
  position: relative;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 90px;
`;

const AddBtn = styled.div`
  background-color: #a9dbe596;
  text-align: center;
  line-height: 1.6em;
  color: #31342d5c;
  cursor: pointer;
  border-radius: 50px;
  margin: 8px auto 3px auto;
  padding: 10px 18px;
  font-size: 18px;
  font-weight: 600;
  position: absolute;
  right: 32px;
  bottom: 29px;
  /* box-shadow: 1px -1px 10px 2px #91b8bdd6; */
  &:hover {
    transform: scale(1.2) !important;
    background-color: #f3d5ca;
  }
`;

const CanvasDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ClosetBox = styled.div`
  margin: 30px auto;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: white;
  box-shadow: 0px 2px 21px -2px rgba(182, 163, 163, 0.51);
  height: 630px;
  width: 800px;
  position: absolute;
  left: 450px;
  top: 10px;
`;

const ImgsetBox = styled.div`
  padding-left: 60px;
  padding-right: 60px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  height: 100%;
`;

const TagBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: -55px;
  top: 45px;
`;

const Tag = styled.div`
  margin-bottom: 10px;
  border-radius: 0 5px 5px 0;
  background-color: #aab8bbb8;
  padding: 4px 12px 4px 22px;
  color: #4b4e47;
  cursor: pointer;
  opacity: 0.8;
  font-size: 1rem;
  z-index: 0;
  &:hover {
    opacity: 1;
  }
`;

const Tag1 = styled(Tag)`
  background-color: #e5daa9bf;
  &:hover {
    background-color: #e5daa9;
  }
`;

const Tag2 = styled(Tag)`
  background-color: #a9e5d996;
  &:hover {
    background-color: #a9e5d9;
  }
`;

const Tag3 = styled(Tag)`
  background-color: #e5a9aa96;
  &:hover {
    background-color: #e5a9aa;
  }
`;

const Tag4 = styled(Tag)`
  background-color: #a9dbe5bf;
  &:hover {
    background-color: #a9dbe5;
  }
`;

const Tag5 = styled(Tag)`
  background-color: #b5a8bdb8;
  &:hover {
    background-color: #b5a8bd;
  }
`;

const ClosetTitleDiv = styled.div``;

const ClosetTitle = styled.div`
  margin-left: 70px;
  padding: 5px;
  border-radius: 5px;
`;

const ItemForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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

const Div = styled.div`
  margin: 5px auto;
`;
const Span = styled.span`
  color: #3f484cc2;
  font-weight: 500;
`;

const SaveBtn = styled.div`
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

const ImgDiv = styled.div`
  height: 120px;
  width: 120px;
  margin: 30px;
`;

const EmptyDiv = styled.div``;

const FittingRoom = () => {
  const [account, setAccount] = useState("");
  const history = useHistory();
  const [itemSize, setItemSize] = useState("");
  const [canvas, setCanvas] = useState({});
  const [price, setPrice] = useState(0);
  const [option, setOption] = useState("");
  const [itemName, setItemName] = useState("");
  const [date, setDate] = useState("");
  const [imgFile, setImgFile] = useState("");
  // const [imgURL, setImgURL] = useState("");
  const [diaryURL, setDiaryURL] = useState("");
  const [renderItems, setRenderItems] = useState([]);
  const [isUser, setIsUser] = useState(null);
  const [outfitName, setOutfitName] = useState("");
  const [outfitSeason, setOutfitSeason] = useState("");

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Droid Sans", "Chilanka"],
      },
    });
  }, []);

  useEffect(() => {
    const modified = { drop: dropImg };
    if (Object.keys(canvas).length) {
      canvas.on(modified);
    }

    return () => {
      if (Object.keys(canvas).length) {
        canvas.off(modified); //每次都要清掉才不會memory leak
      }
    };
  }, [canvas]);

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
          let arr = [];
          snapshot.forEach((doc) => {
            arr.push(doc.data().itemImg);
          });
          if (isMounted) {
            setRenderItems(arr);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [isUser]);

  const summitItem = () => {
    const YYYY = date.slice(0, 4);
    const MM = date.slice(5, 7);
    const DD = date.slice(8, 10);
    const item = firebase
      .firestore()
      .collection("users")
      .doc(isUser.email)
      .collection("items")
      .doc();

    // 透過 FileReader 將來讀取本地的圖片
    filePath = firebase.storage().ref("itemImages/" + item.id); //傳入filebase的路徑位置
    const file = imgFile.target.files[0];
    filePath.put(file, { contentType: file.type }).then(() => {
      filePath.getDownloadURL().then((imageUrl) => {
        item.set({
          itemExpense: price,
          itemName: itemName,
          YYYY: YYYY,
          MM: MM,
          DD: DD,
          itemImg: imageUrl,
          itemTag: option,
          itemSize: itemSize,
          itemTime: firebase.firestore.Timestamp.now(),
          owner: isUser.email,
          name: account,
          status: "none",
        });
      });
    });

    //在獲取檔案之後，使用 FileReader 讀取檔案之後接著創造一個 Image，這樣我們就成功拿到選取的圖片資訊
    const newFileReader = new FileReader();
    console.log(newFileReader.readyState);
  };

  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      height: 500,
      width: 380,
    });

  const handleDelete = (e) => {
    if (canvas) {
      const obj = canvas.getActiveObject();
      canvas.remove(obj);
    }
  };

  const handleBack = (e) => {
    if (canvas) {
      const obj = canvas.getActiveObject();
      canvas.sendToBack(obj);
    }
  };

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
            // itemExpense: price,     //總價？
            outfitName: outfitName, //讓使用者取名？
            outfitImg: diaryUrl,
            outfitSeason: outfitSeason,
            YYYY: new Date().getFullYear(),
            MM: new Date().getMonth() + 1,
            DD: new Date().getDate() + 1,
            outfitTime: firebase.firestore.Timestamp.now(),
            owner: isUser.email,
            name: account,
          });

        console.log(new Date());
      });
    });
  };

  const putId = (id) => document.getElementById(id);
  const imageUploader = putId("imageUploader");
  const imgset = putId("imgset");
  const imgsetRef = useRef();
  const defaultImg = putId("defaultImg");
  let imgDragOffset = {
    offsetX: 0,
    offsetY: 0,
  };

  // 在圖片發生 mousedown 事件時，將圖片儲存起來，並且記錄滑鼠點擊圖片的位置
  const saveImg = (e) => {
    console.log("e.target", e.target);
    console.log("e.target.tagName", e.target.tagName);
    if (e.target.tagName.toLowerCase() === "img") {
      imgDragOffset.offsetX = e.clientX - e.target.offsetLeft;
      imgDragOffset.offsetY = e.clientY - e.target.offsetTop;
      movingImage = e.target;
      console.log("走完saveImg都沒事", movingImage);
    }
  };

  //設定 Fabricjs Drop 事件 canvas.on('drop', dropImg)，Drop 事件後，計算出正確的位置，最後使用 new fabric.Image 新增一張圖片
  function dropImg(e) {
    const { offsetX, offsetY } = e.e;
    const image = new fabric.Image(
      movingImage,
      {
        width: movingImage.naturalWidth,
        height: movingImage.naturalHeight,
        scaleX: 100 / movingImage.naturalWidth,
        scaleY: 100 / movingImage.naturalHeight,
        top: offsetY - imgDragOffset.offsetY,
        left: offsetX - imgDragOffset.offsetX,
      }
      // { crossOrigin: "Anonymous" }
    );
    canvas.add(image);
  }

  return (
    <div style={{ fontFamily: "Chilanka" }}>
      <Header />

      <ButtonBox></ButtonBox>
      <YellowBG />

      <Main>
        <Container>
          <CanvasDiv>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
              }}
            >
              <button type="submit" onClick={(e) => handleDelete(e)}>
                Delete
              </button>
              <button onClick={(e) => handleBack(e)}>sendToBack</button>

              <StyledPopup modal trigger={<button>儲存</button>}>
                {(close) => (
                  <Backdrop>
                    <ItemForm>
                      <ImgDiv>
                        <img
                          src={diaryURL}
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
                        <SaveBtn
                          onClick={(e) => {
                            handleSave(e);
                            close();
                          }}
                        >
                          好了
                        </SaveBtn>
                      </Div>
                    </ItemForm>
                  </Backdrop>
                )}
              </StyledPopup>
            </div>
            <canvas id="canvas" onDrop={(e) => dropImg(e, saveImg())} />
          </CanvasDiv>
          <ClosetTitleDiv>
            {/* <ClosetTitle>衣櫥</ClosetTitle> */}
          </ClosetTitleDiv>
          <ClosetBox>
            <ImgsetBox>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
                id="imgset"
                onMouseDown={(e) => saveImg(e)}
              >
                {renderItems.length === 0 ? (
                  <EmptyDiv>
                    {" "}
                    現在衣櫥是空的唷！ 點擊＋號，一起來更衣吧！！
                  </EmptyDiv>
                ) : (
                  renderItems.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt="clothes"
                      crossOrigin="anonymous"
                      style={{
                        maxHeight: "160px",
                        margin: "20px",
                        cursor: "grab",
                      }}
                    />
                  ))
                )}
              </div>

              <StyledPopup modal trigger={<AddBtn>+</AddBtn>}>
                {(close) => (
                  <Backdrop>
                    <ItemForm>
                      <div style={{ display: "flex" }}>
                        <Div>
                          <Span>類別：</Span>

                          <select
                            value={option}
                            onChange={(e) => setOption(e.target.value)}
                          >
                            <option value="selectTag">選一個</option>
                            <option value="clothes">上衣</option>
                            <option value="pants">褲子</option>
                            <option value="shoses">裙子</option>
                            <option value="hats">鞋子</option>
                            <option value="accessaries">配件</option>
                          </select>
                        </Div>

                        <Div>
                          <Span>尺寸：</Span>

                          <select
                            value={itemSize}
                            onChange={(e) => setItemSize(e.target.value)}
                          >
                            <option value="selectTag">選一個</option>
                            <option value="XXS">XXS</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                          </select>
                        </Div>
                      </div>
                      <Div>
                        <Span>服裝名稱：</Span>
                        <input
                          type="text"
                          value={itemName}
                          onChange={(e) => setItemName(e.target.value)}
                        />
                      </Div>
                      <Div>
                        <Span>購買金額：</Span>
                        <input
                          type="number"
                          value={price}
                          onChange={(e) => {
                            setPrice(Number(e.target.value));
                            console.log(typeof Number(e.target.value));
                          }}
                        />
                      </Div>
                      <Div>
                        <Span>購買日期：</Span>
                        <input
                          className="date"
                          type="date"
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </Div>
                      <Div>
                        <input
                          type="file"
                          id="file"
                          onChange={(e) => setImgFile(e)}
                          placeholder="選擇一件"
                        />
                      </Div>
                      <Div>
                        <SaveBtn
                          type="submit"
                          onClick={(e) => {
                            summitItem(e);
                            close();
                          }}
                        >
                          好了
                        </SaveBtn>
                      </Div>
                    </ItemForm>
                  </Backdrop>
                )}
              </StyledPopup>
            </ImgsetBox>
            <TagBox>
              <Tag>全部</Tag>
              <Tag1>上衣</Tag1>
              <Tag2>褲子</Tag2>
              <Tag3>裙子</Tag3>
              <Tag4>鞋子</Tag4>
              <Tag5>配件</Tag5>
            </TagBox>
          </ClosetBox>
        </Container>
      </Main>
    </div>
  );
};

{
  /* <ImgDiv
  key={index}
  style={{
    backgroundImage: `url(${url})`,
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  }}
/>  */
}

export default FittingRoom;
