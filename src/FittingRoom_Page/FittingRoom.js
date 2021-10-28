import React, { useState, useEffect, useRef } from "react";
import Header from "../Landing_Page/Header";
import styled from "styled-components";
import "../CSS/FittingRoom.css";
import { fabric } from "fabric";
import "firebase/firestore";
import "firebase/storage";
import firebase from "../utils/firebase";
// import { BiCloset } from "@react-icons/all-files/fa/BiCloset";
import { useHistory } from "react-router-dom";
import Tshirt from "../img/Tshirt.png";
import Popup from "reactjs-popup";
let movingImage;

let filePath;
const item = firebase
  .firestore()
  .collection("users")
  .doc("joy")
  .collection("items")
  .doc();

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 15px;
`;

const CanvasBox = styled.div`
  margin-top: 50px;
  display: flex;
  background-color: #f3d19e57;
`;

const ClosetBox = styled.div`
  margin-top: 30px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: white;
  box-shadow: 10px 2px 21px -2px rgba(182, 163, 163, 0.51);
  min-height: 700px;
  width: 800px;
`;

const ImgsetBox = styled.div`
  padding-left: 100px;
  padding-right: 70px;
  display: flex;
  flex-wrap: wrap;
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
  border-radius: 25px;
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fffcf1d4;
  display: flex;
  justify-content: center;
`;

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }
  &-content {
    margin: auto;
    background: rgb(255, 255, 255);
    opacity: 0.5;
    width: 700px;
    display: flex;
    height: 550px;
  }
`;

const Span = styled.span`
  margin-right: 15px;
`;

const Div = styled.div`
  margin-bottom: 20px;
`;

const FittingRoom = () => {
  const history = useHistory();
  const [canvas, setCanvas] = useState({});
  const [price, setPrice] = useState("");
  const [option, setOption] = useState("");
  const [itemName, setItemName] = useState("");
  const [date, setDate] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [files, setFiles] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  useEffect(() => {
    if (Object.keys(canvas).length) {
      canvas.on("drop", dropImg); //TEST!!
    }
  }, [canvas]);

  useEffect(() => {
    // const id = firebase.firestore().collection("users").doc().id;
    item.get().then((doc) => {
      setItems("imgURL");
    });
  }, []);

  // 透過 FileReader 將來讀取本地的圖片
  const getFileInfo = (e, imgFile) => {
    console.log(e, imgFile);
    // const fileReader = new FileReader(); //upload to storge
    filePath = firebase.storage().ref("itemImages/" + item.id); //傳入filebase的路徑位置
    const file = imgFile.target.files[0];
    // setFiles(imgFile.target.files[0]);
    filePath.put(file, { contentType: file.type }).then(() => {
      filePath.getDownloadURL().then((imageUrl) => {
        setImgURL(imageUrl);
      });
    });
  };

  const sumbitItem = () => {
    const YYYY = date.slice(0, 4);
    const MM = date.slice(5, 7);
    const DD = date.slice(8, 10);

    console.log(imgsetRef.current);
    firebase
      .firestore()
      .collection("users")
      .doc("joy") //user ID
      .collection("items")
      .doc(item.id) //item ID
      .set({
        itemID: item.id,
        itemExpense: price,
        itemName: itemName,
        YYYY: YYYY,
        MM: MM,
        DD: DD,
        itemImg: imgURL,
        itemTag: option,
      });
    console.log("finish set", filePath);
    const newFileReader = new FileReader();
    // newFileReader.readAsDataURL(files);
    // newFileReader.onload = () => {
    console.log(newFileReader.readyState);
    // const dataURL = e.target.result;
    const img = document.createElement("img");
    const imgBox = document.createElement("div");

    img.classList.add("img");
    img.draggable = true;
    // img.src = dataURL; //storage URL
    img.src = imgURL;
    console.log(img.src);
    img.click = saveImg;
    img.style.width = "90%";
    // img.style.height = "150px";
    img.style.margin = "15px";
    imgBox.style.overflow = "hidden";
    imgBox.style.width = "150px";
    // imgsetRef.current.appendChild(img);
    imgBox.appendChild(img);
    imgset.appendChild(imgBox);
    // };
  };

  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      height: 600,
      width: 400,
    });

  // const addImg = (e, url, canvi) => {
  //   e.preventDefault();
  //   new fabric.Image.fromURL(url, (img) => {
  //     img.scale(0.5);
  //     canvi.add(img);
  //     canvi.renderAll();
  //     setImgURL("");
  //   });
  // };

  const handelDelete = (e) => {
    if (canvas) {
      const obj = canvas.getActiveObject();
      canvas.remove(obj);
    }
  };

  const putId = (id) => document.getElementById(id);
  const imageUploader = putId("imageUploader");
  // const file = putId("file");
  const imgset = putId("imgset");
  const imgsetRef = useRef();
  const defaultImg = putId("defaultImg");
  let imgDragOffset = {
    offsetX: 0,
    offsetY: 0,
  };
  // function uploadFile(e) {
  //   file.click();
  // }

  // 在圖片發生 mousedown 事件時，將圖片儲存起來，並且記錄滑鼠點擊圖片的位置
  const saveImg = (e) => {
    console.log("e.target", e.target);
    console.log("e.target.tagName", e.target.tagName);
    if (e.target.tagName.toLowerCase() === "img") {
      imgDragOffset.offsetX = e.clientX - e.target.offsetLeft;
      imgDragOffset.offsetY = e.clientY - e.target.offsetTop;
      movingImage = e.target;
      // setMovingImage(e.target);
      console.log("走完saveImg都沒事", movingImage);
    }
  };

  //設定 Fabricjs Drop 事件 canvas.on('drop', dropImg)，Drop 事件後，計算出正確的位置，最後使用 new fabric.Image 新增一張圖片
  function dropImg(e) {
    const { offsetX, offsetY } = e.e;
    console.log(e);

    console.log(movingImage);
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

  return (
    <div>
      <Header />

      <ButtonBox>
        <div>
          <button type="submit" onClick={(e) => handelDelete(e)}>
            Delete
          </button>
        </div>

        <StyledPopup modal trigger={<button>加入照片</button>}>
          {(close) => (
            <Backdrop>
              <ItemForm>
                <Div>
                  <Span>類別：</Span>

                  <select
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                  >
                    <option value="selectTag">選一個</option>
                    <option value="clothes">衣服</option>
                    <option value="pants">褲子</option>
                    <option value="shoses">鞋子</option>
                    <option value="hats">帽子</option>
                    <option value="accessaries">配件</option>
                  </select>
                </Div>
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
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
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
                  <button
                    id="imageUploader"
                    onClick={(e) => getFileInfo(e, imgFile)}
                  >
                    上傳
                  </button>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setImgFile(e)}
                  />
                </Div>
                <Div>
                  <button type="submit" onClick={(e) => sumbitItem(e)}>
                    送出
                  </button>
                </Div>
              </ItemForm>
            </Backdrop>
          )}
        </StyledPopup>
      </ButtonBox>

      <CanvasBox>
        <canvas id="canvas" onDrop={(e) => dropImg(e, saveImg())} />
        <ClosetTitleDiv>{/* <ClosetTitle>衣櫥</ClosetTitle> */}</ClosetTitleDiv>
        <ClosetBox>
          <ImgsetBox>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
              id="imgset"
              // ref={imgsetRef}
              onMouseDown={(e) => saveImg(e)}
            >
              <img
                id="defaultImg"
                src={Tshirt}
                alt="衣服"
                style={{
                  height: "120px",
                  width: "120px",
                  margin: "30px",
                }}
              />
            </div>

            {/* {items.map((item) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                  id="imgset"
                  // ref={imgsetRef}
                  onMouseDown={(e) => saveImg(e)}
                >
                  <img />
                </div>
              );
            })} */}
          </ImgsetBox>
        </ClosetBox>
      </CanvasBox>
    </div>
  );
};

export default FittingRoom;
