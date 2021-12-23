import React from "react";
import { ImgDiv } from "../Style/PopupCSS";
import { Div, Span, OKBtn, FormTitle, CheckSpan } from "../Style/CommonCSS";
import { updateName, updateSize, updateInfo } from "../utils/firebaseFunc";
import {
  PendingDiv,
  PendingPopup,
  Backdrop,
  ItemForm,
  EditBtn,
} from "../Style/PersonalCSS";

const Pending = ({
  isUser,
  item,
  exchangeCollection,
  name,
  size,
  info,
  setName,
  setSize,
  setInfo,
  setFindId,
  editName,
  editSize,
  editInfo,
  setEditName,
  setEditSize,
  setEditInfo,
}) => {
  return (
    <>
      {item.data.status === "pending" ? (
        <PendingPopup
          onOpen={() => {
            setFindId(item.id);
          }}
          modal
          trigger={<PendingDiv>交換ing</PendingDiv>}
        >
          {(close) => (
            <Backdrop>
              <ItemForm>
                <FormTitle style={{ marginBottom: "20px" }}>交換中</FormTitle>

                <ImgDiv>
                  <img
                    src={item.data.itemImg}
                    alt="exchange item"
                    style={{ height: "100%" }}
                  />
                </ImgDiv>

                {exchangeCollection.map((exchangeItem, i) => (
                  <>
                    {/* <Test updateName={(e) => updateName(e, item, item.id)} />  放到editName 的下一行*/}
                    {editName ? (
                      <Div key={i}>
                        <Span>
                          我交換出去的是：
                          <input
                            type="text"
                            placeholder={exchangeItem.data.exchangeName}
                            onChange={(e) => setName(e.target.value)}
                            style={{ margin: "8px 10px 10px 0" }}
                          />
                          <OKBtn
                            onClick={(e) =>
                              updateName(
                                e,
                                item,
                                item.id,
                                setEditName,
                                name,
                                isUser
                              )
                            }
                          >
                            好了
                          </OKBtn>
                        </Span>
                      </Div>
                    ) : (
                      <Div style={{ display: "flex" }}>
                        <CheckSpan>
                          我交換出去的是：
                          {exchangeItem.data.exchangeName}
                        </CheckSpan>
                        <EditBtn
                          onClick={() => {
                            setEditName(true);
                          }}
                        >
                          編輯
                        </EditBtn>
                      </Div>
                    )}

                    {editSize ? (
                      <Div key={i}>
                        <Span>
                          它の尺寸：{exchangeItem.data.itemSize}
                          <select
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
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
                        </Span>
                        <OKBtn
                          onClick={(e) =>
                            updateSize(
                              e,
                              item,
                              item.id,
                              setEditSize,
                              size,
                              isUser
                            )
                          }
                        >
                          好了
                        </OKBtn>
                      </Div>
                    ) : (
                      <Div>
                        <CheckSpan>
                          它の尺寸：{exchangeItem.data.itemSize}
                        </CheckSpan>
                        <EditBtn
                          onClick={() => {
                            setEditSize(true);
                          }}
                        >
                          編輯
                        </EditBtn>
                      </Div>
                    )}

                    {editInfo ? (
                      <Div
                        key={i}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Span>
                          它の自我介紹：
                          <OKBtn
                            onClick={(e) =>
                              updateInfo(
                                e,
                                item,
                                item.id,
                                setEditInfo,
                                info,
                                isUser
                              )
                            }
                          >
                            好了
                          </OKBtn>
                        </Span>
                        <textarea
                          value={info}
                          style={{ margin: "8px 10px 10px 0" }}
                          onChange={(e) => setInfo(e.target.value)}
                          placeholder={exchangeItem.data.exchangeInfo}
                        />
                      </Div>
                    ) : (
                      <Div style={{ display: "flex" }}>
                        <CheckSpan>
                          它の自我介紹：
                          {exchangeItem.data.exchangeInfo}
                        </CheckSpan>
                        <EditBtn
                          onClick={() => {
                            setEditInfo(true);
                          }}
                        >
                          編輯
                        </EditBtn>
                      </Div>
                    )}
                  </>
                ))}
              </ItemForm>
            </Backdrop>
          )}
        </PendingPopup>
      ) : null}
    </>
  );
};

export default Pending;
