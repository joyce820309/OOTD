import styled from "styled-components";
import Popup from "reactjs-popup";

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
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const MobileTagBox = styled.div`
  display: none;

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
  @media screen and (max-width: 945px) {
    font-size: 0.8rem;
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
  height: 200px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 945px) {
    height: 160px;
  }
`;
const AddBtn = styled.div`
  background-color: #a9dbe596;
  text-align: center;
  line-height: 1.6em;
  color: #31342d5c;
  cursor: pointer;
  border-radius: 50px;
  margin: 8px auto 3px auto;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  position: absolute;
  right: 32px;
  bottom: 29px;
  &:hover {
    transform: scale(1.2) !important;
    background-color: #f3d5ca;
  }
  @media screen and (max-width: 945px) {
    font-size: 0.8rem;
    padding: 0.6rem 0.9rem;
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

const BtnDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px dashed #8f9fa357;
  padding: 10px 20px;
`;

const Btn = styled.button`
  padding: 5px 15px;
  margin: auto 8px;
  background-color: #88b0c347;
  border-radius: 8px;
  &:hover {
    transform: scale(1.2);
    background-color: #8ebed5e6;
  }
  &:hover :first-child {
    position: absolute;
    display: flex;
    left: -85px;
    top: -60px;
    justify-content: center;
    align-items: center;
  }
`;

const ExplainSave = styled.div`
  display: none;
  width: 270px;
  height: 40px;
  border: 3px #88b0c347 solid;
  border-radius: 9px;
  background-color: snow;
  padding: 5px 10px;
`;

const DeleteBtn = styled(Btn)`
  position: relative;
  background-color: #f1cdc5b3;
  &:hover {
    background-color: #f1cdc5;
  }
  &:hover :first-child {
    position: absolute;
    display: flex;
    left: -25px;
    top: -60px;
    justify-content: center;
    align-items: center;
  }
`;

const ExplainDelete = styled.div`
  display: none;
  width: 250px;
  height: 40px;
  border: 3px #e5a9aa96 solid;
  border-radius: 9px;
  background-color: snow;
  padding: 5px 10px;
`;

const ClosetBox = styled.div`
  margin: 30px 80px 20px 20px;
  background-color: white;
  box-shadow: 0px 2px 21px -2px rgba(182, 163, 163, 0.51);
  height: 630px;
  width: 800px;
  position: relative;
  top: 10px;
  @media screen and (max-width: 1440px) {
    width: 700px;
    margin: 25px 10px 20px 20px;
    height: 540px;
    top: -10px;
  }
  @media screen and (max-width: 1245px) {
    width: 620px;
    margin: 20px;
  }
`;

const ImgsetBox = styled.div`
  padding-left: 60px;
  padding-right: 30px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #fff;
  }

  &::-webkit-scrollbar-thumb {
    border: 3px solid #fff;
  }
  scrollbar-width: 5px;
  scrollbar-color: #fff #fff;
  height: 100%;
  @media screen and (max-width: 1400px) {
    padding-left: 30px;
    padding-right: 30px;
  }
`;

const ImgBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const MobileImgBox = styled.div`
  /* display: none;

  @media screen and (max-width: 900px) {
    display: flex;
    flex-wrap: wrap;
  } */
`;

const ClosetTitleDiv = styled.div`
  font-weight: 800;
  margin: 20px;
  position: absolute;
  top: -50px;
  left: 10px;
  color: #515d6087;
  padding: 8px 12px 8px 10px;
  transform: rotate(-2.3deg);
  cursor: pointer;
  z-index: 10;
  background-color: #94c5d1bd;
`;

const MirrorTitleDiv = styled(ClosetTitleDiv)`
  background-color: #edc4b4c2;
  transform: rotate(-2.3deg);
  left: 10px;
  top: 15px;
  @media screen and (max-width: 1440px) {
    top: -35px;
  }
`;

const ClosetTitle = styled.div`
  padding: 5px;
  border-radius: 5px;
`;

const ItemForm = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SaveForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f3d19e57;
  display: flex;
  justify-content: center;
  border-radius: 25px;
`;

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }
  &-content {
    margin: auto;
    background: rgb(255, 255, 255);
    width: 580px;
    display: flex;
    height: 550px;
    border-radius: 25px;
  }
`;

const DairyPopup = styled(StyledPopup)`
  &-content {
    width: 350px;
    height: 400px;
  }
`;

const SaveBtn = styled.div`
  background-color: #d4e4eb;
  text-align: center;
  line-height: 1.6em;
  color: #31342d5c;
  cursor: pointer;
  margin: 0 auto;
  font-size: 13px;
  font-weight: 900;
  border-radius: 15px;
  &:hover {
    transform: scale(1.2) !important;
    background-color: #f3d5ca;
  }
`;

const Input = styled.input`
  background-color: snow;
  /* width: 100%; */
  &:focus-visible {
    outline: #e9c58eba 2px solid;
  }
`;

const InputNum = styled.input`
  background-color: snow;
  &:focus-visible {
    outline: #e9c58eba 2px solid;
  }
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
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
  DairyPopup,
  SaveBtn,
  Input,
  InputNum,
  BtnDiv,
  ExplainSave,
  DeleteBtn,
  ExplainDelete,
  ClosetBox,
  ImgsetBox,
  ImgBox,
  MobileImgBox,
  MirrorTitleDiv,
  ClosetTitle,
  ItemForm,
  Backdrop,
  SaveForm,
  Btn,
  ClosetTitleDiv,
  StyledPopup,
};
