import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import Header from "./Landing_Page/Header";
import styled from "styled-components";
import Done from "./img/done.png";

const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px 10px;
  margin-top: 115px;
  margin-left: 30px;
  width: 100%;
  padding: 0 2rem;
  text-align: center;
`;

const EachBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */

  width: 80%;
  /* display: inline-block; */
  margin-top: 2rem;
  background: #fff;
  padding: 1rem;
  box-shadow: 0 0.2rem 1.2rem rgba(0, 0, 0, 0.2);
`;

const ItemBox = styled.div`
  /* max-width: 180px; */
  max-height: 400px;
  margin-bottom: 15px;
  padding: 5px;
  /* box-shadow: 0 0.2rem 1.2rem rgba(0, 0, 0, 0.2); */
  /* box-shadow: 6px 7px 42px -8px rgba(0, 0, 0, 0.58); */

  &:hover {
    transform: scale(1.1) !important;
    transition: all 0.35s;
  }
`;

const TextBox = styled.div`
  margin-bottom: 12px;
`;

const Text = styled.div`
  font-size: 1rem;
  text-align: center;
  line-height: 2em;
  font-weight: 700;
  color: #6e7f83b5;
`;

const Diary = () => {
  return (
    <div>
      <Header />
      <Main>
        <EachBox>
          <ItemBox>
            <img
              src={Done}
              alt=""
              style={{ maxWidth: "100%", height: "100%" }}
            />
          </ItemBox>
          <Text>2010年12月04日</Text>
        </EachBox>
        <EachBox>
          <ItemBox>
            <img src={Done} alt="" style={{ width: "100%", height: "100%" }} />
          </ItemBox>
          <TextBox>
            <Text>2010年12月04日</Text>
          </TextBox>
        </EachBox>
        <EachBox>
          <ItemBox>
            <img src={Done} alt="" style={{ width: "100%", height: "100%" }} />
          </ItemBox>
          <TextBox>
            <Text>2010年12月04日</Text>
          </TextBox>
        </EachBox>
        <EachBox>
          <ItemBox>
            <img src={Done} alt="" style={{ width: "100%", height: "100%" }} />
          </ItemBox>
          <TextBox>
            <Text>2010年12月04日</Text>
          </TextBox>
        </EachBox>
      </Main>
    </div>
  );
};

export default Diary;
