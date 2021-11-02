import React, { useEffect, useState } from "react";
import Header from "./Landing_Page/Header";
import styled from "styled-components";
import Pic from "./img/Pic.png";
import bluesweater from "./img/blueSweater.png";
import firebase from "./utils/firebase";
import "firebase/firestore";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Popup from "reactjs-popup";

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
  }
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fffcf1d4;
  display: flex;
  justify-content: center;
`;

const Main = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 115px 30px 0 30px;
`;

const Section1 = styled.div`
  display: flex;
  margin-top: 20px;
`;

const ProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImg = styled.div`
  width: 120px;
  height: 120px;
  border: 1px solid black;
`;

const UserInfo = styled.div`
  margin-top: 15px;
  font-weight: 700;
`;

const ExchangeSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  position: relative;
`;

const ExchangeDiv = styled.div`
  display: flex;
  margin-left: 20px;
  max-width: 500px;
  background-color: #f5d1c36e;
  padding: 15px;
`;

const ExchangeTitle = styled.div`
  margin: 20px;
  position: absolute;
  top: -45px;
  left: 10px;
  background-color: #edc4b4c7;
  color: #31342d5c;
  padding: 10px 12px 5px 5px;
  transform: rotate(2.8deg);
`;

const ExchangeItem = styled.div`
  box-shadow: 0 1px 8px 0 rgb(34 36 38 / 18%);
  display: flex;
  justify-content: center;
  width: 100%;
  height: 150px;
  margin: 10px;
  background: white;
`;

const ClosetSection = styled.div`
  position: relative;
  margin-top: 50px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;

const ClosetTitle = styled.div`
  margin: 20px;
  position: absolute;
  top: -45px;
  left: 10px;
  background-color: #84a9b191;
  color: #6696a1;
  padding: 10px 12px 5px 5px;
  transform: rotate(-4.8deg);
`;

const ClosetDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0px 10px;
  max-width: 680px;
  padding: 15px;
  background-color: #aab8bb6e;
`;

const ClosetItem = styled.div`
  box-shadow: 0 1px 8px 0 rgb(34 36 38 / 18%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 10px;
  background: white;
  padding: 10px;
  position: relative;
`;

const DeleteBtn = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
  font-weight: 900;
  color: #9aa8ab;
  cursor: pointer;
  &:hover {
    transform: scale(1.2) !important;
  }
`;

const ItemForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Div = styled.div``;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 50px;
`;

const BudgetSection = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 2px solid salmon; */
  width: 450px;
  margin-top: 20px;
  position: relative;
`;

const BudgetSpan = styled.span`
  background-color: #dfb166b8;
  position: absolute;
  top: -25px;
  left: 33px;
  color: #72674cd9;
  padding: 10px 12px 5px 5px;
  font-size: 15px;
  transform: rotate(-3.8deg);
`;

const BudgetDiv = styled.div`
  margin-bottom: 20px;
  background-color: #f0bc6880;
  position: relative;
  width: 60%;
  padding: 25px 25px 35px;
  transform: rotate(-1.8deg);
`;

const ExpDiv = styled.div`
  background-color: #f0bc6880;
  width: 60%;
  margin-top: 145px;
  position: absolute;
  right: 0;
  padding: 35px 25px 45px;
  transform: rotate(1.8deg);
`;

const Span = styled.div`
  color: #201f1cd9;
`;

const Personal = () => {
  const [itemsCollection, setItemsCollection] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUseremail] = useState("");
  const [exchangeName, setExchangeName] = useState("");
  const [itemSize, setItemSize] = useState("");
  const [exchangeInfo, setExchangeInfo] = useState("");
  const [renderItems, setRenderItems] = useState([]);
  const [budget, setBudget] = useState(0);
  const [expense, setExpense] = useState(0);
  const [remain, setRemain] = useState(0);

  const user = firebase.firestore().collection("users").doc("joy");

  useEffect(() => {
    user.get().then((doc) => {
      setUserName(doc.data().name);
      setUseremail(doc.data().email);
    });
  }, []);

  useEffect(() => {
    user
      .collection("items")
      .get()
      .then((snapshot) => {
        let arr = [];
        let totalExp = 0;
        snapshot.forEach((doc) => {
          arr.push(doc.data().itemImg);
          totalExp += doc.data().itemExpense;
        });
        setRenderItems(arr);
        setExpense(totalExp);
      });
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc("joy")
      .collection("items")
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setItemsCollection(data);
      });
  }, []);

  const sumbitExchange = () => {
    const exchangeItem = firebase
      .firestore()
      .collection("users")
      .doc("joy")
      .collection("exchangeItems")
      .doc();

    user.collection("exchangeItems").doc(exchangeItem.id).set({
      exchangeID: exchangeItem.id,
      exchangeName: exchangeName,
      exchangeInfo: exchangeInfo,
      itemID: itemsCollection.itemID,
      itemSize: itemsCollection.itemSize,
      itemImg: itemsCollection.itemImg,
      itemName: itemsCollection.itemName,
    });
  };

  const calculate = () => {
    let money = Number(budget - expense);
    if (money < 0) {
      money = 0;
    }
    setRemain(money);
  };

  const deleteItem = () => {
    /////////////////
  };

  const data = [
    { name: "Budget", value: 400 },
    { name: "Expense", value: 600 },
    { name: "Group C", value: 500 },
  ];

  const COLORS = ["#e6e5eo", "#c5beb6", "#9eb39c"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <Header />
      <Main>
        <LeftDiv>
          <Section1>
            <ProfileDiv>
              <ProfileImg>
                <img
                  src={Pic}
                  alt="pic"
                  style={{ width: "100%", height: "100%" }}
                />
              </ProfileImg>
              <UserInfo>Hi, {userName}</UserInfo>
              <UserInfo>{userEmail}</UserInfo>
            </ProfileDiv>
            <ExchangeSection>
              <ExchangeTitle>交換過的衣服</ExchangeTitle>

              <ExchangeDiv>
                <ExchangeItem>
                  <img
                    src={bluesweater}
                    alt="bluesweater"
                    style={{ width: "100px" }}
                  />
                </ExchangeItem>
                <ExchangeItem>
                  <img
                    src={bluesweater}
                    alt="bluesweater"
                    style={{ width: "100px" }}
                  />{" "}
                </ExchangeItem>
                <ExchangeItem>
                  <img
                    src={bluesweater}
                    alt="bluesweater"
                    style={{ width: "100px" }}
                  />{" "}
                </ExchangeItem>
                <ExchangeItem>
                  <img
                    src={bluesweater}
                    alt="bluesweater"
                    style={{ width: "100px" }}
                  />{" "}
                </ExchangeItem>
              </ExchangeDiv>
            </ExchangeSection>
          </Section1>
          <ClosetSection>
            <ClosetTitle>我的衣櫥</ClosetTitle>
            <ClosetDiv>
              {renderItems.map((url) => (
                <ClosetItem>
                  <DeleteBtn
                    onClick={(e) => {
                      deleteItem(e.target.value);
                    }}
                  >
                    X
                  </DeleteBtn>
                  <img src={url} alt="OOTD" style={{ width: "90px" }} />
                  <StyledPopup modal trigger={<button>幫它找新家</button>}>
                    {(close) => (
                      <Backdrop>
                        <ItemForm>
                          <Div>
                            <Span>原本的名稱： {itemsCollection.itemName}</Span>
                            <Span>尺寸： {itemsCollection.itemSize}</Span>
                          </Div>
                          <Div>
                            <Span>名稱：</Span>
                            <input
                              type="text"
                              value={exchangeName}
                              onChange={(e) => setExchangeName(e.target.value)}
                              placeholder="幫衣服取名吧"
                            />
                          </Div>

                          <Div>
                            <Span>簡介：</Span>
                            <textarea
                              value={exchangeInfo}
                              style={{ cols: "33", rows: "8" }}
                              onChange={(e) => setExchangeInfo(e.target.value)}
                              placeholder="幫衣服做個自我介紹吧 :)"
                            />
                          </Div>
                          <Div>
                            <button
                              type="submit"
                              onClick={(e) => sumbitExchange(e)}
                            >
                              好了！
                            </button>
                          </Div>
                        </ItemForm>
                      </Backdrop>
                    )}
                  </StyledPopup>
                </ClosetItem>
              ))}
            </ClosetDiv>
          </ClosetSection>
        </LeftDiv>
        <BudgetSection>
          <BudgetDiv>
            <BudgetSpan>設定預算</BudgetSpan>
            <Span>這個月的治裝費預算</Span>
            <input
              type="number"
              onChange={(e) => setBudget(e.target.value)}
              style={{ margin: "8px 10px 10px 0" }}
            />
            <button onClick={(e) => calculate(e)}>好了</button>
          </BudgetDiv>
          <ExpDiv>
            <Span>這個月已經花了 ${expense}</Span>
            <Span>我這個月還可以花 ${remain}</Span>
          </ExpDiv>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </BudgetSection>
      </Main>
    </div>
  );
};

export default Personal;
