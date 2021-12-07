import React from "react";
import { Div, FormTitle, CheckSpan } from "../Style/CommonCSS";
import { ImgDiv } from "../Style/PopupCSS";
import { DoneDiv, DonePopup, Backdrop, ItemForm } from "../Style/PersonalCSS";

const Done = ({ item, exchangeCollection, setFindId }) => {
  return (
    <>
      {item.data.status === "done" ? (
        <DonePopup
          onOpen={() => {
            setFindId(item.id);
          }}
          modal
          trigger={<DoneDiv>有人認領走囉！</DoneDiv>}
        >
          {(close) => (
            <Backdrop>
              <ItemForm>
                <FormTitle style={{ marginBottom: "20px" }}>交換完成</FormTitle>

                <ImgDiv>
                  <img
                    src={item.data.itemImg}
                    alt="exchange item"
                    style={{ height: "100%" }}
                  />
                </ImgDiv>

                {exchangeCollection.map((exchangeItem, i) => (
                  <>
                    <Div key={i}>
                      <CheckSpan>
                        新主人叫做：{exchangeItem.data.userName}
                      </CheckSpan>
                    </Div>
                    <Div>
                      <CheckSpan>
                        手機號碼：{exchangeItem.data.userPhone}
                      </CheckSpan>
                    </Div>
                    <Div>
                      <CheckSpan>
                        交換の日期：{exchangeItem.data.YYYY}年
                        {exchangeItem.data.MM}月{exchangeItem.data.DD}日
                      </CheckSpan>
                    </Div>
                    <Div>
                      <CheckSpan>
                        交換の時間：{exchangeItem.data.HH}點
                        {exchangeItem.data.Min}分
                      </CheckSpan>
                    </Div>
                    <Div>
                      <CheckSpan>
                        交換の地址：{exchangeItem.data.userAddress}
                      </CheckSpan>
                    </Div>
                  </>
                ))}
              </ItemForm>
            </Backdrop>
          )}
        </DonePopup>
      ) : null}
    </>
  );
};

export default Done;
