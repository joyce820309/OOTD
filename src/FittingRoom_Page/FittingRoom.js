import React, { useState, useEffect, useRef } from "react";
import "../Style/common.css";
import { fabric } from "fabric";
import "firebase/firestore";
import "firebase/storage";
import Swal from "sweetalert2";
import firebase from "../utils/firebase";
import TagAll from "./TagAll";
import Tags from "./Tags";
import Loading from "../General/Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { getAccountName, setImgInfoToCollection } from "../utils/firebaseFunc";

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
  DairyPopup,
  SaveBtn,
  Input,
  InputNum,
  BtnDiv,
  ExplainSave,
  DeleteBtn,
  ExplainDelete,
  ClosetBox,
  ImgsetBox,
  ImgBox,
  MirrorTitleDiv,
  ClosetTitle,
  ItemForm,
  Backdrop,
  SaveForm,
  Btn,
  ClosetTitleDiv,
  StyledPopup,
} from "../Style/FittingCSS";
let movingImage;
let filePath;

const FittingRoom = () => {
  const isUser = useSelector((state) => state.user);
  const [account, setAccount] = useState("");
  const [itemSize, setItemSize] = useState("");
  const [canvas, setCanvas] = useState({});
  const [price, setPrice] = useState();
  const [option, setOption] = useState("");
  const [itemName, setItemName] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [diaryURL, setDiaryURL] = useState("");
  const [outfitName, setOutfitName] = useState("");
  const [outfitSeason, setOutfitSeason] = useState("");
  const [filerStatus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [selectDate, setSelectDate] = useState(new Date());
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  useEffect(() => {
    setYear(selectDate.getFullYear());
    setMonth(Number(selectDate.getMonth()) + 1);
    setDate(Number(selectDate.getDate()));
  }, [selectDate]);

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
    let unsubscribe;
    if (Object.keys(isUser).length !== 0) {
      getAccountName(isUser).then((doc) => {
        setAccount(doc.data()?.name);
      });
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

  const summitItem = () => {
    setIsLoading(true);

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
      price === undefined ||
      itemSize === "" ||
      option === "" ||
      date === ""
    ) {
      Toast.fire({
        icon: "warning",
        title: "記得將表單填寫完整唷！",
      });
    } else {
      filePath.put(imgFile, { contentType: imgFile.type }).then(() => {
        filePath.getDownloadURL().then((imageUrl) => {
          const data = {
            itemExpense: price,
            itemName: itemName,
            YYYY: year,
            MM: month,
            DD: date,
            itemImg: imageUrl,
            itemTag: option,
            itemSize: itemSize,
            itemTime: firebase.firestore.Timestamp.now(),
            owner: isUser.email,
            name: account,
            status: "none",
          };

          setImgInfoToCollection(item, data, Toast, setIsLoading);
          setIsLoading(false);
        });
      });
    }

    //在獲取檔案之後，使用 FileReader 讀取檔案之後接著創造一個 Image，這樣我們就成功拿到選取的圖片資訊
    const newFileReader = new FileReader();
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
    <div>
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
              {filerStatus === "all" ? <TagAll /> : null}
              {filerStatus === "clothes" ? <Tags tag={"clothes"} /> : null}
              {filerStatus === "pants" ? <Tags tag={"pants"} /> : null}
              {filerStatus === "skirt" ? <Tags tag={"skirt"} /> : null}
              {filerStatus === "shoes" ? <Tags tag={"shoes"} /> : null}
              {filerStatus === "accessary" ? <Tags tag={"accessary"} /> : null}
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
                          value={price}
                          onChange={(e) => {
                            setPrice(Number(e.target.value));
                          }}
                        />
                      </Div>
                      <Div>
                        <Span>購買日期：</Span>

                        <DatePicker
                          dateFormat="yyyy/MM/dd"
                          selected={selectDate}
                          onChange={(e) => {
                            setSelectDate(e);
                          }}
                          maxDate={new Date()}
                        />
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
                          price !== undefined &&
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
