import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "../CSS/common.css";
import { fabric } from "fabric";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import Swal from "sweetalert2";
import firebase from "../utils/firebase";
import Popup from "reactjs-popup";
import WebFont from "webfontloader";
import TagAll from "./TagAll";
import TagClothes from "./TagClothes";
import TagPants from "./TagPants";
import TagSkirt from "./TagSkirt";
import TagShoes from "./TagShoes";
import TagAccessary from "./TagAccessary";
import Loading from "../CSS/LoadingCSS";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  YellowBG,
  TagBox,
  Tag,
  Tag1,
  Tag2,
  Tag3,
  Tag4,
  Tag5,
  Container,
  AddBtn,
  CanvasDiv,
  Div,
  LeftDiv,
  Span,
  MobileTagBox,
} from "../CSS/FittingCSS";
let movingImage;
let filePath;

const BtnDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px dashed #8f9fa357;
  padding: 10px 20px;
`;

const Btn = styled.button`
  padding: 5px 15px;
  margin: auto 8px;
  background-color: #88b0c347;
  border-radius: 8px;
  &:hover {
    transform: scale(1.2);
    background-color: #8ebed5e6;
  }
  &:hover :first-child {
    position: absolute;
    display: flex;
    left: -85px;
    top: -60px;
    justify-content: center;
    align-items: center;
  }
`;

const ExplainSave = styled.div`
  display: none;
  width: 270px;
  height: 40px;
  border: 3px #88b0c347 solid;
  border-radius: 9px;
  background-color: snow;
  padding: 5px 10px;
`;

const DeleteBtn = styled(Btn)`
  position: relative;
  background-color: #f1cdc5b3;
  &:hover {
    background-color: #f1cdc5;
  }
  &:hover :first-child {
    position: absolute;
    display: flex;
    left: -25px;
    top: -60px;
    justify-content: center;
    align-items: center;
  }
`;

const ExplainDelete = styled.div`
  display: none;
  width: 250px;
  height: 40px;
  border: 3px #e5a9aa96 solid;
  border-radius: 9px;
  background-color: snow;
  padding: 5px 10px;
`;

const ClosetBox = styled.div`
  margin: 30px 80px 20px 20px;
  background-color: white;
  box-shadow: 0px 2px 21px -2px rgba(182, 163, 163, 0.51);
  height: 630px;
  width: 800px;
  position: relative;
  top: 10px;
  @media screen and (max-width: 1400px) {
    width: 700px;
    margin: 25px 10px 20px 20px;
  }
  @media screen and (max-width: 1165px) {
    width: 650px;
    margin: 25px auto 20px 20px;
  }
`;

const ImgsetBox = styled.div`
  padding-left: 60px;
  padding-right: 30px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #fff;
  }

  &::-webkit-scrollbar-thumb {
    border: 3px solid #fff;
  }
  scrollbar-width: 5px;
  scrollbar-color: #fff #fff;
  height: 100%;
  @media screen and (max-width: 1400px) {
    padding-left: 30px;
    padding-right: 30px;
  }
`;

const ImgBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ClosetTitleDiv = styled.div`
  font-weight: 800;
  margin: 20px;
  position: absolute;
  top: -50px;
  left: 10px;
  color: #515d6087;
  padding: 8px 12px 8px 10px;
  transform: rotate(-2.3deg);
  cursor: pointer;
  z-index: 10;
  background-color: #94c5d1bd;
`;

const MirrorTitleDiv = styled(ClosetTitleDiv)`
  background-color: #edc4b4c2;
  transform: rotate(-2.3deg);
  top: 45px;
  left: 10px;
`;

const ClosetTitle = styled.div`
  padding: 5px;
  border-radius: 5px;
`;

const ItemForm = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SaveForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
    width: 580px;
    display: flex;
    height: 550px;
    border-radius: 25px;
  }
`;

const DairyPopup = styled(StyledPopup)`
  &-content {
    width: 350px;
    height: 400px;
  }
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

const Input = styled.input`
  background-color: snow;
  /* width: 100%; */
  &:focus-visible {
    outline: #e9c58eba 2px solid;
  }
`;

const InputNum = styled.input`
  background-color: snow;
  &:focus-visible {
    outline: #e9c58eba 2px solid;
  }
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`;

const FittingRoom = () => {
  const [account, setAccount] = useState("");
  const [itemSize, setItemSize] = useState("");
  const [canvas, setCanvas] = useState({});
  const [price, setPrice] = useState(0);
  const [option, setOption] = useState("");
  const [itemName, setItemName] = useState("");
  const [date, setDate] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [diaryURL, setDiaryURL] = useState("");
  const [isUser, setIsUser] = useState(null);
  const [outfitName, setOutfitName] = useState("");
  const [outfitSeason, setOutfitSeason] = useState("");
  const [filerStatus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Chilanka", "Droid Sans"],
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
  console.log(date.toLocaleString());

  const summitItem = () => {
    setIsLoading(true);
    const YYYY = date.toLocaleString().slice(0, 4);
    const MM = date.toLocaleString().slice(5, 7);
    const DD = date.toLocaleString().slice(8, 10);
    console.log(YYYY, MM, DD);
    const item = firebase
      .firestore()
      .collection("users")
      .doc(isUser.email)
      .collection("items")
      .doc();

    // 透過 FileReader 將來讀取本地的圖片
    filePath = firebase.storage().ref("itemImages/" + item.id); //傳入filebase的路徑位置

    if (
      imgFile === "" ||
      itemName === "" ||
      price === 0 ||
      itemSize === "" ||
      option === "" ||
      date === ""
    ) {
      Toast.fire({
        icon: "warning",
        title: "記得將表單填寫完整唷！",
      });
    } else {
      // const file = imgFile.target.files[0];

      filePath.put(imgFile, { contentType: imgFile.type }).then(() => {
        filePath.getDownloadURL().then((imageUrl) => {
          item
            .set({
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
            })
            .then(() => {
              Toast.fire({
                icon: "warning",
                title: "新增成功!!",
              });
              setIsLoading(false);
              console.log("success");
            });
        });
      });
    }

    //在獲取檔案之後，使用 FileReader 讀取檔案之後接著創造一個 Image，這樣我們就成功拿到選取的圖片資訊
    const newFileReader = new FileReader();
    console.log(newFileReader.readyState);
  };

  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      height: 480,
      width: 360,
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

        if (outfitName === "" || outfitSeason === "") {
          console.log(outfitName, outfitSeason);

          Toast.fire({
            icon: "warning",
            title: "記得替穿搭想個主題 ＆ 選取類別吧！",
          });
        } else {
          firebase
            .firestore()
            .collection("users")
            .doc(isUser.email)
            .collection("outfits")
            .doc(item.id)
            .set({
              outfitName: outfitName,
              outfitImg: diaryUrl,
              outfitSeason: outfitSeason,
              YYYY: new Date().getFullYear(),
              MM: new Date().getMonth() + 1,
              DD: new Date().getDate(),
              outfitTime: firebase.firestore.Timestamp.now(),
              owner: isUser.email,
              name: account,
            });
          Toast.fire({
            icon: "warning",
            title: "儲存成功，快到穿搭日記看看吧！",
          });
        }
      });
    });
  };

  // const putId = (id) => document.getElementById(id);
  // const imageUploader = putId("imageUploader");
  // const imgset = putId("imgset");
  // const imgsetRef = useRef();
  // const defaultImg = putId("defaultImg");
  let imgDragOffset = {
    offsetX: 0,
    offsetY: 0,
  };

  // 在圖片發生 mousedown 事件時，將圖片儲存起來，並且記錄滑鼠點擊圖片的位置
  const saveImg = (e) => {
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
    const image = new fabric.Image(movingImage, {
      width: movingImage.naturalWidth,
      height: movingImage.naturalHeight,
      scaleX: 100 / movingImage.naturalWidth,
      scaleY: 100 / movingImage.naturalHeight,
      top: offsetY - imgDragOffset.offsetY,
      left: offsetX - imgDragOffset.offsetX,
    });
    canvas.add(image);
  }

  const previewUrl = imgFile
    ? URL.createObjectURL(imgFile)
    : "https://react.semantic-ui.com/images/wireframe/image.png";

  return (
    <div
      style={{
        fontFamily: "Chilanka",
      }}
    >
      <YellowBG />

      <Container>
        <MirrorTitleDiv>
          <ClosetTitle>更衣室</ClosetTitle>
        </MirrorTitleDiv>
        <CanvasDiv>
          <canvas id="canvas" onDrop={(e) => dropImg(e, saveImg())} />
          <div style={{ marginTop: "80px", position: "relative" }}>
            <BtnDiv>
              <DeleteBtn type="submit" onClick={(e) => handleDelete(e)}>
                刪除
                <ExplainDelete>Tip: 記得先選取物件再按刪除唷！</ExplainDelete>
              </DeleteBtn>

              <DairyPopup
                modal
                trigger={
                  <Btn>
                    儲存
                    <ExplainSave>Tip: 儲存後可以在穿搭日記查詢唷！</ExplainSave>
                  </Btn>
                }
              >
                {(close) => (
                  <Backdrop>
                    <SaveForm>
                      <Div style={{ width: "100%" }}>
                        <Span>想個主題</Span>
                        <Input
                          type="text"
                          value={outfitName}
                          onChange={(e) => setOutfitName(e.target.value)}
                        ></Input>
                      </Div>
                      <Div style={{ width: "100%" }}>
                        <Span>類別：</Span>

                        <select
                          value={outfitSeason}
                          onChange={(e) => setOutfitSeason(e.target.value)}
                        >
                          <option>適合季節</option>
                          <option value="spring">春天</option>
                          <option value="summer">夏天</option>
                          <option value="fall">秋天</option>
                          <option value="winter">冬天</option>
                        </select>
                      </Div>
                    </SaveForm>
                    <div style={{ marginTop: "auto", marginBottom: "100px" }}>
                      <SaveBtn
                        onClick={(e) => {
                          handleSave(e);
                          if (outfitName !== "" && outfitSeason !== "") {
                            close();
                          }
                        }}
                      >
                        好了
                      </SaveBtn>
                    </div>
                  </Backdrop>
                )}
              </DairyPopup>
            </BtnDiv>
          </div>
        </CanvasDiv>

        <ClosetBox>
          <ClosetTitleDiv>
            <ClosetTitle>我の衣櫥</ClosetTitle>
          </ClosetTitleDiv>
          <ImgsetBox>
            {isLoading ? (
              <div style={{ width: "150px" }}>
                <Loading />
              </div>
            ) : null}
            <ImgBox id="imgset" onMouseDown={(e) => saveImg(e)}>
              {filerStatus === "all" ? <TagAll /> : <></>}
              {filerStatus === "clothes" ? <TagClothes /> : <></>}
              {filerStatus === "pants" ? <TagPants /> : <></>}
              {filerStatus === "skirt" ? <TagSkirt /> : <></>}
              {filerStatus === "shoes" ? <TagShoes /> : <></>}
              {filerStatus === "accessary" ? <TagAccessary /> : <></>}
            </ImgBox>

            <StyledPopup modal trigger={<AddBtn>+</AddBtn>}>
              {(close) => (
                <Backdrop>
                  <ItemForm>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "140px",
                      }}
                    >
                      <LeftDiv
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <label htmlFor="file">
                          <img
                            src={previewUrl}
                            alt="uploadImg"
                            style={{
                              height: "120px",
                              borderRadius: "5px",
                            }}
                          />
                        </label>

                        <Input
                          style={{ display: "none" }}
                          type="file"
                          id="file"
                          onChange={(e) => setImgFile(e.target.files[0])}
                        />
                      </LeftDiv>
                      <LeftDiv>
                        <Span>類別：</Span>

                        <select
                          value={option}
                          onChange={(e) => setOption(e.target.value)}
                        >
                          <option>選一個</option>
                          <option value="clothes">上衣</option>
                          <option value="pants">褲子</option>
                          <option value="skirt">裙子</option>
                          <option value="shoes">鞋子</option>
                          <option value="accessary">配件</option>
                        </select>
                      </LeftDiv>

                      <LeftDiv>
                        <Span>尺寸：</Span>

                        <select
                          value={itemSize}
                          onChange={(e) => setItemSize(e.target.value)}
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
                      </LeftDiv>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "250px",
                      }}
                    >
                      <Div>
                        <Span>服裝名稱：</Span>
                        <Input
                          type="text"
                          value={itemName}
                          onChange={(e) => setItemName(e.target.value)}
                        />
                      </Div>
                      <Div>
                        <Span>購買金額：</Span>
                        <InputNum
                          style={{ "-webkit-appearance": "none" }}
                          type="number"
                          placeholder="記得輸入金額唷！"
                          value={price}
                          onChange={(e) => {
                            setPrice(Number(e.target.value));
                            console.log(typeof Number(e.target.value));
                          }}
                        />
                      </Div>
                      <Div
                      // style={{
                      //   borderTop: "dashed 3px #f3d19efa",
                      //   paddingTop: "6px",
                      // }}
                      >
                        <Span>購買日期：</Span>

                        <input
                          style={{ backgroundColor: "snow" }}
                          type="date"
                          selected={date}
                          onChange={(e) => setDate(e.target.value)}
                        />

                        {/* <DatePicker
                          dateFormat="yyyy/MM/dd"
                          selected={date}
                          onChange={(e) => setDate(e)}
                          maxDate={new Date()}
                        /> */}
                      </Div>
                    </div>
                  </ItemForm>
                  <div style={{ marginTop: "auto", marginBottom: "100px" }}>
                    <SaveBtn
                      type="submit"
                      onClick={(e) => {
                        summitItem(e);
                        if (
                          imgFile !== "" &&
                          itemName !== "" &&
                          price !== 0 &&
                          itemSize !== "" &&
                          option !== "" &&
                          date !== ""
                        ) {
                          close();
                        }
                      }}
                    >
                      好了
                    </SaveBtn>
                  </div>
                </Backdrop>
              )}
            </StyledPopup>
          </ImgsetBox>
          <TagBox>
            <Tag
              onClick={() => {
                setFilterStatus("all");
              }}
            >
              全部
            </Tag>
            <Tag1
              onClick={() => {
                setFilterStatus("clothes");
              }}
            >
              上衣
            </Tag1>
            <Tag2
              onClick={() => {
                setFilterStatus("pants");
              }}
            >
              褲子
            </Tag2>
            <Tag3
              onClick={() => {
                setFilterStatus("skirt");
              }}
            >
              裙子
            </Tag3>
            <Tag4
              onClick={() => {
                setFilterStatus("shoes");
              }}
            >
              鞋子
            </Tag4>
            <Tag5
              onClick={() => {
                setFilterStatus("accessary");
              }}
            >
              配件
            </Tag5>
            <MobileTagBox />
          </TagBox>
        </ClosetBox>
      </Container>
    </div>
  );
};

export default FittingRoom;
