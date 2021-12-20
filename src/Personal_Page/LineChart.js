import React, { useEffect, useState } from "react";
import "firebase/firestore";
import { useSelector } from "react-redux";
import { putFullYearPriceToChart } from "../utils/firebaseFunc";

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
  const isUser = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const date = new Date().toLocaleString().slice(0, 4);

  useEffect(() => {
    let unsuscribe;

    if (isUser !== null) {
      unsuscribe = putFullYearPriceToChart(isUser, date, setData);
    }
    return () => {
      unsuscribe && unsuscribe();
    };
  }, [isUser]);

  return (
    <ResponsiveContainer width="100%" height="76%">
      <LineChart
        width={300}
        height={300}
        data={data}
        margin={{
          top: 185,
          right: 100,
          left: 60,
          bottom: -20,
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
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartForm;
