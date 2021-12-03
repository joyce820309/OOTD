import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 90px;
  position: relative;
`;

const YellowBG = styled.div`
  background-color: #f3d19e57;
  position: absolute;
  width: 90%;
  height: 80%;
  top: 120px;
  left: 90px;
  z-index: -1;
`;

const TagBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: -55px;
  top: 45px;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const MobileTagBox = styled.div`
  /* display: none; */

  @media screen and (max-width: 900px) {
    display: flex;
    position: absolute;
    width: 500px;
    left: -55px;
    top: 45px;
    border: 2px tomato solid;
  }
`;

const Tag = styled.div`
  margin-bottom: 10px;
  border-radius: 0 5px 5px 0;
  background-color: #aab8bbb8;
  padding: 4px 12px 4px 22px;
  color: #4b4e47;
  cursor: pointer;
  opacity: 0.8;
  font-size: 1rem;
  z-index: 0;
  &:hover {
    opacity: 1;
  }
  @media screen and (max-width: 900px) {
  }
`;

const Tag1 = styled(Tag)`
  background-color: #e5daa9bf;
  &:hover {
    background-color: #e5daa9;
  }
`;

const Tag2 = styled(Tag)`
  background-color: #a9e5d996;
  &:hover {
    background-color: #a9e5d9;
  }
`;

const Tag3 = styled(Tag)`
  background-color: #e5a9aa96;
  &:hover {
    background-color: #e5a9aa;
  }
`;

const Tag4 = styled(Tag)`
  background-color: #a9dbe5bf;
  &:hover {
    background-color: #a9dbe5;
  }
`;

const Tag5 = styled(Tag)`
  background-color: #b5a8bdb8;
  &:hover {
    background-color: #b5a8bd;
  }
`;

const TagContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 80px 50px;
`;

const EmptyDiv = styled.div`
  color: #31342d5c;
  padding: 3px;
  border-bottom: 4px #d4e4eb solid;
  margin: 0 auto;
  font-size: 16px;
  font-weight: 900;
  height: 8%;
`;

const ImgDiv = styled.div`
  width: 150px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
`;
const AddBtn = styled.div`
  background-color: #a9dbe596;
  text-align: center;
  line-height: 1.6em;
  color: #31342d5c;
  cursor: pointer;
  border-radius: 50px;
  margin: 8px auto 3px auto;
  padding: 10px 18px;
  font-size: 18px;
  font-weight: 600;
  position: absolute;
  right: 32px;
  bottom: 29px;
  /* box-shadow: 1px -1px 10px 2px #91b8bdd6; */
  &:hover {
    transform: scale(1.2) !important;
    background-color: #f3d5ca;
  }
`;

const CanvasDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

const Div = styled.div`
  margin: 5px auto;
  width: 70%;
`;

const LeftDiv = styled(Div)`
  margin: 7px auto;
  width: 100%;
`;
const Span = styled.span`
  color: #3f484cc2;
  font-weight: 500;
`;

const LoadingDiv = styled.div`
  width: 100px;
  height: 100px;
  margin: 200px;
`;

export {
  EmptyDiv,
  YellowBG,
  Tag,
  Tag1,
  Tag2,
  Tag3,
  Tag4,
  Tag5,
  Container,
  AddBtn,
  CanvasDiv,
  TagContainer,
  TagBox,
  Div,
  LeftDiv,
  Span,
  MobileTagBox,
  ImgDiv,
  LoadingDiv,
};
