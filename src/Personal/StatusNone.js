import React from "react";
import {
  Div,
  Span,
  FormTitle,
  CheckSpan,
  Textarea,
  Input,
} from "../Style/CommonCSS";

import {
  NewHomeBtn,
  NameBtn,
  Submitbtn,
  StyledPopup,
  Backdrop,
  ImgPopup,
  ItemForm,
} from "../Style/PersonalCSS";

const StatusNone = ({
  item,
  setExchangeName,
  exchangeName,
  exchangeInfo,
  setExchangeInfo,
  sumbitToExchange,
}) => {
  return (
    <>
      {item.data.status === "none" ? (
        <StyledPopup modal trigger={<NewHomeBtn>幫它找新家</NewHomeBtn>}>
          {(close) => (
            <Backdrop>
              <ItemForm>
                <FormTitle style={{ marginBottom: "20px" }}>我想送出</FormTitle>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    backgroundColor: "#aebabf57",
                    justifyContent: "center",
                  }}
                >
                  <ImgPopup>
                    <img
                      src={item.data.itemImg}
                      alt="exchange-item"
                      style={{
                        height: "100%",
                      }}
                    />
                  </ImgPopup>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Div>
                      <CheckSpan>原本的名稱： {item.data.itemName}</CheckSpan>
                    </Div>
                    <Div>
                      <CheckSpan>尺寸： {item.data.itemSize}</CheckSpan>
                    </Div>
                    <Div>
                      <CheckSpan>
                        購買日期： {item.data.YYYY} 年{item.data.MM} 月
                        {item.data.DD} 日
                      </CheckSpan>
                    </Div>
                    <Div>
                      <CheckSpan>購買金額： {item.data.itemExpense}</CheckSpan>
                    </Div>
                  </div>
                </div>

                <div style={{ marginTop: "25px" }}>
                  <Div>
                    <div style={{ display: "flex" }}>
                      <Span>取個新名稱吧</Span>
                      <NameBtn
                        onClick={() => {
                          setExchangeName(item.data.itemName);
                        }}
                      >
                        用原本名稱
                      </NameBtn>
                    </div>
                    <Input
                      style={{ backgroundColor: "#cddbe16e" }}
                      type="text"
                      value={exchangeName}
                      onChange={(e) => setExchangeName(e.target.value)}
                      placeholder="幫衣服換名字"
                    />
                  </Div>

                  <Div>
                    <Span>簡介：</Span>
                    <Textarea
                      value={exchangeInfo}
                      style={{
                        height: "70px",
                        width: "170px",
                        maxHeight: "70px",
                        maxWidth: "170px",
                        backgroundColor: "#cddbe16e",
                      }}
                      onChange={(e) => setExchangeInfo(e.target.value)}
                      placeholder="幫衣服做個自我介紹吧 :)"
                    />
                  </Div>
                </div>
                <Div>
                  <Submitbtn
                    type="submit"
                    onClick={() => {
                      sumbitToExchange(item, item.id);

                      if (exchangeName !== "" && exchangeInfo !== "") {
                        close();
                      }
                    }}
                  >
                    好了！
                  </Submitbtn>
                </Div>
              </ItemForm>
            </Backdrop>
          )}
        </StyledPopup>
      ) : null}
    </>
  );
};

export default StatusNone;
