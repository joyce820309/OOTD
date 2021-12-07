import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../Style/common.css";
import styled from "styled-components";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { putTagPriceToChart } from "../utils/firebaseFunc";

const EmptyDiv = styled.div`
  width: 400px;
  height: 500px;
  display: flex;
  align-items: center;
  padding-bottom: 0px;
  padding-left: 90px;
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: 0.4rem;
  color: #69725d;
`;

const PieChartForm = () => {
  const isUser = useSelector((state) => state.user);
  const [piedata, setPieData] = useState([]);
  const [data, setData] = useState([]);
  const date = new Date().toLocaleString().slice(0, 4);

  useEffect(() => {
    let unsubscribe;

    if (isUser !== null) {
      unsubscribe = putTagPriceToChart(isUser, date, setPieData, setData);
    }
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [isUser]);

  const COLORS = ["#a5c2c9", "#edc4b4", "#ebc382", "#9acb9c", "#c5bad9"];

  return (
    <>
      {data.length === 0 ? (
        <EmptyDiv>現在沒有任何費用唷！</EmptyDiv>
      ) : (
        <PieChart
          width={400}
          height={500}
          margin={{
            top: -40,
            right: 0,
            left: -40,
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
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      )}
    </>
  );
};

export default PieChartForm;
