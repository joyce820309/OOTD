import styled from "styled-components";

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
`;

const ImgDiv = styled.div`
  width: 30%;
  height: 160px;
  margin-bottom: 15px;
  padding: 5px;
  display: flex;
  justify-content: center;
  background-color: snow;
  box-shadow: 0 0.2rem 1.2rem rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

const ItemForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 305px;
  background-color: snow;
`;

export { ItemInfo, ImgDiv, ItemForm };
