import React, { useEffect, useState, useCallback } from "react";
import firebase from "../utils/firebase";
import "firebase/firestore";
import "../CSS/common.css";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import "firebase/auth";

const PieChartForm = () => {
  const [isUser, setIsUser] = useState(null);
  const [piedata, setPieData] = useState([]);
  let expenseArr = [];

  const date = new Date().toLocaleString().slice(0, 4);

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
        .collection("items")
        .onSnapshot((snapshot) => {
          const data = snapshot.docs
            .map((doc) => {
              return doc.data();
            })
            .filter((doc) => doc.YYYY === date && doc.itemExpense);

          let total = 0;

          const month = ["clothes", "pants", "skirt", "shoes", "accessary"];
          month.map((item) => {
            let expense = 0;
            data
              .filter((doc) => doc.itemTag === item)
              .forEach((data) => {
                total = expense += data.itemExpense;
              });
            return expenseArr.push(total);
            // return expenseArr.push(data);
          });

          console.log(expenseArr);

          if (isMounted) {
            let dataArr = [];
            let name = ["上衣", "褲子", "裙子", "鞋子", "配件"];
            console.log(expenseArr);
            for (let i = 0; i < 5; i++) {
              let d = {
                name: name[i],
                value: expenseArr[i],
              };
              dataArr.push(d);
            }
            console.log(dataArr);
            setPieData(dataArr);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [isUser]);

  const COLORS = ["#a5c2c9", "#edc4b4", "#ebc382", "#9acb9c", "#c5bad9"];

  return (
    // <ResponsiveContainer width="50%" height="50%">
    <PieChart
      width={400}
      height={500}
      margin={{
        top: 125,
        right: 140,
        left: 0,
        bottom: 10,
      }}
    >
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={piedata}
        cx={200}
        cy={200}
        outerRadius={105}
        fill="#8884d8"
        label
      >
        {piedata.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        {/* <text fill="white" dominantBaseline="central"></text> */}
      </Pie>
      <Tooltip />
    </PieChart>
    // </ResponsiveContainer>
  );
};

export default PieChartForm;
