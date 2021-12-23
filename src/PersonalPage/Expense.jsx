import React from "react";
import styled from "styled-components";
import SubTotal from "./SubTotal";
import EditBudget from "./EditBudget";
import RenderCharts from "./RenderCharts";

const BudgetContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-height: 720px;
  padding: 15px;
  background-color: #f5e8d4;
  z-index: 5;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #f5e8d4;
  }

  &::-webkit-scrollbar-thumb {
    border: 3px solid #f5e8d4;
  }
  scrollbar-width: 5px;
  scrollbar-color: #f5e8d4 #f5e8d4;

  @media screen and (max-width: 1250px) {
    /* margin-top: 70px; */
  }
`;

const Expense = () => {
  return (
    <BudgetContainer>
      <SubTotal />
      <EditBudget />
      <RenderCharts />
    </BudgetContainer>
  );
};

export default Expense;
