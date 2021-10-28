import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import Header from "./Landing_Page/Header";
import styled from "styled-components";

const DiaryContaioner = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
const ItemBox = styled.div``;
const EachBox = styled.div``;

const Diary = () => {
  return (
    <main>
      <div>
        <Header />
      </div>
      <DiaryContaioner>
        <EachBox>
          <ItemBox>
            <img alt="" />
          </ItemBox>
          <div>2010年12月04日</div>
        </EachBox>
        <EachBox>
          <ItemBox>
            <img alt="" />
          </ItemBox>
          <div>2010年12月04日</div>
        </EachBox>
        <EachBox>
          <ItemBox>
            <img alt="" />
          </ItemBox>
          <div>2010年12月04日</div>
        </EachBox>
        <EachBox>
          <ItemBox>
            <img alt="" />
          </ItemBox>
          <div>2010年12月04日</div>
        </EachBox>
      </DiaryContaioner>
    </main>
  );
};

export default Diary;
