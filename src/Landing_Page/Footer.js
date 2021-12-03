import React from "react";
import styled from "styled-components";

// import {v4} from "uuid"

const FooterDiv = styled.div`
  width: 100%;
  bottom: 0;
  box-shadow: 0 1px 8px 0 rgb(34 36 38 / 18%);
  min-height: 50px;
  background: #f7d093;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  color: #815e29;
  font-size: 10px;
`;

const Footer = () => {
  return (
    <div style={{ fontFamily: "Chilanka" }}>
      <FooterDiv>
        <Text>CopyRight &copy; 2021 OOTD Co. Ltd. All Rights Reserved.</Text>
      </FooterDiv>
    </div>
  );
};

export default Footer;
