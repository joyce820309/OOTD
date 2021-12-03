import React, { useEffect, useState } from "react";
import firebase from "../utils/firebase";
import "firebase/firestore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "firebase/auth";

const LineChartForm = () => {
  const [isUser, setIsUser] = useState(null);
  const [data, setData] = useState([]);
  let expenseArr = [];
  const date = new Date().toLocaleString().slice(0, 4);

  console.log(date);

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

          const month = [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
          ];
          month.map((item) => {
            let expense = 0;
            data
              .filter((doc) => doc.MM === item)
              .forEach((data) => {
                total = expense += data.itemExpense;
              });
            return expenseArr.push(total);
          });

          if (isMounted) {
            let dataArr = [];
            let nameArr = [
              "Jan.",
              "Feb.",
              "March",
              "April",
              "May",
              "June",
              "July",
              "Aug.",
              "Sep.",
              "Oct.",
              "Nov.",
              "Dec.",
            ];
            for (let i = 0; i < 12; i++) {
              let d = {
                name: nameArr[i],
                Expense: expenseArr[i],
              };
              dataArr.push(d);
            }
            setData(dataArr);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [isUser]);

  console.log(data);

  return (
    <ResponsiveContainer width="100%" height="76%">
      <LineChart
        width={300}
        height={300}
        data={data}
        margin={{
          top: 165,
          right: 180,
          left: 70,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Expense"
          stroke="#8380c5"
          activeDot={{ r: 8 }}
        />
        {/* <Line type="monotone" dataKey="Budget" stroke="#78a388" /> */}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartForm;
