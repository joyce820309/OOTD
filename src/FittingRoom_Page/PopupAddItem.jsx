import React, { useState } from "react";
import "../Style/common.css";
import "firebase/firestore";
import "firebase/storage";
import Loading from "../General/Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { summitItem } from "../utils/firebaseFunc";

import {
  AddBtn,
  Div,
  LeftDiv,
  Span,
  SaveBtn,
  Input,
  InputNum,
  ItemForm,
  Backdrop,
  StyledPopup,
} from "../Style/FittingCSS";

const PopupAddItem = (
  // previewUrl,
  setImgFile,
  option,
  setOption,
  itemSize,
  setItemSize,
  itemName,
  setItemName,
  price,
  setPrice,
  selectDate,
  setSelectDate,
  imgFile, 
  date,
  summitItem 
) => {
  const [isLoading, setIsLoading] = useState(false);
  const isUser = useSelector((state) => state.user);
  // const [imgFile, setImgFile] = useState("");

  const previewUrl = imgFile
    ? URL.createObjectURL(imgFile)
    : "https://react.semantic-ui.com/images/wireframe/image.png";

  return (
    <>
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
                  <Span>?????????</Span>

                  <select
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                  >
                    <option>?????????</option>
                    <option value="clothes">??????</option>
                    <option value="pants">??????</option>
                    <option value="skirt">??????</option>
                    <option value="shoes">??????</option>
                    <option value="accessary">??????</option>
                  </select>
                </LeftDiv>

                <LeftDiv>
                  <Span>?????????</Span>

                  <select
                    value={itemSize}
                    onChange={(e) => setItemSize(e.target.value)}
                  >
                    <option>?????????</option>
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
                  <Span>???????????????</Span>
                  <Input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                </Div>
                <Div>
                  <Span>???????????????</Span>
                  <InputNum
                    style={{ "-webkit-appearance": "none" }}
                    type="number"
                    placeholder="????????????????????????"
                    value={price}
                    onChange={(e) => {
                      setPrice(Number(e.target.value));
                    }}
                  />
                </Div>
                <Div>
                  <Span>???????????????</Span>

                  <DatePicker
                    dateFormat="yyyy/MM/dd"
                    selected={selectDate}
                    onChange={(e) => setSelectDate(e)}
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
                    price !== 0 &&
                    itemSize !== "" &&
                    option !== "" &&
                    date !== ""
                  ) {
                    close();
                  }
                }}
              >
                ??????
              </SaveBtn>
            </div>
          </Backdrop>
        )}
      </StyledPopup>
    </>
  );
};

export default PopupAddItem;
